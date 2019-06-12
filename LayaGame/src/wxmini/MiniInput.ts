import Input = Laya.Input;
import Browser = Laya.Browser;
import Render = Laya.Render;
import SoundManager = Laya.SoundManager;
import MiniSound from "./MiniSound";
import MiniAdpter from "./MiniAdpter";

export default class MiniInput
{
    static _createInputElement()
    {
        Input['_initInput'](Input['area']=Browser.createElement("textarea"));
		Input['_initInput'](Input['input']=Browser.createElement("input"));
		Input['inputContainer']=Browser.createElement("div");
		Input['inputContainer'].style.position="absolute";
		Input['inputContainer'].style.zIndex=1E5;
        Browser.container.appendChild(Input['inputContainer']);
        
        Input['inputContainer'].setPos = function (x,y)
        {
            Input['inputContainer'].style.left=x+'px';
            Input['inputContainer'].style.top=y+'px';
        };
        
        Laya.stage.on("resize",null,MiniInput._onStageResize);
        
        wx.onWindowResize && wx.onWindowResize( function(windowWidth: number, windowHeight: number)
        {
            window.dispatchEvent && 
            window.dispatchEvent( new Event("resize"));
        });
        
		SoundManager._soundClass=MiniSound;
		SoundManager._musicClass=MiniSound;
		var model = MiniAdpter.systemInfo.model;
        var system = MiniAdpter.systemInfo.system;
        
        if(model.indexOf("iPhone")!=-1)
        {
			Browser.onIPhone=true;
			Browser.onIOS=true;
			Browser.onIPad=true;
			Browser.onAndroid=false;
        }
        
        if(system.indexOf("Android")!=-1 || system.indexOf("Adr")!=-1)
        {
			Browser.onAndroid=true;
			Browser.onIPhone=false;
			Browser.onIOS=false;
			Browser.onIPad=false;
		}

    }

    /** 窗口大小发生改变 */
    static _onStageResize()
    {
        
		var ts=Laya.stage._canvasTransform.identity();
		ts.scale((Browser.width / Render.canvas.width / Browser.pixelRatio),Browser.height / Render.canvas.height / Browser.pixelRatio);
    }
    

    static wxinputFocus(e: any): void
    {
        var _inputTarget=Input['inputElement'].target;
        if (_inputTarget && !_inputTarget.editable)
        {
			return;
        }

        // 取消监听用户点击键盘 Confirm 按钮时的事件
        MiniAdpter.window.wx.offKeyboardConfirm();
        // 取消监听键盘输入事件
        MiniAdpter.window.wx.offKeyboardInput();
        // 显示键盘
		MiniAdpter.window.wx.showKeyboard(
            {
                defaultValue:_inputTarget.text,
                maxLength:_inputTarget.maxChars,
                multiple:_inputTarget.multiline,
                confirmHold:true,
                confirmType:_inputTarget["confirmType"]||'done',
                success:function (res)
                {
                },

                fail:function (res)
                {
                }
            });
        
        //  监听用户点击键盘 Confirm 按钮时的事件   
        MiniAdpter.window.wx.onKeyboardConfirm(function(res)
        {
			var str=res ? res.value :"";
            if (_inputTarget._restrictPattern)
            {
                // 替换回导致iphone输入bug的字符
                str=str.replace(/\u2006|\x27/g,"");
                // 替换屏蔽字符
                if (_inputTarget._restrictPattern.test(str))
                {
					str=str.replace(_inputTarget._restrictPattern,"");
				}
			}
			_inputTarget.text=str;
			_inputTarget.event(Laya.Event.INPUT);
			MiniInput.inputEnter();
			_inputTarget.event("confirm");
        });

        // 监听键盘输入事件
        MiniAdpter.window.wx.onKeyboardInput(function(res)
        {
			var str=res ? res.value :"";
            if (!_inputTarget.multiline)
            {
                if (str.indexOf("\n")!=-1)
                {
					MiniInput.inputEnter();
					return;
				}
            }
            
            if (_inputTarget._restrictPattern)
            {
				str=str.replace(/\u2006|\x27/g,"");
                if (_inputTarget._restrictPattern.test(str))
                {
					str=str.replace(_inputTarget._restrictPattern,"");
				}
            }
            
			_inputTarget.text=str;
			_inputTarget.event(Laya.Event.INPUT);
		});
    }

    /** 输入回车 结束 */
    static inputEnter(): void
    {
		Input['inputElement'].target.focus=false;
    }

    /** 隐藏键盘 */
    static wxinputblur(): void
    {
		MiniInput.hideKeyboard();
    }
    
    /** 隐藏键盘 */
    static hideKeyboard(): void
    {
        // 取消监听用户点击键盘 Confirm 按钮时的事件
        MiniAdpter.window.wx.offKeyboardConfirm();
        // 取消监听键盘输入事件
        MiniAdpter.window.wx.offKeyboardInput();
        // 隐藏键盘
		MiniAdpter.window.wx.hideKeyboard(
            {
                success:function (res)
                {
				    console.log('隐藏键盘')
                },
                fail:function (res)
                {
				    console.log("隐藏键盘出错:"+(res ? res.errMsg :""));
                }
            });

    }

}