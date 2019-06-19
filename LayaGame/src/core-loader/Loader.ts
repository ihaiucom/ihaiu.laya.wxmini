import EventDispatcher = Laya.EventDispatcher;
import HttpRequest = Laya.HttpRequest;
import WorkerLoader = Laya.WorkerLoader;
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
    static _imgCache:any={};
    protected static _loaders:any={};
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

		if (!ignoreCache && Loader.loadedMap[url]){
			this._data=Loader.loadedMap[url];
			this.event(/*laya.events.Event.PROGRESS*/"progress",1);
			this.event(/*laya.events.Event.COMPLETE*/"complete",this._data);
			return;
		}
		if (group)Loader.setGroup(url,group);
		if (Loader.parserMap[type] !=null){
			this._customParse=true;
			if (((Loader.parserMap[type])instanceof laya.utils.Handler ))Loader.parserMap[type].runWith(this);
			else Loader.parserMap[type].call(null,this);
			return;
		}
		if (type==="image" || type==="htmlimage" || type==="nativeimage")return this._loadImage(url);
		if (type==="sound")return this._loadSound(url);
		if (type==="ttf")return this._loadTTF(url);
		var contentType;
		switch (type){
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
		if (Loader.preLoadedMap[url]){
			this.onLoaded(Loader.preLoadedMap[url]);
			}else {
			if (!this._http){
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
    static getTypeFromUrl(url: string): string;
    protected _loadTTF(url: string): void;
        _loadImage(url: string): void;
    protected _loadSound(url: string): void;
    protected onProgress(value: number): void;
        onError(message: string): void;
        onLoaded(data?: any): void;
    protected complete(data: any): void;
    /**
     * 结束加载，处理是否缓存及派发完成事件 <code>Event.COMPLETE</code> 。
     * @param	content 加载后的数据
     */
    endLoad(content?: any): void;
    /**加载地址。*/
    readonly url: string;
    /**加载类型。*/
    readonly type: string;
    /**是否缓存。*/
    readonly cache: boolean;
    /**返回的数据。*/
    readonly data: any;
    /**
     * 清理指定资源地址的缓存。
     * @param	url 资源地址。
     */
    static clearRes(url: string): void;
    /**
     * 销毁Texture使用的图片资源，保留texture壳，如果下次渲染的时候，发现texture使用的图片资源不存在，则会自动恢复
     * 相比clearRes，clearTextureRes只是清理texture里面使用的图片资源，并不销毁texture，再次使用到的时候会自动恢复图片资源
     * 而clearRes会彻底销毁texture，导致不能再使用；clearTextureRes能确保立即销毁图片资源，并且不用担心销毁错误，clearRes则采用引用计数方式销毁
     * 【注意】如果图片本身在自动合集里面（默认图片小于512*512），内存是不能被销毁的，此图片被大图合集管理器管理
     * @param	url	图集地址或者texture地址，比如 Loader.clearTextureRes("res/atlas/comp.atlas"); Loader.clearTextureRes("hall/bg.jpg");
     */
    static clearTextureRes(url: string): void;
    /**
     * 获取指定资源地址的资源。
     * @param	url 资源地址。
     * @return	返回资源。
     */
    static getRes(url: string): any;
    /**
     * 获取指定资源地址的图集地址列表。
     * @param	url 图集地址。
     * @return	返回地址集合。
     */
    static getAtlas(url: string): Array<any>;
    /**
     * 缓存资源。
     * @param	url 资源地址。
     * @param	data 要缓存的内容。
     */
    static cacheRes(url: string, data: any): void;
    /**
     * 设置资源分组。
     * @param url 资源地址。
     * @param group 分组名。
     */
    static setGroup(url: string, group: string): void;
    /**
     * 根据分组清理资源。
     * @param group 分组名。
     */
    static clearResByGroup(group: string): void;

}