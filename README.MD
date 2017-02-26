# Hi-Framework Hooks
## BeforeRun hook
This hook is executed before the angular application is run. 
You can add as many hooks as you need. 
```javascript
    
    AppHooks.beforeRun(function(){
        
        //Do something here
    
    });
    
```

## BeforeView hook
This hook is executed before a specific view controller gets executed.
This hook allows to transform the view's $scope object and to add objects to
be resolved upon dependencies injection. 

### Transform scope
Allows to transform the view's $scope object. 
#### Setting the hook
```javascript

    AppHooks.beforeView("controler/action",function(before){
        
        //The $scope object is bound to "this" keyword
        before.transform(function(){
        
            //This property is being added to the view's $scope
            this.car = {brand:"Toyota",model:"Rav4"};
        
        });
    
    });
```
#### Accessing the object set by the transformer
```javascript

    Hi.view(function($scope){
    
        console.log($scope.car.brand); //Toyota
    
    });
    
```

### Inject objects
Allows to add objects to be resolved during dependency injection 

#### Setting the hook
```javascript

    AppHooks.beforeView("controler/action",function(before){
        
      
        //This function is meant to add objects to be resolved during dependency injection 
        before.inject(function(){
            
            
            this.person = {name:"Mario",surname:"Junior"};
           
        
        });
        
    
    });

```

#### Accessing the object set to injection
```javascript

    Hi.view(function($scope,person){
    
         console.log(person.name);//Mario
        
    });

```