/** 
 * 正面方向
 * https://developer.mozilla.org/zh-CN/docs/Web/API/WebGLRenderingContext/frontFace
 * 
 * void gl.frontFace(mode);
 * 通过设置缠绕方向来指定多边形是正面还是背面。
 * model: 卷绕方向。默认值为gl.CCW。
 */
export class FrontFaceDirection
{
    /**
     * 顺时针缠绕。
     */
    static readonly  CW                             : GLenum                = 0x0900;

    /**
     * 逆时针绕组。
     */
    static readonly  CCW                            : GLenum                = 0x0901;

}