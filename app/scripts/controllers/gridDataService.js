angular.module('angularApp')
.factory('GridDataService', ['$http', '$q', function( $http, $q ) {

    var GRID_SERVICE_URL = '/data/grid_data.json';
    var STATE_INFO_SERVICE_URL = '/data/state_info.json';
    var OWNER_INFO_SERVICE_URL = '/data/owner_info.json';

    var fetchOwnerInfo = function fetchOwnerInfo(){
        return $http.get(OWNER_INFO_SERVICE_URL);
    }
    var fetchStateInfo = function fetchStateInfo(){
        return $http.get(STATE_INFO_SERVICE_URL);
    }

    var metadata = {};

    function getOwnerName( id ){
        var info;
        return metadata.ownersInfo && (info = metadata.ownersInfo[id]) && info.name;
    }

    function getStateName( id ){
        var info;
        return metadata.stateInfo && (info = metadata.stateInfo[id]) && info.title;
    }

    function getStateInfo( id ){
        var info;
        return metadata.stateInfo && (info = metadata.stateInfo[id]);
    }

    function makeGridData( data, facet ){
        var gridData = {},
            data = data.details_data[facet];
        switch( data.status ){
          case "pending":
            gridData.class = "pending";
            break;
          case "running":
            gridData.class = "running";
            gridData.progress = data.progress;
            break;
          case "failed":
          case "rejected":
            gridData.class = "failed";
            break;
          case "completed":
          case "accepted":
            gridData.class = "succeed";
            break;
        }

        return gridData;
    }


    var fetchGridData = function(){
        return $http.get(GRID_SERVICE_URL);
    }
    var processGridData = function( gridData ){


        var data = gridData.data;
        for(i = 0; i < data.length; i++){
            data[i].metrics = makeGridData(data[i], "metrics");
            data[i].build = makeGridData(data[i], "build");
            data[i].ft = makeGridData(data[i], "functional_test");
            data[i].ut = makeGridData(data[i], "unit_test");
            data[i].ownerName = getOwnerName( data[i].req_by );
            data[i].stateName = getStateName( data[i].state_id );
            data[i].stateInfo = getStateInfo( data[i].state_id );
        }

        return gridData;
    }

    var processData = function( resArr ){
        var stateInfo = resArr[1],
            ownerInfo = resArr[2];

        metadata.ownersInfo = ownerInfo.data;
        metadata.stateInfo = stateInfo.data;

        return processGridData( resArr[0] );
    }
    var getGridData = function getGridData(){
        return $q.all( [fetchGridData(), fetchStateInfo(), fetchOwnerInfo()] ).then( processData, function(){
            console.log("error while fetching data");
        });
    }

    return {
        getData: getGridData
    };
}]);
