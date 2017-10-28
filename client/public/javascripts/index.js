var myModule = angular.module('Reedling',
    [
        'ngRoute',
        'ngAnimate',
//        'firebase',
        'ngMessages',
        'REEDLING.SITEVISIT',
        'REEDLING.LOCATION',
        'REEDLING.COUNTRY',
        'REEDLING.CHECKLIST',
        'REEDLING.REPORTQUERY',
        'REEDLING.CHECKLISTDETAIL',
        'REEDLING.SITEVISITLIST',
        'REEDLING.USERLIST',
        'REEDLING.USER',
        'REEDLING.OBSERVATION',
        'REEDLING.LOCATIONEDIT',
        'REEDLING.LOGIN'
        // 'Angello.Common',
        // 'Angello.Dashboard',
        // 'Angello.Login',
        // 'Angello.Storyboard',
        // 'Angello.User',
        // 'auth0',
        // 'angular-jwt',
        // 'angular-storage'
    ]);

myModule.controller('MainCtrl', function() { });

myModule.config(function($routeProvider, $httpProvider, $provide /*,
  authProvider, CURRENT_BACKEND, jwtInterceptorProvider */) {


    $httpProvider.interceptors.push(function($q, $location) {
     return {
      response: function(response) {
        // do something on success
        return response;
    },
    responseError: function(response) {
        if (response.status === 401)
            $location.url('/login');
        return $q.reject(response);
         }
        };
    });


    $routeProvider
        .when('/', {
            templateUrl: '/reedling.html',
            controller: 'TypeaheadCtrl',
            controllerAs: 'typeahead'/*,
            requiresLogin: true*/
        })

        // .when('/logout', {
        //     templateUrl: '/login.html',
        //     controller: 'LoginCtrl',
        //     controllerAs: 'login'
        // })

        .when('/sitevisit/:sitevisitId', {
            templateUrl: '/reedling.html',
            controller: 'TypeaheadCtrl',
            controllerAs: 'typeahead'/*,
            requiresLogin: true*/
        })
        .when('/location/:locationId', {
            templateUrl: '/locationEdit.html',
            controller: 'LocationEditCtrl',
            controllerAs: 'locationEditCtrl'/*,
            requiresLogin: true*/
        })

        .when('/location', {
            templateUrl: '/location.html',
            controller: 'LocationCtrl',
            controllerAs: 'locationCtrl'/*,
            requiresLogin: true*/
        })

        .when('/countries', {
            templateUrl: '/country.html',
            controller: 'CountryCtrl',
            controllerAs: 'countryCtrl'/*,
            requiresLogin: true*/
        })
        .when('/checklistnames', {
            templateUrl: '/checklistname.html',
            controller: 'ChecklistCtrl',
            controllerAs: 'checklistCtrl'/*,
            requiresLogin: true*/
        })

        .when('/checklistDetail', {
            templateUrl: '/checklistDetail.html',
            controller: 'ChecklistDetailCtrl',
            controllerAs: 'checklistDetailCtrl'/*,
            requiresLogin: true*/
        })

        .when('/reports', {
            templateUrl: '/reportQuery.html',
            controller: 'ReportQueryCtrl',
            controllerAs: 'reportQueryCtrl'/*,
            requiresLogin: true*/
        })

        .when('/sitevisits', {
            templateUrl: '/siteVisitList.html',
            controller: 'SiteVisitCtrl',
            controllerAs: 'siteVisitCtrl'/*,
            requiresLogin: true*/
        })
        .when('/users', {
            templateUrl: '/userList.html',
            controller: 'UserListCtrl',
            controllerAs: 'userListCtrl'/*,
            requiresLogin: true*/
        })
        .when('/user/:userId', {
            templateUrl: '/user.html',
            controller: 'UserCtrl',
            controllerAs: 'userCtrl'/*,
            requiresLogin: true*/
        })
        .when('/observation/:observationId', {
            templateUrl: '/observation.html',
            controller: 'ObservationCtrl',
            controllerAs: 'observationCtrl'/*,
            requiresLogin: true*/
        })
        .when('/users/:userId', {
            templateUrl: 'src/angello/user/tmpl/user.html',
            controller: 'UserCtrl',
            controllerAs: 'myUser',
            requiresLogin: true,
            resolve: {
                user: function ($route, $routeParams, UsersModel) {
                    var userId = $route.current.params['userId']
                               ? $route.current.params['userId']
                               : $routeParams['userId'];
                    return UsersModel.fetch(userId);
                },
                stories: function ($rootScope, StoriesModel) {
                    return StoriesModel.all();
                }
            }
        })
        .when('/login', {
            templateUrl: '/login.html',
            controller: 'LoginCtrl',
            controllerAs: 'loginCtrl'
        })


        .otherwise({redirectTo: '/'});

// Auth0 Authentication
// authProvider.init({
//     domain: 'angello.auth0.com',
//     clientID: 'Fq8hKAkghu45WpnqrYTc6dbvXhBUdP7l'
// });

    // Loading interceptor
    // $httpProvider.interceptors.push('loadingInterceptor');

    // // Request interceptor
    // if (CURRENT_BACKEND === 'firebase') {
    //   jwtInterceptorProvider.authPrefix = '';
    // }

    // jwtInterceptorProvider.tokenGetter = function(store) {
    //   return store.get('userToken');
    // };

    // $httpProvider.interceptors.push('jwtInterceptor');




    // Decorator
    // Use the `decorator` solution to substitute or attach behaviors to
    // original service instance; @see angular-mocks for more examples....
    // $provide.decorator('$log', function ($delegate) {
    //     // TODO Extract this into a utility service
    //     function timeStamp() {
    //         // Create a date object with the current time
    //         var now = new Date();

    //         // Create an array with the current month, day and time
    //         var date = [ now.getMonth() + 1, now.getDate(), now.getFullYear() ];

    //         // Create an array with the current hour, minute and second
    //         var time = [ now.getHours(), now.getMinutes(), now.getSeconds() ];

    //         // Determine AM or PM suffix based on the hour
    //         var suffix = ( time[0] < 12 ) ? "AM" : "PM";

    //         // Convert hour from military time
    //         time[0] = ( time[0] < 12 ) ? time[0] : time[0] - 12;

    //         // If hour is 0, set it to 12
    //         time[0] = time[0] || 12;

    //         // If seconds and minutes are less than 10, add a zero
    //         for (var i = 1; i < 3; i++) {
    //             if (time[i] < 10) {
    //                 time[i] = "0" + time[i];
    //             }
    //         }

    //         // Return the formatted string
    //         return date.join("/") + " " + time.join(":") + " " + suffix;
    //     }

    //     // Save the original $log.debug()
    //     var debugFn = $delegate.debug;

    //     $delegate.debug = function () {
    //         // Prepend timestamp
    //         arguments[0] = timeStamp() + ' - ' + arguments[0];

    //         // Call the original with the output prepended with formatted timestamp
    //         debugFn.apply(null, arguments)
    //     };

    //     return $delegate;
    // });
});

// myModule.factory('loadingInterceptor', function (LoadingService) {
//     var loadingInterceptor = {
//         request: function (config) {
//             LoadingService.setLoading(true);
//             return config;
//         },
//         response: function (response) {
//             LoadingService.setLoading(false);
//             return response;
//         }
//     };
//     return loadingInterceptor;
// });

// myModule.run(function ($rootScope, LoadingService, LoginService) {
//     $rootScope.$on('$routeChangeStart', function (e, curr, prev) {
//         LoadingService.setLoading(true);
//     });

//     $rootScope.$on('$routeChangeSuccess', function (e, curr, prev) {
//         LoadingService.setLoading(false);
//     });

//     $rootScope.$on('$locationChangeStart', function() {
//       LoginService.authenticateUser();
//     });
// });

// myModule.value('STORY_STATUSES', [
//     {name: 'To Do'},
//     {name: 'In Progress'},
//     {name: 'Code Review'},
//     {name: 'QA Review'},
//     {name: 'Verified'}
// ]);

// myModule.value('STORY_TYPES', [
//     {name: 'Feature'},
//     {name: 'Enhancement'},
//     {name: 'Bug'},
//     {name: 'Spike'}
// ]);

// myModule.constant('Firebase', window.Firebase);
