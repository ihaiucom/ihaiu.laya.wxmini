/**
 * 裁剪模式
 * WebGLRenderingContext.cullFace().
 * 
 * gl.enable(gl.CULL_FACE);
 * gl.cullFace(gl.FRONT_AND_BACK);
 * 
 * gl.getParameter(gl.CULL_FACE_MODE) === gl.FRONT_AND_BACK;
 * // true
 */
export class CullFaceMode
{
    /** 
     * 传递到gl.cullFace(gl.FRONT);以指定只应绘制正面。
     */
    static readonly  FRONT                          : GLenum                = 0x0404;
    
    /** 
     * 传递到gl.cullFace(gl.BACK);以指定只应绘制背面。
     */
    static readonly  BACK                           : GLenum                = 0x0405;
    
    /** 
     * 传递到gl.cullFace(gl.FRONT_AND_BACK);以指定应绘制正面和背面。
     */
    static readonly  FRONT_AND_BACK                 : GLenum                = 0x0408;

}