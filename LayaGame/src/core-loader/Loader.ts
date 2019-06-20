import EventDispatcher = Laya.EventDispatcher;
import HttpRequest = Laya.HttpRequest;
import WorkerLoader = Laya.WorkerLoader;
import Utils = Laya.Utils;
import Handler = Laya.Handler;
import TTFLoader = Laya.TTFLoader;
import Browser = Laya.Browser;
import HTMLImage = Laya.HTMLImage;
import SoundManager = Laya.SoundManager;
import Prefab = Laya.Prefab;
import Texture = Laya.Texture;
import BitmapFont = Laya.BitmapFont;
import Text = Laya.Text;



import URL from "./URL";

export default class Loader extends EventDispatcher
{
    /**文本类型，加载完成后返回文本。*/
    static TEXT: string = "text";
    /**JSON 类型，加载完成后返回json数据。*/
    static JSON: string = "json";
    /**prefab 类型，加载完成后返回Prefab实例。*/
    static PREFAB: string = "prefab";
    /**XML 类型，加载完成后返回domXML。*/
    static XML: string="xml";
    /**二进制类型，加载完成后返回arraybuffer二进制数据。*/
    static BUFFER: string="arraybuffer";
    /**纹理类型，加载完成后返回Texture。*/
    static IMAGE: string="image";
    /**声音类型，加载完成后返回sound。*/
    static SOUND: string="sound";
    /**图集类型，加载完成后返回图集json信息(并创建图集内小图Texture)。*/
    static ATLAS: string="atlas"
    /**位图字体类型，加载完成后返回BitmapFont，加载后，会根据文件名自动注册为位图字体。*/
    static FONT: string="font";
    /** TTF字体类型，加载完成后返回null。*/
    static TTF: string="ttf";
    /** 预加载文件类型，加载完成后自动解析到preLoadedMap。*/
    static PLF: string="plf";
    /**Hierarchy资源。*/
    static HIERARCHY: string="HIERARCHY";
    /**Mesh资源。*/
    static MESH: string="MESH";
    /**Material资源。*/
    static MATERIAL: string="MATERIAL";
    /**Texture2D资源。*/
    static TEXTURE2D: string="TEXTURE2D";
    /**TextureCube资源。*/
    static TEXTURECUBE: string="TEXTURECUBE";
    /**AnimationClip资源。*/
    static ANIMATIONCLIP: string="ANIMATIONCLIP";
    /**Avatar资源。*/
    static AVATAR: string="AVATAR";
    /**Terrain资源。*/
    static TERRAINHEIGHTDATA: string="TERRAINHEIGHTDATA";
    /**Terrain资源。*/
    static TERRAINRES: string="TERRAIN";
    /**文件后缀和类型对应表。*/
    static typeMap: any={"ttf":"ttf","png":"image","jpg":"image","jpeg":"image","txt":"text","json":"json","prefab":"prefab","xml":"xml","als":"atlas","atlas":"atlas","mp3":"sound","ogg":"sound","wav":"sound","part":"json","fnt":"font","pkm":"pkm","plf":"plf","scene":"json","ani":"json","sk":"arraybuffer"};

    /**资源解析函数对应表，用来扩展更多类型的资源加载解析。*/
    static parserMap: any={};
    /**每帧加载完成回调使用的最大超时时间，如果超时，则下帧再处理，防止帧卡顿。*/
    static maxTimeOut: number=100;
    /**资源分组对应表。*/
    static groupMap: any={};
    /**已加载的资源池。*/
    static loadedMap: any={};
    static preLoadedMap: any={};
    static atlasMap: any={};
    static _imgCache:any={};
    protected static _loaders:any=[];
    protected static _isWorking:boolean=false;
    protected static _startIndex=0;

    

    _data: any;
    /**
     * 资源地址。
     */
    _url: string;
    /**
     * 资源类型。可选值为：Loader.TEXT、Loader.JSON、Loader.XML、Loader.BUFFER、Loader.IMAGE、Loader.SOUND、Loader.ATLAS、Loader.FONT。如果为null，则根据文件后缀分析类型。
     */
    _type: string;
    /**
     * 是否缓存数据
     */
   _cache: boolean;
   protected _http: HttpRequest;
   protected _useWorkerLoader: boolean = false;
   _customParse: boolean = false;
   _constructParams: Array<any>;
   _propertyParams: any;
   _createCache: boolean;


