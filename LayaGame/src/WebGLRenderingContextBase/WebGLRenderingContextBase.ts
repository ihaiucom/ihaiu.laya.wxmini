
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