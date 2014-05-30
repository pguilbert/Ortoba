
app.controller('TeamController', function ($scope, TeamService) {
    $scope.IsLoading = true;
    TeamService.getAll().then(function(result){
        $scope.IsLoading = false;
        $scope.teams = result.data.result;
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