   /**
     * 加载资源。加载错误会派发 Event.ERROR 事件，参数为错误信息。
     * @param	url			资源地址。
     * @param	type		(default = null)资源类型。可选值为：Loader.TEXT、Loader.JSON、Loader.XML、Loader.BUFFER、Loader.IMAGE、Loader.SOUND、Loader.ATLAS、Loader.FONT。如果为null，则根据文件后缀分析类型。
     * @param	cache		(default = true)是否缓存数据。
     * @param	group		(default = null)分组名称。
     * @param	ignoreCache (default = false)是否忽略缓存，强制重新加载。
     * @param	useWorkerLoader(default = false)是否使用worker加载（只针对IMAGE类型和ATLAS类型，并且浏览器支持的情况下生效）
     */
    load(url: string, type?: string, cache?: boolean, group?: string, ignoreCache?: boolean, useWorkerLoader?: boolean): void
    {
        (cache===void 0)&& (cache=true);
		(ignoreCache===void 0)&& (ignoreCache=false);
        (useWorkerLoader===void 0)&& (useWorkerLoader=false);
        
        if (!url)
        {
			this.onLoaded(null);
			return;
        }
        
        Loader.setGroup(url,"666");
        
		this._url=url;
        if (url.indexOf("data:image")===0)
            type="image";
        else 
            url=URL.formatURL(url);
        
		this._type=type || (type=Loader.getTypeFromUrl(this._url));
		this._cache=cache;
		this._useWorkerLoader=useWorkerLoader;
		this._data=null;
        if (useWorkerLoader)
            WorkerLoader.enableWorkerLoader();

        // 如果缓存了 直接返回缓存的
        if (!ignoreCache && Loader.loadedMap[url])
        {
			this._data=Loader.loadedMap[url];
			this.event(/*laya.events.Event.PROGRESS*/"progress",1);
			this.event(/*laya.events.Event.COMPLETE*/"complete",this._data);
			return;
        }
        
        if (group)Loader.setGroup(url,group);
        
        if (Loader.parserMap[type] !=null)
        {
			this._customParse=true;
            if (((Loader.parserMap[type])instanceof laya.utils.Handler ))
                Loader.parserMap[type].runWith(this);

            else 
                Loader.parserMap[type].call(null,this);
			return;
        }
        
        // 走 加载图片
        if (type==="image" || type==="htmlimage" || type==="nativeimage")
            return this._loadImage(url);

        // 走 加载声音
        if (type==="sound")
            return this._loadSound(url);

        // 走 加载字体
        if (type==="ttf")
            return this._loadTTF(url);

		var contentType;
        switch (type)
        {
			case "atlas":
			case "prefab":
			case "plf":
				contentType="json";
				break ;
			case "font":
				contentType="xml";
				break ;
			default :
				contentType=type;
        }

        if (Loader.preLoadedMap[url])
        {
			this.onLoaded(Loader.preLoadedMap[url]);
        }
        else 
        {
            if (!this._http)
            {
				this._http=new HttpRequest();
				this._http.on(/*laya.events.Event.PROGRESS*/"progress",this,this.onProgress);
				this._http.on(/*laya.events.Event.ERROR*/"error",this,this.onError);
				this._http.on(/*laya.events.Event.COMPLETE*/"complete",this,this.onLoaded);
			}
			this._http.send(url,null,"get",contentType);
		}

    }

    /**
     * 获取指定资源地址的数据类型。
     * @param	url 资源地址。
     * @return 数据类型。
     */
    static getTypeFromUrl(url: string): string
    {
        
        var type =  Utils.getFileExtension(url);

        if (type)
            return Loader.typeMap[type];

		console.warn("Not recognize the resources suffix",url);
		return "text";

    }

