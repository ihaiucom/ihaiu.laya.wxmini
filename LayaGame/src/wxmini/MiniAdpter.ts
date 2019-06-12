import MiniFileMgr, { _filesItemObj, _filesListObj } from "./MiniFileMgr";
import Handler = Laya.Handler;
import Browser = Laya.Browser;
import RunDriver = Laya.RunDriver;
import Utils = Laya.Utils;
import Input = Laya.Input;
import Loader = Laya.Loader;
import LocalStorage = Laya.LocalStorage;
import Matrix = Laya.Matrix;
import URL = Laya.URL;
import MiniInput from "./MiniInput";
import MiniLoader from "./MiniLoader";
import MiniImage from "./MiniImage";
import MiniLocalStorage from "./MiniLocalStorage";

interface _EnvConfig
{
    pixelRatioInt?: number;
    load?:Function;

    [key:string] : any;
}

declare var sharedCanvas;
declare var window;

/** 微信适配器 */
export default class MiniAdpter
{
    static window: any;

    /** 适配器编号 */
    static idx:number = 1;
    
    /** 系统信息 */
	static systemInfo:_getSystemInfoSyncReturnValue =null;

    /** 是否初始化 */
    private static _inited: boolean = false;
    
    /** 是否是微信小游戏子域 */
    static isZiYu: boolean = false;

    /** 微信小游戏是否需要在主域中自动将加载的文本数据自动传递到子域 */
    static isPosMsgYu: boolean = false;
    
    /**是否自动缓存下载的图片跟声音文件，默认为true**/
    static autoCacheFile: boolean = true;

	/** 每次清理的缓存大小默认为5M */
    static minClearSize = (5 *1024 *1024);
    
	static subNativeFiles=null;
	static subNativeheads=[];
	static subMaps=[];
	static AutoCacheDownFile=false;

    /** 环境配置 */
    static EnvConfig: _EnvConfig = {
        pixelRatioInt: 0,
    };
    
    /** 创建网页元素 */
	static _preCreateElement=null;



    /** 解析JSON */
    static getJson(data)
    {
        return JSON.parse(data);
    }

    /** 启用适配器 */
    static enable()
    {
        // isWXPosMsg           微信小游戏是否需要在主域中自动将加载的文本数据自动传递到子域，默认 false。
        // isWXOpenDataContext  是否是微信小游戏子域，默认为false。
		MiniAdpter.init(Laya.isWXPosMsg,Laya.isWXOpenDataContext);

    }

    /**
     * 初始化
     * @param isPosMsg  微信小游戏是否需要在主域中自动将加载的文本数据自动传递到子域，默认 false。
     * @param isSon     是否是微信小游戏子域，默认为false。
     */
    static init(isPosMsg: boolean,isSon: boolean)
    {
		(isPosMsg===void 0)&& (isPosMsg=false);
        (isSon===void 0)&& (isSon=false);
        
		if (MiniAdpter._inited)return;
		MiniAdpter._inited=true;
        MiniAdpter.window=/*__JS__ */window;

        // 判断运行环境是否是微信小游戏
        if (MiniAdpter.window.navigator.userAgent.indexOf('MiniGame')< 0)return;
        
		MiniAdpter.isZiYu=isSon;
        MiniAdpter.isPosMsgYu=isPosMsg;
        MiniAdpter.EnvConfig = {
            pixelRatioInt: 0,
        };

        
        if (!MiniAdpter.isZiYu)
        {
			MiniFileMgr.setNativeFileDir("/layaairGame");
			MiniFileMgr.existDir(MiniFileMgr.fileNativeDir, Handler.create(MiniAdpter,MiniAdpter.onMkdirCallBack));
        }
        
        
        MiniAdpter.systemInfo = wx.getSystemInfoSync();
        
        MiniAdpter.window.focus=function ()
        {
        };

        Laya['_getUrlPath']=function ()
        {
        };
        
        MiniAdpter.window.logtime=function (str)
        {
        };
        
        MiniAdpter.window.alertTimeLog=function (str)
        {
        };
        
        MiniAdpter.window.resetShareInfo=function ()
        {
        };
        
        MiniAdpter.window.CanvasRenderingContext2D=function ()
        {
        };

        MiniAdpter.window.document.body.appendChild=function ()
        {
        };
        
        
        MiniAdpter.window.CanvasRenderingContext2D.prototype=MiniAdpter.window.wx.createCanvas().getContext('2d').__proto__;
        
        
        MiniAdpter.EnvConfig.pixelRatioInt=0;
        
		Browser["_pixelRatio"]= MiniAdpter.pixelRatio();
		MiniAdpter._preCreateElement=Browser.createElement;
		Browser["createElement"]=MiniAdpter.createElement;
		RunDriver.createShaderCondition=MiniAdpter.createShaderCondition;
		Utils['parseXMLFromString']=MiniAdpter.parseXMLFromString;
		Input['_createInputElement']=MiniInput['_createInputElement'];
		MiniAdpter.EnvConfig.load=Loader.prototype.load;
		Loader.prototype.load=MiniLoader.prototype.load;
		Loader.prototype._loadImage=MiniImage.prototype._loadImage;
		MiniLocalStorage.__init__();
		LocalStorage._baseClass=MiniLocalStorage;
		MiniAdpter.window.wx.onMessage(MiniAdpter._onMessage);
        

        
    }

