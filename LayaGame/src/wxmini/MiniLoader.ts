import URL = Laya.URL;
import Loader = Laya.Loader;
import Utils = Laya.Utils;
import Handler = Laya.Handler;

import MiniAdpter from "./MiniAdpter";
import MiniFileMgr from "./MiniFileMgr";

export default class MiniLoader extends laya.events.EventDispatcher
{
    // _url: string;
    // _type: string;
    // _cache: boolean;
    // _data;
    // _customParse: boolean;

    static _fileTypeArr = ['png','jpg','bmp','jpeg','gif'];

    /**
	*@private
	*@param url
	*@param type
	*@param cache
	*@param group
	*@param ignoreCache
	*/
    load(url: string, type: string, cache: boolean, group, ignoreCache: boolean)
    {
        (cache===void 0)&& (cache=true);
        (ignoreCache===void 0)&& (ignoreCache=false);
        
		var thisLoader: MiniLoader & Loader = <any>this;
		thisLoader._url=url;
        url=URL.customFormat(url);
        
        if (url.indexOf("data:image")===0)
            thisLoader._type=type= Loader.IMAGE;
        else 
        {
			thisLoader._type = type || (type=Loader.getTypeFromUrl(thisLoader._url));
        }
        
		thisLoader._cache=cache;
        thisLoader._data=null;
        
        // 忽略缓存，并且已经加载了资源，就调完成
        if (!ignoreCache && Loader.loadedMap[URL.formatURL(url)])
        {
            thisLoader._data = Loader.loadedMap[URL.formatURL(url)];
            this.event(Laya.Event.PROGRESS, 1);
            this.event(Laya.Event.COMPLETE, thisLoader._data);
			return;
        }
        
        // 调 资源解析函数
        if (Loader.parserMap[type] !=null)
        {
			thisLoader._customParse=true;
            if (((Loader.parserMap[type]) instanceof laya.utils.Handler ))
                Loader.parserMap[type].runWith(this);
            else 
                Loader.parserMap[type].call(null,this);
			return;
        }
        
		var encoding = MiniAdpter.getUrlEncode(url,type);
        var urlType = Utils.getFileExtension(url);
        
        if ((MiniLoader._fileTypeArr.indexOf(urlType)!=-1))
        {
			MiniAdpter.EnvConfig.load.call(this, url, type, cache, group, ignoreCache);
        }
        else 
        {
            if(MiniAdpter.isZiYu && !MiniFileMgr.ziyuFileData[url])
            {
				url=URL.formatURL(url);
            }
            
            if(MiniAdpter.isZiYu && MiniFileMgr.ziyuFileData[url])
            {
				var tempData=MiniFileMgr.ziyuFileData[url];
				thisLoader.onLoaded(tempData);
				return;
            }
            
            if (!MiniFileMgr.getFileInfo(url))
            {

                // 读取4M 内的资源
                if (MiniFileMgr.isLocalNativeFile(url))
                {
                    if (MiniAdpter.subNativeFiles && MiniAdpter.subNativeheads.length==0)
                    {
                        for (var key in MiniAdpter.subNativeFiles)
                        {
							var tempArr=MiniAdpter.subNativeFiles[key];
							MiniAdpter.subNativeheads=MiniAdpter.subNativeheads.concat(tempArr);
                            for (var aa=0;aa < tempArr.length;aa++)
                            {
								MiniAdpter.subMaps[tempArr[aa]]=key+"/"+tempArr[aa];
							}
						}
                    }
                    
                    if(MiniAdpter.subNativeFiles && url.indexOf("/")!=-1)
                    {
						var curfileHead=url.split("/")[0]+"/";
                        if(curfileHead && MiniAdpter.subNativeheads.indexOf(curfileHead)!=-1)
                        {
							var newfileHead=MiniAdpter.subMaps[curfileHead];
							url=url.replace(curfileHead,newfileHead);
						}
                    }
                    
					var tempStr=URL.rootPath !="" ? URL.rootPath :URL.basePath;
					var tempUrl=url;
					if (tempStr !="")
                        url=url.split(tempStr)[1];
                        
                    if (!url)
                    {
						url=tempUrl;
                    }
                    
					MiniFileMgr.read(url, encoding, new Handler(MiniLoader, MiniLoader.onReadNativeCallBack,[encoding,url,type,cache,group,ignoreCache,thisLoader]));
					return;
                }
                
                // 读取网络的资源
				url=URL.formatURL(url);
                if (url.indexOf("http://")!=-1 || url.indexOf("https://")!=-1 && !MiniAdpter.AutoCacheDownFile)
                {
					MiniAdpter.EnvConfig.load.call(thisLoader,url,type,cache,group,ignoreCache);
                }
                // 读取网络资源 或者 缓存资源
                else 
                {
					MiniFileMgr.readFile(url,encoding,new Handler(MiniLoader,MiniLoader.onReadNativeCallBack,[encoding,url,type,cache,group,ignoreCache,thisLoader]),url);
				}
            }
            else 
            {
				var fileObj=MiniFileMgr.getFileInfo(url);
				fileObj.encoding=fileObj.encoding==null ? "utf8" :fileObj.encoding;
				MiniFileMgr.readFile(url,fileObj.encoding,new Handler(MiniLoader,MiniLoader.onReadNativeCallBack,[encoding,url,type,cache,group,ignoreCache,thisLoader]),url);
			}
		}

    }


    private static onReadNativeCallBack(encoding: string, url: string, type: string, cache: boolean, group, ignoreCache: boolean, thisLoader:MiniLoader & Loader, errorCode: number, data: any)
    {
        (cache===void 0)&& (cache=true);
		(ignoreCache===void 0)&& (ignoreCache=false);
        (errorCode===void 0)&& (errorCode=0);
        
        if (!errorCode)
        {
			var tempData;
            if (type==Loader.JSON || 
                type==Loader.ATLAS || 
                type==Loader.PREFAB)
            {
				tempData=MiniAdpter.getJson(data.data);
            }
            else if (type==Loader.XML)
            {
				tempData=Utils.parseXMLFromString(data.data);
            }
            else 
            {
				tempData=data.data;
            }
            
            if(!MiniAdpter.isZiYu && MiniAdpter.isPosMsgYu && type != Loader.BUFFER)
            {
				wx.postMessage({url:url,data:tempData, isLoad:"filedata"});
			}
			thisLoader.onLoaded(tempData);
        }
        else if (errorCode==1)
        {
			MiniAdpter.EnvConfig.load.call(thisLoader,url,type,cache,group,ignoreCache);
		}

    }




}