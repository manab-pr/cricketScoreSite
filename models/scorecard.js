const mongoose = require("mongoose");

const ScoreSchema = new mongoose.Schema(
  {
    scoreid: {
      type: mongoose.Types.ObjectId,
      ref: "matchCard",
      required:true,
      unique:true
    },
    batting: {
      type: String,
      required: [true, "please provide who is batting"],
    },
    bowling: {
      type: String,
      required: [true, "please provide who is bowling"],
    },
    wickets: {
      type: Number,
      required: [true, "Please provide how many wickets are down"],
    },
    batterOne: {
      type: String,
      required: [true, "please provide striker"],
    },
    batterTwo: {
      type: String,
      required: [true, "please provide non striker"],
    },
    over: {
      type: Number,
      required: [true, "please provide the no. of bowls"],
    },
    run: {
      type: Number,
      required: [true, "please provide the run "],
    },
    batterOneBowl: {
      type: Number,
      required: [true, "please provide the bowl taken "],
    },
    batterTwoBowl: {
      type: Number,
      required: [true, "please provide the bowl taken "],
    },
    batterOneRun: {
      type: Number,
      required: [true, "please provide the batters run "],
    },
    batterTwoRun: {
      type: Number,
      required: [true, "please provide the batters run "],
    },
    bowler:{
      type:String,
      required:[true,"please provide the name of the bowler"]
    },
    bowlerBowled: {
      type: Number,
      required: [true, "please provide the bowlers bowl "],
    },
    matchdate: {
      type: String,
      required: [true, "match scheduled at "],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Scorecard", ScoreSchema);
