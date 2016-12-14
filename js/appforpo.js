var appforpo = angular.module('appforpo',['ui.grid','ui.grid.expandable','ui.grid.saveState', 'ui.grid.selection', 'ui.grid.pinning', 'ui.bootstrap','ui-notification']);



appforpo.controller('MainCtrl', ['$scope', '$http','gridFactory','$interval', '$log', '$window', function ($scope, $http,gridFactory,$interval, $log,$window) {

 $scope.gotomain = function(){

    $window.location.href="index.html"
    };



  $scope.gridOptions = {
    expandableRowTemplate: 'purchase_order_expanded.html',
    enableExpandableRowHeader: false,
    expandableRowHeight: 375,
    //subGridVariable will be available in subGrid scope
 expandableRowScope: {
        subGridVariable: 'subGridScopeVariable',
         overrideEnable:false,
      checkRcvQty:function(dueqty) {
      if(dueqty < 0)  {
     this.overrideEnable=true
        }
   else {
     this.overrideEnable=false
     }
  },
  persistData:function (currentRow) {
    console.log(currentRow);
    gridFactory.updDet(currentRow)
  .success(function(data, status, headers, config) {
    console.log('success!!' + '\n\n' + data+'\n'+status+'\n'+headers+'\n'+config);
  })
  .error(function(data, status, headers, config) {
    console.log('error!!' + '\n\n' + data+'\n'+status+'\n'+headers+'\n'+config);
  });
  },
  noMsgFirst:0,
  persistDataOverride:function (currentRow) {
   gridFactory.updDet(currentRow)
  .success(function(data, status, headers, config) {
    console.log('success!!' + '\n\n' + data+'\n'+status+'\n'+headers+'\n'+config);
   this.overrideEnable=false
     })
    .error(function(data, status, headers, config) {
    console.log('error!!' + '\n\n' + data+'\n'+status+'\n'+headers+'\n'+config);
      });
  },
  dueQty:function(totqty,rcvqty) {
    return totqty - rcvqty;
  }
},
    showFooter: true,
    enableSorting: true,
    multiSelect: false,
    enableFiltering: true,
    enableRowSelection: true,
    rowHeight: 'auto',
    virtualizationThreshold :50,
    enableSelectAll: false,
    enableRowHeaderSelection: false,
    selectionRowHeaderWidth: 35,
    noUnselect: true,
    enableGridMenu: true,
    onRegisterApi: function(gridApi){
    $scope.gridApi = gridApi;
    }
  }

   $scope.gridOptions.columnDefs = [
     { name: 'poNbr'},
     { name: 'itemNbr'},
     { name: 'totalQty',enableFiltering: false},
     { name: 'rcvdQty',enableFiltering: false},
     { name: 'deliveryNbr'},
     { name: 'userId'},
     { name: 'poStatus',width: '12%', },
    // { name: 'rcvdTs',type: 'date', cellFilter: 'date:\'yyyy-MM-dd hh:mm:ss\'',enableFiltering: false,width: 250},
     { name: 'doorNbr'},
     {
	name: 'Receive',
	displayName:' ',
	headerCellClass: 'header-cell',
	cellClass: 'center-align',
	enableCellEdit: false,
	enableSorting: false,
	enableFiltering: false,
	enableColumnMenu: false,
	width: '10%', 
    cellTemplate: "<div class=\'ui-grid-cell-contents expand-row\'>" + "<button class=\'btn btn-primary\' ng-click='grid.api.expandable.toggleRowExpansion(row.entity);grid.appScope.toggle = !grid.appScope.toggle'>{{grid.appScope.buttontext}}</button>" + "</div>"
	 }
  ];


gridFactory.getDet()
.success(function(response) {
  console.log(response);
 $scope.gridOptions.data=response;  
 $scope.gridlength=$scope.gridOptions.data.length;

})
.error(function() {
  console.log("error!!");
});



   $scope.toggle = true;
    $scope.$watch('toggle', function(){
        $scope.buttontext = $scope.toggle ? 'Show' : 'Hide';
    });   $scope.toggle = true;

    $scope.$watch('toggle', function(){
        $scope.buttontext = $scope.toggle ? 'Show' : 'Hide';
    });
	

$scope.slotid = [
{ id:1, name: 'A001' },
{ id:2, name: 'B001' },
{ id:3, name: 'C001' },
{ id:4, name: 'D001' }];

//$scope.selectedslot= $scope.slotid[0];
//$scope.selectedOption = $scope.options[0];

}]);

appforpo.factory('gridFactory',function($http) {
  return {
    ser_var:"service variable",
        getDet:function() {
     return $http.get('https://receiving.cfapps.io/getallpoinfo');
     //return $http.get('data1.json');
    },

    updDet:function(data) {
      return $http.put('https://receiving.cfapps.io/updatepoinfo',data,{})
    }
  }
})



