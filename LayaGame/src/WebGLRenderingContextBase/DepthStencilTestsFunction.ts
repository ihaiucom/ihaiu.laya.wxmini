
/**
 * 深度 和 模板， 测试比较操作
 * 
 * 
 * 
 * https://developer.mozilla.org/zh-CN/docs/Web/API/WebGLRenderingContext/depthFunc
 * 深度测试默认是禁用的。 要启用或禁用深度测试，请使用带有参数  gl.DEPTH_TEST 的 enable() 和 disable() 方法。
 * gl.enable(gl.DEPTH_TEST);
 * gl.depthFunc(gl.NEVER);
 * 
 * 要检查当前深度函数，请查询 DEPTH_FUNC 常量。
 * gl.getParameter(gl.DEPTH_FUNC) === gl.NEVER;
 * // true
 * 
 * 
 * 
 * https://developer.mozilla.org/zh-CN/docs/Web/API/WebGLRenderingContext/stencilFunc
 * gl.enable(gl.STENCIL_TEST);
 * gl.stencilFunc(gl.LESS, 0, 0b1110011);
 * gl.getParameter(gl.STENCIL_FUNC);
 * gl.getParameter(gl.STENCIL_VALUE_MASK);
 * gl.getParameter(gl.STENCIL_REF);
 * gl.getParameter(gl.STENCIL_BACK_FUNC);
 * gl.getParameter(gl.STENCIL_BACK_VALUE_MASK);
 * gl.getParameter(gl.STENCIL_BACK_REF);
 * gl.getParameter(gl.STENCIL_BITS);
 * 
 * See also
 * WebGLRenderingContext.stencilFuncSeparate()
 * WebGLRenderingContext.stencilMask()
 * WebGLRenderingContext.stencilMaskSeparate()
 * WebGLRenderingContext.stencilOp()
 * WebGLRenderingContext.stencilOpSeparate()
 * 
 */
export class DepthStencilTestsFunction
{
    /**
     * 永不通过
     */
    static readonly  NEVER                          : GLenum                = 0x0200;

    /**
     * 深度： 如果传入值小于深度缓冲值，则通过
     * 
     * 模板： if (ref & mask) <  (stencil & mask)
     */
    static readonly  LESS                           : GLenum                = 0x0201;

    
    /**
     * 深度： 如果传入值等于深度缓冲区值，则通过
     * 
     * 模板：  if (ref & mask) =  (stencil & mask).
     */
    static readonly  EQUAL                          : GLenum                = 0x0202;

    
    /**
     * 深度： 如果传入值小于或等于深度缓冲区值，则通过
     * 
     * 模板： if (ref & mask) <= (stencil & mask).
     */
    static readonly  LEQUAL                         : GLenum                = 0x0203;

    
    /**
     * 深度： 如果传入值大于深度缓冲区值，则通过
     * 
     * 模板： if (ref & mask) >  (stencil & mask).
     */
    static readonly  GREATER                        : GLenum                = 0x0204;

    
    /**
     * 深度： 如果传入的值不等于深度缓冲区值，则通过
     * 
     * 模板： if (ref & mask) != (stencil & mask).
     */
    static readonly  NOTEQUAL                       : GLenum                = 0x0205;

    
    /**
     * 深度： 如果传入值大于或等于深度缓冲区值，则通过
     * 
     * 模板： if (ref & mask) >= (stencil & mask).
     */
    static readonly  GEQUAL                         : GLenum                = 0x0206;

    
    /**
     * 总是通过
     */
    static readonly  ALWAYS                         : GLenum                = 0x0207;

}