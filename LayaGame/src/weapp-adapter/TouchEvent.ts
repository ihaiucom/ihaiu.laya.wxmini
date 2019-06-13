import util from "./util";

// 16

declare var window;
declare var document;
export default class TouchEvent
{
    target = window.canvas;
    currentTarget = window.canvas;
    touches = [];
    targetTouches = [];
    changedTouches = [];
    preventDefault = util.noop;
    stopPropagation = util.noop;
    type: string;
    timeStamp: number;

    constructor(type: string)
    {
        this.type = type;
    }
}

function touchEventHandlerFactory(type) 
{
    return function (event) 
    {
      var touchEvent = new TouchEvent(type);

      touchEvent.touches = event.touches;
      touchEvent.targetTouches = Array.prototype.slice.call(event.touches);
      touchEvent.changedTouches = event.changedTouches;
      touchEvent.timeStamp = event.timeStamp;
      document.dispatchEvent(touchEvent);
    };
}


wx.onTouchStart(touchEventHandlerFactory('touchstart'));
wx.onTouchMove(touchEventHandlerFactory('touchmove'));
wx.onTouchEnd(touchEventHandlerFactory('touchend'));
wx.onTouchCancel(touchEventHandlerFactory('touchcancel'));

/**
 * 在触控设备上的触摸点。通常是指手指或者触控笔在触屏设备或者触摸板上的操作。
 */
interface Touch
{
    /**
     * Touch 对象的唯一标识符，只读属性。一次触摸动作(我们值的是手指的触摸)在平面上移动的整个过程中, 该标识符不变。可以根据它来判断跟踪的是否是同一次触摸过程。
     */
    identifier: number;

    /**
     * 触点相对于屏幕左边沿的 X 坐标
     */
    screenX: number;

    /**
     * 触点相对于屏幕上边沿的 Y 坐标。
     */
    screenY: number;

}