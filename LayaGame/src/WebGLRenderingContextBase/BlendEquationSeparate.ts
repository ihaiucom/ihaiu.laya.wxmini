
/**
 * 混合 方程
 * 混合方程式确定新像素如何与 WebGLFramebuffer 中的像素组合。
 */
export class BlendEquationSeparate 
{
    /**
     * 源+目的地（默认值）
     */
    static readonly  FUNC_ADD                       : GLenum                = 0x8006;

    static readonly  BLEND_EQUATION                 : GLenum                = 0x8009;
    static readonly  BLEND_EQUATION_RGB             : GLenum                = 0x8009;   /* same as BLEND_EQUATION */
    static readonly  BLEND_EQUATION_ALPHA           : GLenum                = 0x883D;
}