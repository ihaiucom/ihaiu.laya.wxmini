import Handler = Laya.Handler;
import MiniAdpter from "./MiniAdpter";

export interface _filesItemObj
{
    // wx6c131edd1341e51d.o6zAJswfCk6IPl3PsEosHkqIeKhA.Ffj22iKwK15E72d8b8af7ec8687dc123b16ea990de4b.png
    md5: string;

    // http://192.168.2.224:8900/bin/res/fgui/GameLaunch_atlas0.png
    readyUrl: string;

    // 191282
    size: number;

    // 1560161860952
    times: number;

    // ""
    encoding: string;
}

export interface _filesListObj
{
    // 已经使用的缓存大小
    fileUsedSize: number;

    // key: "http://192.168.2.224:8900/bin/res/fgui/GameLaunch_atlas0.png",
    [url: string]: _filesItemObj | any;
}


/** 微信小游戏 文件管理 */
export default class MiniFileMgr
{
    /** 
     * 磁盘文件存储路径
     * "/layaairGame"
     */
    static fileNativeDir: string;
    /** 记录文件列表的文件 */
    static fileListName="layaairfiles.txt";
    /** 文件列表 */
    static filesListObj : _filesListObj = <any> {};



    
    /**
     * 子域磁盘缓存路径存储对象 
     * 图集数据  atlasdata
     */
	static ziyuFileData={};
    /**
     * 子域图片磁盘缓存路径存储对象 
     * 图集图片 imgNativeUrl
     */
	static ziyuFileTextureData={};
    /**加载路径设定(相当于URL.rootPath)**/
    static loadPath: string = "";
    static DESCENDING: number = 2;
    static NUMERIC: number = 16;


    private static _fs:any;
    /** 获取全局唯一的文件管理器 */
    static get fs():wx.FileSystemManager
    {
        if(!this._fs)
        {
            this._fs = wx.getFileSystemManager();
        }
        return this._fs;
    }

    /**
     * 下载文件资源到本地，客户端直接发起一个 HTTP GET 请求，返回文件的本地临时路径。**使用前请先阅读[说明](./api-network.md)**。
     * https://developers.weixin.qq.com/minigame/dev/guide/base-ability/network.html
     * 注意：请在服务端响应的 header 中指定合理的 Content-Type 字段，以保证客户端正确处理文件类型。
     */
    static wxdown(object: _downloadFileObject):DownloadTask | void
    {
        return wx.downloadFile(object);
    }

    /**
     * @private
     *获取当前缓存使用的空间大小(字节数，除以1024 再除以1024可以换算成M)
     * @return
     */
    static getCacheUseSize(): number
    {
        if(MiniFileMgr.filesListObj && MiniFileMgr.filesListObj['fileUsedSize'])
			return MiniFileMgr.filesListObj['fileUsedSize'];
		return 0;
    }




    /**
     * @private
     * 设置磁盘文件存储路径
     * @param value 磁盘路径
     * @return
     */
    static setNativeFileDir(value: string)
    {
		MiniFileMgr.fileNativeDir= wx.env.USER_DATA_PATH+value;
    }
    