    /**
	*@private
	*加载TTF资源。
	*@param url 资源地址。
	*/
    protected _loadTTF(url: string): void
    {
        
		url=URL.formatURL(url);
		var ttfLoader= new TTFLoader();
		ttfLoader.complete = Handler.create(this,this.onLoaded);
		ttfLoader.load(url);

    }
    /**
	*@private
	*加载图片资源。
	*@param url 资源地址。
	*/
    _loadImage(url: string): void
    {
        url=URL.formatURL(url);
		var _this=this;
        var image;
        
        function clear ()
        {
			var img=image;
            if (img)
            {
				img.onload=null;
				img.onerror=null;
				delete Loader._imgCache[url];
			}
        };
        
        var onerror=function ()
        {
			clear();
			_this.event(/*laya.events.Event.ERROR*/"error","Load image failed");
        }
        
        if (this._type==="nativeimage")
        {
            var onload=function ()
            {
				clear();
				_this.onLoaded(image);
            };
            
			image=new Browser.window.Image();
			image.crossOrigin="";
			image.onload=onload;
			image.onerror=onerror;
			image.src=url;
			Loader._imgCache[url]=image;
        }
        else 
        {
			var imageSource=new Browser.window.Image();
            onload=function ()
            {
				image=HTMLImage.create(imageSource.width,imageSource.height);
				image.loadImageSource(imageSource,true);
				image._setCreateURL(url);
				clear();
				_this.onLoaded(image);
            };
            
			imageSource.crossOrigin="";
			imageSource.onload=onload;
			imageSource.onerror=onerror;
			imageSource.src=url;
			image=imageSource;
			Loader._imgCache[url]=imageSource;
		}

    }

    /**
	*@private
	*加载声音资源。
	*@param url 资源地址。
	*/
    protected _loadSound(url: string): void
    {
        var sound=(new SoundManager._soundClass());

		var _this=this;
		sound.on(/*laya.events.Event.COMPLETE*/"complete",this,soundOnload);
		sound.on(/*laya.events.Event.ERROR*/"error",this,soundOnErr);
        sound.load(url);
        
        function soundOnload ()
        {
			clear();
			_this.onLoaded(sound);
        }
        
        function soundOnErr ()
        {
			clear();
			sound.dispose();
			_this.event(/*laya.events.Event.ERROR*/"error","Load sound failed");
        }
        
        function clear ()
        {
			sound.offAll();
		}

    }

    protected onProgress(value: number): void
    {
        
        if (this._type==="atlas")
            this.event(/*laya.events.Event.PROGRESS*/"progress",value *0.3);
        else
            this.event(/*laya.events.Event.PROGRESS*/"progress",value);

    }

    onError(message: string): void
    {
        this.event(/*laya.events.Event.ERROR*/"error",message);
    }

