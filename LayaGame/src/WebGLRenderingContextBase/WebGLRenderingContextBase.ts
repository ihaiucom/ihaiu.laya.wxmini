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

/**
 * 
 * https://developer.mozilla.org/zh-CN/docs/Web/API/WebGLRenderingContext/getParameter
 * 
 * any gl.getParameter(pname);
 * 为传入的参数名称返回一个值。
 */
export class GetPName
{
    /**
     * 获取当前的线宽（由lineWidth 方法设置）。
     * 
     * https://developer.mozilla.org/zh-CN/docs/Web/API/WebGLRenderingContext/lineWidth
     * 
     * void gl.lineWidth(width);
     * 设置栅格化线的线宽。
     * width:指定栅格化线条的宽度。默认值：1。
     * 
     * 基于OpenGL ES 2.0 / 3.0规范的webgl规范指出，行的最小和最大宽度是实现定义的。
     * 最大最小宽度允许为1.0。最小最大宽度也允许为1.0。
     * 由于这些实现定义的限制，不建议使用1.0以外的行宽，因为不保证任何用户的浏览器将显示任何其他宽度。
     * 
     * 截至2017年1月，大多数WebGL实现仅支持最小1和最大1，因为它们所基于的技术具有相同的限制。
     * 
     * // 设置线宽：
     * gl.lineWidth(5);
     * 
     * // 获得线宽：
     * gl.getParameter(gl.LINE_WIDTH);
     * 
     * // 获得可用宽度范围。返回一个Float32Array。
     * gl.getParameter(gl.ALIASED_LINE_WIDTH_RANGE);
     */
    static readonly  LINE_WIDTH                     : GLenum                = 0x0B21;

    /**
     * 获取用gl.POINTS 绘制的点的当前大小
     */
    static readonly  ALIASED_POINT_SIZE_RANGE       : GLenum                = 0x846D;

    /**
     * 获取行的可用宽度范围。返回一个长度为2的数组  min=arr[0], max=arr[1]。
     * 
     * https://developer.mozilla.org/zh-CN/docs/Web/API/WebGLRenderingContext/lineWidth
     */
    static readonly  ALIASED_LINE_WIDTH_RANGE       : GLenum                = 0x846E;

    /**
     * 获取cullFace的当前值。应该返回前面、后面或前面和后面
     * https://developer.mozilla.org/zh-CN/docs/Web/API/WebGLRenderingContext/cullFace
     * 
     * gl.enable(gl.CULL_FACE);
     * gl.cullFace(gl.FRONT_AND_BACK);
     * 
     * // 要检查当前的剔除面部模式，请查询CULL_FACE_MODE常量。
     * gl.getParameter(gl.CULL_FACE_MODE) === gl.FRONT_AND_BACK; // true
     */
    static readonly  CULL_FACE_MODE                 : GLenum                = 0x0B45;

    /**
     * 确定frontface的当前值。应返回CW或CCW。
     * https://developer.mozilla.org/zh-CN/docs/Web/API/WebGLRenderingContext/frontFace
     */
    static readonly  FRONT_FACE                     : GLenum                = 0x0B46;

    /**
     * 返回一个长度为2的浮点数组，给出当前的深度范围。min=arr[0], max=arr[1]。
     * 
     * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/depthRange
     * 
     * void gl.depthRange(zNear, zFar);
     * zNear: 指定近剪裁平面到窗口或视口坐标的映射。夹紧到0到1的范围，必须小于或等于zFar。默认值 0.
     * zFar: 指定远剪裁平面到窗口或视口坐标的映射。夹紧到0到1的范围。默认值 1.
     * 
     * gl.depthRange(0.2, 0.6);
     * gl.getParameter(gl.DEPTH_RANGE); // Float32Array[0.2, 0.6]
     */
    static readonly  DEPTH_RANGE                    : GLenum                = 0x0B70;

    /**
     * 确定是否启用深度写入掩码。
     * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/depthMask
     * 
     * void gl.depthMask(flag);
     * 设置是启用还是禁用写入深度缓冲
     * flag: 指定是否写入深度缓存启用。默认值：true表示已启用写入
     * 
     * 
     * 
     * gl.depthMask(false);
     * gl.getParameter(gl.DEPTH_WRITEMASK); // false
     */
    static readonly  DEPTH_WRITEMASK                : GLenum                = 0x0B72;

    /**
     * 要获取当前深度清除值
     * 
     * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/clearDepth
     * 
     * void gl.clearDepth(depth);
     * 指定深度缓冲区的清除值。
     * depth: 指定清除深度缓冲区时使用的深度值。默认值：1。
     * 
     * gl.clearDepth(0.5);
     * // 要获取当前深度清除值，请查询DEPTH_CLEAR_VALUE常量。
     * gl.getParameter(gl.DEPTH_CLEAR_VALUE);// 0.5
     */
    static readonly  DEPTH_CLEAR_VALUE              : GLenum                = 0x0B73;

    /**
     * 获取深度比较函数
     * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/depthFunc
     * 
     * void gl.depthFunc(func);
     * 指定将传入像素深度与当前深度缓冲区值进行比较的函数。
     * func: 指定深度比较功能，该功能设置绘制像素的条件。默认值为gl.LESS
     * Returns NEVER, ALWAYS, LESS, EQUAL, LEQUAL, GREATER, GEQUAL, or NOTEQUAL.
     * 
     * gl.enable(gl.DEPTH_TEST);
     * gl.depthFunc(gl.NEVER);
     * 
     * gl.getParameter(gl.DEPTH_FUNC) === gl.NEVER; // true
     */
    static readonly  DEPTH_FUNC                     : GLenum                = 0x0B74;

