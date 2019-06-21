///////////////////////
// WebGL 常量
// https://developer.mozilla.org/zh-CN/docs/Web/API/WebGL_API/Constants
///////////////////////



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



/**
 * 开始模式
 */
export class BeginMode 
{
    /** 点 */
    static readonly  POINTS                         : GLenum                = 0x0000;

    /** 线 */
    static readonly  LINES                          : GLenum                = 0x0001;
    static readonly  LINE_LOOP                      : GLenum                = 0x0002;
    static readonly  LINE_STRIP                     : GLenum                = 0x0003;

    /** 三角形 */
    static readonly  TRIANGLES                      : GLenum                = 0x0004;
    static readonly  TRIANGLE_STRIP                 : GLenum                = 0x0005;
    static readonly  TRIANGLE_FAN                   : GLenum                = 0x0006;

}


/**
 * 混合 缓冲 因子
 */
export class BlendingFactorDest
{
    static readonly  ZERO                           : GLenum                = 0;
    static readonly  ONE                            : GLenum                = 1;



    /** 当前颜色： src.rgb */
    static readonly  SRC_COLOR                      : GLenum                = 0x0300;

    /** 1-当前颜色：  1 - src.rgb */
    static readonly  ONE_MINUS_SRC_COLOR            : GLenum                = 0x0301;



    /** 当前alpha：  src.a */
    static readonly  SRC_ALPHA                      : GLenum                = 0x0302;
    
    /** 1-当前alpha：  1 - src.a */
    static readonly  ONE_MINUS_SRC_ALPHA            : GLenum                = 0x0303;


    
    /** 缓冲alpha：  dst.a */
    static readonly  DST_ALPHA                      : GLenum                = 0x0304;

    /** 1-缓冲alpha：  1 - dst.a */
    static readonly  ONE_MINUS_DST_ALPHA            : GLenum                = 0x0305;
}


/**
 * 混合 当前 因子
 */
export class BlendingFactorSrc
{
    static readonly  ZERO                           : GLenum                = 0;
    static readonly  ONE                            : GLenum                = 1;


    /** 目标颜色:  dst.rgb */
    static readonly  DST_COLOR                      : GLenum                = 0x0306;
    /** 1-目标颜色:  1 - dst.rgb */
    static readonly  ONE_MINUS_DST_COLOR            : GLenum                = 0x0307;

    /**
     * min(src.a,  1-src.a)
     */
    static readonly  SRC_ALPHA_SATURATE             : GLenum                = 0x0308;
}



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


/**
 * 混合减法
 */
export class BlendSubtract 
{
    /**
     * 源 - 目的地
     */
    static readonly  FUNC_SUBTRACT                  : GLenum                = 0x800A;

    /**
     * 目的地 - 源
     */
    static readonly  FUNC_REVERSE_SUBTRACT          : GLenum                = 0x800B;
}


/**
 * 特殊混合函数
 */
export class BlendSeparateFunctions
{
    
    static readonly  BLEND_DST_RGB                  : GLenum                = 0x80C8;
    static readonly  BLEND_SRC_RGB                  : GLenum                = 0x80C9;
    static readonly  BLEND_DST_ALPHA                : GLenum                = 0x80CA;
    static readonly  BLEND_SRC_ALPHA                : GLenum                = 0x80CB;
    static readonly  CONSTANT_COLOR                 : GLenum                = 0x8001;
    static readonly  ONE_MINUS_CONSTANT_COLOR       : GLenum                = 0x8002;
    static readonly  CONSTANT_ALPHA                 : GLenum                = 0x8003;
    static readonly  ONE_MINUS_CONSTANT_ALPHA       : GLenum                = 0x8004;
    static readonly  BLEND_COLOR                    : GLenum                = 0x8005;
}

// ## ExamplesSection
// gl.enable(gl.BLEND);
// gl.blendFunc(gl.SRC_COLOR, gl.DST_COLOR);
// gl.getParameter(gl.BLEND_SRC_RGB) == gl.SRC_COLOR;
// // true