    onLoaded(data?: any): void
    {
        var type=this._type;
        if (type=="plf")
        {
			this.parsePLFData(data);
			this.complete(data);
        }
        else if (type==="image")
        {
			var tex=new Texture(data);
			tex.url=this._url;
			this.complete(tex);
        }
        else if (type==="sound" || type==="htmlimage" || type==="nativeimage")
        {
			this.complete(data);
        }
        else if (type==="atlas")
        {
            if (!data.url && !data._setContext)
            {
                if (!this._data)
                {
					this._data=data;
                    if (data.meta && data.meta.image)
                    {
						var toloadPics=data.meta.image.split(",");
						var split=this._url.indexOf("/")>=0 ? "/" :"\\";
						var idx=this._url.lastIndexOf(split);
						var folderPath=idx >=0 ? this._url.substr(0,idx+1):"";
                        for (var i=0,len=toloadPics.length;i < len;i++)
                        {
							toloadPics[i]=folderPath+toloadPics[i];
						}
                    }
                    else 
                    {
						toloadPics=[this._url.replace(".json",".png")];
					}
					toloadPics.reverse();
					data.toLoads=toloadPics;
					data.pics=[];
				}
				this.event(/*laya.events.Event.PROGRESS*/"progress",0.3+1 / toloadPics.length *0.6);
				return this._loadImage(toloadPics.pop());
            }
            else 
            {
				this._data.pics.push(data);
                if (this._data.toLoads.length > 0)
                {
					this.event(/*laya.events.Event.PROGRESS*/"progress",0.3+1 / this._data.toLoads.length *0.6);
					return this._loadImage(this._data.toLoads.pop());
                };
                
				var frames=this._data.frames;
				var cleanUrl=this._url.split("?")[0];
				var directory=(this._data.meta && this._data.meta.prefix)? this._data.meta.prefix :cleanUrl.substring(0,cleanUrl.lastIndexOf("."))+"/";
				var pics=this._data.pics;
				var atlasURL=URL.formatURL(this._url);
				var map=Loader.atlasMap[atlasURL] || (Loader.atlasMap[atlasURL]=[]);
				map.dir=directory;
				var scaleRate=1;
                if (this._data.meta && this._data.meta.scale && this._data.meta.scale !=1)
                {
					scaleRate=parseFloat(this._data.meta.scale);
                    for (var name in frames)
                    {
						var obj=frames[name];
						var tPic=pics[obj.frame.idx ? obj.frame.idx :0];
						var url=URL.formatURL(directory+name);
						tPic.scaleRate=scaleRate;
						var tTexture;
						tTexture=Texture._create(tPic,obj.frame.x,obj.frame.y,obj.frame.w,obj.frame.h,obj.spriteSourceSize.x,obj.spriteSourceSize.y,obj.sourceSize.w,obj.sourceSize.h,laya.net.Loader.getRes(url));
						Loader.cacheRes(url,tTexture);
						tTexture.url=url;
						map.push(url);
					}
                }
                else 
                {
                    for (name in frames)
                    {
						obj=frames[name];
						tPic=pics[obj.frame.idx ? obj.frame.idx :0];
						url=URL.formatURL(directory+name);
						tTexture=Texture._create(tPic,obj.frame.x,obj.frame.y,obj.frame.w,obj.frame.h,obj.spriteSourceSize.x,obj.spriteSourceSize.y,obj.sourceSize.w,obj.sourceSize.h,laya.net.Loader.getRes(url));
						Loader.cacheRes(url,tTexture);
						tTexture.url=url;
						map.push(url);
					}
				}
				delete this._data.pics;
				this.complete(this._data);
			}
        }
        else if (type==="font")
        {
			if (!data._source){
				this._data=data;
				this.event(/*laya.events.Event.PROGRESS*/"progress",0.5);
				return this._loadImage(this._url.replace(".fnt",".png"));
				}else {
				var bFont=new BitmapFont();
				bFont.parseFont(this._data,new Texture(data));
				var tArr=this._url.split(".fnt")[0].split("/");
				var fontName=tArr[tArr.length-1];
				Text.registerBitmapFont(fontName,bFont);
				this._data=bFont;
				this.complete(this._data);
			}
        }
        else if (type==="prefab")
        {
			var prefab=new Prefab();
			prefab.json=data;
			this.complete(prefab);
        }
        else 
        {
			this.complete(data);
		}

    }

    /**
	*加载完成。
	*@param data 加载的数据。
	*/
    protected complete(data: any): void
    {
        this._data=data;
        if (this._customParse)
        {
			this.event(/*laya.events.Event.LOADED*/"loaded",(data instanceof Array)? [data] :data);
        }
        else 
        {
			Loader._loaders.push(this);
			if (!Loader._isWorking)Loader.checkNext();
		}
    }
    /**
     * 结束加载，处理是否缓存及派发完成事件 <code>Event.COMPLETE</code> 。
     * @param	content 加载后的数据
     */
    endLoad(content?: any): void
    {
        content && (this._data=content);
        if (this._cache)
            Loader.cacheRes(this._url,this._data);

		this.event(/*laya.events.Event.PROGRESS*/"progress",1);
		this.event(/*laya.events.Event.COMPLETE*/"complete",(this.data instanceof Array)? [this.data] :this.data);
    }

    /**加载地址。*/
     get url(): string
     {
        return this._url;
     }
    /**加载类型。*/
    get type(): string
    {
        return this._type;
    }
    /**是否缓存。*/
    get cache(): boolean
    {
        return this._cache;
    }
    /**返回的数据。*/
    get data(): any
    {
        return this._data;
    }

