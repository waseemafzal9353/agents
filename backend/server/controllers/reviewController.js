const { sequelize, Agent, Review } = require("../model");
const { errorHandler } = require("../handlers/error");

const createReview = async (req, res) => {
    await sequelize.sync();
    try {
      const agentId = req.query.agentId;
      const { review } = req.body;
      const agent = await Agent.findOne({
        where: {
          id: agentId,
        },
      });
      if (!agent) return errorHandler(res, 404, "no agent with this id");
      const newReview = await Review.create({
        review,
        agentId: agent.id,
      });
      return res.status(200).json({
        success: true,
        newReview,
      });
    } catch (error) {
      return errorHandler(res, 500, `${error}`);
    }
  }

const getReviews = async (req, res) => {
    try {
      const reviews = await Review.findAll();
      return res.status(200).json({
        success: true,
        reviews,
      });
    } catch (error) {
      return errorHandler(res, 500, `${error}`);
    }
  }
  
const getAgentreviews = async (req, res) => {
    const agentId = req.query.id;
    try {
      const agent = await Agent.findOne(
        {
        where: {
          id: agentId,
        },
      }
      );
      if (!agent) return errorHandler(res, 404, "there are no agents");
  
      const agentReviews = await Review.findAll({
        where: {
          agentId: agent.id,
        },
      });
  
      return res.status(200).json({
        success: true,
        agentReviews,
      });
    } catch (error) {
      return errorHandler(res, 500, `${error}`);
    }
  }

  module.exports = {
    createReview,
    getReviews,
    getAgentreviews
  }