    /**
     * @private
     * 判断资源目录是否存在
     * @param dirPath 磁盘设定路径
     * @param callBack 回调处理
     */
    static existDir(dirPath: string, callBack: Handler): void
    {

        MiniFileMgr.fs.mkdir(
            {
                dirPath:dirPath,
                success: (data)=>
                {
                    callBack !=null && callBack.runWith([0,{data:JSON.stringify({})}]);
                },
                fail: (data)=>
                {
                    // 有同名文件或目录
                    if (data.errMsg.indexOf("file already exists")!=-1)
                        MiniFileMgr.readSync(MiniFileMgr.fileListName,"utf8",callBack);
                    else
                        callBack !=null && callBack.runWith([1,data]);
                }
            });
    }
    
    
    /**
     * @private
     * 本地读取
     * @param filePath 文件磁盘路径
     * @param encoding 文件读取的编码格式
     * @param callBack 回调处理
     * @param readyUrl 文件请求加载地址
     */
    static readSync(filePath: string, encoding?: string, callBack?: Handler, readyUrl?: string): void
    {
        (encoding===void 0)&& (encoding="ascill");
        (readyUrl===void 0)&& (readyUrl="");
        
		var fileUrl= MiniFileMgr.getFileNativePath(filePath);
		var filesListStr
        try
        {
			filesListStr= MiniFileMgr.fs.readFileSync(fileUrl,encoding);
			callBack !=null && callBack.runWith([0,{data:filesListStr}]);
		}
        catch(error)
        {
			callBack !=null && callBack.runWith([1]);
		}
        
    }

    
    /**
     * @private
     * 获取文件磁盘的路径(md5)
     * @param fileName
     * @return
     */
    static getFileNativePath(fileName: string): string
    {
		return  MiniFileMgr.fileNativeDir+"/"+fileName;
    }

    
    /**
     * @private
     * 是否是本地4M包文件
     * url中包含这些字符就是 ["layaNativeDir", "wxlocal"]
     * @param url
     * @return
     */
    static isLocalNativeFile(url: string): boolean
    {
        for(var i=0, sz=MiniAdpter.nativefiles.length; i<sz; i++)
        {
			if(url.indexOf(MiniAdpter.nativefiles[i])!=-1)
				return true;
		}
		return false;
    }

    
    /**
     * @private
     * 判断缓存里是否存在文件
     * @param fileUrl
     * @return
     */
    static getFileInfo(fileUrl: string): _filesItemObj
    {
        var fileNativePath=fileUrl;
        var fileObj = MiniFileMgr.filesListObj[fileNativePath];
        
		if (fileObj==null)
			return null;
		else
		    return fileObj;
    }

    /**
     * @private
     * 本地读取
     * @param filePath 文件磁盘路径
     * @param encoding 文件读取的编码格式
     * @param callBack 回调处理
     * @param readyUrl 文件请求加载地址
     * @param isSaveFile 是否自动缓存下载的文件,只有在开发者自己单独加载时生效
     * @param fileType 文件类型
     */
    static read(filePath: string, encoding?: string, callBack?: Handler, readyUrl?: string, isSaveFile?: boolean, fileType?: string): void
    {
        (encoding===void 0)&& (encoding="ascill");
		(readyUrl===void 0)&& (readyUrl="");
		(isSaveFile===void 0)&& (isSaveFile=false);
        (fileType===void 0)&& (fileType="");
        
		var fileUrl;
        if(readyUrl!="" && (readyUrl.indexOf("http://")!=-1 || readyUrl.indexOf("https://")!=-1))
        {
			fileUrl = MiniFileMgr.getFileNativePath(filePath)
        }
        else
        {
			fileUrl=filePath;
        }
        
        // 获取兼容微信的url， 比如把后缀替换成微信支持的
        fileUrl = Laya.URL.getAdptedFilePath(fileUrl);
        
        // 异步读取微信文件
		MiniFileMgr.fs.readFile(
            {
                filePath:fileUrl,
                encoding:encoding,
                success: (data:_readFileSuccessObject)=>
                {
				    callBack !=null && callBack.runWith([0,data]);
                },
                fail: (data:_readFileFailObject)=>
                {
                    if (data && readyUrl !="")
                        // 没有读取成功就去下载该url的文件
                        MiniFileMgr.downFiles(readyUrl,encoding,callBack,readyUrl,isSaveFile,fileType);
                    else
                        callBack !=null && callBack.runWith([1]);
                }
            });
        
    }


