import MiniFileMgr from "./MiniFileMgr";
import MiniAdpter from "./MiniAdpter";
import URL = Laya.URL;
import Handler = Laya.Handler;
import SoundManager = Laya.SoundManager;
import MiniSoundChannel from "./MiniSoundChannel";


export default class MiniSound extends Laya.EventDispatcher
{
    private _sound: InnerAudioContext;
    /**
     * @private
     * 声音URL
     */
    url: string;
    /**
     * @private
     * 是否已加载完成
     */
    loaded: boolean;
    readyUrl: string;


    // <url, MiniSound>
    static _audioCache = {};
    static _id = 0;
    static _musicAudio : InnerAudioContext= null;


    constructor()
    {
        super();
    }

    /**
     * @private
     * 加载声音。
     * @param url 地址。
     *
     */
    load(url: string): void
    {
        if (!MiniFileMgr.isLocalNativeFile(url))
        {
			url=URL.formatURL(url);
        }
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
					var tempStr=URL.rootPath !="" ? URL.rootPath : URL.basePath;
					if(tempStr !="")
						url=url.split(tempStr)[1];
				}
			}
        }
        
		this.url=url;
        this.readyUrl=url;
        
        if (MiniSound._audioCache[this.readyUrl])
        {
			this.event(Laya.Event.COMPLETE);
			return;
        }
        
        if(MiniAdpter.autoCacheFile && MiniFileMgr.getFileInfo(url))
        {
			this.onDownLoadCallBack(url,0);
        }
        else
        {
            if(!MiniAdpter.autoCacheFile)
            {
				this.onDownLoadCallBack(url,0);
            }
            else
            {
                if (MiniFileMgr.isLocalNativeFile(url))
                {
					tempStr=URL.rootPath !="" ? URL.rootPath :URL.basePath;
					var tempUrl=url;
					if(tempStr !="")
                        url=url.split(tempStr)[1];
                        
                    if (!url)
                    {
						url=tempUrl;
                    }
                    
                    if (MiniAdpter.subNativeFiles && MiniAdpter.subNativeheads.length == 0)
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
						if(curfileHead && MiniAdpter.subNativeheads.indexOf(curfileHead)!=-1){
							var newfileHead=MiniAdpter.subMaps[curfileHead];
							url=url.replace(curfileHead,newfileHead);
						}
                    }
                    
					this.onDownLoadCallBack(url,0);
                }
                else
                {
					MiniFileMgr.downOtherFiles(url, Handler.create(this,this.onDownLoadCallBack,[url]), url);
				}
			}
		}

    }

    /** 加载回调 */
    private onDownLoadCallBack(sourceUrl: string,errorCode: number)
    {
        if (!errorCode)
        {
			var fileNativeUrl;
            if(MiniAdpter.autoCacheFile)
            {
                if (MiniFileMgr.isLocalNativeFile(sourceUrl))
                {
					var tempStr=URL.rootPath !="" ? URL.rootPath :URL.basePath;
					var tempUrl=sourceUrl;
					if(tempStr !="" && (sourceUrl.indexOf("http://")!=-1 || sourceUrl.indexOf("https://")!=-1))
						fileNativeUrl=sourceUrl.split(tempStr)[1];
                    if(!fileNativeUrl)
                    {
						fileNativeUrl=tempUrl;
					}
                }
                else
                {
					var fileObj=MiniFileMgr.getFileInfo(sourceUrl);
                    if(fileObj && fileObj.md5)
                    {
						var fileMd5Name=fileObj.md5;
						fileNativeUrl=MiniFileMgr.getFileNativePath(fileMd5Name);
                    }
                    else
                    {
						fileNativeUrl=sourceUrl;
					}
				}
				this._sound=MiniSound._createSound();
				this._sound.src=this.url=fileNativeUrl;
            }
            else
            {
				this._sound=MiniSound._createSound();
				this._sound.src=sourceUrl;
            }
            
			this._sound.onCanplay(MiniSound.bindToThis(this.onCanPlay,this));
			this._sound.onError(MiniSound.bindToThis(this.onError,this));
        }
        else
        {
			this.event(Laya.Event.ERROR);
		}

    }

    /** 声音资源出错 */
    private onError(error: string)
    {
        try{
			console.log("-----1---------------minisound-----id:"+MiniSound._id);
			console.log(error);
		}
		catch(error){
			console.log("-----2---------------minisound-----id:"+MiniSound._id);
			console.log(error);
		}
        this.event(Laya.Event.ERROR);
		this._sound.offError(null);

    }

    /** 声音资源准备就绪 可以播放了 */
    private onCanPlay()
    {
		this.loaded=true;
        this.event(Laya.Event.COMPLETE);
		this._sound.offCanplay(null);
    }

    
    /**
     * @private
     * 播放声音。
     * @param startTime 开始时间,单位秒
     * @param loops 循环次数,0表示一直循环
     * @return 声道 SoundChannel 对象。
     *
     */
    play(startTime?: number, loops?: number): MiniSoundChannel
    {
        (startTime===void 0)&& (startTime=0);
		(loops===void 0)&& (loops=0);
        var tSound: InnerAudioContext;
        
        if (this.url==SoundManager._bgMusic)
        {
            if (!MiniSound._musicAudio)
                MiniSound._musicAudio=MiniSound._createSound();

			tSound=MiniSound._musicAudio;
        }
        else 
        {
            if(MiniSound._audioCache[this.readyUrl])
            {
				tSound=MiniSound._audioCache[this.readyUrl]._sound;
            }
            else
            {
				tSound=MiniSound._createSound();
			}
        }
        
		if(!tSound)
            return null;
            
        if(MiniAdpter.autoCacheFile && MiniFileMgr.getFileInfo(this.url))
        {
			var fileNativeUrl;
			var fileObj=MiniFileMgr.getFileInfo(this.url);
			var fileMd5Name=fileObj.md5;
			tSound.src=this.url=MiniFileMgr.getFileNativePath(fileMd5Name);
        }
        else
        {
			tSound.src=this.url;
        };
        
		var channel=new MiniSoundChannel(tSound,this);
		channel.url=this.url;
		channel.loops=loops;
		channel.loop=(loops===0 ? true :false);
		channel.startTime=startTime;
		channel.play();
		SoundManager.addChannel(channel);
		return channel;

    }

    /**
     * @private
     * 释放声音资源。
     *
     */
    dispose(): void
    {
        var ad = MiniSound._audioCache[this.readyUrl];

        if (ad)
        {
			ad.src="";
            if(ad._sound)
            {
				ad._sound.destroy();
				ad._sound=null;
				ad=null;
            }
            
			delete MiniSound._audioCache[this.readyUrl];
		}

    }

    
    
    /**
     * @private
     * 获取总时间。
     */
    get duration(): number
    {
        return this._sound.duration;
    }

    /** 创建音频 */
    private static _createSound(): InnerAudioContext
    {
		MiniSound._id++;
		return MiniAdpter.window.wx.createInnerAudioContext();
    }



    /**
     * @private
     * 给传入的函数绑定作用域，返回绑定后的函数。
     * @param	fun 函数对象。
     * @param	scope 函数作用域。
     * @return 绑定后的函数。
     */
    static bindToThis(fun: Function, scope: any): Function
    {
        var rst=fun;
		rst=fun.bind(scope);;
		return rst;
    }

}