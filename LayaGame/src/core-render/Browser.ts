import HTMLCanvas from "./HTMLCanvas";
import Render from "./Render";
import Context from "./Context";

/**
*<code>Browser</code> 是浏览器代理类。封装浏览器及原生 js 提供的一些功能。
*/

export default class Browser
{
    /** 浏览器代理信息。*/
    static userAgent: string;
    /** 表示是否在移动设备，包括IOS和安卓等设备内。*/
    static onMobile: boolean;
    /** 表示是否在 IOS 设备内。*/
    static onIOS: boolean;
    /** 表示是否在 Mac 设备。*/
    static onMac: boolean;
    /** 表示是否在 IPhone 设备内。*/
    static onIPhone: boolean;
    /** 表示是否在 IPad 设备内。*/
    static onIPad: boolean;
    /** 表示是否在 Android 设备内。*/
    static onAndroid: boolean;
    /** 表示是否在 Windows Phone 设备内。*/
    static onWP: boolean;
    /** 表示是否在 QQ 浏览器内。*/
    static onQQBrowser: boolean;
    /** 表示是否在移动端 QQ 或 QQ 浏览器内。*/
    static onMQQBrowser: boolean;
    /** 表示是否在 Safari 内。*/
    static onSafari: boolean;
    /** 表示是否在 IE 浏览器内*/
    static onIE: boolean;
    /** 表示是否在 微信 内*/
    static onWeiXin: boolean;
    /** 表示是否在 PC 端。*/
    static onPC: boolean;
    static onMiniGame: boolean;
    static onBDMiniGame: boolean;
    static onLimixiu: boolean;
    static onFirefox: boolean;
    static onEdge: boolean;
    /** 表示是否支持WebAudio*/
    static supportWebAudio: boolean;
    /** 表示是否支持LocalStorage*/
    static supportLocalStorage: boolean;
    /** 全局离线画布（非主画布）。主要用来测量字体、获取image数据。*/
    static canvas: HTMLCanvas;
    /** 全局离线画布上绘图的环境（非主画布）。 */
    static context: Context;
    static _supportWebGL: boolean;

    static _window=null;
    static _document=null;
    static _container=null;
    static _pixelRatio = -1;