    /**
     * @private
     * 下载远端文件(非图片跟声音文件)
     * @param fileUrl  文件远端下载地址
     * @param encode 文件编码
     * @param callBack 完成回调
     * @param readyUrl 文件真实下载地址
     * @param isSaveFile 是否自动缓存下载的文件,只有在开发者自己单独加载时生效
     * @param fileType 文件类型
     */
    static downFiles(fileUrl: string, encoding?: string, callBack?: Handler, readyUrl?: string, isSaveFile?: boolean, fileType?: string, isAutoClear?: boolean): void
    {
        (encoding===void 0)&& (encoding="ascii");
		(readyUrl===void 0)&& (readyUrl="");
		(isSaveFile===void 0)&& (isSaveFile=false);
		(fileType===void 0)&& (fileType="");
        (isAutoClear===void 0)&& (isAutoClear=true);
        
        var downloadTask : DownloadTask  = <any> MiniFileMgr.wxdown(
            {
                url:fileUrl,
                success: (data)=>
                {
                    if (data.statusCode===200)
                    {
                        // 文件下载成功
                        MiniFileMgr.readFile(data.tempFilePath, encoding, callBack, readyUrl, isSaveFile, fileType, isAutoClear);
                    }
                    else
                    {
                        // 服务器拒绝访问
                        if(data.statusCode===403)
                        {
                            callBack !=null && callBack.runWith([0,fileUrl]);
                        }
                        else
                        {
                            callBack !=null && callBack.runWith([1,data]);
                        }
                    } 
                },
                fail: (data)=>
                {
				    callBack !=null && callBack.runWith([1,data]);
                }
            });
        
		downloadTask.onProgressUpdate(
            (data: _DownloadTaskProgressUpdateResultObject)=>
            {
			    callBack !=null && callBack.runWith([2,data.progress]);
		    });
        
    }


    /**
     * @private
     * 本地本地磁盘文件读取
     * @param filePath 文件磁盘临时地址
     * @param encoding 文件设定读取的编码格式
     * @param callBack 完成回调
     * @param readyUrl 真实的下载地址
     * @param isSaveFile 是否自动缓存下载的文件,只有在开发者自己单独加载时生效
     * @param fileType 文件类型
     */
    static readFile(filePath: string, encoding?: string, callBack?: Handler, readyUrl?: string, isSaveFile?: boolean, fileType?: string, isAutoClear?: boolean): void
    {
        (encoding===void 0)&& (encoding="ascill");
		(readyUrl===void 0)&& (readyUrl="");
		(isSaveFile===void 0)&& (isSaveFile=false);
		(fileType===void 0)&& (fileType="");
        (isAutoClear===void 0)&& (isAutoClear=true);
        
        // 获取兼容微信的url， 比如把后缀替换成微信支持的
        filePath= Laya.URL.getAdptedFilePath(filePath);
        
		MiniFileMgr.fs.readFile(
            {
                filePath:filePath,
                encoding:encoding,
                success: (data)=>
                {
                    if (filePath.indexOf("http://")!=-1 || filePath.indexOf("https://")!=-1)
                    {
                        // 缓存文件
                        if(MiniAdpter.autoCacheFile || isSaveFile)
                        {
                            MiniFileMgr.copyFile(filePath,readyUrl,callBack,encoding,isAutoClear);
                        }
                    }
                    else
                        callBack !=null && callBack.runWith([0,data]);
                },

                fail: (data)=>
                {
                    if (data)
                        callBack !=null && callBack.runWith([1,data]);
                }
            });
    }

