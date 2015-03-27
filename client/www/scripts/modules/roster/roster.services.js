/**
 * Created by seanbrookes on 2014-03-27.
 */
Roster.service('RosterService',[
  'Roster',
  '$q',
  function(Roster,$q){

    var svc = {};

    var deferred = $q.defer();
    var slug = 'bashers';
    var filter = {
      'filter[where][slug]':slug
    };
//    Roster.find(filter).
//      then(function(response){
//        deferred.resolve(data);
//      }
//    );

    svc.getRosterBySlug = function(slug){
      console.log('strangely in the function  getRosterBySlug');
      return deferred.promise;
    };

    return svc;

  }
]);