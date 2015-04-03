module.exports = function(Mlbpitchers) {
  var request = require('request');
  var http = require("http");
//  var pitchersUrl = "http://mlb.mlb.com/pubajax/wf/flow/stats.splayer?season=2014&sort_order='desc'&sort_column='avg'&stat_type=pitching&page_type=SortablePlayer&game_type='R'&player_pool=ALL&season_type=ANY&league_code='AL'&sport_code='mlb'&results=1000&recSP=1&recPP=900"; 
  var pitchersUrl = "http://mlb.mlb.com/pubajax/wf/flow/stats.splayer?season=2014&sort_order='desc'&sort_column='avg'&stat_type=hitting&page_type=SortablePlayer&game_type='R'&player_pool=ALL&season_type=ANY&league_code='AL'&sport_code='mlb'&results=1000&recSP=1&recPP=900"; 


  Mlbpitchers.fetchPitchers = function(cb) {
    var responseBody = '';

    return request(
      {uri: pitchersUrl},
      function(err, response, body){

        //console.log('|');
        //console.log('|');
        //console.log('|        wtf');
        //console.log('|');
        //console.log('|');
        //console.log('|');

        if(err){
          console.log('Request error: ' + err);
          //return res.send(500,'there was an error: ' +response.statusCode  + ' : ' + err);
        }


        var self = this;
        // var innerIndex2 = innerIndex;
        self.items = new Array();//I feel like I want to save my results in an array
        //Just a basic error check

        var payload = {};
        payload.data = body;
        payload.metadata = {};

        var statObj = JSON.parse(payload.data);

        var statsResult = statObj.stats_sortable_player.queryResults.row;

        var returnArray = [];

        //return data = statsResult;
        for (var i = 0;i < statsResult.length;i++){
          var newRecord = {};
          var tPlayer = statsResult[i];

          newRecord.mlbid = tPlayer.player_id;
          newRecord.name = tPlayer.name_display_first_last;
          newRecord.team = tPlayer.team_abbrev;


          returnArray.push(newRecord);
          //RawPitchers.create(newRecord, function(err,doc){
          //  console.log('created pitcher record');
          //})
        }

        return  cb(null, JSON.stringify(returnArray));
      });
    //console.log(cb);

  };
  Mlbpitchers.remoteMethod(
    'fetchPitchers',
    {
      http: {path: '/fetchPitchers', verb: 'get'},
      returns: {arg: 'data', type: 'string'}
    }
  );
};
