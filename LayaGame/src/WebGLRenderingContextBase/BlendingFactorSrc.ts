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