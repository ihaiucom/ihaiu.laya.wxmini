import Render = Laya.Render;
 
 /**
*<p><code>URL</code> 提供URL格式化，URL版本管理的类。</p>
*<p>引擎加载资源的时候，会自动调用formatURL函数格式化URL路径</p>
*<p>通过basePath属性可以设置网络基础路径</p>
*<p>通过设置customFormat函数，可以自定义URL格式化的方式</p>
*<p>除了默认的通过增加后缀的格式化外，通过VersionManager类，可以开启IDE提供的，基于目录的管理方式来替代 "?v=" 的管理方式</p>
*@see laya.net.VersionManager
*/
export default class URL
{
    private _url: string;
    private _path: string;
    constructor(url: string)
    {
        this._url = URL.formatURL(url);
        this._path = URL.getPath(url);
    }
    
    /**格式化后的地址。*/
    get url(): string
    {
        return this._url;
    }

    /**地址的文件夹路径（不包括文件名）。*/
    get path(): string
    {
        return this._path;
    }

    /**URL地址版本映射表，比如"aaa/bb.png":99,"aaa/bb.png":12}，默认情况下，通过formatURL格式化后，会自动生成为"aaa/bb.png?v=99"的一个地址*/
    static version: any;
    /**兼容微信不支持加载scene后缀场景，设置为true，则会把scene加载替换为json*/
    static exportSceneToJson: boolean;
    /**基础路径。如果不设置，默认为当前网页的路径。最终地址将被格式化为 basePath+相对URL地址，*/
    static basePath: string;
    /**root路径。只针对'~'类型的url路径有效*/
    static rootPath: string;
    /**
     * 格式化指定的地址并返回。
     * @param	url 地址。
     * @param	base 基础路径，如果没有，则使用basePath。
     * @return	格式化处理后的地址。
     */
    static formatURL(url: string): string
    {
        if (!url) return "null path";

		if (url.indexOf(":")> 0) return url;
		if (URL.customFormat !=null) url = URL.customFormat(url);
        if (url.indexOf(":")> 0)return url;
        
        var char1=url.charAt(0);
        
        if (char1===".")
        {
			return URL._formatRelativePath(URL.basePath+url);
        }
        else if (char1==='~')
        {
			return URL.rootPath+url.substring(1);
        }
        else if (char1==="d")
        {
            if (url.indexOf("data:image")===0)
                return url;
        }
        else if (char1==="/")
        {
			return url;
        }
        
		return URL.basePath+url;
    }

    /**
     * @private
     * 格式化相对路径。
     */
    static _formatRelativePath(value: string): string
    {
        var parts=value.split("/");
		for (var i=0,len=parts.length;i < len;i++){
			if (parts[i]=='..'){
				parts.splice(i-1,2);
				i-=2;
			}
		}
		return parts.join('/');
    }

    /**
     * 获取指定 URL 的文件夹路径（不包括文件名）。
     * <p><b>注意：</b>末尾有斜杠（/）。</p>
     * @param	url url地址。
     * @return  返回文件夹路径。
     */
    static getPath(url: string): string
    {
		var ofs=url.lastIndexOf('/');
		return ofs > 0 ? url.substr(0,ofs+1) : "";
    }

    /**
     * 获取指定 URL 的文件名。
     * @param	url 地址。
     * @return 	返回文件名。
     */
    static getFileName(url: string): string
    {
		var ofs=url.lastIndexOf('/');
		return ofs > 0 ? url.substr(ofs+1):url;
    }

    /**
     * @private 兼容微信
     */
    static getAdptedFilePath(url: string): string
    {
        if (!URL.exportSceneToJson || !url)
            return url;

		var i=0,len=0;
		len= URL._adpteTypeList.length;
		var tArr;
        for (i=0;i < len;i++)
        {
			tArr=URL._adpteTypeList[i];
			url=url.replace(tArr[0],tArr[1]);
        }
        
		return url;
    }

    

    static _adpteTypeList = [[".scene3d",".json"],[".scene",".json"],[".taa",".json"],[".prefab",".json"]];


    /** 自定义URL格式化的方式。例如： customFormat=function(url:string):string} */
    static customFormat(url: string)
    {
        
		var newUrl=URL.version[url];
        if (!Render.isConchApp && newUrl)
            url+="?v="+newUrl;

		return url;
    }
    
}