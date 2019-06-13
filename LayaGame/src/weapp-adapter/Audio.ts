// 12

import HTMLAudioElement from "./HTMLAudioElement";

var HAVE_NOTHING = 0;
var HAVE_METADATA = 1;
var HAVE_CURRENT_DATA = 2;
var HAVE_FUTURE_DATA = 3;
var HAVE_ENOUGH_DATA = 4;


var _innerAudioContext = new WeakMap();
var _src = new WeakMap();
var _loop = new WeakMap();
var _autoplay = new WeakMap();

export default class Audio extends HTMLAudioElement
{
    constructor()
    {
        super();

        // var _this = this;
        
	    // _this.HAVE_NOTHING = HAVE_NOTHING;
	    // _this.HAVE_METADATA = HAVE_METADATA;
	    // _this.HAVE_CURRENT_DATA = HAVE_CURRENT_DATA;
	    // _this.HAVE_FUTURE_DATA = HAVE_FUTURE_DATA;
	    // _this.HAVE_ENOUGH_DATA = HAVE_ENOUGH_DATA;
	    // _this.readyState = HAVE_NOTHING;
    }
}