    /** 创建了缓存目录 / 读取资源列表 */
    private static onMkdirCallBack(errorCode: number,data:any)
    {
		if (!errorCode)
			MiniFileMgr.filesListObj=JSON.parse(data.data);
    }



    /** 创建共享子域 */
    static createShaderCondition(conditionScript: string): Function
    {
        var _$this=this;
        var func=function ()
        {
			var abc=conditionScript;
			return _$this[conditionScript.replace("this.","")];
		}
		return func;
    }

    
    /**
     * 将字符串解析成 XML 对象。
     * @param value 需要解析的字符串。
     * @return js原生的XML对象。
     */
    static parseXMLFromString(value: string)
    {
        var rst;
		var Parser;
        value=value.replace(/>\s+</g,'><');
        
        try 
        {
			rst=(new window.Parser.DOMParser()).parseFromString(value,'text/xml');
        }
        catch (error)
        {
			throw "需要引入xml解析库文件";
		}
		return rst;

    }

    
    /** 设备分辨率比 */
    static pixelRatio(): number
    {
        if (!MiniAdpter.EnvConfig.pixelRatioInt)
        {
            try 
            {
				MiniAdpter.EnvConfig.pixelRatioInt = MiniAdpter.systemInfo.pixelRatio;
				return MiniAdpter.systemInfo.pixelRatio;
            }
            catch (error)
            {

            }
		}
		return MiniAdpter.EnvConfig.pixelRatioInt;

    }

    /** 创建网页元件 */
    static createElement(type: string): any
    {
        if (type=="canvas")
        {
			var _source;
            if (MiniAdpter.idx==1)
            {
                if (MiniAdpter.isZiYu)
                {
					_source=/*__JS__ */sharedCanvas;
					_source.style={};
                }
                else 
                {
					_source=/*__JS__ */window.canvas;
				}
            }
            else 
            {
				_source=/*__JS__ */window.wx.createCanvas();
            }
            
			MiniAdpter.idx++;
			return _source;
        }
        else if (type=="textarea" || type=="input")
        {
			return MiniAdpter.onCreateInput(type);
        }
        else if (type=="div")
        {
			var node=MiniAdpter._preCreateElement(type);
			node.contains=function (value){
				return null
			};
			node.removeChild=function (value){
			};
			return node;
        }
        else 
        {
			return MiniAdpter._preCreateElement(type);
		}

    }

