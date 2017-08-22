var mongoose=require("mongoose");
var Schema = mongoose.Schema;
var twitterschema= new Schema({
  id:String,
  username:String,
  dis_name:String
});
var pinschema=new Schema({
  title:String,
  url:String,
  username:String
});
var UserData = mongoose.model('UserData', twitterschema);
var UserData2 = mongoose.model("UserData2",pinschema);
module.exports={User_twitter:UserData,User_pin:UserData2};
