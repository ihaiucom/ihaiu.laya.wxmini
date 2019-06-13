// 22

import util from "./util";

interface WXStorageInfo
{
    // 当前 storage 中所有的 key
    keys: string[];
    // 当前占用的空间大小, 单位 KB
    currentSize: number;
    // 限制的空间大小，单位 KB,  好像10MB
    limitSize: number;
}

class mainContext
{
    length()
    {
        let storageInfo: WXStorageInfo = <any> wx.getStorageInfoSync();
        return storageInfo.keys.length;
    }

    key(index: number)
    {
        let storageInfo: WXStorageInfo = <any> wx.getStorageInfoSync();
	    return storageInfo.keys[index];
    }

    getItem(key:string): any
    {
	    return wx.getStorageSync(key);
    }

    setItem(key: string, value: any)
    {
        return wx.setStorageSync(key, value);
    }

    removeItem(key:string)
    {
        wx.removeStorageSync(key);
    }

    clear()
    {
        wx.clearStorageSync();
    }

}


var memLocalStorage = {};

class subContext
{
    get length() 
    {
	    var keys = Object.keys(memLocalStorage);
	    return keys.length;
    }

    key(n) 
    {
    var keys = Object.keys(memLocalStorage);
    return keys[n];
    }
    
    getItem(key) 
    {
    return memLocalStorage[key];
    }
    
    setItem(key, value) 
    {
    memLocalStorage[key] = value;
    }
    
    removeItem(key) 
    {
    delete memLocalStorage[key];
    }
    
    clear() 
    {
    memLocalStorage = {};
    }

}

var localStorage = util.isSubContext ? subContext : mainContext;
export default localStorage;