    /**
     * 获取模板清除值
     * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/clearStencil
     * 
     * void gl.clearStencil(s);
     * 指定模板缓冲区的清除值。
     * s:指定清除模板缓冲区时使用的索引。默认值：0。
     * 
     * gl.clearStencil(1);
     * // 要获取当前模板清除值，请查询STENCIL_CLEAR_VALUE常量。
     * gl.getParameter(gl.STENCIL_CLEAR_VALUE); // 1
     * 
     */
    static readonly  STENCIL_CLEAR_VALUE            : GLenum                = 0x0B91;

    /**
     * 获取模板函数
     * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/stencilFunc
     * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/stencilFuncSeparate
     * void gl.stencilFunc(func, ref, mask);
     * void gl.stencilFuncSeparate(face, func, ref, mask);
     * 
     * gl.enable(gl.STENCIL_TEST);
     * gl.stencilFunc(gl.LESS, 0, 0b1110011);
     * 
     * gl.getParameter(gl.STENCIL_FUNC); // LESS
     * 
     * gl.enable(gl.STENCIL_TEST);
     * gl.stencilFuncSeparate(gl.FRONT, gl.LESS, 0.2, 1110011);
     * 
     * Returns NEVER, ALWAYS, LESS, EQUAL, LEQUAL, GREATER, GEQUAL, or NOTEQUAL.
     */
    static readonly  STENCIL_FUNC                   : GLenum                = 0x0B92;

    /**
     * 模板测试失败时使用的功能
     * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/stencilOp
     * 
     * 
     * void gl.stencilOp(fail, zfail, zpass);
     * fail: 指定模板测试失败时使用的功能。默认值为gl.KEEP。
     * zfail: 指定模板测试通过时要使用的功能，但深度测试失败。默认值为gl.KEEP。
     * zpass: 指定要使用的功能当两个模板测试，深度测试通过，或当模版测试通过，并且没有深度缓冲器或深度测试被禁用。默认值为gl.KEEP。
     * 
     * gl.enable(gl.STENCIL_TEST);
     * gl.stencilOp(gl.INCR, gl.DECR, gl.INVERT);
     * 
     * gl.getParameter(gl.STENCIL_FAIL);
     * 
     */
    static readonly  STENCIL_FAIL                   : GLenum                = 0x0B94;
    static readonly  STENCIL_PASS_DEPTH_FAIL        : GLenum                = 0x0B95;
    static readonly  STENCIL_PASS_DEPTH_PASS        : GLenum                = 0x0B96;
    static readonly  STENCIL_REF                    : GLenum                = 0x0B97;
    static readonly  STENCIL_VALUE_MASK             : GLenum                = 0x0B93;
    static readonly  STENCIL_WRITEMASK              : GLenum                = 0x0B98;
    static readonly  STENCIL_BACK_FUNC              : GLenum                = 0x8800;
    static readonly  STENCIL_BACK_FAIL              : GLenum                = 0x8801;
    static readonly  STENCIL_BACK_PASS_DEPTH_FAIL   : GLenum                = 0x8802;
    static readonly  STENCIL_BACK_PASS_DEPTH_PASS   : GLenum                = 0x8803;
    static readonly  STENCIL_BACK_REF               : GLenum                = 0x8CA3;
    static readonly  STENCIL_BACK_VALUE_MASK        : GLenum                = 0x8CA4;
    static readonly  STENCIL_BACK_WRITEMASK         : GLenum                = 0x8CA5;

    /**
     * 返回一个包含四个元素的Int32Array作为当前视区维度。
     * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/viewport
     * void gl.viewport(x, y, width, height);
     * 
     * gl.viewport(0, 0, canvas.width, canvas.height);
     * // 视口宽度和高度被限制在与实现相关的范围内。要获得此范围，可以使用MAX_VIEWPORT_DIMS常量，返回一个Int32Array。
     * gl.getParameter(gl.MAX_VIEWPORT_DIMS); // e.g. Int32Array[16384, 16384]
     * // 要获取当前视口，请查询VIEWPORT常量。
     * gl.getParameter(gl.VIEWPORT);// e.g. Int32Array[0, 0, 640, 480]
     */
    static readonly  VIEWPORT                       : GLenum                = 0x0BA2;

    /**
     * 返回一个包含四个元素的Int32Array作为当前剪切框维度。
     * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/scissor
     * void gl.scissor(x, y, width, height);
     * 
     * gl.enable(gl.SCISSOR_TEST);
     * 
     * gl.scissor(0, 0, 200, 200);
     * // 要获取当前剪刀框尺寸，请查询SCISSOR_BOX返回的常量Int32Array。
     * gl.getParameter(gl.SCISSOR_BOX); // Int32Array[0, 0, 200, 200]
     * 
     * 
     * https://blog.csdn.net/danshiming/article/details/54291311
     * 剪裁测试用于限制绘制区域。我们可以指定一个矩形的剪裁窗口，当启用剪裁测试后，只有在这个窗口之内的像素才能被绘制，其它像素则会被丢弃。
     * 换句话说，无论怎么绘制，剪裁窗口以外的像素将不会被修改。
     * 
     */
    static readonly  SCISSOR_BOX                    : GLenum                = 0x0C10;
}