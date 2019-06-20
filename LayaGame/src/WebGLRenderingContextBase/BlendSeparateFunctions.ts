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