    /**
     * 将本地临时文件 拷贝到 本地缓存文件
     * @param tempFilePath 微信临时目录文件
     * @param readyUrl 真实的下载地址
     * @param callBack 完成回调
     * @param encoding 文件设定读取的编码格式
     * @param isAutoClear 当缓存空间不够时,是否自动清理
     */
    static copyFile(tempFilePath: string, readyUrl: string, callBack?: Handler, encoding?: string, isAutoClear?: boolean)
    {
        (encoding===void 0)&& (encoding="");
        (isAutoClear===void 0)&& (isAutoClear=true);
        
		var temp:string[] = tempFilePath.split("/");
		var tempFileName: string= temp[temp.length-1];
		var fileurlkey:string = readyUrl;
        var fileObj:_filesItemObj = MiniFileMgr.getFileInfo(readyUrl);
        
        // "/layaairGame/xxxxxfdss2"
        var saveFilePath = MiniFileMgr.getFileNativePath(tempFileName);
        // 总空间 50MB
        var totalSize = 50 *1024 *1024;
        // 清理空间 4MB
        var chaSize = 4 *1024 *1024;
        
        // 缓存已经使用的空间
        var fileUseSize = MiniFileMgr.getCacheUseSize();
        
        if (fileObj)
        {
            // 已缓存的文件是否一样的URL
            if (fileObj.readyUrl != readyUrl)
            {
				MiniFileMgr.fs.getFileInfo(
                    {
					    filePath:tempFilePath,
                        success: (data)=>
                        {
                            // 已缓存的文件大小 + 安全空闲空间大小 + 当前文件大小  >= 最大缓存空间大小
                            if((isAutoClear && (fileUseSize+chaSize+data.size)>=totalSize))
                            {
                                // 当前文件大小 > 每次清理的缓存大小默认为5M
                                // 就:  每次清理的缓存大小 = 当前文件大小
                                if(data.size > MiniAdpter.minClearSize)
                                    MiniAdpter.minClearSize=data.size;
                                MiniFileMgr.onClearCacheRes();
                            }


                            MiniFileMgr.deleteFile(tempFileName, readyUrl, callBack, encoding, data.size);
                        },

                        fail: (data)=>
                        {
                            callBack !=null && callBack.runWith([1,data]);
                        }
				});
			}
			else
			    callBack !=null && callBack.runWith([0]);
        }
        else
        {
			MiniFileMgr.fs.getFileInfo(
                {
				    filePath:tempFilePath,
                    success: (data)=>
                    {
                        if((isAutoClear && (fileUseSize+chaSize+data.size)>=totalSize)){
                            if(data.size > MiniAdpter.minClearSize)
                                MiniAdpter.minClearSize=data.size;
                            MiniFileMgr.onClearCacheRes();
                        }

                        MiniFileMgr.fs.copyFile(
                            {
                                srcPath:tempFilePath,
                                destPath:saveFilePath,
                                success:function (data2)
                                {
                                    MiniFileMgr.onSaveFile(readyUrl,tempFileName,true,encoding,callBack,data.size);
                                },
                                fail:function (data)
                                {
                                    callBack !=null && callBack.runWith([1,data]);
                                }
                            });
                    },

                    fail: (data) => 
                    {
                        callBack !=null && callBack.runWith([1,data]);
                    }
			});
		}

    }


    /** 清理缓存，清出一定的安全空闲空间 */
    static onClearCacheRes()
    {
        var memSize = MiniAdpter.minClearSize;
		var tempFileListArr=[];
        for(var key in MiniFileMgr.filesListObj)
        {
			tempFileListArr.push(MiniFileMgr.filesListObj[key]);
        }
        
        // 排序最近没使用的资源
        MiniFileMgr.sortOn(tempFileListArr,"times",16);
        
		var clearSize=0;
        for(var i=1, sz=tempFileListArr.length; i<sz; i++)
        {
			var fileObj=tempFileListArr[i];
			if(clearSize >= memSize)
				break ;
			clearSize += fileObj.size;
			MiniFileMgr.deleteFile("",fileObj.readyUrl);
		}

    }

