'use strict';
var TeamsMdl = require('../models/TeamsMdl');
var MembersMdl = require('../models/MembersMdl');
var async = require('async');
class Teams {
  constructor(opts) {
    this.team_name = typeof opts !='undefined' && typeof opts.team_name !='undefined' ? opts.team_name : null;
    this.team_members = typeof opts !='undefined' && typeof opts.team_name !='undefined' ? opts.team_name : null;
  }

  createTeam(){
    var _self = this;
    return new Promise(function(resolve, reject) {
      async.waterfall([
        function(callback){
          TeamsMdl.createTeam(_self.team_name, function(err, teamObj){
            if(err) callback(err, null);
            if(teamObj) callback(null,teamObj);
          })
        },
        function(teamObj,callback){
          if(typeof _self.team_members != null && _self.team_members.length > 0){
            var prom = _self.team_members.map(function(obj){
              return new Promise(function(resolve, reject){
                var memberInfo = {  full_name:obj.full_name, team:teamObj._id };
                  MembersMdl.addMember(memberInfo, function(){
                    resolve();
                  });
              })
            })
            Promise.all(prom).then(function(){
              callback(null, true)
            },function(err){
            })
          }else{
            callback('No members was provided', null);
          }
        }
      ],function(err, done){
        if(err) reject(err);
        if(done) resolve();
      })
    });
  }

  searchTeam(){
    var _self = this;
    return new Promise(function(resolve, reject) {
      TeamsMdl.findOne({"team_name":{"$regex":_self.team_name, "$options":'i'}}, function(err, teamObj){
        if(teamObj){
          MembersMdl.find({"team":teamObj._id}, function(err, members){
            var result = {
              team:teamObj,
              members:members
            }
            resolve(result);
          })
        }else{
          resolve([]);
        }
      })
    });
  }


}

module.exports = Teams;
