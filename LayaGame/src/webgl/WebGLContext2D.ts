
import Sprite = laya.display.Sprite;
import ColorFilter = laya.filters.ColorFilter;
import Matrix = laya.maths.Matrix;
import Point = laya.maths.Point;
import Rectangle = laya.maths.Rectangle;
import HTMLCanvas = laya.resource.HTMLCanvas;
import Texture = laya.resource.Texture;
import WordText = laya.utils.WordText;
import SaveMark = laya.webgl.canvas.save.SaveMark;
import RenderTexture2D = laya.webgl.resource.RenderTexture2D;
import Shader = laya.webgl.shader.Shader;
import Shader2D = laya.webgl.shader.d2.Shader2D;
import Value2D = laya.webgl.shader.d2.value.Value2D;
import ISubmit = laya.webgl.submit.ISubmit;
import Submit = laya.webgl.submit.Submit;
import SubmitKey = laya.webgl.submit.SubmitKey;
import IndexBuffer2D = laya.webgl.utils.IndexBuffer2D;
import MeshQuadTexture = laya.webgl.utils.MeshQuadTexture;
import MeshTexture = laya.webgl.utils.MeshTexture;
import MeshVG = laya.webgl.utils.MeshVG;
import VertexBuffer2D = laya.webgl.utils.VertexBuffer2D;
import CharSubmitCache = laya.webgl.text.CharSubmitCache;

import Context from "../core-render/Context";

export default class WebGLContext2D extends Context
{
    static _tempPoint: Point;
    static _SUBMITVBSIZE: number;
    static _MAXSIZE: number;
    static MAXCLIPRECT: Rectangle;
    static _COUNT: number;
    static _tmpMatrix: Matrix;
    static __init__(): void
    {
		ContextParams.DEFAULT = new ContextParams();
		WebGLCacheAsNormalCanvas;
    }

    static set2DRenderConfig(): void
    {
		var gl=LayaGL.instance;
		WebGLContext.setBlend(gl,true);
		WebGLContext.setBlendFunc(gl,/*laya.webgl.WebGLContext.ONE*/1,/*laya.webgl.WebGLContext.ONE_MINUS_SRC_ALPHA*/0x0303);
		WebGLContext.setDepthTest(gl,false);
		WebGLContext.setCullFace(gl,false);
		WebGLContext.setDepthMask(gl,true);
		WebGLContext.setFrontFace(gl,/*laya.webgl.WebGLContext.CCW*/0x0901);
		gl.viewport(0,0,RenderState2D.width,RenderState2D.height);
    }