    static __init__()
    {
        if (Browser._window)
            return Browser._window;

		var win=Browser._window=/*__JS__ */window;
		var doc=Browser._document=win.document;
		var u=Browser.userAgent=win.navigator.userAgent;
		var libs=win["_layalibs"];
        if (libs)
        {
            libs.sort(function(a,b)
            {
				return a.i > b.i;
            });
            
            for (var j=0;j < libs.length;j++)
            {
				libs[j].f(win,doc,Laya);
			}
        }
        
        if (u.indexOf("MiniGame")>-1)
        {
            if (!Laya["MiniAdpter"])
            {
				console.error("请先添加小游戏适配库,详细教程：https://ldc2.layabox.com/doc/?nav=zh-ts-5-0-0");
            }
            else 
            {
				Laya["MiniAdpter"].enable();
			}
        }
        
        if (u.indexOf("SwanGame")>-1)
        {
            if (!Laya["BMiniAdapter"])
            {
				console.error("请先添加百度小游戏适配库,详细教程：https://ldc2.layabox.com/doc/?nav=zh-ts-5-0-0");
            }
            else 
            {
				Laya["BMiniAdapter"].enable();
			}
        }
        
        win.trace=console.log;
        
		win.requestAnimationFrame = win.requestAnimationFrame || win.webkitRequestAnimationFrame || win.mozRequestAnimationFrame || win.oRequestAnimationFrame || win.msRequestAnimationFrame || function (fun){
			return win.setTimeout(fun,1000 / 60);
        };
        
		var bodyStyle=doc.body.style;
		bodyStyle.margin=0;
		bodyStyle.overflow='hidden';
		bodyStyle['-webkit-user-select']='none';
        bodyStyle['-webkit-tap-highlight-color']='rgba(200,200,200,0)';
        
		var metas=doc.getElementsByTagName('meta');
		var i=0,flag=false,content='width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no';
        while (i < metas.length)
        {
			var meta=metas[i];
            if (meta.name=='viewport')
            {
				meta.content=content;
				flag=true;
				break ;
			}
			i++;
        }
        
        if (!flag)
        {
			meta=doc.createElement('meta');
			meta.name='viewport',meta.content=content;
			doc.getElementsByTagName('head')[0].appendChild(meta);
        }
        
		Browser.onMobile=u.indexOf("Mobile")>-1;
		Browser.onIOS=!!u.match(/\(i[^;]+;(U;)? CPU.+Mac OS X/);
		Browser.onIPhone=u.indexOf("iPhone")>-1;
		Browser.onMac=/*[SAFE]*/ u.indexOf("Mac OS X")>-1;
		Browser.onIPad=u.indexOf("iPad")>-1;
		Browser.onAndroid=u.indexOf('Android')>-1 || u.indexOf('Adr')>-1;
		Browser.onWP=u.indexOf("Windows Phone")>-1;
		Browser.onQQBrowser=u.indexOf("QQBrowser")>-1;
		Browser.onMQQBrowser=u.indexOf("MQQBrowser")>-1 || (u.indexOf("Mobile")>-1 && u.indexOf("QQ")>-1);
		Browser.onIE=!!win.ActiveXObject || "ActiveXObject" in win;
		Browser.onWeiXin=u.indexOf('MicroMessenger')>-1;
		Browser.onSafari=/*[SAFE]*/ u.indexOf("Safari")>-1;
		Browser.onPC=!Browser.onMobile;
		Browser.onMiniGame=/*[SAFE]*/ u.indexOf('MiniGame')>-1;
		Browser.onBDMiniGame=/*[SAFE]*/ u.indexOf('SwanGame')>-1;
        Browser.onLimixiu=/*[SAFE]*/ u.indexOf('limixiu')>-1;
        
		Browser.supportLocalStorage = LocalStorage.__init__();
		Browser.supportWebAudio = SoundManager.__init__();
        Render._mainCanvas = new HTMLCanvas(true);
        
		var style=Render._mainCanvas.source.style;
		style.position='absolute';
		style.top=style.left="0px";
        style.background="#000000";
        
		Browser.canvas=new HTMLCanvas(true);
        Browser.context=Browser.canvas.getContext('2d');
        
		var tmpCanv=new HTMLCanvas(true);
		var names=["webgl","experimental-webgl","webkit-3d","moz-webgl"];
		var gl=null;
        for (i=0;i < names.length;i++)
        {
            try 
            {
				gl=tmpCanv.source.getContext(names[i]);
            }
            catch (e)
            {

            }

            if (gl)
            {
				Browser._supportWebGL=true;
				break ;
			}
		}
		return win;
    }

    /**
     * 创建浏览器原生节点。
     * @param	type 节点类型。
     * @return	创建的节点对象的引用。
     */
    static createElement(type: string): any
    {
        
		Browser.__init__();
		return Browser._document.createElement(type);
    }
    /**
     * 返回 Document 对象中拥有指定 id 的第一个对象的引用。
     * @param	type 节点id。
     * @return	节点对象。
     */
    static getElementById(type: string): any
    {
        
		Browser.__init__();
		return Browser._document.getElementById(type);
    }
    /**
     * 移除指定的浏览器原生节点对象。
     * @param	type 节点对象。
     */
    static removeElement(ele: any): void
    {
		if (ele && ele.parentNode)ele.parentNode.removeChild(ele);
    }
    /**
     * 获取浏览器当前时间戳，单位为毫秒。
     */
    static now(): number
    {
		return /*__JS__ */Date.now();;
    }
    /**
     * 浏览器窗口可视宽度。
     * 通过分析浏览器信息获得。浏览器多个属性值优先级为：window.innerWidth(包含滚动条宽度) > document.body.clientWidth(不包含滚动条宽度)，如果前者为0或为空，则选择后者。
     */
    static get clientWidth(): number
    {
		Browser.__init__();
		return Browser._window.innerWidth || Browser._document.body.clientWidth;
    }
    /**
     * 浏览器窗口可视高度。
     * 通过分析浏览器信息获得。浏览器多个属性值优先级为：window.innerHeight(包含滚动条高度) > document.body.clientHeight(不包含滚动条高度) > document.documentElement.clientHeight(不包含滚动条高度)，如果前者为0或为空，则选择后者。
     */
    static get clientHeight(): number
    {
		Browser.__init__();
		return Browser._window.innerHeight || Browser._document.body.clientHeight || Browser._document.documentElement.clientHeight;
    }
    /** 浏览器窗口物理宽度。考虑了设备像素比。*/
    static get width(): number
    {
		Browser.__init__();
		return ((Laya.stage && Laya.stage.canvasRotation)? Browser.clientHeight :Browser.clientWidth)*Browser.pixelRatio;
    }
    /** 浏览器窗口物理高度。考虑了设备像素比。*/
    static get height(): number
    {
		Browser.__init__();
		return ((Laya.stage && Laya.stage.canvasRotation)? Browser.clientWidth :Browser.clientHeight)*Browser.pixelRatio;

    }
    /** 获得设备像素比。*/
    static get pixelRatio(): number
    {
        if (Browser._pixelRatio < 0)
        {
            Browser.__init__();
            
            if (Browser.userAgent.indexOf("Mozilla/6.0(Linux; Android 6.0; HUAWEI NXT-AL10 Build/HUAWEINXT-AL10)")>-1)
                Browser._pixelRatio=2;
            else 
            {
				var ctx=Browser.context;
				var backingStore=ctx.backingStorePixelRatio || ctx.webkitBackingStorePixelRatio || ctx.mozBackingStorePixelRatio || ctx.msBackingStorePixelRatio || ctx.oBackingStorePixelRatio || ctx.backingStorePixelRatio || 1;
				Browser._pixelRatio=(Browser._window.devicePixelRatio || 1)/ backingStore;
                if (Browser._pixelRatio < 1)
                    Browser._pixelRatio=1;
			}
		}
		return Browser._pixelRatio;
    }
    /**画布容器，用来盛放画布的容器。方便对画布进行控制*/
    static container: any;
    /**浏览器原生 window 对象的引用。*/
    static readonly window: any;
    /**浏览器原生 document 对象的引用。*/
    static readonly document: any;

}