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
      checkRcvQty:function(dueqty) {
      if(dueqty < 0)  {
     this.overrideEnable=true
        }
   else {
     this.overrideEnable=false
     }
  },
  persistData:function (slot) {
   localStorage.setItem("gridData",JSON.stringify($scope.gridOptions.data));
  },
  noMsgFirst:0,
  persistDataOverride:function (currentRow) {
   localStorage.setItem("gridData",JSON.stringify($scope.gridOptions.data)),
  // localStorage.setItem("suprvsrData",JSON.stringify(currentRow)),
   this.overrideEnable=false,
   console.log(currentRow)
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
    "PoNbr": 11111,
    "ItemNbr": 10000,
    "TotQty": 21,
    "LabelNo": "3456737989212-A001",
    "UserID": "vmenon",
    "DoorNo": 101,
    "RcvQty":0,
    "Timestamp": "02/01/2016 21:00:00",
    "DeliveryNo": "12345",
    "Status": "Created",
    "SlotId":"",
    "NoPallet":0,
    "Comments":"",
    "isLocked":false
  }, {
    "PoNbr": 11111,
    "ItemNbr": 10001,
    "TotQty": 23,
    "LabelNo": "3456743567214-B001",
    "UserID": "vmenon",
    "DoorNo": 102,
    "RcvQty":23,
    "Timestamp": "02/01/2016 21:00:00",
    "DeliveryNo": "12345",
    "Status": "Received",
    "SlotId":"A001",
    "NoPallet":0,
    "Comments":"",
    "isLocked":true     
  }, {
    "PoNbr": 22222,
    "ItemNbr": 10003,
    "TotQty": 35,
    "LabelNo": "3456787623428-D001",
    "UserID": "vmenon",
    "DoorNo": 103,
    "RcvQty":0,
    "Timestamp": "02/01/2016 21:00:00",
    "DeliveryNo": "12346",
    "Status": "Created",
    "SlotId":"",
    "NoPallet":0,
    "Comments":"",
    "isLocked":false     
  }, {
    "PoNbr": 22222,
    "ItemNbr": 10004,
    "TotQty": 38,
    "LabelNo": "4356287324519-D001",
    "UserID": "manney",
    "DoorNo": 101,
    "RcvQty":0,
    "Timestamp": "02/02/2016 21:00:00",
    "DeliveryNo": 12346,
    "Status": "Created",
   "SlotId":"",
    "NoPallet":0,
    "Comments":"", 
    "isLocked":false
  }, {
    "PoNbr": 33333,
    "ItemNbr": 10005,
    "TotQty": 40,
    "LabelNo": "4356267834510-C001",
    "UserID": "manney",
    "DoorNo": 105,
    "RcvQty":0,
    "Timestamp": "02/02/2016 21:00:00",
    "DeliveryNo": 12346,
    "Status": "Created",
    "SlotId":"",
    "NoPallet":0,
    "Comments":"",
      "isLocked":false    
  }, {
    "PoNbr": 33333,
    "ItemNbr": 10006,
    "TotQty": 41,
    "LabelNo": "4356298732434-A001",
    "UserID": "manney",
    "DoorNo": 103,
    "RcvQty":41,
    "Timestamp": "02/02/2016 21:00:00",
    "DeliveryNo": 12347,
    "Status": "Received",
    "SlotId":"D001",
    "NoPallet":0,
    "Comments":"",
   "isLocked":true     
  }, {
    "PoNbr": 44444,
    "ItemNbr": 10004,
    "TotQty": 21,
    "LabelNo": "6541245892100-B001",
    "UserID": "ugonugu",
    "DoorNo": 102,
    "RcvQty":0,
    "Timestamp": "02/03/2016 21:00:00",
    "DeliveryNo": 12347,
    "Status": "Created",
   "SlotId":"",
    "NoPallet":0,
    "Comments":"",
    "isLocked":false    
  }, {
    "PoNbr": 44444,
    "ItemNbr": 10007,
    "TotQty": 31,
    "LabelNo": "6541256721416-A001",
    "UserID": "ugonugu",
    "DoorNo": 104,
    "RcvQty":31,
    "Timestamp": "02/03/2016 21:00:00",
    "DeliveryNo": 12348,
    "Status": "Received",
    "SlotId":"B001",
    "NoPallet":0,
    "Comments":"",
    "isLocked":true     
  }, {
    "PoNbr": 55555,
    "ItemNbr": 10008,
    "TotQty": 21,
    "LabelNo": "6541256892621-D001",
    "UserID": "ugonugu",
    "DoorNo": 101,
    "RcvQty":0,
    "Timestamp": "02/03/2016 21:00:00",
    "DeliveryNo": 12348,
    "Status": "Created",
    "SlotId":"",
    "NoPallet":0,
    "Comments":"",
    "isLocked":false    
  }, {
    "PoNbr": 55555,
    "ItemNbr": 10006,
    "TotQty": 27,
    "LabelNo": "5439812387611-B001",
    "UserID": "b0naga",
    "DoorNo": 105,
    "RcvQty":0,
    "Timestamp": "02/04/2016 21:00:00",
    "DeliveryNo": 12348,
    "Status": "Created",
    "SlotId":"",
    "NoPallet":0,
    "Comments":"",
      "isLocked":false    
  }, {
    "PoNbr": 66666,
    "ItemNbr": 10010,
    "TotQty": 25,
    "LabelNo": "5439829845615-A001",
    "UserID": "b0naga",
    "DoorNo": 102,
    "RcvQty":25,
    "Timestamp": "02/04/2016 21:00:00",
    "DeliveryNo": 12349,
    "Status": "Received",
    "SlotId":"A001",
    "NoPallet":0,
    "Comments":"",
      "isLocked":true     
  }, {
    "PoNbr": 66666,
    "ItemNbr": 10011,
    "TotQty": 34,
    "LabelNo": "5439890876500-A001",
    "UserID": "b0naga",
    "DoorNo": 104,
    "RcvQty":0,
    "Timestamp": "02/04/2016 21:00:00",
    "DeliveryNo": 12349,
    "Status": "Created",
    "SlotId":"",
    "NoPallet":0,
    "Comments":"",
      "isLocked":false    
  }, {
    "PoNbr": 66666,
    "ItemNbr": 10012,
    "TotQty": 9,
    "LabelNo": "7643529078602-C001",
    "UserID": "lachu",
    "DoorNo": 101,
    "RcvQty":9,
    "Timestamp": "02/05/2016 21:00:00",
    "DeliveryNo": 12349,
    "Status": "Received",
    "SlotId":"C001",
    "NoPallet":0,
    "Comments":"",
    "isLocked":true       
  }, {
    "PoNbr": 77777,
    "ItemNbr": 10013,
    "TotQty": 17,
    "LabelNo": "7643581954610-D001",
    "UserID": "lachu",
    "DoorNo": 104,
    "RcvQty":0,
    "Timestamp": "02/05/2016 21:00:00",
    "DeliveryNo": 12350,
    "Status": "Created",
    "SlotId":"",
    "NoPallet":0,
    "Comments":"",
      "isLocked":false    
  }, {
    "PoNbr": 88888,
    "ItemNbr": 10014,
    "TotQty": 11,
    "LabelNo": "7643529876311-B001",
    "UserID": "lachu",
    "DoorNo": 102,
    "RcvQty":0,
    "Timestamp": "02/05/2016 21:00:00",
    "DeliveryNo": 12350,
    "Status": "Created",
    "SlotId":"",
    "NoPallet":0,
    "Comments":"",
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
{ id:1, name: 'A001' },
{ id:2, name: 'B001' },
{ id:3, name: 'C001' },
{ id:4, name: 'D001' }];

//$scope.selectedslot= $scope.slotid[0];
//$scope.selectedOption = $scope.options[0];

}]);



