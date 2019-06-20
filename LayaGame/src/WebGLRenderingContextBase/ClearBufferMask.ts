
/**
 * 清除缓冲掩码
 */
export class ClearBufferMask
{
    /** 深度 缓冲 */
    static readonly  DEPTH_BUFFER_BIT     : GLenum                = 0x00000100;

    /** 模板 缓冲 */
    static readonly  STENCIL_BUFFER_BIT   : GLenum                = 0x00000400;
    
    /** 颜色 缓冲 */
    static readonly  COLOR_BUFFER_BIT     : GLenum                = 0x00004000;
}