import Resource from "../core-loader/Resource";

export default class Bitmap extends Resource
{
    protected _width: number;
    protected _height: number;
    /**
     * 获取宽度。
     */
    get width(): number
    {
        return this._width;
    }

    /***
     * 获取高度。
     */
    get height(): number
    {
        return this._height;
    }

    /**
     * 创建一个 <code>Bitmap</code> 实例。
     */
    constructor()
    {
        super();
		this._width=-1;
		this._height=-1;
    }
    
    _getSource(): any
    {
		throw "Bitmap: must override it.";
    }

}