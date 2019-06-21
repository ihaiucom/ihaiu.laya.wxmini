/**
 * 错误码
 * https://developer.mozilla.org/zh-CN/docs/Web/API/WebGLRenderingContext/getError
 * 
 * WebGLRenderingContext.getError().
 * 
 * gl.getError(); // gl.NO_ERROR (0)
 * 
 * gl.enable(gl.FOOBAR);
 * gl.getError(); // gl.INVALID_ENUM;
 */
export class ErrorCode
{
    /**
     * 没有错误
     */
    static readonly  NO_ERROR                       : GLenum                = 0;

    /** 
     * 无效枚举 
     * 已为枚举参数指定了不可接受的值。忽略该命令并设置错误标志。
     */
    static readonly  INVALID_ENUM                   : GLenum                = 0x0500;

    /** 
     * 无效值
     * 数字参数超出范围。忽略该命令并设置错误标志
     */
    static readonly  INVALID_VALUE                  : GLenum                = 0x0501;

    /** 
     * 无效操作 
     * 前状态不允许指定的命令。忽略该命令并设置错误标志。
     */
    static readonly  INVALID_OPERATION              : GLenum                = 0x0502;

    /** 
     * 内存不足 
     * 没有足够的内存来执行命令。
     */
    static readonly  OUT_OF_MEMORY                  : GLenum                = 0x0505;

    
    /** 
     * 当尝试渲染或从中读取时，当前绑定的帧缓冲区不是帧缓冲完成的。
     */
    static readonly  INVALID_FRAMEBUFFER_OPERATION  : GLenum                = 0x0506;

    /**
     * 如果WebGL上下文丢失，则在第一次调用时返回此错误getError。然后，直到上下文恢复，它返回gl.NO_ERROR。
     * https://developer.mozilla.org/en-US/docs/Web/API/WebGLContextEvent
     * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/isContextLost
     */
    static readonly  CONTEXT_LOST_WEBGL             : GLenum                = 0x9242;

}