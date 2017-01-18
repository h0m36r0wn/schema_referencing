var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var membersModel = new Schema({
  full_name:{
    type:String
  },
  team:{
    type:Schema.Types.ObjectId,
    ref:'Teams'
  }
})


var MembersMdl =   mongoose.model('Members',membersModel);

module.exports = MembersMdl;

module.exports.addMember = function(memberInfo, cb){
  var member = new MembersMdl();
  member.full_name = memberInfo.full_name;
  member.team = mongoose.Types.ObjectId(memberInfo.team);
  member.save(function(err, member){
    if(err) cb('Unknown error happened',null);
    if(member) cb(null, true);
  })

}
