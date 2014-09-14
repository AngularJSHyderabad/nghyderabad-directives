'use strict';

(function(){
    var app = angular.module('directivesExamples');

    app.controller('BasicDemosCtrl', function($scope){
        $scope.name='Ravi';
        //$scope.company="ADP";

        $scope.company={
            name:'ADP'
        };

        $scope.stock={
            company:'Google',
            value:200
        };

        $scope.changeStockValue=function(){
          $scope.stock.value=400;
            console.log($scope.stock.value);
        };

        $scope.temperature = 10;

        $scope.city='Bangalore';

        $scope.events=[
            {
                title:'Why Another MV* Framework?',
                date:'21/12/2013',
                description:'Introduction to SPA, need of client-side MV* framework and why AngularJS is our choice'
            },
            {
                title:'MEAN Stack',
                date:'08/03/2014',
                description:'Building end-to-end applications using Node.js, Express, MongoDB and AngularJS'
            },
            {
                title:'AngularJS and Firebase',
                date:'21/06/2014',
                description:'Building real-time web applications in no time with minimal code using AngularJS and Firebase'
            },
            {
                title:'AngularJS Workshop',
                date:'19/07/2014',
                description:'A beginner targeted hands-on based workshop to get familiar with the framework'
            },
            {
                title:'Directives',
                date:'23/08/2014',
                description:'What are directives, how to build and use them to make your business applications shine'
            }
        ];

        $scope.firstValue='First Value';
        $scope.secondValue='Second Value';

        $scope.person={
            name:'Ravi',
            place:'Hyderabad',
            occupation:'Software Engineer'
        };
    });

    app.directive('showNameOne', function(){
        return{
            restrict:'EA',
            link: function(scope, elem, attrs){

                elem.attr('style','color: blue;');

                elem.text('Your name is: ' + scope[attrs.nameVal]);

                scope.$watch(attrs.nameVal, function(newVal, oldVal){
                    if (newVal !== oldVal) {
                        elem.text('Your name is: ' + newVal);
                    }
                });
            }
        };
    });

    app.directive('showNameTwo', function(){
        return{
            restrict:'E',
            template:'<div></div>',
            replace:true,
            link: function(scope, elem, attrs){
                elem.text('Your name is: ' + attrs.nameVal);

                attrs.$observe('nameVal', function(newName){
                    elem.text('Your name is: ' + newName);
                });
            }
        };
    });

    app.directive('directiveNoScope', function(){
        return{
            restrict:'E',
            template:'<input type="text" ng-model="company.name" /><br /><span>{{company.name}}</span>'
        };
    });

    app.directive('directiveInheritedScope', function(){
        return{
            restrict:'E',
            template:'<input type="text" ng-model="company.name" /><br /><span>{{company.name}}</span>',
            scope: true
        };
    });

    app.directive('directiveIsolatedScope', function(){
        return{
            restrict:'E',
            template:'<input type="text" ng-model="company.name" /><br /><span>{{company.name}}</span>',
            scope:{}
        };
    });

    app.directive('directiveIsolatedScopeDemo', function(){
        return{
          restrict:'A',
          scope:{
          companyName:'=',
            stockValue:'@',
            changeValue:'&'
          },
          template:'<h3> This is inside directive</h3>'+
           '<div>Company Name: <input type="text" ng-model="companyName"/></div>'+
           '<div>Stock value: <input type="text" ng-model="stockValue"/></div>'+
           '<br/>'+
           '<button class="btn" ng-click="changeStockValueDirective()">Change Stock Value (local)</button>'+
           '<br/>'+
           '<br/>'+
           '<button class="btn" ng-click="changeValue()">Change Stock Value (assigned using &amp;)</button>',
          link: function(scope, elem, attrs){
                scope.changeCompanyName=function(){
                    scope.company='Microsoft';
                };

                scope.changeStockValueDirective=function(){
                    scope.stockValue=200;
                };
            }
          };
    });

    app.directive('directiveWithController', function(){
        return{
            controller: function($scope){
                this.getCurrentState = function(){
                    if($scope.temperature >= 40){
                        return 'Hot';
                    }
                    else if($scope.temperature < 40 && $scope.temperature >= 20){
                        return 'Moderate';
                    }
                    else{
                        return 'Cold';
                    }
                };
            },
            link: function(scope, elem, attrs, ctrl){
                elem.html(scope.temperature + ' &deg;C');
            }
        };
    });

    app.directive('directiveWithRequire', function(){
        return{
            require:['directiveWithRequire','directiveWithController'],
            controller:function($scope){
                this.getStyles = function(currentState){
                    if(currentState === 'Hot'){
                        return {
                                css:{color:'Red'},
                                title:'Have an ice-cream!'
                               };
                    }
                    else if(currentState === 'Cold'){
                        return {
                                css:{color:'Green'},
                                title:'Have a hot cup of ginger tea!'
                                };
                    }
                    return {};
                };
            },
            link: function(scope, elem, attrs, ctrls){
                var styles=ctrls[0].getStyles(ctrls[1].getCurrentState());
                if(styles.css){
                    elem.css(styles.css);
                    elem.attr('title',styles.title);
                }
            }
        };
    });

    app.directive('directiveWithTransclude', function(){
        return{
            restrict:'E',
            transclude:true,
            template:'<div>This is the content inside directive\'s template.<br />City: {{city}}<hr/><div ng-transclude></div></div>',
            scope:{},
            link: function(scope){
                scope.city='Hyderabad';
            }
        };
    });

    app.directive('boxContent', function(){
        return{
            restrict:'E',
            template:'<div class="col-md-3 thumbnail"><box-heading></box-heading><div ng-transclude=""></div></div>',
            transclude:true,
            scope:{
                heading:'='
            }
        };
    });

    app.directive('boxHeading', function(){
        return{
            restrict:'E',
            template: '<div class=\'caption\'><strong>{{heading}}</strong></div>'
        };
    });

    app.directive('directiveWithCompile', function(){
        return {
            restrict:'E',
            template:'<div>{{firstValue}}</div><div ng-transclude></div>',
            transclude: true,
            compile: function(elem, attrs){
                console.log(elem.html());
                elem.html(elem.html()+'<div>{{secondValue}}</div>');
                console.log(elem.html());
                return{
                    pre: function(scope, element, attributes){
                        console.log(element.html());
                    },
                    post: function(scope, element, attributes){
                        console.log(element.html());
                    }
                };
            }
        };
    });

    app.directive('directiveWithHigherPriority', function(){
        return{
            restrict:'A',
            priority:2,
            terminal:true,
            link: function(scope, elem, attrs){
                elem.html(elem.html()+'Content from directive with higher priority<br />');
            }
        };
    });

    app.directive('directiveWithLowerPriority', function(){
        return{
            restrict:'A',
            priority:1,
            link: function(scope, elem, attrs){
                elem.html(elem.html()+'<br />Content from directive with lower priority');
            }
        };
    });

    app.directive('directiveWithParse',function($parse){
        return{
            restrict: 'E',
            link: function (scope, elem, attrs) {
                var nameExp = $parse(attrs.personName);
                var placeExp = $parse(attrs.personPlace);
                var occupationExp = $parse(attrs.personOccupation);

                function setTextInDirective() {
                    elem.html('<div>'+nameExp(scope) + ' is working as a/an ' + occupationExp(scope) + ' at ' + placeExp(scope)+'</div>');
                }

                scope.$watch(nameExp, setTextInDirective);
                scope.$watch(occupationExp, setTextInDirective);
                scope.$watch(placeExp, setTextInDirective);
            }
        };
    });
}());
