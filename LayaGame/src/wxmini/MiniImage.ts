import MiniAdpter from "./MiniAdpter";
import MiniFileMgr from "./MiniFileMgr";

import Loader = Laya.Loader;
import URL = Laya.URL;
import Handler = Laya.Handler;
import Browser = Laya.Browser;
import HTMLImage = Laya.HTMLImage;


export default class MiniImage
{
	// <fileNativeUrl, Browser.window.Image>
	_imgCache = {}

	/** 加载图片 */
    _loadImage(url: string)
    {
        var thisLoader:MiniImage & Loader = <any> this;
		if (MiniAdpter.isZiYu)
		{
			MiniImage.onCreateImage(url, thisLoader, true);
			return;
        };
		
		// url是否转换了
		var isTransformUrl=false;

		//// url

		// 非 4MB 初始包资源
		if (!MiniFileMgr.isLocalNativeFile(url))
		{
			isTransformUrl=true;
			url=URL.formatURL(url);
		}
		// 4MB 初始包资源
		else
		{
			if (url.indexOf("http://")!=-1 || url.indexOf("https://")!=-1)
			{
				if(MiniFileMgr.loadPath !="")
				{
					url=url.split(MiniFileMgr.loadPath)[1];
				}
				else
				{
					var tempStr=URL.rootPath !="" ? URL.rootPath :URL.basePath;
					var tempUrl=url;
					if(tempStr !="")
						url=url.split(tempStr)[1];

					if(!url)
					{
						url=tempUrl;
					}
				}
			}

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
		}

		// 还没有缓存
		if (!MiniFileMgr.getFileInfo(url))
		{
			if (url.indexOf("http://")!=-1 || url.indexOf("https://")!=-1)
			{
				if(MiniAdpter.isZiYu)
				{
					MiniImage.onCreateImage(url,thisLoader,true);
				}
				else
				{
					MiniFileMgr.downOtherFiles(url,new Handler(MiniImage, MiniImage.onDownImgCallBack, [url,thisLoader]), url);
				}
			}
			else
				MiniImage.onCreateImage(url,thisLoader,true);

		}
		// 已经缓存
		else 
		{
			MiniImage.onCreateImage(url, thisLoader, !isTransformUrl);
		}

	}

	/** 资源下载完成回调 */
	static onDownImgCallBack(sourceUrl: string, thisLoader: MiniImage & Loader, errorCode: number, tempFilePath: string)
	{
		(tempFilePath===void 0)&& (tempFilePath="");

		if (!errorCode)
			MiniImage.onCreateImage(sourceUrl, thisLoader, false, tempFilePath);
		else 
		{
			thisLoader.onError(null);
		}

	}
	

	static onCreateImage(sourceUrl: string, thisLoader: MiniImage & Loader, isLocal: boolean, tempFilePath?: string)
	{
		(isLocal===void 0)&& (isLocal=false);
		(tempFilePath===void 0)&& (tempFilePath="");

		/// 资源路径
		var fileNativeUrl;
		
		// 开启自动缓存
		if(MiniAdpter.autoCacheFile)
		{
			// 非本地资源
			if (!isLocal)
			{
				if(tempFilePath !="")
				{
					fileNativeUrl=tempFilePath;
				}
				else
				{
					var fileObj = MiniFileMgr.getFileInfo(sourceUrl);
					var fileMd5Name = fileObj.md5;
					fileNativeUrl = MiniFileMgr.getFileNativePath(fileMd5Name);
				}
			}
			// 本地资源
			else
			{
				// 如果当前是开放域
				if(MiniAdpter.isZiYu)
				{
					var tempUrl=URL.formatURL(sourceUrl);
					if(MiniFileMgr.ziyuFileTextureData[tempUrl])
					{
						fileNativeUrl=MiniFileMgr.ziyuFileTextureData[tempUrl];
					}
					else
						fileNativeUrl=sourceUrl;
				}
				else
					fileNativeUrl=sourceUrl;

			}

		}
		// 未开启自动缓存
		else
		{
			if(!isLocal)
				fileNativeUrl=tempFilePath;
			else
				fileNativeUrl=sourceUrl;
		}

		if (thisLoader._imgCache==null)
			thisLoader._imgCache={};

		var image;
		// 清除当前的 Image缓存
		function clear ()
		{
			var img=thisLoader._imgCache[fileNativeUrl];
			if (img){
				img.onload=null;
				img.onerror=null;
				delete thisLoader._imgCache[fileNativeUrl];
			}
		};

		// 图片加载出错
		var onerror=function ()
		{
			clear();
			thisLoader.event(/*laya.events.Event.ERROR*/"error","Load image failed");
		}

		if (thisLoader._type=="nativeimage")
		{
			var onload=function ()
			{
				clear();
				thisLoader._url=URL.formatURL(thisLoader._url);
				thisLoader.onLoaded(image);
			};

			image=new Browser.window.Image();
			image.crossOrigin="";
			image.onload=onload;
			image.onerror=onerror;
			image.src=fileNativeUrl;
			thisLoader._imgCache[fileNativeUrl]=image;
		}
		else 
		{
			var imageSource=new Browser.window.Image();
			onload=function ()
			{
				thisLoader._url=URL.formatURL(thisLoader._url);
				image = HTMLImage.create(imageSource.width,imageSource.height);
				image.loadImageSource(imageSource,true);
				image._setCreateURL(fileNativeUrl);
				clear();
				thisLoader.onLoaded(image);
			};

			imageSource.crossOrigin="";
			imageSource.onload=onload;
			imageSource.onerror=onerror;
			imageSource.src=fileNativeUrl;
			thisLoader._imgCache[fileNativeUrl]=imageSource;
		}

	}
}