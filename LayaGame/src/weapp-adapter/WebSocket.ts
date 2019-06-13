// 20


import util from "./util";

var _socketTask = new WeakMap();

// TODO 更新 binaryType
// The connection is in the process of closing.
// The connection is not yet open.
export default class WebSocket
{
    static readonly CONNECTING = 0;
    static readonly OPEN = 1;
    static readonly CLOSING = 2;
    static readonly CLOSED = 3;
    
    url: string;
    binaryType: string = '';
    bufferedAmount: number = 0;
    extensions: string = '';

    protocol: string = '';
    readyState: number = 3;


    onclose: Function;
    onerror: Function;
    onmessage: Function;
    onopen: Function;


    constructor(url)
    {
        var protocols = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
        
        if(util.isSubContext)
        {
            throw new Error('WebSocket is not supported in SubContext.');
        }
        
        if (typeof url !== 'string' || !/(^ws:\/\/)|(^wss:\/\/)/.test(url)) 
        {
            throw new TypeError('Failed to construct \'WebSocket\': The URL \'' + url + '\' is invalid');
        }

	    this.url = url;
        this.readyState = WebSocket.CONNECTING;
        
        
	    var socketTask: SocketTask = <any> wx.connectSocket(
            {
                url: url,
                protocols: Array.isArray(protocols) ? protocols : [protocols]
            });

        _socketTask.set(this, socketTask);

        socketTask.onClose( (res) =>
        {
            this.readyState = WebSocket.CLOSED;
            if (typeof this.onclose === 'function') 
            {
                this.onclose(res);
            }
        });

        

        socketTask.onMessage( (res) =>
        {
            if (typeof this.onmessage === 'function') 
            {
              this.onmessage(res);
            }
        });

        
        socketTask.onOpen( () =>
        {
            this.readyState = WebSocket.OPEN;
            if (typeof this.onopen === 'function') 
            {
                this.onopen();
            }
        });


        
        socketTask.onError( (res) =>
        {
            if (typeof this.onerror === 'function') 
            {
                this.onerror(new Error(res.errMsg));
            }
        });


    }

    close(code: number, reason: number)
    {
        this.readyState = WebSocket.CLOSING;
        var socketTask = _socketTask.get(this);

        socketTask.close(
            {
                code: code,
                reason: reason
            });
    }

    send(data: string | ArrayBuffer)
    {
        if (typeof data !== 'string' && !(data instanceof ArrayBuffer)) 
        {
	        throw new TypeError('Failed to send message: The data ' + data + ' is invalid');
        }

        var socketTask = _socketTask.get(this);

        socketTask.send(
            {
	            data: data
	        });

    }
}


interface SocketTask
{
    /**
     * 通过 WebSocket 连接发送数据
     */
    send(obj: SocketTaskSendObject);

    /**
     * 关闭 WebSocket 连接
     */
    close(obj: SocketTaskCloseObject);

    /**
     * 监听 WebSocket 连接打开事件
     */
    onOpen(callback: Function);

    /**
     * 监听 WebSocket 连接关闭事件
     */
    onClose(callback: Function);

    /**
     * 监听 WebSocket 错误事件
     */
    onError(callback: Function);

    /**
     * 监听 WebSocket 接受到服务器的消息事件
     */
    onMessage(callback: Function);
}

interface SocketTaskCloseObject
{
    /**
     * 一个数字值表示关闭连接的状态号，表示连接被关闭的原因。
     * 1000（表示正常关闭连接）
     */
    code?: number;

    /**
     * 一个可读的字符串，表示连接被关闭的原因。这个字符串必须是不长于 123 字节的 UTF-8 文本（不是字符）。
     */
    reason?: string;

    success?: Function;
    fail?: Function;
    complete?: Function;
}


interface SocketTaskSendObject
{
    /**
     * 需要发送的内容
     */
    data: string|ArrayBuffer;

    success?: Function;
    fail?: Function;
    complete?: Function;
}