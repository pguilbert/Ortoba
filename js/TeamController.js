'use strict';

var app = angular.module('app', []);

app.controller('TeamController', function ($scope, TeamService) {
    $scope.IsLoading = true;
    TeamService.getAll().then(function(data){
        $scope.IsLoading = false;
        $scope.teams = data;
    });

    $scope.add = function(team){
        console.log(team);
        if(team !== undefined){
            $scope.teams.push({
                name : team.name,
                city : team.city,
                score : 0
            });

            team.name = "";
            team.city = "";
        }
    }
});


app.factory('TeamService', function($http) {
    return {
        getAll: function() {
            //return the promise directly.
            return $http.get('./core.php/team/all')
                .then(function(result) {
                    //resolve the promise as the data
                    return result.data;
                });
        }
    }
});