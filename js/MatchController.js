/**
 * Created by Paul on 3/15/14.
 */

app.controller('MatchController', function ($scope, MatchService, TeamService, CityService) {
    $scope.IsLoading = true;
    MatchService.getAll().then(function(result){
        $scope.IsLoading = false;
        $scope.matchs = result.data.result;
    });

    CityService.getAll().then(function(result){
        $scope.IsLoading = false;
        $scope.cities = result.data.result;
    });

    TeamService.getAll().then(function(result){
        $scope.IsLoading = false;
        $scope.teams = result.data.result;
    });

    $scope.add = function(match){
        $scope.IsLoading = true;
        if(match !== undefined){
            MatchService.create(match.scoreTeam1, match.scoreTeam2, match.team1.id, match.team2.id).success(function(){
                $scope.matchs.push({
                    teamname1 : match.team1.name,
                    teamname2 : match.team2.name,
                    scoreTeam1 : match.scoreTeam1,
                    scoreTeam2 : match.scoreTeam2
                });

                match.team1 = {};
                match.team2 = {};
                match.scoreTeam1 = null;
                match.scoreTeam2 = null;
            }).then(function(){ $scope.IsLoading = false; });

        }
    }

    $scope.refresh = function(){
        if($scope.city==null){
            TeamService.getAll().then(function(result){
                $scope.IsLoading = false;
                $scope.matchs = result.data.result;
            });
        } else {
            CityService.getMatchByCity($scope.city.id).then(function(result){
                $scope.IsLoading = false;
                $scope.matchs = result.data.result;
            });
        }

    }
});
