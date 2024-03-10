const mongoose = require("mongoose");

const MatchSchema = new mongoose.Schema({
  teamone: {
    type: String,
    required: [true, "please provide who is batting"],
  },
  teamtwo: {
    type: String,
    required: [true, "please provide who is bowling"],
  },
  matchdate:{
    type:String,
    required:[true,"match scheduled at "]
  }
},{timestamps:true});

module.exports = mongoose.model("matchCard", MatchSchema);
