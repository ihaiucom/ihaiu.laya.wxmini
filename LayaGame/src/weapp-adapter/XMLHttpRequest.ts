// 19

var _url = new WeakMap();
var _method = new WeakMap();
var _requestHeader = new WeakMap();
var _responseHeader = new WeakMap();
var _requestTask = new WeakMap();

function _triggerEvent(type) 
{
    if (typeof this['on' + type] === 'function') 
    {
      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) 
      {
        args[_key - 1] = arguments[_key];
      }

      this['on' + type].apply(this, args);
    }
}

function _changeReadyState(readyState) 
{
    this.readyState = readyState;
    _triggerEvent.call(this, 'readystatechange');
}

// TODO 没法模拟 HEADERS_RECEIVED 和 LOADING 两个状态
export default class XMLHttpRequest
{
	static readonly UNSEND = 0;
	static readonly OPENED = 1;
	static readonly HEADERS_RECEIVED = 2;
	static readonly LOADING = 3;
    static readonly DONE = 4;

   onabort: Function = null;
   onerror: Function = null;
   onload: Function = null;
   onloadstart: Function = null;
   onprogress: Function = null;
   ontimeout: Function = null;
   onloadend: Function = null;
   onreadystatechange: Function = null;
   readyState = 0;
   response = null;
   responseText = null;
   responseType = '';
   responseXML = null;
   status = 0;
   statusText = '';
   upload = {};
   withCredentials = false;

    constructor()
    {
        _requestHeader.set(this, 
            {
	            'content-type': 'application/x-www-form-urlencoded'
            });
            
	    _responseHeader.set(this, {});
    }

    
   

    /**
     * 中断请求任务
     */
    abort()
    {
        var myRequestTask = _requestTask.get(this);

        if (myRequestTask) 
        {
            myRequestTask.abort();
        }

    }

    /** 响应头信息 */
    getAllResponseHeaders()
    {
        var responseHeader = _responseHeader.get(this);

        return Object.keys(responseHeader).map( (header) =>
        {
	        return header + ': ' + responseHeader[header];
        }).join('\n');
    }

    /** 获取响应头 字段信息 */
    getResponseHeader(header: string)
    {
        return _responseHeader.get(this)[header];
    }

    /**
     * 
     * async, user, password 这几个参数在小程序内不支持
     * @param method 请求方式 GET / POST 等
     * @param url 
     */
    open(method: string, url: string)
    {
        _method.set(this, method);
        _url.set(this, url);
        _changeReadyState.call(this, XMLHttpRequest.OPENED);
    }

    /**
     * 重写由服务器返回的MIME type
     */
    overrideMimeType()
    {

    }

    /**
     * 设置HTTP请求头的值。您必须在open()之后、send()之前调用setRequestHeader()这个方法。
     */
    setRequestHeader(header: string, value: string)
    {
        var myHeader = _requestHeader.get(this);

        myHeader[header] = value;
        _requestHeader.set(this, myHeader);
    }

    /**
     * 发送请求。如果请求是异步的（默认），那么该方法将在请求发送后立即返回。
     */
    send()
    {
        var _this = this;

        var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

        if (this.readyState !== XMLHttpRequest.OPENED) 
        {
            throw new Error("Failed to execute 'send' on 'XMLHttpRequest': The object's state must be OPENED.");
        } 
        else 
        {
            wx.request(
                {
                    data: data,
                    url: _url.get(this),
                    method: _method.get(this),
                    header: _requestHeader.get(this),
                    responseType: this.responseType,

                    success:  (_ref) =>
                    {
                        var data = _ref.data,
                        statusCode = _ref.statusCode,
                        header = _ref.header;

                        if (typeof data !== 'string' && !(data instanceof ArrayBuffer)) 
                        {
                            try 
                            {
                                data = JSON.stringify(data);
                            } 
                            catch (e) 
                            {
                                data = data;
                            }
                        }

                        _this.status = statusCode;
                        _responseHeader.set(_this, header);
                        _triggerEvent.call(_this, 'loadstart');
                        _changeReadyState.call(_this, XMLHttpRequest.HEADERS_RECEIVED);
                        _changeReadyState.call(_this, XMLHttpRequest.LOADING);

                        _this.response = data;

                        if (data instanceof ArrayBuffer) 
                        {
                            _this.responseText = '';
                            var bytes = new Uint8Array(data);
                            var len = bytes.byteLength;

                            for (var i = 0; i < len; i++) 
                            {
                                _this.responseText += String.fromCharCode(bytes[i]);
                            }
                        } 
                        else 
                        {
                            _this.responseText = data;
                        }

                        _changeReadyState.call(_this, XMLHttpRequest.DONE);
                        _triggerEvent.call(_this, 'load');
                        _triggerEvent.call(_this, 'loadend');
                    },

                    fail:  (_ref2) =>
                    {
                        var errMsg = _ref2.errMsg;

                        // TODO 规范错误
                        if (errMsg.indexOf('abort') !== -1) 
                        {
                            _triggerEvent.call(_this, 'abort');
                        } 
                        else 
                        {
                            _triggerEvent.call(_this, 'error', errMsg);
                        }
                        _triggerEvent.call(_this, 'loadend');
                    }

                }
            );
        }
    }





    


}