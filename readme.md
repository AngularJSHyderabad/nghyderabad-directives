Directives in AngularJS
========================

Skeleton of a typical directive:

```
myModule.directive('directiveName', function (injectables) {
  return {
    restrict: 'A',
    template: '<div></div>',
    templateUrl: 'directive.html',
    replace: false,
    transclude: false,
    scope: false,
    require: false,
    controller: function($scope, $element, $attrs, $transclude, otherInjectables) { ... },
    link: function postLink(scope, iElement, iAttrs) { ... },
    priority: 0,
    terminal: false,
    compile: function compile(tElement, tAttrs, transclude) {
      return {
        pre: function preLink(scope, iElement, iAttrs, controller) { ... },
        post: function postLink(scope, iElement, iAttrs, controller) { ... }
      }
    }
  };
});
```

Let's build examples to demonstrate the following:

- Getting started with creating directives: naming directive and ***link*** function with usages of scope, element and attributes
- Adding watchers and changes on attributes
- Using ***restrict*** to build element, attribute and class based directives. Need not cover comment as it is not used as far as we know, can mention during talk
- Defining content of directive using ***template/templateUrl***
- Use of ***replace***
- ***Scope*** and behavior of scope in different scenarios
    - Default behavior, when scope is not specified or set to false
    - When scope is set to true
    - Isolated scope and use of @, = and &
- Defining a ***controller*** and calling controller methods in link function
- Use of ***require***. A custom validation directive could be a better example
- ***Transclude*** and its importance
- ***Compile***, difference between pre link and post link
- Let's decide if we need to demonstrate ***priority*** and ***terminal***
- Let's have demos on `$parse`, `$compile` and `$interpolate`. But we will show them if there is enough energy in the listeners
- Some demos showing creating wrappers around jQuery plugins