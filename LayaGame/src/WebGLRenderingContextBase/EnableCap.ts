/**
 * 启用或者关闭功能
 * gl.enabel(cap) 
 * gl.disable(cap) 
 * gl.isEnabled(cap) 
 * 
 * WebGLRenderingContext.disable(cap)
 * WebGLRenderingContext.isEnabled(cap)
 * 
 * https://developer.mozilla.org/zh-CN/docs/Web/API/WebGLRenderingContext/enable
 */
export class EnableCap
{
    /* TEXTURE_2D */


    /**
     * 激活多边形正反面剔除.
     * https://developer.mozilla.org/zh-CN/docs/Web/API/WebGLRenderingContext/cullFace
     * WebGLRenderingContext.cullFace().
     * 通过以启用/禁用以打开/关闭 剔除。也可以与getParameter一起使用以查找当前的剔除方法。
     * 
     * gl.enable(gl.CULL_FACE);
     * gl.cullFace(gl.FRONT_AND_BACK);
     * 
     * gl.getParameter(gl.CULL_FACE_MODE) === gl.FRONT_AND_BACK;
     * // true
     */
    static readonly  CULL_FACE                      : GLenum                = 0x0B44;

    /**
     * 激活片元的颜色融合计算
     * https://developer.mozilla.org/zh-CN/docs/Web/API/WebGLRenderingContext/blendFunc
     * void gl.blendFunc(sfactor, dfactor);
     * 
     * gl.enable(gl.BLEND);
     * gl.blendFunc(gl.SRC_COLOR, gl.DST_COLOR);
     * 
     */
    static readonly  BLEND                          : GLenum                = 0x0BE2;

    /**
     * 激活在写入颜色缓冲区之前，抖动颜色成分。
     * gl.disable(gl.DITHER)
     * gl.enable(gl.DITHER)
     */
    static readonly  DITHER                         : GLenum                = 0x0BD0;

    /**
     * 激活模板测试并且更新模板缓冲区。
     * https://developer.mozilla.org/zh-CN/docs/Web/API/WebGLRenderingContext/stencilFunc
     * void gl.stencilFunc(func, ref, mask);
     * 
     * gl.enable(gl.STENCIL_TEST);
     * gl.stencilFunc(gl.LESS, 0, 0b1110011);
     */
    static readonly  STENCIL_TEST                   : GLenum                = 0x0B90;

    /**
     * 激活深度比较，并且更新深度缓冲区。
     * https://developer.mozilla.org/zh-CN/docs/Web/API/WebGLRenderingContext/depthFunc
     * void gl.depthFunc(func);
     * 
     * gl.enable(gl.DEPTH_TEST);
     * gl.depthFunc(gl.NEVER);
     */
    static readonly  DEPTH_TEST                     : GLenum                = 0x0B71;

    /**
     * 激活剪裁测试，即丢弃在剪裁矩形范围外的片段。
     * https://developer.mozilla.org/zh-CN/docs/Web/API/WebGLRenderingContext/scissor
     * 
     * void gl.scissor(x, y, width, height);
     * 设置了一个剪刀框，它将绘图限制为指定的矩形。
     * 如果宽度或高度为负值，gl.INVALID_VALUE则会引发错误。
     * x: 指定框左下角的水平坐标。默认值：0。
     * y: 指定框左下角的垂直坐标。默认值：0。
     * width: 指定剪刀盒宽度的非负值。默认值：画布的宽度。
     * height: 指定剪刀盒高度的非负值。默认值：画布的高度。
     * 
     * gl.enable(gl.SCISSOR_TEST);
     * gl.scissor(0, 0, 200, 200);
     * gl.getParameter(gl.SCISSOR_BOX); // Int32Array[0, 0, 200, 200]
     * // execute drawing commands in the scissor box (e.g. clear)
     * gl.disable(gl.SCISSOR_TEST);
     * 
     * 
     * 
     */
    static readonly  SCISSOR_TEST                   : GLenum                = 0x0C11;

    /**
     * 激活添加多边形片段的深度值偏移。
     * https://developer.mozilla.org/zh-CN/docs/Web/API/WebGLRenderingContext/polygonOffset
     * 
     * void gl.polygonOffset(factor, units);
     * 指定用于计算深度值的比例因子和单位。
     * 在执行深度测试之前和将值写入深度缓冲区之前添加偏移量。
     * factor: 为每个多边形设置可变深度偏移的比例因子。默认值为0。
     * units: 设置乘以特定实现值的乘数，以创建恒定的深度偏移。默认值为0。
     * 
     * 
     * gl.enable(gl.POLYGON_OFFSET_FILL);
     * gl.polygonOffset(2, 3);
     * 
     * gl.getParameter(gl.POLYGON_OFFSET_FACTOR); // 2
     * gl.getParameter(gl.POLYGON_OFFSET_UNITS);  // 3
     */
    static readonly  POLYGON_OFFSET_FILL            : GLenum                = 0x8037;

    /**
     * 激活通过alpha值决定的临时覆盖值计算。（抗锯齿）
     * 
     */
    static readonly  SAMPLE_ALPHA_TO_COVERAGE       : GLenum                = 0x809E;

    /**
     * 激活使用临时覆盖值，位和运算片段的覆盖值。
     * https://developer.mozilla.org/zh-CN/docs/Web/API/WebGLRenderingContext/sampleCoverage
     * 
     * void gl.sampleCoverage(value, invert);
     * 为反锯齿效果指定了多样本覆盖参数。
     * value: 将单个浮点覆盖值设置为范围[0,1]。默认值为1.0。
     * invert: 设置是否应该反转覆盖掩码。默认值为false。
     * 
     * 
     * 默认情况下禁用多次采样。启用或禁用多采样，使用enable()和disable()方法用参数gl.SAMPLE_COVERAGE和gl.SAMPLE_ALPHA_TO_COVERAGE。
     * gl.enable(gl.SAMPLE_COVERAGE);
     * gl.sampleCoverage(0.5, false);
     * 
     * 
     * gl.getParameter(gl.SAMPLE_COVERAGE_VALUE);  // 0.5
     * gl.getParameter(gl.SAMPLE_COVERAGE_INVERT); // false
     * 
     * @see
     * HTMLCanvasElement.getContext()- antialias上下文的参数。
     */
    static readonly  SAMPLE_COVERAGE                : GLenum                = 0x80A0;
}