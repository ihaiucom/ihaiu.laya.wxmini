
import ColorFilter = laya.filters.ColorFilter;
import Matrix = laya.maths.Matrix;
import Point = laya.maths.Point;
import HTMLCanvas from "./HTMLCanvas";
import Render from "./Render";
/**
 * 该类的作用是扩展 CanvasRenderingContext2D 方法
 */
export default class Context
{
    
	static ENUM_TEXTALIGN_DEFAULT=0;
	static ENUM_TEXTALIGN_CENTER=1;
	static ENUM_TEXTALIGN_RIGHT=2;
    static PI2=2 *Math.PI;
    
    static __init__(to?: any): void
    {
        var from= Context.prototype;

		to= to || /*__JS__ */CanvasRenderingContext2D.prototype;
        if(to.init2d)return;
        
        to.init2d=true;
        
		var funs=[
            "saveTransform",
            "restoreTransform",
            "transformByMatrix",
            "drawTriangles",
            "drawTriangle",
            'drawTextures',
            'fillWords',
            'fillBorderWords',
            'drawRect',
            'strokeWord',
            'drawText',
            'fillTexture',
            'setTransformByMatrix',
            'clipRect',
            'drawTexture',
            'drawTexture2',
            'drawTextureWithTransform',
            'flush',
            'clear',
            'destroy',
            'drawCanvas',
            'fillBorderText',
            'drawCurves',
            "_drawRect",
            "alpha",
            "_transform",
            "_rotate",
            "_scale",
            "_drawLine",
            "_drawLines",
            "_drawCircle",
            "_fillAndStroke",
            "_drawPie",
            "_drawPoly",
            "_drawPath",
            "drawTextureWithTransform"
        ];

        funs.forEach(function(i)
        {
			to[i]=from[i];
		});

    }
    
    _canvas: HTMLCanvas;
    font: string;
    textBaseline: string;
    fillStyle: any;

    
    strokeStyle: any;
    globalCompositeOperation: string;

    lineJoin: string;
    lineCap: string;
    miterLimit: string;
    globalAlpha: number;

    //=======================
    // 变换
    //------------------------

    /**
     * CanvasRenderingContext2D.translate()
     * 通过在网格中移动 canvas 和 canvas 原点 x 水平方向、原点 y 垂直方向，添加平移变换
     */
    translate(x: number, y: number): void
    {

    }

    /**
     * CanvasRenderingContext2D.scale()
     * 根据 x 水平方向和 y 垂直方向，为canvas 单位添加缩放变换。
     */
    scale(scaleX: number, scaleY: number): void
    {

    }



    measureText(text: string): any
    {

    }

    /**
     * CanvasRenderingContext2D.setTransform()
     * 重新设置当前的变换为单位矩阵，并使用同样的变量调用 transform() 方法。
     */
    setTransform(...args: any[]): void
    {

    }



    $transform(a: number, b: number, c: number, d: number, tx: number, ty: number): void
    {

    }


    

    
    //====================================
    // 绘制图像
    //-------------------------------------

    /**
     * CanvasRenderingContext2D.drawImage()
     * 绘制指定的图片。该方法有多种格式，提供了很大的使用灵活性。
     */
    drawImage(...args: any[]): void
    {

    }

    
    //====================================
    // 像素控制
    //-------------------------------------

    /**
     * CanvasRenderingContext2D.getImageData()
     * 返回一个 ImageData 对象，用来描述canvas区域隐含的像素数据，这个区域通过矩形表示，起始点为(sx, sy)、宽为sw、高为sh。
     */
    getImageData(...args: any[]): any
    {

    }
    

    
    //====================================
    // canvas 状态
    //-------------------------------------

    
    /**
     * CanvasRenderingContext2D.canvas
     * 对 HTMLCanvasElement 只读的反向引用。如果和 <canvas> 元素没有联系，可能为null。
     */
    get canvas(): HTMLCanvas
    {
        return this._canvas;
    }


    /**
     * CanvasRenderingContext2D.restore()
     * 恢复到最近的绘制样式状态，此状态是通过 save() 保存到”状态栈“中最新的元素。
     */
    restore(): void
    {

    }

    

    /**
     * CanvasRenderingContext2D.save()
     * 使用栈保存当前的绘画样式状态，你可以使用 restore() 恢复任何改变。
     */
    save(): void
    {

    }

    
    