// ## ExamplesSection
// gl.enable(gl.BLEND);
// gl.blendFuncSeparate(gl.SRC_COLOR, gl.DST_COLOR, gl.ONE, gl.ZERO);
// gl.getParameter(gl.BLEND_SRC_RGB) == gl.SRC_COLOR;
// // true








/**
 * 缓冲对象
 */
export class BufferObjects
{
    /**
     * 数组缓冲
     * 包含顶点属性的Buffer，如顶点坐标，纹理坐标数据或顶点颜色数
     * 
     * var buffer = gl.createBuffer();
     * gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
     */
    static readonly  ARRAY_BUFFER                   : GLenum                = 0x8892;

    /**
     * 索引缓冲
     * 用于元素索引的Buffer。
     */
    static readonly  ELEMENT_ARRAY_BUFFER           : GLenum                = 0x8893;

    /**
     * 获取当前绑定
     * 检查当前的缓冲区绑定
     * 
     * gl.getParameter(gl.ARRAY_BUFFER_BINDING);
     */
    static readonly  ARRAY_BUFFER_BINDING           : GLenum                = 0x8894;

    
    /**
     * 获取当前绑定
     * 检查当前的缓冲区绑定
     * 
     * gl.getParameter(gl.ELEMENT_ARRAY_BUFFER_BINDING);
     */
    static readonly  ELEMENT_ARRAY_BUFFER_BINDING   : GLenum                = 0x8895;


    /**
     * "Static”意味着VBO中的数据不会被改变（一次修改，多次使用），
     * "dynamic”意味着数据可以被频繁修改（多次修改，多次使用），
     * "stream”意味着数据每帧都不同（一次修改，一次使用）。
     * 
     * "Draw”意味着数据将会被送往GPU进行绘制，
     * "read”意味着数据会被用户的应用读取，
     * "copy”意味着数据会被用于绘制和读取。
     * 
     * 注意在使用VBO时，只有draw是有效的，而copy和read主要将会在像素缓冲区（PBO）和帧缓冲区（FBO）中发挥作用。
     * 
     * var canvas = document.getElementById('canvas');
     * var gl = canvas.getContext('webgl');
     * var buffer = gl.createBuffer();
     * gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
     * gl.bufferData(gl.ARRAY_BUFFER, 1024, gl.STATIC_DRAW);
     */
    static readonly  STREAM_DRAW                    : GLenum                = 0x88E0;
    static readonly  STATIC_DRAW                    : GLenum                = 0x88E4;
    static readonly  DYNAMIC_DRAW                   : GLenum                = 0x88E8;



    /**
     * 获取一个缓冲大小
     * gl.getBufferParameter(gl.ARRAY_BUFFER, gl.BUFFER_SIZE);
     * gl.getBufferParameter(gl.ARRAY_BUFFER, gl.BUFFER_USAGE);
     */
    static readonly  BUFFER_SIZE                    : GLenum                = 0x8764;
    
    /**
     * 以获取创建缓冲区时传入的缓冲区提示
     * gl.getBufferParameter(gl.ARRAY_BUFFER, gl.BUFFER_USAGE);
     */
    static readonly  BUFFER_USAGE                   : GLenum                = 0x8765;

    /**
     * 传递给getVertexttrib以读取当前顶点属性。
     */
    static readonly  CURRENT_VERTEX_ATTRIB          : GLenum                = 0x8626;

}


/**
 * 裁剪模式
 * WebGLRenderingContext.cullFace().
 * 
 * gl.enable(gl.CULL_FACE);
 * gl.cullFace(gl.FRONT_AND_BACK);
 * 
 * gl.getParameter(gl.CULL_FACE_MODE) === gl.FRONT_AND_BACK;
 * // true
 * 
 * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/blendFuncSeparate
 * https://developer.mozilla.org/zh-CN/docs/Web/API/WebGL_API/Constants
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