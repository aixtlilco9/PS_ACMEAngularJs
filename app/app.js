/*created by arley on 7/26/17*/
//declared module and assigned the result to a variable used setter syntax; no dependencies
//IIFE:immediately invoked function expression js pattern that helps prevent global declarations also called self executing anonymus function.
(function(){
    "use strict";
var app = angular.module("productManagement", ['common.services', 'ui.router', 'productResourceMock']);

app.config(
    ["$stateProvider","$urlRouterProvider",
    function($stateProvider, $urlRouterProvider){
        $urlRouterProvider.otherwise("/");
        $stateProvider
            //Welcome page
            .state("home",{
                url:"/",
                templateUrl:"app/welcomeView.html"
            })
        //Products page
            .state("productList",{
                url:"/products",
                templateUrl:"app/products/productListView.html",
                controller: "ProductListCtrl as vm"
            })
        //Edit page

            .state("productEdit",{
                url:"/products/edit/:productId",
                templateUrl:"app/products/productEditView.html",
                controller: "ProductEditCtrl as vm"
            })
    }]
);
}());