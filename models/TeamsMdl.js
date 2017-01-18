var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var teamModel = new Schema({
  team_name:{
    type:String
  }
})


var TeamMdl =  mongoose.model('Teams',teamModel);
module.exports = TeamMdl;

module.exports.createTeam = function(team_name, cb){
  var team = new TeamMdl();
  team.team_name = team_name || "John Doe";
  team.save(function(err, teamObj){
    if(typeof cb == 'function'){
      if(err) cb('Unknown error happened while saving team',null);
      if(teamObj) cb(null,teamObj);
    }else{
      if(err) throw 'Unknown error happened while creating team';
    }
  })
}
