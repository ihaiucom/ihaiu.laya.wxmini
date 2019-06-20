import Render from "./Render";

export default class RunDriver
{
    static getIncludeStr(name)
    {
        return null;
    }

    // 创建Shader条件
    static createShaderCondition(conditionScript)
    {
        var fn="(function() {return "+conditionScript+";})";
		return Laya._runScript(fn);
    }

    static fontMap = [];

    /**
     * 度量文本宽度
     */
    static measureText(txt, font)
    {
        var isChinese=RunDriver.hanzi.test(txt);

        if (isChinese && RunDriver.fontMap[font])
        {
			return RunDriver.fontMap[font];
        };
        
		var ctx=Browser.context;
        ctx.font = font;
        // 度量文本宽度
        var r=ctx.measureText(txt);
        
        if (isChinese)
            RunDriver.fontMap[font]=r;
		return r;
    }

    /**
     * @private
     * 绘制到画布。
     */
    static drawToCanvas(sprite,_renderType,canvasWidth,canvasHeight,offsetX,offsetY)
    {
        canvasWidth |=0;canvasHeight |=0;offsetX |=0;offsetY |=0;
		var canvas=new HTMLCanvas();
		var ctx=canvas.getContext('2d');
		canvas.size(canvasWidth,canvasHeight);
		RenderSprite.renders[_renderType]._fun(sprite,ctx,offsetX,offsetY);
		return canvas;
    }

    /**
     * @private
     * 初始化渲染器。缺省是canvas渲染，如果WebGL enable之后，webgl会替换这个函数。
     */
    static initRender(canvas,w,h)
    {
        Render._context=canvas.getContext('2d');
		canvas.size(w,h);
		return true;
    }
    /**
     * 创建2D例子模型的处理函数。
     */
    static createParticleTemplate2D: Function;

    /**
     * 用于改变 WebGL宽高信息。
     */
    static changeWebGLSize(w,h)
    {

    }

    static createRenderSprite(type,next)
    {
        return new RenderSprite(type,next);
    }

    static clear(value)
    {
        if (!Render.isConchApp)
        {
			Render._context.clear();
		}
    }
    static getTexturePixels(value,x,y,width,height)
    {
        return null;
    }

    static skinAniSprite()
    {

    }

    static cancelLoadByUrl(url)
    {

    }
    static enableNative: Function;
    static hanzi = new RegExp("^[\u4E00-\u9FA5]$");
    
}