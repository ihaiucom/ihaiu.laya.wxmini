import Render from "./Render";
import Browser from "./Browser";

/**
*<code>HTMLCanvas</code> 是 Html Canvas 的代理类，封装了 Canvas 的属性和方法。
*/
export default class HTMLCanvas extends Bitmap
{
    // 真实的html <canvas>
    _source: any;
    _texture: Texture;
    // WebGLContext2D
    _ctx: Context;

    get source(): any
    {
        return this._source;
    }

    _getSource(): any
    {
        return this._source;
    }


    /**
     * 根据指定的类型，创建一个 <code>HTMLCanvas</code> 实例。
     */
    constructor(createCanvas?: boolean)
    {
        super();
        (createCanvas===void 0)&& (createCanvas=false);
		if(createCanvas || !Render.isWebGL)
			this._source = Browser.createElement("canvas");
        else 
        {
			this._source=this;
		}
		this.lock=true;
    }

    /**
     * 清空画布内容。
     */
    clear(): void
    {
        this._ctx && this._ctx.clear();

        if (this._texture)
        {
			this._texture.destroy();
			this._texture=null;
		}
    }
    /**
     * 销毁。
     */
    destroy(): void
    {
		this._ctx && this._ctx.destroy();
		this._ctx=null;
    }

    /**
     * 释放。
     */
    release(): void
    {

    }
    /**
     * Canvas 渲染上下文。
     */
    get context(): Context
    {
        if (this._ctx)
            return this._ctx;

        if (Render.isWebGL && this._source==this)
        {
			this._ctx=new WebGLContext2D();;
        }
        else 
        {
			this._ctx = this._source.getContext(Render.isConchApp?'layagl':'2d');
		}
		this._ctx._canvas=this;
		return this._ctx;
    }

    /**
     * @private
     * 设置 Canvas 渲染上下文。是webgl用来替换_ctx用的
     * @param	context Canvas 渲染上下文。
     */
    _setContext(context: Context): void
    {
        this._ctx=context;
    }
    /**
     * 获取 Canvas 渲染上下文。
     * @param	contextID 上下文ID.
     * @param	other
     * @return  Canvas 渲染上下文 Context 对象。
     */
    getContext(contextID: string, other?: any): Context
    {
        return this.context;
    }

    getMemSize(): number
    {
        return 0;
    }
    size(w: number, h: number): void
    {
        if (this._width !=w || this._height !=h || (this._source && (this._source.width !=w || this._source.height !=h)))
        {
			this._width=w;
			this._height=h;
			this._setGPUMemory(w *h *4);
			this._ctx && this._ctx.size && this._ctx.size(w,h);
			this._source && (this._source.height=h,this._source.width=w);
            if (this._texture)
            {
				this._texture.destroy();
				this._texture=null;
			}
		}
    }
    /**
     * 获取texture实例
     */
    getTexture(): Texture
    {
        if (!this._texture){
			this._texture=new Texture(this,Texture.DEF_UV);
		}
		return this._texture;
    }
    /**
     * 把图片转换为base64信息
     * @param	type "image/png"
     * @param	encoderOptions	质量参数，取值范围为0-1
     * @param	callBack	完成回调，返回base64数据
     */
    toBase64(type: string, encoderOptions: number, callBack: Function): void
    {
        if (this._source)
        {
            if (Render.isConchApp && this._source.toBase64)
            {
				this._source.toBase64(type,encoderOptions,callBack);
			}
            else 
            {
				var base64Data=this._source.toDataURL(type,encoderOptions);
				callBack(base64Data);
			}
		}
    }

}