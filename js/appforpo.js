var appforpo = angular.module('appforpo',['LocalStorageModule','ui.grid','ui.grid.expandable','ui.grid.saveState', 'ui.grid.selection', 'ui.grid.pinning', 'ui.bootstrap','ui-notification']);



appforpo.controller('MainCtrl', ['$scope', '$http','localStorageService','$interval', '$modal', '$log', '$window', function ($scope, $http, localStorageService,$interval, $modal, $log,$window) {

 $scope.gotomain = function(){

    $window.location.href="index.html"
    };

 if(localStorageService.isSupported) {
  console.log('local storage is supported');
}

  $scope.gridOptions = {
    expandableRowTemplate: 'purchase_order_expanded.html',
    enableExpandableRowHeader: false,
    expandableRowHeight: 375,
    //subGridVariable will be available in subGrid scope
 expandableRowScope: {
        subGridVariable: 'subGridScopeVariable',
         overrideEnable:false,
      checkRcvQty:function(rcvqty,dueqty) {
      if(rcvqty > dueqty)  {
     this.overrideEnable=true
        }
   else {
     this.overrideEnable=false
     }
  },
  persistData:function () {
   localStorage.setItem("gridData",JSON.stringify($scope.gridOptions.data));
  },
  noMsgFirst:0,
  persistDataOverride:function () {
   localStorage.setItem("gridData",JSON.stringify($scope.gridOptions.data)),
   this.overrideEnable=false
  }
},
    showFooter: true,
    enableSorting: true,
    multiSelect: false,
    enableFiltering: true,
    enableRowSelection: true,
    rowHeight: 'auto',
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
     { name: 'PoNbr' },
     { name: 'ItemNbr'},
     { name: 'TotQty',enableFiltering: false },
     { name: 'DueQty',enableFiltering: false },
     { name: 'DeliveryNo' },
     { name: 'UserID'},
     { name: 'Status'},
     { name: 'Timestamp',enableFiltering: false},
     {
	name: 'Receive',
	displayName:' ',
	headerCellClass: 'header-cell',
	cellClass: 'center-align',
	enableCellEdit: false,
	enableSorting: false,
	enableFiltering: false,
	enableColumnMenu: false,
	width: '14%', 
    cellTemplate: "<div class=\'ui-grid-cell-contents expand-row\'>" + "<button class=\'btn btn-primary\' ng-disabled=\'isDisabled\' ng-click='grid.api.expandable.toggleRowExpansion(row.entity);grid.appScope.toggle = !grid.appScope.toggle'>{{grid.appScope.buttontext}}</button>" + "</div>"
	 }
  ];



var gridData = [{
    "PoNbr": 34567,
    "ItemNbr": 379892,
    "TotQty": 21,
    "DueQty": 12,
    "LabelNo": "3456737989212-A001",
    "UserID": "vmenon",
    "DoorNo": 101,
    "TruckQty": 30,
    "Timestamp": "02/01/2016 21:00:00",
    "DeliveryNo": "12345",
    "Status": "Created",
    "isLocked":false
  }, {
    "PoNbr": 34567,
    "ItemNbr": 435672,
    "TotQty": 23,
    "DueQty": 14,
    "LabelNo": "3456743567214-B001",
    "UserID": "vmenon",
    "DoorNo": 102,
    "TruckQty": 35,
    "Timestamp": "02/01/2016 21:00:00",
    "DeliveryNo": "12345",
    "Status": "Received",
      "isLocked":true     
  }, {
    "PoNbr": 34567,
    "ItemNbr": 876234,
    "TotQty": 35,
    "DueQty": 28,
    "LabelNo": "3456787623428-D001",
    "UserID": "vmenon",
    "DoorNo": 103,
    "TruckQty": 40,
    "Timestamp": "02/01/2016 21:00:00",
    "DeliveryNo": "12345",
    "Status": "Received",
      "isLocked":true     
  }, {
    "PoNbr": 43562,
    "ItemNbr": 873245,
    "TotQty": 38,
    "DueQty": 19,
    "LabelNo": "4356287324519-D001",
    "UserID": "manney",
    "DoorNo": 101,
    "TruckQty": 45,
    "Timestamp": "02/02/2016 21:00:00",
    "DeliveryNo": 12346,
    "Status": "Created",
      "isLocked":false
  }, {
    "PoNbr": 43562,
    "ItemNbr": 678345,
    "TotQty": 40,
    "DueQty": 10,
    "LabelNo": "4356267834510-C001",
    "UserID": "manney",
    "DoorNo": 105,
    "TruckQty": 60,
    "Timestamp": "02/02/2016 21:00:00",
    "DeliveryNo": 12346,
    "Status": "Created",
      "isLocked":false    
  }, {
    "PoNbr": 43562,
    "ItemNbr": 987324,
    "TotQty": 41,
    "DueQty": 34,
    "LabelNo": "4356298732434-A001",
    "UserID": "manney",
    "DoorNo": 103,
    "TruckQty": 45,
    "Timestamp": "02/02/2016 21:00:00",
    "DeliveryNo": 12346,
    "Status": "Received",
      "isLocked":true     
  }, {
    "PoNbr": 65412,
    "ItemNbr": 458921,
    "TotQty": 21,
    "DueQty": 12,
    "LabelNo": "6541245892100-B001",
    "UserID": "ugonugu",
    "DoorNo": 102,
    "TruckQty": 30,
    "Timestamp": "02/03/2016 21:00:00",
    "DeliveryNo": 12347,
    "Status": "Created",
      "isLocked":false    
  }, {
    "PoNbr": 65412,
    "ItemNbr": 567214,
    "TotQty": 31,
    "DueQty": 16,
    "LabelNo": "6541256721416-A001",
    "UserID": "ugonugu",
    "DoorNo": 104,
    "TruckQty": 45,
    "Timestamp": "02/03/2016 21:00:00",
    "DeliveryNo": 12347,
    "Status": "Received",
      "isLocked":true     
  }, {
    "PoNbr": 65412,
    "ItemNbr": 568926,
    "TotQty": 21,
    "DueQty": 21,
    "LabelNo": "6541256892621-D001",
    "UserID": "ugonugu",
    "DoorNo": 101,
    "TruckQty": 35,
    "Timestamp": "02/03/2016 21:00:00",
    "DeliveryNo": 12347,
    "Status": "Created",
      "isLocked":false    
  }, {
    "PoNbr": 54398,
    "ItemNbr": 123876,
    "TotQty": 27,
    "DueQty": 11,
    "LabelNo": "5439812387611-B001",
    "UserID": "b0naga",
    "DoorNo": 105,
    "TruckQty": 30,
    "Timestamp": "02/04/2016 21:00:00",
    "DeliveryNo": 12348,
    "Status": "Created",
      "isLocked":false    
  }, {
    "PoNbr": 54398,
    "ItemNbr": 298456,
    "TotQty": 25,
    "DueQty": 15,
    "LabelNo": "5439829845615-A001",
    "UserID": "b0naga",
    "DoorNo": 102,
    "TruckQty": 45,
    "Timestamp": "02/04/2016 21:00:00",
    "DeliveryNo": 12348,
    "Status": "Received",
      "isLocked":true     
  }, {
    "PoNbr": 54398,
    "ItemNbr": 908765,
    "TotQty": 34,
    "DueQty": 26,
    "LabelNo": "5439890876500-A001",
    "UserID": "b0naga",
    "DoorNo": 104,
    "TruckQty": 55,
    "Timestamp": "02/04/2016 21:00:00",
    "DeliveryNo": 12348,
    "Status": "Created",
      "isLocked":false    
  }, {
    "PoNbr": 76435,
    "ItemNbr": 290786,
    "TotQty": 9,
    "DueQty": 2,
    "LabelNo": "7643529078602-C001",
    "UserID": "lachu",
    "DoorNo": 101,
    "TruckQty": 20,
    "Timestamp": "02/05/2016 21:00:00",
    "DeliveryNo": 12349,
    "Status": "Received",
      "isLocked":true       
  }, {
    "PoNbr": 76435,
    "ItemNbr": 819546,
    "TotQty": 17,
    "DueQty": 10,
    "LabelNo": "7643581954610-D001",
    "UserID": "lachu",
    "DoorNo": 104,
    "TruckQty": 25,
    "Timestamp": "02/05/2016 21:00:00",
    "DeliveryNo": 12349,
    "Status": "Created",
      "isLocked":false    
  }, {
    "PoNbr": 76435,
    "ItemNbr": 298763,
    "TotQty": 11,
    "DueQty": 11,
    "LabelNo": "7643529876311-B001",
    "UserID": "lachu",
    "DoorNo": 102,
    "TruckQty": 30,
    "Timestamp": "02/05/2016 21:00:00",
    "DeliveryNo": 12349,
    "Status": "Created",
      "isLocked":false    
  }

]

 // $http.get('data7.json')
//    .success(function(data) {
 //    $scope.gridOptions.data = data

//If the gridData is not set in local storage, get the variable above and set it. If its already set, assign it to gridoptions.data
if (localStorage.getItem('gridData') === null) {
localStorage.setItem("gridData",JSON.stringify(gridData));
$scope.gridOptions.data=JSON.parse(localStorage.getItem("gridData"));
console.log($scope.gridOptions.data);
}
else {
  $scope.gridOptions.data=JSON.parse(localStorage.getItem("gridData"));
  console.log($scope.gridOptions.data);
}
   $scope.toggle = true;


    $scope.$watch('toggle', function(){
        $scope.buttontext = $scope.toggle ? 'Show' : 'Hide';
    });   $scope.toggle = true;

    $scope.$watch('toggle', function(){
        $scope.buttontext = $scope.toggle ? 'Show' : 'Hide';
    });
	
$scope.slotid = [
 {id:1,slot:'A001'},
{id:2,slot:'B001'},
{id:3,slot:'C001'},
{id:4,slot:'D001'}
];

}]);



