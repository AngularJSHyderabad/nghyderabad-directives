'use strict';

angular.module('directivesExamples')
    .config(['$routeProvider', function($routeProvider){
        $routeProvider.when('/basicDemos',{controller:'BasicDemosCtrl',templateUrl:'tpl/basicDemos.html'});
        $routeProvider.when('/showcase', {controller:'ShowcaseCtrl', templateUrl:'tpl/showcaseDirectives.html'});
        $routeProvider.otherwise({redirectTo:'/basicDemos'});
    }]);