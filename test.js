

describe("Hi-tweak Tests",function(){


    var beforeRunExecuted = false;

    AppHooks.beforeRun(function(){

        console.log("Executing before run");
        beforeRunExecuted = true;

    });


    AppHooks.beforeView("students/all",function(before){

        before.transform(function(){
            this.name = "Mario";
            this.surname = "Junior";
        });

        before.inject(function(){

            this.Designer = {draw : function(){}};

        });

    });


    it("must execute beforeRun hooks",function(){

        AppHooks.fireBeforeRun();
        expect(beforeRunExecuted).toBeTruthy();

    });


    it("must execute view hooks",function(){

        var $scope = {};
        var $injectables = {};
        AppHooks.fireBeforeView("students/all",$scope,$injectables);
        expect($scope.hasOwnProperty("name")).toBeTruthy();
        expect($scope.hasOwnProperty("surname")).toBeTruthy();
        expect($injectables.hasOwnProperty("Designer")).toBeTruthy();

    });



});