/**
 * Created by Paul on 3/15/14.
 */

'use strict';

//Supprime un element d'un tableau
Array.prototype.unsetIndex = function(index){
    if(index > -1){
        this.splice(index,1);
    }
};

Array.prototype.unset = function(val){
    var index = this.indexOf(val)
    this.unsetIndex(index);
};

var app = angular.module('app', []);


app.run(function ($rootScope){
    $rootScope.messages = [];
}).config(function ($httpProvider, $provide) {
    $provide.factory('httpInterceptor', function ($q, $rootScope) {
        return {
            'response': function (response) {
                if(typeof(response.data.status)!=="undefined" && response.data.status.length>0){
                    $rootScope.messages = [];
                    for(var i = 0; i<response.data.status.length; i++ ){
                        $rootScope.messages.push(response.data.status[i]);
                    }
                }
                // we can intercept and change response here...
                // broadcasting 'httpResponse' event
                $rootScope.$broadcast('httpResponse', response);
                return response || $q.when(response);
            },
            'responseError': function (response) {
                $rootScope.messages = [];
                if(typeof(response.data.status)!=="undefined" && response.data.status.length>0){
                    for(var i = 0; i<response.data.status.length; i++ ){
                        $rootScope.messages.push(response.data.status[i]);
                    }
                }
                else {
                    var msg = "";
                    switch(response.status){
                        case 500:
                            msg = "Une erreur est survenue sur le serveur";
                            break;
                        default:
                            msg = "Une erreur est survenue";
                    }
                    $rootScope.messages.push({level: "danger", message: msg});
                }
                $rootScope.$broadcast('httpResponseError', response);
                return $q.reject(response);
            }
        };
    });
    $httpProvider.interceptors.push('httpInterceptor');
});