import util from "./util";

// 18

// TODO 需要 wx.getSystemInfo 获取更详细信息
var _wx$getSystemInfoSync = wx.getSystemInfoSync(),
platform = _wx$getSystemInfoSync.platform;

export default class navigator
{
    static platform: string = platform;
    static language = 'zh-cn';
    static appVersion = '5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1';
    static userAgent = 'Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_1 like Mac OS X) AppleWebKit/603.1.30 (KHTML, like Gecko) Mobile/14E8301 MicroMessenger/6.6.0 MiniGame NetType/WIFI Language/zh_CN';
    // TODO 用 wx.getNetworkStateChange 和 wx.onNetworkStateChange 来返回真实的状态
    static onLine = true;

    static geolocation = 
    {
	    getCurrentPosition: util.noop,
	    watchPosition: util.noop,
	    clearWatch: util.noop
    }
}