    /**
     * @private
     * 从本地删除文件
     * @param tempFileName 文件临时地址 ,为空字符串时就会从文件列表删除
     * @param readyUrl 文件真实下载地址
     * @param callBack 回调处理，在存储图片时用到
     * @param encoding  文件编码
     * @param fileSize 文件大小
     */
    static deleteFile(tempFileName: string, readyUrl?: string, callBack?: Handler, encoding?: string, fileSize?: number): void
    {
        (readyUrl===void 0)&& (readyUrl="");
		(encoding===void 0)&& (encoding="");
        (fileSize===void 0)&& (fileSize=0);
        
		var fileObj: _filesItemObj =MiniFileMgr.getFileInfo(readyUrl);
        var deleteFileUrl = MiniFileMgr.getFileNativePath(fileObj.md5);
        
		MiniFileMgr.fs.unlink(
            {
                filePath:deleteFileUrl,
                success: (data)=>
                {
                    var isAdd=tempFileName !="" ? true :false;
                    if(tempFileName !="")
                    {
                        var saveFilePath=MiniFileMgr.getFileNativePath(tempFileName);
                        MiniFileMgr.fs.copyFile(
                            {
                                srcPath:tempFileName,
                                destPath:saveFilePath,
                                success:function (data)
                                {
                                    MiniFileMgr.onSaveFile(readyUrl,tempFileName,isAdd,encoding,callBack,data.size);
                                },

                                fail:function (data)
                                {
                                    callBack !=null && callBack.runWith([1,data]);
                                }
                            });
                    }
                    else
                    {
                        MiniFileMgr.onSaveFile(readyUrl,tempFileName,isAdd,encoding,callBack,fileSize);
                    }
                },

                fail: (data) =>{}
            });

    }


    /**
     * @private
     * 清空缓存空间文件内容
     */
    static deleteAll(): void
    {
        var tempFileListArr=[];
        for(var key in MiniFileMgr.filesListObj)
        {
			tempFileListArr.push(MiniFileMgr.filesListObj[key]);
        }
        
        for(var i=1,sz=tempFileListArr.length;i<sz;i++)
        {
			var fileObj=tempFileListArr[i];
			MiniFileMgr.deleteFile("",fileObj.readyUrl);
        }
        
        if(MiniFileMgr.filesListObj && MiniFileMgr.filesListObj.fileUsedSize)
        {
			MiniFileMgr.filesListObj.fileUsedSize=0;
		}
		MiniFileMgr.writeFilesList("",JSON.stringify({}),false);
    }


    /**
     * @private
     * 存储更新文件列表
     * @param readyUrl
     * @param md5Name
     * @param isAdd
     * @param encoding
     * @param callBack
     * @param fileSize 文件大小
     */
    static onSaveFile(readyUrl: string, md5Name: string, isAdd?: boolean, encoding?: string, callBack?: Handler, fileSize?: number): void
    {
        (isAdd===void 0)&& (isAdd=true);
		(encoding===void 0)&& (encoding="");
        (fileSize===void 0)&& (fileSize=0);
        
		var fileurlkey=readyUrl;
		if(MiniFileMgr.filesListObj['fileUsedSize']==null)
            MiniFileMgr.filesListObj['fileUsedSize']=0;
            
        if(isAdd)
        {
			var fileNativeName=MiniFileMgr.getFileNativePath(md5Name);
            MiniFileMgr.filesListObj[fileurlkey] = 
            {
                md5:md5Name,
                readyUrl:readyUrl,
                size:fileSize,
                times:Laya.Browser.now(),
                encoding:encoding
            };

			MiniFileMgr.filesListObj['fileUsedSize'] = parseInt(<any>MiniFileMgr.filesListObj['fileUsedSize']) + fileSize;
			MiniFileMgr.writeFilesList(fileurlkey, JSON.stringify(MiniFileMgr.filesListObj),true);
			callBack !=null && callBack.runWith([0]);
        }
        else
        {
            if(MiniFileMgr.filesListObj[fileurlkey])
            {
				var deletefileSize = parseInt(MiniFileMgr.filesListObj[fileurlkey].size);
				MiniFileMgr.filesListObj['fileUsedSize']= parseInt(<any>MiniFileMgr.filesListObj['fileUsedSize'])-deletefileSize;
				delete MiniFileMgr.filesListObj[fileurlkey];
				MiniFileMgr.writeFilesList(fileurlkey,JSON.stringify(MiniFileMgr.filesListObj),false);
				callBack !=null && callBack.runWith([0]);
			}
		}
        
    }

