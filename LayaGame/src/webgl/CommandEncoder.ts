
export default class CommandEncoder
{
    _idata: Array<any> = [];
    constructor(layagl: any, reserveSize: number, adjustSize: number, isSyncToRenderThread: boolean)
    {

    }

	//TODO:coverage
    getArrayData(): Array<any>
    {
        return this._idata;
    }

	//TODO:coverage
    getPtrID(): number
    {
        return 0;
    }

    beginEncoding(): void
    {

    }

    endEncoding(): void
    {

    }

	//TODO:coverage
    clearEncoding(): void
    {
        this._idata.length=0;
    }

	//TODO:coverage
    getCount(): number
    {
        return this._idata.length;
    }

	//TODO:coverage
    add_ShaderValue(o: any): void
    {
        this._idata.push(o);
    }
    
	//TODO:coverage
    addShaderUniform(one: any): void
    {
        this.add_ShaderValue(one);
    }

}