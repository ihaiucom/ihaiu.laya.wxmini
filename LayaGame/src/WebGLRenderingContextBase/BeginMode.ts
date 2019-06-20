

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