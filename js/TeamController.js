'use strict';

var app = angular.module('app', []);

app.controller('TeamController', function ($scope, TeamService) {
    $scope.IsLoading = true;
    TeamService.getAll().then(function(data){
        $scope.IsLoading = false;
        $scope.teams = data;
    });

    $scope.add = function(team){
        $scope.IsLoading = true;
        if(team !== undefined){
            TeamService.create(team.name, team.city).success(function(){
                $scope.teams.push({
                    name : team.name,
                    city : team.city,
                    score : 0
                });

                team.name = "";
                team.city = "";
            }).then(function(){ $scope.IsLoading = false; });

        }
    }
});


app.factory('TeamService', function($http) {
    // Default encoding post message, for php operation.
    $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";

    return {
        getAll: function() {
            return $http.get('./core.php/team/all')
                .then(function(result) {
                    return result.data;
                });
        },
        create : function(name, city){
            var param = $.param({name: name, city: city});
            return $http.post('./core.php/team/create', param);
        }
    }
});

app.directive('capitalize', function() {
    return {
        require: 'ngModel',
        link: function(scope, element, attrs, modelCtrl) {
            var capitalize = function(inputValue) {
                if(typeof(inputValue)!=="string"){ return; }

                var capitalized = inputValue.toUpperCase();
                if(capitalized !== inputValue) {
                    modelCtrl.$setViewValue(capitalized);
                    modelCtrl.$render();
                }
                return capitalized;
            }
            modelCtrl.$parsers.push(capitalize);
            capitalize(scope[attrs.ngModel]);
        }
    };
});