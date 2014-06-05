/**
 * Created by Paul on 3/15/14.
 */

app.controller('CityController', function ($scope, CityService) {
    $scope.IsLoading = true;
    CityService.getAll().then(function(result){
        $scope.IsLoading = false;
        $scope.cities = result.data.result;
    });
});
