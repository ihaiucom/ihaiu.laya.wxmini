export default class MiniImage
{
    _loadImage(url: string)
    {
        var thisLoader=this;
		if (MiniAdpter.isZiYu){
			MiniImage.onCreateImage(url,thisLoader,true);
			return;
        };
        
		var isTransformUrl=false;
		if (!MiniFileMgr.isLocalNativeFile(url)){
			isTransformUrl=true;
			url=URL.formatURL(url);
			}else{
			if (url.indexOf("http://")!=-1 || url.indexOf("https://")!=-1){
				if(MiniFileMgr.loadPath !=""){
					url=url.split(MiniFileMgr.loadPath)[1];
					}else{
					var tempStr=URL.rootPath !="" ? URL.rootPath :URL.basePath;
					var tempUrl=url;
					if(tempStr !="")
						url=url.split(tempStr)[1];
					if(!url){
						url=tempUrl;
					}
				}
			}
			if (MiniAdpter.subNativeFiles && MiniAdpter.subNativeheads.length==0){
				for (var key in MiniAdpter.subNativeFiles){
					var tempArr=MiniAdpter.subNativeFiles[key];
					MiniAdpter.subNativeheads=MiniAdpter.subNativeheads.concat(tempArr);
					for (var aa=0;aa < tempArr.length;aa++){
						MiniAdpter.subMaps[tempArr[aa]]=key+"/"+tempArr[aa];
					}
				}
			}
			if(MiniAdpter.subNativeFiles && url.indexOf("/")!=-1){
				var curfileHead=url.split("/")[0]+"/";
				if(curfileHead && MiniAdpter.subNativeheads.indexOf(curfileHead)!=-1){
					var newfileHead=MiniAdpter.subMaps[curfileHead];
					url=url.replace(curfileHead,newfileHead);
				}
			}
		}
		if (!MiniFileMgr.getFileInfo(url)){
			if (url.indexOf("http://")!=-1 || url.indexOf("https://")!=-1){
				if(MiniAdpter.isZiYu){
					MiniImage.onCreateImage(url,thisLoader,true);
					}else{
					MiniFileMgr.downOtherFiles(url,new Handler(MiniImage,MiniImage.onDownImgCallBack,[url,thisLoader]),url);
				}
			}
			else
			MiniImage.onCreateImage(url,thisLoader,true);
			}else {
			MiniImage.onCreateImage(url,thisLoader,!isTransformUrl);
		}

    }
}