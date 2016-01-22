(function () {
    var tweb = angular.module('tweb', ['ngRoute', 'chart.js', 'ui.router']);

    tweb.config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
        $locationProvider.html5Mode(true);

        $stateProvider.state('main', {
            templateUrl: '/res/partials/main.html',
            url: '^/',
            controller: 'main'
        });

        $stateProvider.state('user', {
            templateUrl: '/res/partials/user.html',
            url: '^/user/:username',
            controller: 'user'
        });

        $stateProvider.state('repo', {
            templateUrl: '/res/partials/repo.html',
            url: '^/user/:username/repo/:repo',
            controller: 'repo'
        });

        $stateProvider.state('error', {
            templateUrl: '/res/partials/error.html',
            url: '^/error',
            controller: 'error'
        });
    });
    tweb.controller('error', function () {

    });


    tweb.controller('main', function () {

    });

    tweb.controller('repo', function ($scope, $stateParams, $http, $state) {
        $scope.userNotFound = false;
        $scope.loaded = false;

        $scope.contributorsNames = [];
        $scope.contributorscontributions = [];

        $scope.languagesNames = [];
        $scope.languagesStats = [];

        $scope.userStatslbl = [];
        $scope.userStatsName = [];
        $scope.userStats = [];


        $scope.owner = $stateParams.username

        //recupère les informations de base sur le repos du user (lien, date creation etc)
        $http.get("https://api.github.com/repos/" + $stateParams.username + "/" + $stateParams.repo)
            .success(function (data) {
                $scope.repodata = data;
                $scope.loaded = true;


                //recupère les inforamtions sur les contributeurs du repo
                $http.get(data.contributors_url)
                    .success(function (data) {
                        $scope.contributors_url = data;
                        for (i = 0; i < data.length; i++) {
                            $scope.contributorsNames.push($scope.contributors_url[i].login);
                            $scope.contributorscontributions.push($scope.contributors_url[i].contributions);
                        }
                    })

                //recupres les informations sur les languages utilisé
                $http.get(data.languages_url)
                    .success(function (data) {
                        $scope.languages_url = data;
                        for(var property in $scope.languages_url)
                        {
                            $scope.languagesNames.push(property);
                            $scope.languagesStats.push($scope.languages_url[property]);
                        }
                    })
                //TO DO
                //Non implémentée pour le moment, repère les infromations sur le nombre de commit de chaque
                //contributeur durant les X semaines
                $http.get("https://api.github.com/repos/"+ $stateParams.username + "/" + $stateParams.repo + "/stats/contributors")
                    .success(function (data) {
                        $scope.user_stats = data;
                        for (i = 0; i < data.length; i++) {
                            $scope.userStatsName.push($scope.user_stats[i].author.login);
                            $scope.contributorscontributions.push($scope.contributors_url[i].contributions);
                        }

                    })
            })
            .error(function () {
                $scope.userNotFound = true;
                $state.go('error');
            })
    });

    tweb.controller('navbarcrtl', function ($scope, $http, $stateParams, $state) {
        $scope.userNotFound = false;
        $scope.loaded = false;
        $scope.getGitInfo = function () {
            $scope.userNotFound = false;
            $scope.loaded = false;

            //on fait une requete vers l'api pour savoir si le user tapé exisite
            $http.get("https://api.github.com/users/" + $scope.username)
                .success(function (data) {
                    $scope.loaded = true;
                    $state.go('user', {username: $scope.username});
                })
                .error(function () {
                    $scope.userNotFound = true;
                    $state.go('error');
                })
        };
    });

    tweb.controller('user', function ($scope, $stateParams, $http, $state) {
        $scope.userNotFound = false;
        $scope.loaded = false;
        $scope.owner = $stateParams.username

        //recuperation des informations du user (avatar, lien github)
        $http.get("https://api.github.com/users/" + $stateParams.username)
            .success(function (data) {
                $scope.user = data;
                $scope.loaded = true;

                //recuperation des repos du user
                $http.get("https://api.github.com/users/" + $stateParams.username + "/subscriptions")
                    .success(function (data) {
                        $scope.subscriptions = data;
                        $scope.subscriptionsFound = data.length;
                    });

                //recpueration des ogranaisation du user
                $http.get("https://api.github.com/users/" + $stateParams.username + "/orgs")
                    .success(function (data) {
                        $scope.orgs = data;
                        $scope.orgsFound = data.length;
                    });
            })
            .error(function () {
                $scope.userNotFound = true;
                $state.go('error');
            })


    });
}())