    /**
     * 清理指定资源地址的缓存。
     * @param	url 资源地址。
     */
    static clearRes(url: string): void
    {
        url=URL.formatURL(url);
		var arr=Loader.getAtlas(url);
        if (arr)
        {
            for (var i=0,n=arr.length;i < n;i++)
            {
				var resUrl=arr[i];
				var tex=Loader.getRes(resUrl);
				delete Loader.loadedMap[resUrl];
				if (tex)tex.destroy();
            }
            
			arr.length=0;
			delete Loader.atlasMap[url];
			delete Loader.loadedMap[url];
        }
        else 
        {
			var res=Loader.loadedMap[url];
            if (res)
            {
				delete Loader.loadedMap[url];
                if ((res instanceof laya.resource.Texture )&& res.bitmap)
                    (res).destroy();
			}
		}
    }
    /**
     * 销毁Texture使用的图片资源，保留texture壳，如果下次渲染的时候，发现texture使用的图片资源不存在，则会自动恢复
     * 相比clearRes，clearTextureRes只是清理texture里面使用的图片资源，并不销毁texture，再次使用到的时候会自动恢复图片资源
     * 而clearRes会彻底销毁texture，导致不能再使用；clearTextureRes能确保立即销毁图片资源，并且不用担心销毁错误，clearRes则采用引用计数方式销毁
     * 【注意】如果图片本身在自动合集里面（默认图片小于512*512），内存是不能被销毁的，此图片被大图合集管理器管理
     * @param	url	图集地址或者texture地址，比如 Loader.clearTextureRes("res/atlas/comp.atlas"); Loader.clearTextureRes("hall/bg.jpg");
     */
    static clearTextureRes(url: string): void
    {
		url=URL.formatURL(url);
		var arr=laya.net.Loader.getAtlas(url);
		var res=(arr && arr.length > 0)? laya.net.Loader.getRes(arr[0]):laya.net.Loader.getRes(url);
		if ((res instanceof laya.resource.Texture ))
			res.disposeBitmap();
    }

    /**
     * 获取指定资源地址的资源。
     * @param	url 资源地址。
     * @return	返回资源。
     */
    static getRes(url: string): any
    {
		return Loader.loadedMap[URL.formatURL(url)];
    }

    /**
     * 获取指定资源地址的图集地址列表。
     * @param	url 图集地址。
     * @return	返回地址集合。
     */
    static getAtlas(url: string): Array<any>
    {
		return Loader.atlasMap[URL.formatURL(url)];
    }
    /**
     * 缓存资源。
     * @param	url 资源地址。
     * @param	data 要缓存的内容。
     */
    static cacheRes(url: string, data: any): void
    {
        url=URL.formatURL(url);
        if (Loader.loadedMap[url] !=null)
        {
			console.warn("Resources already exist,is repeated loading:",url);
        }
        else 
        {
			Loader.loadedMap[url]=data;
		}
    }

    /**
     * 设置资源分组。
     * @param url 资源地址。
     * @param group 分组名。
     */
    static setGroup(url: string, group: string): void
    {
		if (!Loader.groupMap[group])Loader.groupMap[group]=[];
		Loader.groupMap[group].push(url);
    }
    /**
     * 根据分组清理资源。
     * @param group 分组名。
     */
    static clearResByGroup(group: string): void
    {
        if (!Loader.groupMap[group])return;
		var arr=Loader.groupMap[group],i=0,len=arr.length;
		for (i=0;i < len;i++){
			Loader.clearRes(arr[i]);
		}
		arr.length=0;
    }

    
    parsePLFData(plfData)
    {
		var type;
		var filePath;
		var fileDic;
        for (type in plfData)
        {
			fileDic=plfData[type];
            switch (type)
            {
				case "json":
				case "text":
                    for (filePath in fileDic)
                    {
						Loader.preLoadedMap[URL.formatURL(filePath)]=fileDic[filePath]
					}
					break ;
				default :
                    for (filePath in fileDic)
                    {
						Loader.preLoadedMap[URL.formatURL(filePath)]=fileDic[filePath]
					}
            }
		}
    }
    
    static checkNext()
    {
        Loader._isWorking=true;
		var startTimer=Browser.now();
		var thisTimer=startTimer;
        while (Loader._startIndex < Loader._loaders.length)
        {
			thisTimer=Browser.now();
			Loader._loaders[Loader._startIndex].endLoad();
			Loader._startIndex++;
            if (Browser.now()-startTimer > Loader.maxTimeOut)
            {
				console.warn("loader callback cost a long time:"+(Browser.now()-startTimer)+" url="+Loader._loaders[Loader._startIndex-1].url);
				Laya.systemTimer.frameOnce(1,null,Loader.checkNext);
				return;
			}
		}
		Loader._loaders.length=0;
		Loader._startIndex=0;
		Loader._isWorking=false;

    }

}