const { StatusCodes } = require("http-status-codes");
const Scorecard = require("../models/scorecard");
const matchCard = require("../models/match");
const { NotFoundError } = require("../errors");

//For Match 
const createMatch = async (req, res) => {
  try {
    const match = await matchCard.create(req.body);
    res.status(StatusCodes.CREATED).json({ match });
  } catch (error) {
    console.log('Error creating match:', error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Unable to create match' });
  }
};

const getAllMatch = async (req, res) => {
  const match = await matchCard.find();
  res.status(StatusCodes.OK).json({ match });
};

const updateMatch = async (req, res) => {
  try {
    const {
      body: {
        teamone,
        teamtwo,
        matchdate
      },
      params: { id: matchId },
    } = req;

    const match = await matchCard.findByIdAndUpdate(matchId, req.body, {
      new: true,
      runValidators: true,
    });
    if (!match) {
      throw new NotFoundError(`No match with id ${matchId}`);
    }

    res.status(StatusCodes.OK).json({ match });
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

const deleteMatch = async (req,res)=>{
  const{
    params:{id:matchId}
  }=req
  
  const match = await matchCard.findByIdAndDelete(
    matchId
  )
  if(!match){
    throw new NotFoundError(`No match with id ${matchId}`)
  }
  res.status(StatusCodes.OK).send()
  
  }



//For Scorecard
const createScore = async (req, res) => {
  const score = await Scorecard.create(req.body);
  res.status(StatusCodes.OK).json({ score });
};



const getScoreCardById = async (req, res) => {
  try {
    const score = await Scorecard.findOne({scoreid:req.params.id})
    if (!score) {
      return res.status(StatusCodes.NOT_FOUND).json({ error: "scorecard not found" });
    }
    res.status(StatusCodes.OK).json({ score });
  } catch (error) {
    console.error("Error while fetching match:", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Internal server error" });
  }
};


const updateScore = async (req, res) => {
  try {
    const {
      body: {
        batting,
        bowling,
        wickets,
        batterOne,
        batterTwo,
        over,
        run,
        batterOneBowl,
        batterTwoBowl,
        batterOneRun,
        batterTwoRun,
        bowler,
        bowlerBowled,
      },
      params: { id },
    } = req;

    const score = await Scorecard.findOneAndUpdate({ scoreid: id }, req.body, {
      new: true,
      runValidators: true,
    });
    if (!score) {
      throw new NotFoundError(`No scorecard with id ${scoreid}`);
    }

    res.status(StatusCodes.OK).json({ score });
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};


const deleteScore = async (req,res)=>{
const{
  params:{id}
}=req

const score = await Scorecard.findOneAndDelete(
  {scoreid:id}
)
if(!score){
  throw new NotFoundError(`No scorecard with id ${scoreid}`)
}
res.status(StatusCodes.OK).send()

}



module.exports = {
  createMatch,
  getAllMatch,
  updateMatch,
  deleteMatch,
  createScore,
  getScoreCardById,
  updateScore,
  deleteScore
  
};
