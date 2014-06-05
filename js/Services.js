/**
 * Created by Paul on 3/15/14.
 */

app.factory('TeamService', function($http) {
    // Default encoding post message, for php operation.
    $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";

    return {
        getAll: function() {
            return $http.get('./core.php/teams');
        },
        create : function(name, city){
            var param = $.param({name: name, city: city});
            return $http.post('./core.php/teams', param);
        }
    }
});

app.factory('MatchService', function($http) {
    // Default encoding post message, for php operation.
    $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";

    return {
        getAll: function() {
            return $http.get('./core.php/matchs');
        },
        create : function(scoreTeam1, scoreTeam2, teamId1, teamId2){
            var param = $.param({scoreTeam1: scoreTeam1, scoreTeam2: scoreTeam2, teamId1: teamId1, teamId2: teamId2});
            return $http.post('./core.php/matchs', param);
        }
    }
});

app.factory('CityService', function($http) {
    // Default encoding post message, for php operation.
    $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";

    return {
        getAll: function() {
            return $http.get('./core.php/cities');
        },
        getMatchByCity : function(idCity){
            return $http.get('./core.php/cities/'+ idCity +'/matchs');
        }
    }
});