(
    function(){
        "use strict";
        angular
            .module("productManagement")
            .controller("PriceAnalyticsCtrl",
                ["$scope",
                "$filter",
                "products",
                "productService",
                PriceAnalyticsCtrl]);

        function PriceAnalyticsCtrl($scope,$filter,products,productService) {
            $scope.title = "Price Analytics";

            //computed property
            for(var i =0;i<products.length;i++){
                products[i].marginPercent = productService.calculateMarginPercent(products[i].price,products[i].cost);
                products[i].marginAmount = productService.calculateMarginAmount(products[i].price,products[i].cost);
            }

            var orderedProductsAmount = $filter("orderBy")(products, "marginAmount");
            var filteredProductsAmount = $filter("limitTo")(orderedProductsAmount, 5);

            var chartDataAmount = [];
            for(var j=0;j < filteredProductsAmount.length;j++){
                chartDataAmount.push({
                    x: filteredProductsAmount[j].productName,
                    y: [filteredProductsAmount[j].cost,
                       filteredProductsAmount[j].price,
                       filteredProductsAmount[j].marginAmount]
                });
            }

            $scope.dataAmount = {
                series: ["Cost", "Price", "Margin Amount"],
                data: chartDataAmount
            };

            $scope.configAmount = {
                title:"Top $ Margin Products",
                toolTips: true,
                labels: false,
                mouseover: function () { },
                mouseout: function(){},
                click:function(){},
                legend:{
                    display: true,
                    position:"right"
                }
            };

            var orderedProductsPercent = $filter("orderBy")(products, "marginPercent");
            var filteredProductsPercent = $filter("limitTo")(orderedProductsPercent, 5);

            var chartDataPercent = [];
            for(var k=0;k<filteredProductsPercent.length;k++){
                chartDataPercent.push({
                    x: filteredProductsPercent[k].productName,
                    y: [filteredProductsPercent[k].marginPercent]
                });
            }

            $scope.dataPercent = {
                series: ["Margin %"],
                data: chartDataPercent
            };

            $scope.configPercent = {
                title:"Top % Margin Products",
                toolTips: true,
                labels: false,
                mouseover: function(){},
                mouseout: function(){},
                click:function(){},
                legend:{
                    display: true,
                    position:'right'
                }
            };
        }


    }());