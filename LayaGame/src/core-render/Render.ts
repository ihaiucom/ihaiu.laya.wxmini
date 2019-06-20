import RunDriver from "./RunDriver";
import Browser from "./Browser";

/**
*<code>Render</code> 是渲染管理类。它是一个单例，可以使用 Laya.render 访问。
*/
export default class Render
{
    _timeId: number = 0;
    /**
     * 初始化引擎。
     * @param	width 游戏窗口宽度。
     * @param	height	游戏窗口高度。
     */
    constructor(width: number, height: number)
    {
		Render._mainCanvas.source.id = "layaCanvas";
		Render._mainCanvas.source.width = width;
        Render._mainCanvas.source.height = height;
        
        
        if (laya.renders.Render.isConchApp)
        {
			Browser.document.body.appendChild(Render._mainCanvas.source);
		}
        else
        {
            Browser.container.appendChild(Render._mainCanvas.source);
        }

        
		RunDriver.initRender(Render._mainCanvas,width,height);
        Browser.window.requestAnimationFrame(loop);
        
        function loop (stamp)
        {
			Laya.stage._loop();
			Browser.window.requestAnimationFrame(loop);
        }
        
		Laya.stage.on("visibilitychange",this,this._onVisibilitychange);

    }

    private _onVisibilitychange()
    {
        
        if (!Laya.stage.isVisibility)
        {
			this._timeId = Browser.window.setInterval(this._enterFrame,1000);
        }
        else if (this._timeId !=0)
        {
			Browser.window.clearInterval(this._timeId);
		}

    }

    private _enterFrame()
    {
		Laya.stage._loop();
    }
    
    static _context: Context;

    static _mainCanvas: HTMLCanvas;

    /**是否是WebGL模式*/
    static isWebGL: boolean = true;

    /** 表示是否是 3D 模式。*/
    static is3DMode: boolean = false;

    
    /**是否是加速器 只读*/
    static get isConchApp(): boolean
    {
        return window["conch"] !=null;
    }

    /** 目前使用的渲染器。*/
    static get context(): Context
    {
        return this._context;
    }

    /** 渲染使用的原生画布引用。 */
    static get canvas(): any
    {
        return this._mainCanvas.source;
    }
}