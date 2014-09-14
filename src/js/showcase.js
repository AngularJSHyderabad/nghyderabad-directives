'use strict';

angular.module('directivesExamples')
    .controller('ShowcaseCtrl', function($scope, tumblrFeedsSvc){
        $scope.markdownText='##This is the heading';
        tumblrFeedsSvc.getFeeds().then(function(result){
            $scope.tumblrPosts = result.data;
        });
    })
    .directive('markdownViewer', function($parse, $window){
        return{
            restrict: 'E',
            link: function(scope, elem, attrs){
                var expression = $parse(attrs.markdownModel);
                var markdownConverter = new $window.Showdown.converter();

                scope.$watch(expression, function(newVal){
                    elem.html(markdownConverter.makeHtml(newVal));
                });
            }
        };
    })
    .directive('datePicker', function(){
        return {
            restrict:'A',
            require:'ngModel',
            link: function(scope, elem, attrs){
                elem.datepicker({
                    dateFormat: 'mm-dd-yy',
                    changeYear: true,
                    changeMonth: true,
                    onSelect: function (val) {
                        scope.$apply(function () {
                            scope[attrs.ngModel] = val;
                        });
                    }
                });
            }
        };
    }).
    factory('tumblrFeedsSvc', function($http){
        return{
            getFeeds: function(){
                return $http.get('json/tumblr-feeds.json');
            }
        };
    }).
    directive('tumblrFeedItem', function($compile){
        return{
            restrict: 'E',
            scope: {
                feedrec: '='
            },
            link: function (scope, elem, attrs) {
                scope.$watch('feedrec', function (newVal) {
                    elem.html($compile('<tumblr-' + newVal.type + '-feed></tumblr-' + newVal.type + '-feed>')(scope));
                });
            }
        };
    }).
    directive('tumblrPhotoFeed', function(){
        return{
            restrict: 'E',
            template: '<p tumblr-post-body="feedrec.caption" class="feed-container"></p><img ng-src="{{feedrec.photos[0].original_size.url}}" alt="Tumblr Photo" height="200" width="200"/>'
        };
    }).
    directive('tumblrTextFeed', function(){
        return{
            restrict: 'E',
            template: '<b>{{feedrec.title}}</b><br/><p class="feed-container" tumblr-post-body="feedrec.body"></p>'
        };
    }).
    directive('tumblrQuoteFeed', function(){
        return{
            restrict: 'E',
            template: '<b>{{feedrec.text}}</b><br/><p class="feed-container" tumblr-post-body="feedrec.source"></p>'
        };
    }).
    directive('tumblrAnswerFeed', function(){
        return{
            restrict: 'E',
            template: '<b>{{feedrec.question}}</b><br/><p class="feed-container" tumblr-post-body="feedrec.answer"></p>'
        };
    }).
    directive('tumblrPostBody', function($parse) {
        return{
            restrict: 'A',
            link: function (scope, elem, attrs) {
                var bodyExp = $parse(attrs.tumblrPostBody);

                scope.$watch(bodyExp, function (newVal, oldVal) {
                    elem.html(newVal);
                    console.log(newVal);
                });
            }
        };
    });