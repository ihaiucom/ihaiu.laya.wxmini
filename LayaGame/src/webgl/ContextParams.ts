export default class ContextParams
{
    static DEFAULT=null;

    lineWidth=1;
    path=null;
    textAlign=null;
    textBaseline=null;

    clear()
    {
        this.lineWidth=1;
        this.path && this.path.clear();
        this.textAlign=this.textBaseline=null;
    }

    make()
    {
        return this===ContextParams.DEFAULT ? new ContextParams():this;
    }


}