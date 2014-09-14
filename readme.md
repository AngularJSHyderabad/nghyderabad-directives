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

Following demos are included in this repository:

- Getting started with creating directives: naming directive and ***link*** function with usages of scope, element and attributes
- Adding watchers on scope and observers on attributes
- Using ***restrict*** to build element and attribute based directives
- Defining content of directive using ***template/templateUrl***
- Use of ***replace***
- ***Scope*** and behavior of scope in different scenarios
    - Default behavior, when scope is not specified or set to false
    - When scope is set to true
    - Isolated scope and use of @, = and &
- Defining a ***controller*** and calling controller methods in link function
- Use of ***require***
- ***Transclude*** and its importance
- ***Compile***, difference between pre link and post link
- ***priority*** and ***terminal***

There are some advanced demos and showcases. We couldn't cover all of them during the meetup session:

- A demo on `$parse`
- Nested directives using transclude
- Wrapping jQuery UI datepicker in a directive
- Parsing markdown text
- A directive displaying different feeds from tumblr

### To run the application

1. Install Node.js

2. Open a command prompt, navigate to the folder containing demos and run the commands "npm install" and "bower install"

3. Run the command "grunt"

4. Open a browser and change the URL to: http://localhost:9000

####Learning Resources on Directives

- [Scott Allen's blog post on compile, pre and post link][1]
- [Amit Gharat's blog post on directives][2]
- [Directives Videos on egghead.io][3]
- [Scott Allen's talk on directives at NDC Oslo][4]

[1]: http://odetocode.com/blogs/scott/archive/2014/05/28/compile-pre-and-post-linking-in-angularjs.aspx
[2]: http://amitgharat.wordpress.com/2013/06/08/the-hitchhikers-guide-to-the-directive/
[3]: https://egghead.io/search?q=directives
[4]: http://vimeo.com/97505653