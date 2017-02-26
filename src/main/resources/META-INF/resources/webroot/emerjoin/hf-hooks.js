var _$setHooks = {beforeRun:[], beforeView:{}};
var AppHooks = {};
AppHooks.beforeRun = function(callable){
    _$setHooks.beforeRun.push(callable);
};

AppHooks.getBeforeRunHooks = function(){
    return _$setHooks.beforeRun;
};

AppHooks.beforeView = function(view,callable){

    if(!_$setHooks.beforeView.hasOwnProperty(view))
        _$setHooks.beforeView[view] = [];

    _$setHooks.beforeView[view].push(callable);

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
    if(_$setHooks.beforeView.hasOwnProperty(view))
        return _$setHooks.beforeView[view];
    return [];
};

AppHooks.fireBeforeRun = function(){

    var hooks = _$setHooks.beforeRun;
    if(hooks.length==0)
        return;

    for(var key in hooks){

        if(isNaN(parseInt(key)))
            continue;

        var hookFunction = hooks[key];
        hookFunction.call();

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