    //====================================
    // 绘制矩形
    //-------------------------------------


    /**
     * CanvasRenderingContext2D.clearRect()
     * 设置指定矩形区域内（以 点 (x, y) 为起点，范围是(width, height) ）所有像素变成透明，并擦除之前绘制的所有内容。
     */
    clearRect(x: number, y: number, width: number, height: number): void
    {

    }
    
    //====================================
    // 绘制路径
    //-------------------------------------

    
    /**
     * CanvasRenderingContext2D.stroke()
     * 使用当前的样式描边子路径。
     */
    stroke(): void
    {

    }
    
    /**
     * CanvasRenderingContext2D.clip()
     * 从当前路径创建一个剪切路径。在  clip() 调用之后，绘制的所有信息只会出现在剪切路径内部。例如： 参见 Canvas教程中的 剪切路径 。
     */
    clip(): void
    {

    }


    //====================================
    // 路径
    //-------------------------------------
    

    /**
     * CanvasRenderingContext2D.beginPath()
     * 清空子路径列表开始一个新的路径。当你想创建一个新的路径时，调用此方法。
     */
    beginPath(convex?: boolean): void
    {

    }
    

    /**
     * CanvasRenderingContext2D.rect()
     * 创建一个矩形路径，矩形的起点位置是 (x, y) ，尺寸为 width 和 height。
     */
    rect(x: number, y: number, width: number, height: number): void
    {

    }

    /**
     * CanvasRenderingContext2D.moveTo()
     * 将一个新的子路径的起始点移动到(x，y)坐标。
     */
    moveTo(x: number, y: number): void
    {

    }
    /**
     * CanvasRenderingContext2D.lineTo()
     * 使用直线连接子路径的最后的点到x,y坐标。
     */
    lineTo(x: number, y: number): void
    {

    }

    /**
     * CanvasRenderingContext2D.closePath()
     * 使笔点返回到当前子路径的起始点。它尝试从当前点到起始点绘制一条直线。如果图形已经是封闭的或者只有一个点，那么此方法不会做任何操作。
     */
    closePath(): void
    {

    }
    
    /**
     * CanvasRenderingContext2D.quadraticCurveTo()
     * 添加一个2次贝赛尔曲线路径。
     */
    quadraticCurveTo(cpx: number, cpy: number, x: number, y: number): void
    {

    }
    

    /**
     * CanvasRenderingContext2D.arcTo()
     * 根据控制点和半径绘制圆弧路径，使用当前的描点(前一个moveTo或lineTo等函数的止点)。根据当前描点与给定的控制点1连接的直线，和控制点1与控制点2连接的直线，作为使用指定半径的圆的切线，画出两条切线之间的弧线路径。
     */
    arcTo(x1: number, y1: number, x2: number, y2: number, r: number): void
    {

    }










	//TODO:coverage
    drawCanvas(canvas: HTMLCanvas, x: number, y: number, width: number, height: number): void
    {
		Stat.renderBatch++;
		this.drawImage(canvas._source,x,y,width,height);
    }

	//TODO:coverage
    _drawRect(x: number, y: number, width: number, height: number, style: any): void
    {
		Stat.renderBatch++;
		style && (this.fillStyle=style);
		/*__JS__ */this.fillRect(x,y,width,height);
    }

	//TODO:coverage
    drawText(text: any, x: number, y: number, font: string, color: string, textAlign: string): void
    {
        
		Stat.renderBatch++;
        if (arguments.length > 3 && font !=null)
        {
			this.font=font;
			this.fillStyle=color;
			/*__JS__ */this.textAlign=textAlign;
			this.textBaseline="top";
		}
		/*__JS__ */this.fillText(text,x,y);

    }

	//TODO:coverage
    fillBorderText(text: any, x: number, y: number, font: string, fillColor: string, borderColor: string, lineWidth: number, textAlign: string): void
    {
        
		Stat.renderBatch++;
		this.font=font;
		this.fillStyle=fillColor;
		this.textBaseline="top";
		/*__JS__ */this.strokeStyle=borderColor;
		/*__JS__ */this.lineWidth=lineWidth;
		/*__JS__ */this.textAlign=textAlign;
		/*__JS__ */this.strokeText(text,x,y);
		/*__JS__ */this.fillText(text,x,y);

    }

