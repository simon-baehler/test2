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


    });

    tweb.controller('main', function ($scope, $location) {

    });

    tweb.controller('repo', function ($scope, $location, $stateParams, $http) {
        $scope.userNotFound = false;
        $scope.loaded = false;
        $scope.contributors;
        $stateParams.username;
        $stateParams.repo;

        $scope.contributorsNames = [];
        $scope.contributorscontributions = [];

        $scope.languagesNames = [];
        $scope.languagesStats = [];

        $scope.userStatslbl = [];
        $scope.userStatsName = [];
        $scope.userStats = [];


        $scope.owner = $stateParams.username

        $http.get("https://api.github.com/repos/" + $stateParams.username + "/" + $stateParams.repo)
            .success(function (data) {
                $scope.repodata = data;
                $scope.loaded = true;


                $http.get(data.contributors_url)
                    .success(function (data) {
                        $scope.contributors_url = data;
                        for (i = 0; i < data.length; i++) {
                            $scope.contributorsNames.push($scope.contributors_url[i].login);
                            $scope.contributorscontributions.push($scope.contributors_url[i].contributions);
                        }
                    })

                $http.get(data.languages_url)
                    .success(function (data) {
                        $scope.languages_url = data;
                        for(var property in $scope.languages_url)
                        {
                            $scope.languagesNames.push(property);
                            $scope.languagesStats.push($scope.languages_url[property]);
                        }
                    })

                $http.get("https://api.github.com/repos/"+ $stateParams.username + "/" + $stateParams.repo + "/stats/contributors")
                    .success(function (data) {
                        $scope.user_stats = data;
                        console.log("stats" + data);
                        console.log(data);

                        for (i = 0; i < data.length; i++) {
                            $scope.userStatsName.push($scope.user_stats[i].author.login);
                            $scope.contributorscontributions.push($scope.contributors_url[i].contributions);
                        }

                        console.log($scope.userStatsName);

                    })
            })
            .error(function () {
                $scope.userNotFound = true;
            })
    });

    tweb.controller('navbarcrtl', function ($scope, $http, $stateParams, $state) {
        $scope.userNotFound = false;
        $scope.loaded = false;
        $scope.user = {};
        $scope.getGitInfo = function () {
            $scope.userNotFound = false;
            $scope.loaded = false;

            $http.get("https://api.github.com/users/" + $scope.username)
                .success(function (data) {
                    $scope.user = data;
                    $scope.loaded = true;

                    $state.go('user', {username: $scope.username});
                })
                .error(function () {
                    $scope.userNotFound = true;
                })
        };
    });

    tweb.controller('user', function ($scope, $stateParams, $http) {
        $scope.userNotFound = false;
        $scope.loaded = false;
        $stateParams.username;
        $scope.owner = $stateParams.username

        $http.get("https://api.github.com/users/" + $stateParams.username)
            .success(function (data) {
                $scope.user = data;
                $scope.loaded = true;

                $http.get("https://api.github.com/users/" + $stateParams.username + "/subscriptions")
                    .success(function (data) {
                        $scope.subscriptions = data;
                        $scope.subscriptionsFound = data.length;
                    });

                $http.get("https://api.github.com/users/" + $stateParams.username + "/orgs")
                    .success(function (data) {
                        $scope.orgs = data;
                        $scope.orgsFound = data.length;
                    });
            })
            .error(function () {
                $scope.userNotFound = true;
            })


    });
}())
