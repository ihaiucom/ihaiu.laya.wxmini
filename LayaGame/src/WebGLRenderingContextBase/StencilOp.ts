/**
 * 模板操作
 * WebGLRenderingContext.stencilOp()方法设置前面和后面的模板测试操作。
 * void gl.stencilOp(fail, zfail, zpass);
 * fail: 指定模板测试失败时使用的功能。默认值为gl.KEEP。
 * zfail: 指定模板测试通过时要使用的功能，但深度测试失败。默认值为gl.KEEP。
 * zpass: 指定要使用的功能当两个模板测试，深度测试通过，或当模版测试通过，并且没有深度缓冲器或深度测试被禁用。默认值为gl.KEEP。
 * 
 * 
 * 默认情况下禁用模板测试。要启用或禁用模板测试，请在参数中使用enable()和disable()方法gl.STENCIL_TEST。
 * gl.enable(gl.STENCIL_TEST);
 * gl.stencilOp(gl.INCR, gl.DECR, gl.INVERT);
 * 
 * 要获取有关模板和深度通过或失败的当前信息，请查询以下常量getParameter()。
 * gl.getParameter(gl.STENCIL_FAIL);
 * gl.getParameter(gl.STENCIL_PASS_DEPTH_PASS);
 * gl.getParameter(gl.STENCIL_PASS_DEPTH_FAIL);
 * gl.getParameter(gl.STENCIL_BACK_FAIL);
 * gl.getParameter(gl.STENCIL_BACK_PASS_DEPTH_PASS);
 * gl.getParameter(gl.STENCIL_BACK_PASS_DEPTH_FAIL);
 * gl.getParameter(gl.STENCIL_BITS);
 */
export class StencilOp
{
    
    /**
     * ZERO
     * 将模板缓冲区值设置为0。 
     */
    static readonly  ZERO                           : GLenum                = 0;

    /** 保持当前值。 */
    static readonly  KEEP                           : GLenum                = 0x1E00;

    /**
     * 将模板缓冲区值设置为指定的参考值WebGLRenderingContext.stencilFunc()。
     */
    static readonly  REPLACE                        : GLenum                = 0x1E01;

    /**
     * 增加当前模板缓冲区值。直到到最大可表示无符号值255。
     */
    static readonly  INCR                           : GLenum                = 0x1E02;

    /**
     * 增加当前模板缓冲区值。当递增最大可表示无符号值时，将模板缓冲区值包装为零。
     */
    static readonly  INCR_WRAP                      : GLenum                = 0x8507;

    /**
     * 减少当前的模板缓冲区值。直到到0。
     */
    static readonly  DECR                           : GLenum                = 0x1E03;

    /**
     * 减少当前的模板缓冲区值。在减少模板缓冲区值0时，将模板缓冲区值包装到最大可表示无符号值255。
     */
    static readonly  DECR_WRAP                      : GLenum                = 0x8508;

    /**
     * 按位反转当前模板缓冲区值。
     */
    static readonly  INVERT                         : GLenum                = 0x150A;

}