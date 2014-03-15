/**
 * Created by Paul on 3/15/14.
 */

app.factory('TeamService', function($http) {
    // Default encoding post message, for php operation.
    $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";

    return {
        getAll: function() {
            return $http.get('./core.php/team/all');
        },
        create : function(name, city){
            var param = $.param({name: name, city: city});
            return $http.post('./core.php/team/create', param);
        }
    }
});

app.factory('MatchService', function($http) {
    // Default encoding post message, for php operation.
    $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";

    return {
        getAll: function() {
            return $http.get('./core.php/match/all');
        },
        create : function(name, city){
            var param = $.param({name: name, city: city});
            return $http.post('./core.php/team/create', param);
        }
    }
});