	//TODO:coverage
    fillWords(words: Array<any>, x: number, y: number, font: string, color: string): void
    {
        
		font && (this.font=font);
		color && (this.fillStyle=color);
		this.textBaseline="top";
		/*__JS__ */this.textAlign='left';
        for (var i=0,n=words.length;i < n;i++)
        {
			var a=words[i];
			/*__JS__ */this.fillText(a.char,a.x+x,a.y+y);
		}

    }

	//TODO:coverage
    fillBorderWords(words: Array<any>, x: number, y: number, font: string, color: string, borderColor: string, lineWidth: number): void
    {
        font && (this.font=font);
		color && (this.fillStyle=color);
		this.textBaseline="top";
		/*__JS__ */this.lineWidth=lineWidth;
		/*__JS__ */this.textAlign='left';
		/*__JS__ */this.strokeStyle=borderColor;
        for (var i=0,n=words.length;i < n;i++)
        {
			var a=words[i];
			/*__JS__ */this.strokeText(a.char,a.x+x,a.y+y);
			/*__JS__ */this.fillText(a.char,a.x+x,a.y+y);
		}

    }

	//TODO:coverage
    strokeWord(text: any, x: number, y: number, font: string, color: string, lineWidth: number, textAlign: string): void
    {
        Stat.renderBatch++;
		if (arguments.length > 3 && font !=null){
			this.font=font;
			/*__JS__ */this.strokeStyle=color;
			/*__JS__ */this.lineWidth=lineWidth;
			/*__JS__ */this.textAlign=textAlign;
			this.textBaseline="top";
		}
		/*__JS__ */this.strokeText(text,x,y);

    }

	//TODO:coverage
    setTransformByMatrix(value: Matrix): void
    {
		this.setTransform(value.a,value.b,value.c,value.d,value.tx,value.ty);
    }

	//TODO:coverage
    clipRect(x: number, y: number, width: number, height: number): void
    {
		Stat.renderBatch++;
		this.beginPath();
		this.rect(x,y,width,height);
		this.clip();
    }

	//TODO:coverage
    drawTextureWithTransform(tex: Texture, tx: number, ty: number, width: number, height: number, m: Matrix, gx: number, gy: number, alpha: number, blendMode: string, colorfilter?: ColorFilter): void
    {
        if (!tex._getSource())
			return;
		Stat.renderBatch++;
		var alphaChanged=alpha!==1;
        if (alphaChanged)
        {
			var temp=this.globalAlpha;
			this.globalAlpha *=alpha;
        }
        
		if (blendMode)
            this.globalCompositeOperation=blendMode;
            
        var uv=tex.uv,w=tex.bitmap._width,h=tex.bitmap._height;
        
        if (m)
        {
			this.save();
			this.transform(m.a,m.b,m.c,m.d,m.tx+gx,m.ty+gy);
			this.drawImage(tex.bitmap._source,uv[0] *w,uv[1] *h,(uv[2]-uv[0])*w,(uv[5]-uv[3])*h,tx,ty,width,height);
			this.restore();
        }
        else 
        {
			this.drawImage(tex.bitmap._source,uv[0] *w,uv[1] *h,(uv[2]-uv[0])*w,(uv[5]-uv[3])*h,gx+tx,gy+ty,width,height);
        }
        
		if (alphaChanged)
			this.globalAlpha=temp;
		if (blendMode)
			this.globalCompositeOperation="source-over";

    }

	//TODO:coverage
    drawTexture2(x: number, y: number, pivotX: number, pivotY: number, m: Matrix, args2: Array<any>): void
    {
        var tex=args2[0];
		Stat.renderBatch++;
		var uv=tex.uv,w=tex.bitmap._width,h=tex.bitmap._height;
        if (m)
        {
			this.save();
			this.transform(m.a,m.b,m.c,m.d,m.tx+x,m.ty+y);
			this.drawImage(tex.bitmap._source,uv[0] *w,uv[1] *h,(uv[2]-uv[0])*w,(uv[5]-uv[3])*h,args2[1]-pivotX,args2[2]-pivotY,args2[3],args2[4]);
			this.restore();
        }
        else 
        {
			this.drawImage(tex.bitmap._source,uv[0] *w,uv[1] *h,(uv[2]-uv[0])*w,(uv[5]-uv[3])*h,args2[1]-pivotX+x,args2[2]-pivotY+y,args2[3],args2[4]);
		}

    }

