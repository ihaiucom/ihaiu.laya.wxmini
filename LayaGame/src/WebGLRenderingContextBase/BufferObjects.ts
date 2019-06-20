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