    _id: number;
    _drawCount: number;
    _submits: any;
    _curSubmit: any;
    _submitKey: SubmitKey;
    _mesh: MeshQuadTexture;
    _pathMesh: MeshVG;
    _triangleMesh: MeshTexture;
    meshlist: Array<any>;
    _clipRect: Rectangle;
    _globalClipMatrix: Matrix;
    _clipInfoID: number;
    _curMat: Matrix;
    _lastMatScaleX: number;
    _lastMatScaleY: number;
    _nBlendType: number;
    _save: any;
    _targets: RenderTexture2D;
    _charSubmitCache: CharSubmitCache;
    _saveMark: SaveMark;
    _shader2D: Shader2D;
    /**
     * 所cacheAs精灵
     * 对于cacheas bitmap的情况，如果图片还没准备好，需要有机会重画，所以要保存sprite。例如在图片
     * 加载完成后，调用repaint
     */
    sprite: Sprite;
    _drawTextureUseColor: boolean;
    _italicDeg: number;
    _lastTex: Texture;
    _colorFiler: ColorFilter;
    drawTexAlign: boolean;
    constructor();
    clearBG(r: number, g: number, b: number, a: number): void;
    _getSubmits(): Array<any>;
    destroy(): void;
    clear(): void;
    /**
     * 设置ctx的size，这个不允许直接设置，必须是canvas调过来的。所以这个函数里也不用考虑canvas相关的东西
     * @param	w
     * @param	h
     */
    size(w: number, h: number): void;
    /**
     * 当前canvas请求保存渲染结果。
     * 实现：
     * 如果value==true，就要给_target赋值
     * @param value
     */
    asBitmap: boolean;
    /**
     * 获得当前矩阵的缩放值
     * 避免每次都计算getScaleX
     * @return
     */
    getMatScaleX(): number;
    getMatScaleY(): number;
    setFillColor(color: number): void;
    getFillColor(): number;
    fillStyle: any;
    globalAlpha: number;
    textAlign: string;
    textBaseline: string;
    globalCompositeOperation: string;
    strokeStyle: any;
    translate(x: number, y: number): void;
    lineWidth: number;
    save(): void;
    restore(): void;
    font: string;
    fillText(txt: string, x: number, y: number, fontStr: string, color: string, align: string): void;
    _fast_filltext(data: WordText, x: number, y: number, fontObj: any, color: string, strokeColor: string, lineWidth: number, textAlign: number, underLine?: number): void;
    fillWords(words: Array<any>, x: number, y: number, fontStr: string, color: string): void;
    fillBorderWords(words: Array<any>, x: number, y: number, font: string, color: string, borderColor: string, lineWidth: number): void;
    drawText(text: any, x: number, y: number, font: string, color: string, textAlign: string): void;
    /**
     * 只画边框
     * @param	text
     * @param	x
     * @param	y
     * @param	font
     * @param	color
     * @param	lineWidth
     * @param	textAlign
     */
    strokeWord(text: any, x: number, y: number, font: string, color: string, lineWidth: number, textAlign: string): void;
    /**
     * 即画文字又画边框
     * @param	txt
     * @param	x
     * @param	y
     * @param	fontStr
     * @param	fillColor
     * @param	borderColor
     * @param	lineWidth
     * @param	textAlign
     */
    fillBorderText(txt: any, x: number, y: number, fontStr: string, fillColor: string, borderColor: string, lineWidth: number, textAlign: string): void;
    fillRect(x: number, y: number, width: number, height: number, fillStyle: any): void;
    fillTexture(texture: Texture, x: number, y: number, width: number, height: number, type: string, offset: Point, other: any): void;
    /**
     * 反正只支持一种filter，就不要叫setFilter了，直接叫setColorFilter
     * @param	value
     */
    setColorFilter(filter: ColorFilter): void;
    drawTexture(tex: Texture, x: number, y: number, width: number, height: number): void;
    drawTextures(tex: Texture, pos: Array<any>, tx: number, ty: number): void;
    _drawTextureM(tex: Texture, x: number, y: number, width: number, height: number, m: Matrix, alpha: number, uv: Array<any>): boolean;
    _drawRenderTexture(tex: RenderTexture2D, x: number, y: number, width: number, height: number, m: Matrix, alpha: number, uv: Array<any>): boolean;
    submitDebugger(): void;
    _copyClipInfo(submit: Submit, clipInfo: Matrix): void;
    /**
     * 这个还是会检查是否合并
     * @param	tex
     * @param	minVertNum
     */
    _useNewTex2DSubmit(tex: Texture, minVertNum: number): void;
    /**
     * 使用上面的设置（texture，submit，alpha，clip），画一个rect
     */
    _drawTexRect(x: number, y: number, w: number, h: number, uv: Array<any>): void;
    drawCallOptimize(enbale: boolean): boolean;
    /**
     *
     * @param	tex
     * @param  imgid 图片id用来比较合并的
     * @param	x
     * @param	y
     * @param	width
     * @param	height
     * @param	m
     * @param	alpha
     * @param	uv
     * @return
     */
    _inner_drawTexture(tex: Texture, imgid: number, x: number, y: number, width: number, height: number, m: Matrix, uv: Array<any>, alpha: number, lastRender: boolean): boolean;
    /**
     * 转换4个顶点。为了效率这个不做任何检查。需要调用者的配合。
     * @param	a		输入。8个元素表示4个点
     * @param	out		输出
     */
    transform4Points(a: Array<any>, m: Matrix, out: Array<any>): void;
    /**
     * pt所描述的多边形完全在clip外边，整个被裁掉了
     * @param	pt
     * @return
     */
    clipedOff(pt: Array<any>): boolean;
    /**
     * 应用当前矩阵。把转换后的位置放到输出数组中。
     * @param	x
     * @param	y
     * @param	w
     * @param	h
     * @param   italicDeg 倾斜角度，单位是度。0度无，目前是下面不动。以后要做成可调的
     */
    transformQuad(x: number, y: number, w: number, h: number, italicDeg: number, m: Matrix, out: Array<any>): void;
    pushRT(): void;
    popRT(): void;
    useRT(rt: RenderTexture2D): void;
    RTRestore(rt: RenderTexture2D): void;
    /**
     * 强制拒绝submit合并
     * 例如切换rt的时候
     */
    breakNextMerge(): void;
    /**
     *
     * @param	tex
     * @param	x
     * @param	y
     * @param	width
     * @param	height
     * @param	transform	图片本身希望的矩阵
     * @param	tx			节点的位置
     * @param	ty
     * @param	alpha
     */
    drawTextureWithTransform(tex: Texture, x: number, y: number, width: number, height: number, transform: Matrix, tx: number, ty: number, alpha: number, blendMode: string, colorfilter?: ColorFilter): void;
    drawCanvas(canvas: HTMLCanvas, x: number, y: number, width: number, height: number): void;
    drawTarget(rt: RenderTexture2D, x: number, y: number, width: number, height: number, m: Matrix, shaderValue: Value2D, uv?: Array<any>, blend?: number): boolean;
    drawTriangles(tex: Texture, x: number, y: number, vertices: Float32Array, uvs: Float32Array, indices: Uint16Array, matrix: Matrix, alpha: number, color: ColorFilter, blendMode: string): void;
    transform(a: number, b: number, c: number, d: number, tx: number, ty: number): void;
    _transformByMatrix(matrix: Matrix, tx: number, ty: number): void;
    setTransformByMatrix(value: Matrix): void;
    rotate(angle: number): void;
    scale(scaleX: number, scaleY: number): void;
    clipRect(x: number, y: number, width: number, height: number): void;
    drawMesh(x: number, y: number, ib: IndexBuffer2D, vb: VertexBuffer2D, numElement: number, mat: Matrix, shader: Shader, shaderValues: Value2D, startIndex?: number): void;
    addRenderObject(o: ISubmit): void;
    /**
     *
     * @param	start
     * @param	end
     */
    submitElement(start: number, end: number): number;
    flush(): number;
    setPathId(id: number): void;
    beginPath(convex?: boolean): void;
    closePath(): void;
    /**
     * 添加一个path。
     * @param	points [x,y,x,y....]	这个会被保存下来，所以调用者需要注意复制。
     * @param	close	是否闭合
     * @param   convex 是否是凸多边形。convex的优先级是这个最大。fill的时候的次之。其实fill的时候不应该指定convex，因为可以多个path
     * @param	dx  需要添加的平移。这个需要在应用矩阵之前应用。
     * @param	dy
     */
    addPath(points: Array<any>, close: boolean, convex: boolean, dx: number, dy: number): void;
    fill(): void;
    stroke(): void;
    moveTo(x: number, y: number): void;
    /**
     *
     * @param	x
     * @param	y
     * @param	b 是否应用矩阵
     */
    lineTo(x: number, y: number): void;
    arcTo(x1: number, y1: number, x2: number, y2: number, r: number): void;
    arc(cx: number, cy: number, r: number, startAngle: number, endAngle: number, counterclockwise?: boolean, b?: boolean): void;
    quadraticCurveTo(cpx: number, cpy: number, x: number, y: number): void;
    rect(x: number, y: number, width: number, height: number): void;
    /**
     * 把颜色跟当前设置的alpha混合
     * @return
     */
    mixRGBandAlpha(color: number): number;
    _mixRGBandAlpha(color: number, alpha: number): number;
    strokeRect(x: number, y: number, width: number, height: number, parameterLineWidth: number): void;
    clip(): void;
    drawParticle(x: number, y: number, pt: any): void;
    readonly canvas: HTMLCanvas;
}

class ContextParams {
    static DEFAULT: ContextParams;
    lineWidth: number;
    path: any;
    textAlign: string;
    textBaseline: string;
    clear(): void;
    make(): ContextParams;
}