	//TODO:coverage
    fillTexture(texture: Texture, x: number, y: number, width: number, height: number, type: string, offset: Point, other: any): void
    {
        if (!other.pat)
        {
            if (texture.uv != Texture.DEF_UV)
            {
				var canvas=new HTMLCanvas();
				canvas.getContext('2d');
				canvas.size(texture.width,texture.height);
				canvas.context.drawTexture(texture,0,0,texture.width,texture.height);
				texture=new Texture(canvas);
            }
            
			other.pat=this.createPattern(texture.bitmap._source,type);
        };
        
		var oX=x,oY=y;
		var sX=0,sY=0;
        if (offset)
        {
			oX+=offset.x % texture.width;
			oY+=offset.y % texture.height;
			sX-=offset.x % texture.width;
			sY-=offset.y % texture.height;
        }
        
		this.translate(oX,oY);
		this._drawRect(sX,sY,width,height,other.pat);
		this.translate(-oX,-oY);

    }

    flush(): number
    {
		return 0;
    }

    destroy(): void
    {
		/*__JS__ */this.canvas.width=this.canvas.height=0;
    }

    clear(): void
    {
		if(!Render.isConchApp)this.clearRect(0,0,Render._mainCanvas.width,Render._mainCanvas.height);
    }

	//TODO:coverage
    drawTriangle(texture: Texture, vertices: Float32Array, uvs: Float32Array, index0: number, index1: number, index2: number, matrix: Matrix, canvasPadding: boolean): void
    {
        var source=texture.bitmap;
        var textureSource=source._getSource();
        
		var textureWidth=texture.width;
        var textureHeight=texture.height;
        
		var sourceWidth=source.width;
        var sourceHeight=source.height;
        
		var u0=uvs[index0] *sourceWidth;
		var u1=uvs[index1] *sourceWidth;
        var u2=uvs[index2] *sourceWidth;
        
		var v0=uvs[index0+1] *sourceHeight;
		var v1=uvs[index1+1] *sourceHeight;
        var v2=uvs[index2+1] *sourceHeight;
        
		var x0=vertices[index0];
		var x1=vertices[index1];
        var x2=vertices[index2];
        
		var y0=vertices[index0+1];
		var y1=vertices[index1+1];
        var y2=vertices[index2+1];
        
        if (canvasPadding)
        {
			var paddingX=1;
			var paddingY=1;
			var centerX=(x0+x1+x2)/ 3;
			var centerY=(y0+y1+y2)/ 3;
			var normX=x0-centerX;
			var normY=y0-centerY;
			var dist=Math.sqrt((normX *normX)+(normY *normY));
			x0=centerX+((normX / dist)*(dist+paddingX));
			y0=centerY+((normY / dist)*(dist+paddingY));
			normX=x1-centerX;
			normY=y1-centerY;
			dist=Math.sqrt((normX *normX)+(normY *normY));
			x1=centerX+((normX / dist)*(dist+paddingX));
			y1=centerY+((normY / dist)*(dist+paddingY));
			normX=x2-centerX;
			normY=y2-centerY;
			dist=Math.sqrt((normX *normX)+(normY *normY));
			x2=centerX+((normX / dist)*(dist+paddingX));
			y2=centerY+((normY / dist)*(dist+paddingY));
        }
        
		this.save();
		if (matrix)
            this.transform(matrix.a,matrix.b,matrix.c,matrix.d,matrix.tx,matrix.ty);
            
		this.beginPath();
		this.moveTo(x0,y0);
		this.lineTo(x1,y1);
		this.lineTo(x2,y2);
		this.closePath();
        this.clip();
        
		var delta=(u0 *v1)+(v0 *u2)+(u1 *v2)-(v1 *u2)-(v0 *u1)-(u0 *v2);
		var dDelta=1 / delta;
		var deltaA=(x0 *v1)+(v0 *x2)+(x1 *v2)-(v1 *x2)-(v0 *x1)-(x0 *v2);
		var deltaB=(u0 *x1)+(x0 *u2)+(u1 *x2)-(x1 *u2)-(x0 *u1)-(u0 *x2);
		var deltaC=(u0 *v1 *x2)+(v0 *x1 *u2)+(x0 *u1 *v2)-(x0 *v1 *u2)-(v0 *u1 *x2)-(u0 *x1 *v2);
		var deltaD=(y0 *v1)+(v0 *y2)+(y1 *v2)-(v1 *y2)-(v0 *y1)-(y0 *v2);
		var deltaE=(u0 *y1)+(y0 *u2)+(u1 *y2)-(y1 *u2)-(y0 *u1)-(u0 *y2);
		var deltaF=(u0 *v1 *y2)+(v0 *y1 *u2)+(y0 *u1 *v2)-(y0 *v1 *u2)-(v0 *u1 *y2)-(u0 *y1 *v2);
		this.transform(deltaA *dDelta,deltaD *dDelta,deltaB *dDelta,deltaE *dDelta,deltaC *dDelta,deltaF *dDelta);
		this.drawImage(textureSource,texture.uv[0] *sourceWidth,texture.uv[1] *sourceHeight,textureWidth,textureHeight,texture.uv[0] *sourceWidth,texture.uv[1] *sourceHeight,textureWidth,textureHeight);
		this.restore();

    }

