/**
 * Created by Paul on 3/15/14.
 */

app.controller('MatchController', function ($scope, MatchService) {
    $scope.IsLoading = true;
    MatchService.getAll().then(function(result){
        $scope.IsLoading = false;
        $scope.matchs = result.data;
    });
});