    /** 创建网页输入元件 */
    static onCreateInput(type: string)
    {
        var node=MiniAdpter._preCreateElement(type);
		node.focus= MiniInput.wxinputFocus;
		node.blur= MiniInput.wxinputblur;
		node.style={};
		node.value=0;
		node.parentElement={};
		node.placeholder={};
        node.type={};
        
        node.setColor=function (value)
        {
        };
        
        node.setType=function (value)
        {
        };
        
        node.setFontFace=function (value)
        {
        };
        
        node.addEventListener=function (value)
        {
        };
        
		node.contains=function (value){
			return null
		};
		node.removeChild=function (value){
		};
		return node;
    }


    
    /**
     * 获取url对应的encoding值
     * @param url 文件路径
     * @param type 文件类型
     * @return
     */
    static getUrlEncode(url: string, type: string): string
    {
        if (type=="arraybuffer")
            return "";
        return "utf8";
    }

    /**
     * 下载文件
     * @param fileUrl 文件地址(全路径)
     * @param fileType 文件类型(image、text、json、xml、arraybuffer、sound、atlas、font)
     * @param callBack 文件加载回调,回调内容[errorCode码(0成功,1失败,2加载进度)
     * @param encoding 文件编码默认utf8，非图片文件加载需要设置相应的编码，二进制编码为空字符串
     */
    static downLoadFile(fileUrl: string, fileType?: string, callBack?: Handler, encoding?: string): void
    {
        (fileType===void 0)&& (fileType="");
        (encoding===void 0)&& (encoding="utf8");
        
        var fileObj=MiniFileMgr.getFileInfo(fileUrl);
        
		if (!fileObj)
			MiniFileMgr.downLoadFile(fileUrl,fileType,callBack,encoding);
        else 
        {
			callBack !=null && callBack.runWith([0]);
		}
    }

    /**
     * 从本地删除文件
     * @param fileUrl 文件地址(全路径)
     * @param callBack 回调处理，在存储图片时用到
     */
    static remove(fileUrl: string, callBack?: Handler): void
    {
		MiniFileMgr.deleteFile("",fileUrl,callBack,"",0);
    }

    /**
     * 清空缓存空间文件内容
     */
    static removeAll(): void
    {
		MiniFileMgr.deleteAll();
    }

    /**
     * 判断是否是4M包文件
     * @param fileUrl 文件地址(全路径)
     * @return
     */
    static hasNativeFile(fileUrl: string): boolean
    {
		return MiniFileMgr.isLocalNativeFile(fileUrl);
    }

    /**
     * 判断缓存里是否存在文件
     * @param fileUrl 文件地址(全路径)
     * @return
     */
    static getFileInfo(fileUrl: string): _filesItemObj
    {
		return MiniFileMgr.getFileInfo(fileUrl);
    }

    /**
     * 获取缓存文件列表
     * @return
     */
    static getFileList(): _filesListObj
    {
		return MiniFileMgr.filesListObj;
    }

    /** 退出小程序 */
    static exitMiniProgram(): void
    {
		MiniAdpter.window.wx.exitMiniProgram();
    }

    
    /** 接受其他域的消息 */
    protected static _onMessage(data: any): void
    {
        switch (data.type)
        {
            // 改变窗口大小
			case "changeMatrix":
				Laya.stage.transform.identity();
				Laya.stage._width=data.w;
				Laya.stage._height=data.h;
				Laya.stage._canvasTransform=new Matrix(data.a,data.b,data.c,data.d,data.tx,data.ty);
                break ;
            // 显示
			case "display":
				Laya.stage.frameRate=data.rate || Laya.Stage.FRAME_FAST;
                break ;
            // 隐藏
			case "undisplay":
				Laya.stage.frameRate= Laya.Stage.FRAME_SLEEP;
				break ;
        }

        // 子域图集
        if (data['isLoad']=="opendatacontext")
        {
            if (data.url)
            {
				MiniFileMgr.ziyuFileData[data.url]=data.atlasdata;
				MiniFileMgr.ziyuFileTextureData[data.imgReadyUrl]=data.imgNativeUrl;
            }
            
        }
        // json数据
        else if (data['isLoad']=="openJsondatacontext")
        {
            if (data.url)
            {
				MiniFileMgr.ziyuFileData[data.url]=data.atlasdata;
            }
            
        }
        // 单张图片
        else if (data['isLoad']=="openJsondatacontextPic")
        {
			MiniFileMgr.ziyuFileTextureData[data.imgReadyUrl]=data.imgNativeUrl;
		}

    }