	//=============新增==================
    transformByMatrix(matrix: Matrix, tx: number, ty: number): void
    {
		this.transform(matrix.a,matrix.b,matrix.c,matrix.d,matrix.tx+tx,matrix.ty+ty);
    }

    saveTransform(matrix: Matrix): void
    {
		this.save();
    }

    restoreTransform(matrix: Matrix): void
    {
		this.restore();
    }

    drawRect(x: number, y: number, width: number, height: number, fillColor: any, lineColor: any, lineWidth: number): void
    {
        var ctx=this;
        if (fillColor !=null)
        {
			ctx.fillStyle=fillColor;
			ctx.fillRect(x,y,width,height);
        }
        
        if (lineColor !=null)
        {
			ctx.strokeStyle=lineColor;
			ctx.lineWidth=lineWidth;
			ctx.strokeRect(x,y,width,height);
		}
    }

	//TODO:coverage
    drawTexture(tex: Texture, x: number, y: number, width: number, height: number): void
    {
		var source=tex._getSource();
		if (!source)return;
		Stat.renderBatch++;
		var uv=tex.uv,w=tex.bitmap.width,h=tex.bitmap.height;
		this.drawImage(source,uv[0] *w,uv[1] *h,(uv[2]-uv[0])*w,(uv[5]-uv[3])*h,x,y,width,height);
    }

    drawTextures(tex: Texture, pos: Array<any>, tx: number, ty: number): void
    {
        Stat.renderBatch+=pos.length / 2;
		var w=tex.width;
		var h=tex.height;
        for (var i=0,sz=pos.length;i < sz;i+=2)
        {
			this.drawTexture(tex,pos[i]+tx,pos[i+1]+ty,w,h);
		}
    }

	//TODO:coverage
    drawTriangles(texture: Texture, x: number, y: number, vertices: Float32Array, uvs: Float32Array, indices: Uint16Array, matrix: Matrix, alpha: number, color: ColorFilter, blendMode: string): void
    {
        var i=0,len=indices.length;
		this.translate(x,y);
		for (i=0;i < len;i+=3){
			var index0=indices[i] *2;
			var index1=indices[i+1] *2;
			var index2=indices[i+2] *2;
			this.drawTriangle(texture,vertices,uvs,index0,index1,index2,matrix,true);
		}
		this.translate(-x,-y);

    }

    alpha(value: number): void
    {
		this.globalAlpha *=value;
    }

    _transform(mat: Matrix, pivotX: number, pivotY: number): void
    {
		this.translate(pivotX,pivotY);
		this.transform(mat.a,mat.b,mat.c,mat.d,mat.tx,mat.ty);
		this.translate(-pivotX,-pivotY);
    }

    _rotate(angle: number, pivotX: number, pivotY: number): void
    {
		this.translate(pivotX,pivotY);
		this.rotate(angle);
		this.translate(-pivotX,-pivotY);
    }

    _scale(scaleX: number, scaleY: number, pivotX: number, pivotY: number): void
    {
		this.translate(pivotX,pivotY);
		this.scale(scaleX,scaleY);
		this.translate(-pivotX,-pivotY);
    }

    _drawLine(x: number, y: number, fromX: number, fromY: number, toX: number, toY: number, lineColor: string, lineWidth: number, vid: number): void
    {
		this.beginPath();
		this.strokeStyle=lineColor;
		this.lineWidth=lineWidth;
		this.moveTo(x+fromX,y+fromY);
		this.lineTo(x+toX,y+toY);
		this.stroke();
    }

