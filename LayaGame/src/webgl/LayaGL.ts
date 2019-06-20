import CommandEncoder from "./CommandEncoder";

Laya.LayaGL;
export default class LayaGL
{
    static EXECUTE_JS_THREAD_BUFFER=0;
	static EXECUTE_RENDER_THREAD_BUFFER=1;
	static EXECUTE_COPY_TO_RENDER=2;
	static EXECUTE_COPY_TO_RENDER3D=3;
	static VALUE_OPERATE_ADD=0;
	static VALUE_OPERATE_SUB=1;
	static VALUE_OPERATE_MUL=2;
	static VALUE_OPERATE_DIV=3;
	static VALUE_OPERATE_M2_MUL=4;
	static VALUE_OPERATE_M3_MUL=5;
	static VALUE_OPERATE_M4_MUL=6;
	static VALUE_OPERATE_M32_MUL=7;
	static VALUE_OPERATE_SET=8;
	static VALUE_OPERATE_M32_TRANSLATE=9;
	static VALUE_OPERATE_M32_SCALE=10;
	static VALUE_OPERATE_M32_ROTATE=11;
	static VALUE_OPERATE_M32_SCALE_PIVOT=12;
	static VALUE_OPERATE_M32_ROTATE_PIVOT=13;
	static VALUE_OPERATE_M32_TRANSFORM_PIVOT=14;
	static VALUE_OPERATE_BYTE4_COLOR_MUL=15;
	static ARRAY_BUFFER_TYPE_DATA=0;
	static ARRAY_BUFFER_TYPE_CMD=1;
	static ARRAY_BUFFER_REF_REFERENCE=0;
	static ARRAY_BUFFER_REF_COPY=1;
	static UPLOAD_SHADER_UNIFORM_TYPE_ID=0;
	static UPLOAD_SHADER_UNIFORM_TYPE_DATA=1;
    static instance=null;
    
    
    static getFrameCount(): number
    {
        return 0;
    }

    static syncBufferToRenderThread(value: any, index?: number): void
    {
        (index===void 0)&& (index=0);
    }

    static createArrayBufferRef(arrayBuffer: any, type: number, syncRender: boolean): void
    {

    }

    static createArrayBufferRefs(arrayBuffer: any, type: number, syncRender: boolean, refType: number): void
    {

    }

    calcMatrixFromScaleSkewRotation(nArrayBufferID: number, matrixFlag: number, matrixResultID: number, x: number, y: number, pivotX: number, pivotY: number, scaleX: number, scaleY: number, skewX: number, skewY: number, rotate: number): void
    {

    }
    
    createCommandEncoder(reserveSize?: number, adjustSize?: number, isSyncToRenderThread?: boolean): CommandEncoder
    {
		(reserveSize===void 0)&& (reserveSize=128);
		(adjustSize===void 0)&& (adjustSize=64);
        (isSyncToRenderThread===void 0)&& (isSyncToRenderThread=false);
        
		return new CommandEncoder(this,reserveSize,adjustSize,isSyncToRenderThread);
    }

    beginCommandEncoding(commandEncoder: CommandEncoder): void
    {

    }

    endCommandEncoding(): void
    {

    }

    setGLTemplate(type: number, templateID: number): void
    {

    }

    setEndGLTemplate(type: number, templateID: number): void
    {

    }

    matrix4x4Multiply(m1: any, m2: any, out: any): void
    {

    }

    evaluateClipDatasRealTime(nodes: any, playCurTime: number, realTimeCurrentFrameIndexs: any, addtive: boolean): void
    {
        
    }
}