    /** 更新文件列表记录 filesList */
    static writeFilesList(fileurlkey: string, filesListStr: string, isAdd: boolean)
    {
        var listFilesPath=MiniFileMgr.fileNativeDir+"/"+MiniFileMgr.fileListName;

		MiniFileMgr.fs.writeFile(
            {
                filePath:listFilesPath,
                encoding:'utf8',
                data:filesListStr,
                success: (data)=>
                {
                },

                fail: (data)=>
                {
                }
            });
        
        if(!MiniAdpter.isZiYu &&MiniAdpter.isPosMsgYu)
        {
			    wx.postMessage(
                {
                    url:fileurlkey,
                    data:MiniFileMgr.filesListObj[fileurlkey],
                    isLoad:"filenative",
                    isAdd:isAdd
                });
		}

    }


    /**
     * @private
     * 下载远端文件(图片跟声音文件)
     * @param fileUrl  文件远端下载地址
     * @param encode 文件编码
     * @param callBack 完成回调
     * @param readyUrl 文件真实下载地址
     * @param isSaveFile 是否自动缓存下载的文件,只有在开发者自己单独加载时生效
     */
    static downOtherFiles(fileUrl: string, callBack?: Handler, readyUrl?: string, isSaveFile?: boolean, isAutoClear?: boolean): void
    {
        (readyUrl===void 0)&& (readyUrl="");
		(isSaveFile===void 0)&& (isSaveFile=false);
        (isAutoClear===void 0)&& (isAutoClear=true);
        
		MiniFileMgr.wxdown(
            {
                url:fileUrl,
                success: (data)=>
                {
                    if (data.statusCode===200)
                    {
                        if((MiniAdpter.autoCacheFile || isSaveFile) && readyUrl.indexOf("qlogo.cn")==-1 && readyUrl.indexOf(".php")==-1)
                            MiniFileMgr.copyFile(data.tempFilePath, readyUrl, callBack, "", isAutoClear);
                        else
                            callBack !=null && callBack.runWith([0,data.tempFilePath]);
                    }
                    else
                    {
                        callBack !=null && callBack.runWith([1,data]);
                    }
                },
                fail: (data)=>
                {
				    callBack !=null && callBack.runWith([1,data]);
                }
            });

    }

    /**
     * @private
     * 下载文件
     * @param fileUrl 文件远端地址
     * @param fileType 文件类型(image、text、json、xml、arraybuffer、sound、atlas、font)
     * @param callBack 文件加载回调,回调内容[errorCode码(0成功,1失败,2加载进度)
     * @param encoding 文件编码默认 ascill，非图片文件加载需要设置相应的编码，二进制编码为空字符串
     */
    static downLoadFile(fileUrl: string, fileType?: string, callBack?: Handler, encoding?: string): void
    {
        (fileType===void 0)&& (fileType="");
        (encoding===void 0)&& (encoding="ascii");
        
        if(window.navigator.userAgent.indexOf('MiniGame')<0)
        {
			Laya.loader.load(fileUrl,callBack);
        }
        else
        {
			if(fileType == Laya.Loader.IMAGE || fileType== Laya.Loader.SOUND )
				MiniFileMgr.downOtherFiles(fileUrl,callBack,fileUrl,true,false);
			else
			    MiniFileMgr.downFiles(fileUrl,encoding,callBack,fileUrl,true,fileType,false);
		}

    }



        

    
    /**
     * @private
     * 数组排序
     * @param array
     * @param name
     * @param options
     * @return
     */
    static sortOn(array: Array<any>, name: any, options?: number): Array<any>
    {
        (options===void 0)&& (options=0);

        if (options==16)
            return array.sort(function(a,b){return a[name]-b[name];});
            
        if (options==(16 | 2))  return array.sort(function(a,b){return b[name]-a[name];});
        
		return array.sort(function(a,b){return a[name]-b[name] });
        
    }
        
        
        
}


	