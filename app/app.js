/*created by arley on 7/26/17*/
//declared module and assigned the result to a variable used setter syntax; no dependencies
//IIFE:immediately invoked function expression js pattern that helps prevent global declarations also called self executing anonymus function.
(function(){
    "use strict";
var app = angular.module("productManagement", ['common.services',
                                                'ui.router',
                                                'ui.mask',
                                                'ui.bootstrap',
                                                'angularCharts',
                                                'productResourceMock']);
app.config(function($provide){
    $provide.decorator("$exceptionHandler",
        ["$delegate",
            function($delegate){
                return function(exception, cause) {
                    exception.message = "Please contact the Help Desk! \n Message: " + exception.message;
                    $delegate(exception, cause);
                    alert(exception.message);
                };
            }])
});

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
                //abstract is used so this state cannnot be called explicitly, will trow an attemt is so and will only activate implicitly when a child state is activated
                abstract: true,
                url:"/products/edit/:productId",
                templateUrl:"app/products/productEditView.html",
                controller: "ProductEditCtrl as vm",
                resolve: {
                    //resolved is used to retrieve data for state ensuring associated view is not displayed until the data is retrieved and ready
                    productResource: "productResource",
                    //product and productresource are key value pairs and can be nmed anything
                    product: function(productResource, $stateParams){
                        var productId = $stateParams.productId;
                        return productResource.get({productId: productId}).$promise;
                    }
                }
        })

            .state("productEdit.info",{
            url:"/info",
            templateUrl:"app/products/productEditInfoView.html",
        })

            .state("productEdit.price",{
            url:"/price",
            templateUrl:"app/products/productEditPriceView.html",
        })

            .state("productEdit.tags",{
            url:"/tags",
            templateUrl:"app/products/productEditTagsView.html",
        })

            .state("productDetail",{
                url:"/products/:productId",
                templateUrl:"app/products/productDetailView.html",
                controller: "ProductDetailCtrl as vm",
                resolve: {
                    //resolved is used to retrieve data for state ensuring associated view is not displayed until the data is retrieved and ready
                    productResource: "productResource",
                    //product and productresource are key value pairs and can be nmed anything
                    product: function(productResource, $stateParams){
                        var productId = $stateParams.productId;
                        return productResource.get({productId: productId}).$promise;
                    }
                }

            })
            //resolve object ensure all data is loaded before bringing in page
            //do not need a parameter since we will retireve all product data and using query to get product in an array

            .state("priceAnalytics",{
                url:"/priceAnalytics",
                templateUrl:"app/prices/priceAnalyticsView.html",
                controller:"PriceAnalyticsCtrl",
                resolve: {
                    productResource: "productResource",
                    products: function(productResource){
                        return productResource.query(function(response){
                            //no code needed for success
                        },function(response){
                            if (response.status == 404){
                                alert("Error accessing resource: " +
                                response.config.method + " " + response.config.url);
                            }
                            else {
                                alert(response.statusText);
                            }
                        }).$promise;
                    }
                }
            })

    }]
);
}());