import MiniSound from "./MiniSound";
import SoundManager = Laya.SoundManager;

export default class MiniSoundChannel extends Laya.SoundChannel
{

    /**
     * 微信音频实例对象
     */
    private _audio: InnerAudioContext;
    /**
     * 声音加载控制器
     */
    private _miniSound: MiniSound;

    private _onEnd: Function;
    
    /**
     * @private
     * 给传入的函数绑定作用域，返回绑定后的函数。
     * @param	fun 函数对象。
     * @param	scope 函数作用域。
     * @return 绑定后的函数。
     */
    static bindToThis(fun: Function, scope: any): Function
    {
        var rst=fun;
		rst=fun.bind(scope);;
		return rst;
    }

    constructor(audio: InnerAudioContext, miniSound: MiniSound)
    {
        super();
        this._audio = audio;
        this._miniSound = miniSound;
        this._onEnd = MiniSoundChannel.bindToThis(this.__onEnd,this);
		audio.onEnded(this._onEnd);
    }


    /** 音频自然播放至结束的事件 */
    private __onEnd()
    {
        MiniSound._audioCache[this.url]=this._miniSound;

        if (this.loops==1)
        {
            if (this.completeHandler)
            {
				Laya.systemTimer.once(10,this,this.__runComplete,[this.completeHandler],false);
				this.completeHandler=null;
			}
            this.stop();
            this.event(Laya.Event.COMPLETE);
			return;
        }
        
        if (this.loops > 0)
        {
			this.loops--;
        }
        
		this.startTime=0;
		this.play();

    }



    /**
     * 播放
     */
    play(): void
    {
        
		this.isStopped=false;
		SoundManager.addChannel(this);
		this._audio.play();
    }
    
    /**
     * 停止播放
     *
     */
    stop(): void
    {
        this.isStopped=true;
		SoundManager.removeChannel(this);
		this.completeHandler=null;
		if (!this._audio)
			return;
		this._audio.stop();
		this._audio.offEnded(null);
		this._miniSound.dispose();
		this._audio=null;
		this._miniSound=null;
		this._onEnd=null;
    }

    /** 暂停播放 */
    pause(): void
    {
        this.isStopped=true;
		this._audio.pause();
    }

    /** 恢复播放 */
    resume(): void
    {
        if (!this._audio)
			return;
		this.isStopped=false;
		SoundManager.addChannel(this);
		this._audio.play();
    }

    
    /**
     * 设置开始时间
     * @param time
     */
    set startTime(time: number)
    {
        if(this._audio){
			this._audio.startTime=time;
		}
    }

    /**
     * 自动播放
     */
    set autoplay(value: boolean)
    {
		this._audio.autoplay=value;
    }

    get autoplay(): boolean
    {
		return this._audio.autoplay;
    }




    
    /**
     * @private
     * 当前播放到的位置
     * @return
     *
     */
    get position(): number
    {
		if (!this._audio)
			return 0;
		return this._audio.currentTime;
    }

    /**
     * @private
     * 获取总时间。
     */
    get duration(): number
    {
        
        if (!this._audio)
			return 0;
		return this._audio.duration;

    }

    /**
     * 是否循环播放
     */
    get loop(): boolean
    {
        return this._audio.loop;
    }

    set loop(value: boolean)
    {
		this._audio.loop=value;
    }

    /**
     * 音量
     */
    get volume(): number
    {
		if (!this._audio)return 1;
		return this._audio.volume;
    }

    set volume(value: number)
    {
		if (!this._audio)return;
		this._audio.volume = value;
    }


}