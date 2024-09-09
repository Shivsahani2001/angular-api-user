const myApp = angular.module("myList",["ngRoute"]);

myApp.service("myData",function($http){
    this.getProducts = function(){
        return $http.get("https://reqres.in/api/users/");
    } ;   
    this.getUserById = function(id){
        return $http.get("https://reqres.in/api/users/"+id)
    };
} );


myApp.config(['$routeProvider',function($routeProvider){
    $routeProvider.when('/',{
        templateUrl: "index.html",
        controller: "myListController"
    })
    .when("/user/:id",{
        templateUrl: "views/userDetail.html",
        controller: "userDetailController",
    }).otherwise({
        redirectTo: "/",
    });
},]);

myApp.controller("myListController",function($scope,myData,$location) {
 
    
    $scope.products = [];
   
    
    function getAllProducts() {
        myData.getProducts().then(function (response) {
          $scope.products = response.data.data;
        });
      }
    
      $scope.showUserDetails = function (id) {
        $location.path("/user/" + id);
      };
getAllProducts();});


myApp.controller("userDetailController", function ($scope, myData, $routeParams) {
    console.log("userDetailController loaded with user ID:", $routeParams.id);
    $scope.user = {};
    myData.getUserById($routeParams.id).then(function (response) {
        console.log("Single User Data:", response.data.data);
        $scope.user = response.data.data;
    });
});
