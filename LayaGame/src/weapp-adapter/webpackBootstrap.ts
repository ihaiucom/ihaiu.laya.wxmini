export interface ModuleObject
{
    exports: object;
    id: number;
    loaded: boolean;
}

export default class __webpack_require__
{

    /**
     * 模块列表
     * <number, class function>
     */
    static modules: Function[] = [];

    /**
     * 模块缓存
     * <number, ModuleObject>
     */
    static installedModules = {};

    

    // expose the module cache
    // <number, ModuleObject>
    static c = {};

    // __webpack_public_path__
    static p = "";

    
    /** 初始化 */
    static install(modules: Function[])
    {
        this.modules = modules;

        return this.requireModule(0);
    }


    /** 加载模块 */
    static requireModule(moduleId: number)
    {
        let installedModules = this.installedModules;
        let modules = this.modules;

        // Check if module is in cache
        if(installedModules[moduleId])
        {
            return installedModules[moduleId].exports;
        }

        // Create a new module (and put it into the cache)
        let module: ModuleObject = 
        {
            exports: {},
            id: moduleId,
            loaded: false
        };

        installedModules[moduleId] = module;

        // Execute the module function
        modules[moduleId].call(module.exports, module, module.exports, this);

        // Flag the module as loaded
        module.loaded = true;

        return module.exports;

    }
}