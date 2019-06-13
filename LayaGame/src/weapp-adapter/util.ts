import GameGlobal from "./GameGlobal";

// 8

export default class util
{
    static noop()
    {

    }

    static get isSubContext()
    {
        return typeof GameGlobal !== 'undefined' && GameGlobal.__isSubContext === true;
    }
}