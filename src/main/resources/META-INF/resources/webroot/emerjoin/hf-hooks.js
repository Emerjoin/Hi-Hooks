var _$setHooks = {beforeRun:[], appModule:{}, beforeView:{}, globalBeforeView:[]};

var AppHooks = {};
AppHooks.beforeRun = function(callable){
    _$setHooks.beforeRun.push(callable);
};

AppHooks.getBeforeRunHooks = function(){
    return _$setHooks.beforeRun;
};

AppHooks.beforeView = function(callable,view){

    //Global hook
    if(typeof view=="undefined"){
        _$setHooks.globalBeforeView.push(callable);
        return;
    }

    if(!_$setHooks.beforeView.hasOwnProperty(view))
        _$setHooks.beforeView[view] = [];

    _$setHooks.beforeView[view].push(callable);

};

AppHooks.setupApp = function(callable){

    _$setHooks.appModule.push(callable);

};


var BeforeView = function($scope,$tobeInjected){

    this.transform = function(callable){
        callable.call($scope);
    };

    this.inject = function(callable){
        callable.call($tobeInjected);
    };

};

AppHooks.getBeforeViewHooks = function(view){

    var hooks = [];
    if(_$setHooks.beforeView.hasOwnProperty(view))
        hooks = _$setHooks.beforeView[view];

    return hooks.concat(_$setHooks.globalBeforeView);
};

AppHooks.fireBeforeRun = function(frameworkModule){

    var hooks = _$setHooks.beforeRun;
    if(hooks.length==0)
        return;

    for(var key in hooks){

        if(isNaN(parseInt(key)))
            continue;

        var hookFunction = hooks[key];
        hookFunction.call({},frameworkModule);

    }


};

AppHooks.fireSetupApp = function(appModule){

    var hooks = _$setHooks.appModule;
    if(hooks.length==0)
        return;

    for(var key in hooks){

        if(isNaN(parseInt(key)))
            continue;

        var hookFunction = hooks[key];
        hookFunction.call({},appModule);

    }

};

AppHooks.fireBeforeView = function(view,$scope,$tobeInjected){

    var beforeView = new BeforeView($scope,$tobeInjected);
    var hooks = AppHooks.getBeforeViewHooks(view);
    if(hooks.length==0)
        return;

    for(var key in hooks){

        if(isNaN(parseInt(key)))
            continue;

        var hookFunction = hooks[key];
        hookFunction.call($scope,beforeView);

    }

};

