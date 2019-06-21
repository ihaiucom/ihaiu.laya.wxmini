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


    /**
     * 通过以启用/禁用以打开/关闭剪刀测试。也可以与getParameter一起使用来查询剪刀测试。
     * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/scissor
     * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/enable
     * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/disable
     * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/isEnabled
     * 
     * gl.enable(gl.SCISSOR_TEST);
     */
    static readonly  SCISSOR_TEST                   : GLenum                = 0x0C11;

    /**
     * 清除颜色值
     * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/clearColor
     * void gl.clearColor(red, green, blue, alpha);
     * 指定清除颜色缓冲区时使用的颜色值。
     * 它指定调用clear()方法时要使用的颜色值。这些值被钳制在0和1之间。
     * 
     * gl.clearColor(1, 0.5, 0.5, 3);
     * // 要获得当前的清晰颜色，请查询COLOR_CLEAR_VALUE返回a 的常量Float32Array。
     * gl.getParameter(gl.COLOR_CLEAR_VALUE);// Float32Array[1, 0.5, 0.5, 1]
     * 
     * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/clear
     */
    static readonly  COLOR_CLEAR_VALUE              : GLenum                = 0x0C22;


    /**
     * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/colorMask
     * 
     * void gl.colorMask(red, green, blue, alpha);
     * 设置在绘制或渲染时启用或禁用哪些颜色组件。WebGLFramebuffer
     * read:指定是否可以将红色分量写入帧缓冲器。默认值：true。
     * 
     * gl.colorMask(true, true, true, false);
     * // 要获取当前颜色掩码，请查询COLOR_WRITEMASK返回的常量Array。
     * gl.getParameter(gl.COLOR_WRITEMASK);// [true, true, true, false]
     */
    static readonly  COLOR_WRITEMASK                : GLenum                = 0x0C23;




    /**
     * 从内存中解包像素数据。
     * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/pixelStorei
     * void gl.pixelStorei(pname, param);
     * 指定像素存储模式。
     * pname: 指定要设置的参数。请参阅下面的可能值。
     * param: 指定要将pname参数设置为的值。请参阅下面的可能值。
     * 
     * 设置像素存储模式会影响WebGLRenderingContext.readPixels()操作，以及使用WebGLRenderingContext.texImage2D()和WebGLRenderingContext.texSubImage2D()方法解压缩纹理。
     * 
     * var tex = gl.createTexture();
     * gl.bindTexture(gl.TEXTURE_2D, tex);
     * gl.pixelStorei(gl.PACK_ALIGNMENT, 4);
     * // 要检查像素数据的打包和解包值，可以使用查询相同的像素存储参数WebGLRenderingContext.getParameter()。
     * gl.getParameter(gl.PACK_ALIGNMENT);
     * gl.getParameter(gl.UNPACK_ALIGNMENT);
     * 
     * 
     * 
     * 
     * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/readPixels
     * 从当前颜色帧缓冲区​​的指定矩形中读取像素块到对象中。ArrayBufferView
     * void gl.readPixels（x，y，width，height，format，type，pixels）;
     * x:指定从矩形像素块的左下角读取的第一个水平像素。
     * y:指定从矩形像素块的左下角读取的第一个垂直像素。
     * width:指定矩形的宽度。
     * height:指定矩形的高度。
     * format: 指定像素数据的格式。可能的值：
     *      gl.ALPHA：丢弃红色，绿色和蓝色组件并读取alpha组件。
     *      gl.RGB：丢弃alpha分量并读取红色，绿色和蓝色分量。
     *      gl.RGBA：从颜色缓冲区中读取红色，绿色，蓝色和alpha分量。
     * type: 指定像素数据的数据类型。可能的值：
     *      gl.UNSIGNED_BYTE
     *      gl.UNSIGNED_SHORT_5_6_5
     *      gl.UNSIGNED_SHORT_4_4_4_4
     *      gl.UNSIGNED_SHORT_5_5_5_1
     *      gl.FLOAT
     * pixels:将ArrayBufferView数据读入的对象。数组类型必须与type参数的类型匹配。
     *      Uint8Array对gl.UNSIGNED_BYTE。
     *      Uint16Array为gl.UNSIGNED_SHORT_5_6_5，gl.UNSIGNED_SHORT_4_4_4_4或gl.UNSIGNED_SHORT_5_5_5_1。
     *      Float32Array对gl.FLOAT。
     * dstOffset:可选的。 偏移。默认为0。
     * 
     * 
     * var canvas = document.getElementById('canvas');
     * var gl = canvas.getContext('webgl');
     * var pixels = new Uint8Array(gl.drawingBufferWidth * gl.drawingBufferHeight * 4);
     * gl.readPixels(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight, gl.RGBA, gl.UNSIGNED_BYTE, pixels);
     * console.log(pixels); // Uint8Array
     * 
     * 
     * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/texImage2D
     */
    static readonly  UNPACK_ALIGNMENT               : GLenum                = 0x0CF5;

    /**
     * 将像素数据打包到内存中
     * @see UNPACK_ALIGNMENT
     */
    static readonly  PACK_ALIGNMENT                 : GLenum                = 0x0D05;

    /**
     * 最大贴图大小
     */
    static readonly  MAX_TEXTURE_SIZE               : GLenum                = 0x0D33;

    
    /**
     * 视口宽度和高度被限制在与实现相关的范围内。要获得此范围，可以使用MAX_VIEWPORT_DIMS常量，返回一个Int32Array。
     * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/viewport
     * void gl.viewport(x, y, width, height);
     * 
     * gl.viewport(0, 0, canvas.width, canvas.height);
     * // 视口宽度和高度被限制在与实现相关的范围内。要获得此范围，可以使用MAX_VIEWPORT_DIMS常量，返回一个Int32Array。
     * gl.getParameter(gl.MAX_VIEWPORT_DIMS); // e.g. Int32Array[16384, 16384]
     * // 要获取当前视口，请查询VIEWPORT常量。
     * gl.getParameter(gl.VIEWPORT);// e.g. Int32Array[0, 0, 640, 480]
     */
    static readonly  MAX_VIEWPORT_DIMS              : GLenum                = 0x0D3A;
    static readonly  SUBPIXEL_BITS                  : GLenum                = 0x0D50;
    static readonly  RED_BITS                       : GLenum                = 0x0D52;
    static readonly  GREEN_BITS                     : GLenum                = 0x0D53;
    static readonly  BLUE_BITS                      : GLenum                = 0x0D54;
    static readonly  ALPHA_BITS                     : GLenum                = 0x0D55;
    static readonly  DEPTH_BITS                     : GLenum                = 0x0D56;
    static readonly  STENCIL_BITS                   : GLenum                = 0x0D57;
    static readonly  POLYGON_OFFSET_UNITS           : GLenum                = 0x2A00;
}