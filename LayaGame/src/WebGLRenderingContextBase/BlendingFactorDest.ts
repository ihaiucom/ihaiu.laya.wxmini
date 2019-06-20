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