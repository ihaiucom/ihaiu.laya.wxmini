// 21

import util from "./util";

/*
* TODO 使用 wx.readFile 来封装 FileReader
*/
export default class FileReader
{
    construct()
    {
        if (util.isSubContext) 
        {
	        throw new Error('FileReader is not supported in SubContext.');
        }
    }
}