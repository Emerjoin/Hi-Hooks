# Hi-Framework Hooks
API to enable Hooks for Hi-Framework


## Changes-log
* beforeRun hook now receives arguments: $provide,$compileProvider, $filterProvider

## Maven dependency
```xml
    <dependencies>
        <dependency>
            <groupId>org.emerjoin</groupId>
            <artifactId>Hi-Framework-Hooks</artifactId>
            <version>2.1.0-SNAPSHOT</version>
        </dependency>
    </dependencies>
```

## Including hooks to template
```html
    <script src="webroot/emerjoin/hf-hooks.min.js"></script>
```


## BeforeRun hook
This hook is executed before the angular application is run. 
You can add as many hooks as you need. 
```javascript
    
    AppHooks.beforeRun(function($provide,$compileProvider, $filterProvider){
        
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

    AppHooks.beforeView(function(before){
        
        //The $scope object is bound to "this" keyword
        before.transform(function(){
        
            //This property is being added to the view's $scope
            this.car = {brand:"Toyota",model:"Rav4"};
        
        },"controler/action");
    
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

    AppHooks.beforeView(function(before){
        
      
        //This function is meant to add objects to be resolved during dependency injection 
        before.inject(function(){
            
            
            this.person = {name:"Mario",surname:"Junior"};
           
        
        });
        
    
    },"controler/action");

```

#### Accessing the object set to injection
```javascript

    Hi.view(function($scope,person){
    
         console.log(person.name);//Mario
        
    });

```


## Global View Hook
Invoke the __AppHooks.beforeView__ function without passing the second parameter (view url).
```javascript

    AppHooks.beforeView(function(before){
        
        //Do something in here
    
    });

```