    /**
     * 传递图集url地址到 开放数据域
     * @param url 为绝对地址
     */
    static sendAtlasToOpenDataContext(url: string): void
    {
        if (!laya.wx.mini.MiniAdpter.isZiYu)
        {
            var atlasJson=Loader.getRes(Laya.URL.formatURL(url));
            
            if (atlasJson)
            {
                var textureArr=(atlasJson.meta.image).split(",");
                
                if (atlasJson.meta && atlasJson.meta.image)
                {
					var toloadPics=atlasJson.meta.image.split(",");
					var split=url.indexOf("/")>=0 ? "/" :"\\";
					var idx=url.lastIndexOf(split);
					var folderPath=idx >=0 ? url.substr(0,idx+1):"";
                    for (var i=0,len=toloadPics.length;i < len;i++)
                    {
						toloadPics[i]=folderPath + toloadPics[i];
					}
                }
                else 
                {
					toloadPics=[url.replace(".json",".png")];
                }
                
                for (i=0;i < toloadPics.length;i++)
                {
					var tempAtlasPngUrl=toloadPics[i];
					MiniAdpter.postInfoToContext(url,tempAtlasPngUrl,atlasJson);
				}
            }
            else 
            {
				throw "传递的url没有获取到对应的图集数据信息，请确保图集已经过！";
			}
		}

    }

    /**
     * 传递图集url地址到 开放数据域
     */
    static postInfoToContext(url: string, atlaspngUrl: any, atlasJson:any)
    {
        var postData=
        {
            "frames":atlasJson.frames,
            "meta":atlasJson.meta
        };

		var textureUrl = atlaspngUrl;
        var fileObj = MiniFileMgr.getFileInfo(URL.formatURL(atlaspngUrl));
        
        if (fileObj)
        {
			var fileMd5Name = fileObj.md5;
			var fileNativeUrl = MiniFileMgr.getFileNativePath(fileMd5Name);
        }
        else 
        {
			fileNativeUrl=textureUrl;
        }
        
        if (fileNativeUrl)
        {
			wx.postMessage(
                {
                    url:url,
                    atlasdata:postData,
                    imgNativeUrl:fileNativeUrl,
                    imgReadyUrl:textureUrl,
                    isLoad:"opendatacontext"
                });
        }
        else 
        {
			throw "获取图集的磁盘url路径不存在！";
		}
	}

    /**
     * 发送单张图片到开放数据域
     * @param url
     */
    static sendSinglePicToOpenDataContext(url: string): void
    {
        var tempTextureUrl=URL.formatURL(url);
        var fileObj=MiniFileMgr.getFileInfo(tempTextureUrl);
        
        if (fileObj)
        {
			var fileMd5Name=fileObj.md5;
			var fileNativeUrl=MiniFileMgr.getFileNativePath(fileMd5Name);
			url = tempTextureUrl;
        }
        else 
        {
			fileNativeUrl = url;
        }
        
        if (fileNativeUrl)
        {
			wx.postMessage(
                {
                    url:url,
                    imgNativeUrl:fileNativeUrl,
                    imgReadyUrl:url,
                    isLoad:"openJsondatacontextPic"
                });
        }
        else 
        {
			throw "获取图集的磁盘url路径不存在！";
		}

    }

    /**
     * 传递json配置数据到开放数据域
     * @param url 为绝对地址
     */
    static sendJsonDataToDataContext(url: string): void
    {
        if (!laya.wx.mini.MiniAdpter.isZiYu)
        {
			var atlasJson=Loader.getRes(url);
            if (atlasJson)
            {
				wx.postMessage(
                    {
                        url:url,
                        atlasdata:atlasJson,
                        isLoad:"openJsondatacontext"
                    });
            }
            else 
            {
				throw "传递的url没有获取到对应的图集数据信息，请确保图集已经过！";
			}
		}

    }


    
    private static _nativefiles;
    
    /**本地资源列表**/
    static get nativefiles()
    {
        if(!this._nativefiles)
        {
            this._nativefiles = ["layaNativeDir", "wxlocal"];
        }
        return this._nativefiles;
    }
}