    _drawLines(x: number, y: number, points: Array<any>, lineColor: any, lineWidth: number, vid: number): void
    {
        Render.isWebGL && this.setPathId(vid);
		this.beginPath();
		this.strokeStyle=lineColor;
		this.lineWidth=lineWidth;
		var i=2,n=points.length;
        if (Render.isWebGL)
        {
			this.addPath(points.slice(),false,false,x,y);
        }
        else 
        {
			this.moveTo(x+points[0],y+points[1]);
            while (i < n)
            {
				this.lineTo(x+points[i++],y+points[i++]);
			}
		}
		this.stroke();
    }

    drawCurves(x: number, y: number, points: Array<any>, lineColor: any, lineWidth: number): void
    {
        this.beginPath();
		this.strokeStyle=lineColor;
		this.lineWidth=lineWidth;
		this.moveTo(x+points[0],y+points[1]);
		var i=2,n=points.length;
        while (i < n)
        {
			this.quadraticCurveTo(x+points[i++],y+points[i++],x+points[i++],y+points[i++]);
		}
		this.stroke();
    }

    _fillAndStroke(fillColor,strokeColor,lineWidth: number,isConvexPolygon?: boolean)
    {
        (isConvexPolygon===void 0)&& (isConvexPolygon=false);
        if (fillColor !=null)
        {
			this.fillStyle=fillColor;
			this.fill();
        }
        
        if (strokeColor !=null && lineWidth > 0)
        {
			this.strokeStyle=strokeColor;
			this.lineWidth=lineWidth;
			this.stroke();
		}

    }

    _drawCircle(x: number, y: number, radius: number, fillColor: any, lineColor: any, lineWidth: number, vid: number): void
    {
        Stat.renderBatch++;
		Render.isWebGL? /*__JS__ */this.beginPath(true):this.beginPath();
		this.arc(x,y,radius,0,Context.PI2);
		this.closePath();
		this._fillAndStroke(fillColor,lineColor,lineWidth);

    }
    
	//矢量方法
    _drawPie(x: number, y: number, radius: number, startAngle: number, endAngle: number, fillColor: any, lineColor: any, lineWidth: number, vid: number): void
    {
        this.beginPath();
		this.moveTo(x ,y);
		this.arc(x,y,radius,startAngle,endAngle);
		this.closePath();
		this._fillAndStroke(fillColor,lineColor,lineWidth);

    }

	//ctx.translate(-x-args[0],-y-args[1]);
    _drawPoly(x: number, y: number, points: Array<any>, fillColor: any, lineColor: any, lineWidth: number, isConvexPolygon: boolean, vid: number): void
    {
        var i=2,n=points.length;
		this.beginPath();
        if (Render.isWebGL)
        {
			this.setPathId(vid);
			this.addPath(points.slice(),true,isConvexPolygon,x,y);
        }
        else 
        {
			this.moveTo(x+points[0],y+points[1]);
            while (i < n)
            {
				this.lineTo(x+points[i++],y+points[i++]);
			}
		}
		this.closePath();
		this._fillAndStroke(fillColor,lineColor,lineWidth,isConvexPolygon);

    }

    _drawPath(x: number, y: number, paths: Array<any>, brush: any, pen: any): void
    {
        this.beginPath();
        for (var i=0,n=paths.length;i < n;i++)
        {
			var path=paths[i];
            switch (path[0])
            {
				case "moveTo":
					this.moveTo(x+path[1],y+path[2]);
					break ;
				case "lineTo":
					this.lineTo(x+path[1],y+path[2]);
					break ;
				case "arcTo":
					this.arcTo(x+path[1],y+path[2],x+path[3],y+path[4],path[5]);
					break ;
				case "closePath":
					this.closePath();
					break ;
            }
        }
        
        if (brush !=null)
        {
			this.fillStyle=brush.fillStyle;
			this.fill();
        }
        
        if (pen !=null)
        {
			this.strokeStyle=pen.strokeStyle;
			this.lineWidth=pen.lineWidth || 1;
			this.lineJoin=pen.lineJoin;
			this.lineCap=pen.lineCap;
			this.miterLimit=pen.miterLimit;
			this.stroke();
		}
    }

    drawParticle(x: number, y: number, pt: any): void
    {

    }

}