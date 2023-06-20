const { Agent } = require("../model");
const { Op } = require("sequelize");
const fileUpload = require("../handlers/fileUpload");
const {errorHandler} = require("../handlers/error")


const createNewAgent = async (req, res) => {
const file =req.file
    try {
      const {
        firstName,
        lastName,
        agentLicence,
        address,
        practiceAreas,
        aboutMe,
      } = req.body;

      if (
        !firstName ||
        !lastName ||
        !file ||
        !agentLicence ||
        !address ||
        !practiceAreas ||
        !aboutMe
      )
        return errorHandler(res, 400, "Please fill all fields");
  
      const photoUrl = await fileUpload(req, res);
      const agent = await Agent.create({
        firstName,
        lastName,
        photoUrl: photoUrl,
        agentLicence,
        address,
        practiceAreas,
        aboutMe,
      });
      return res.json({
        success: true,
        agent,
      });
    } catch (error) {
      return errorHandler(res, 500, `Something went wrong! due to ${error}`);
    }
  }

const getAllAgents = async (req, res) => {
    try {
      const agents = await Agent.findAll();
      return res.json(agents);
    } catch (error) {
      return errorHandler(res, 500, `Something went wrong! due to ${error}`);
    }
  }

const getSingleAgent = async (req, res) => {
    const agentId = req.query.id;
    try {
      const agent = await Agent.findOne({
        where: {
          id: agentId,
        },
      });
      if (!agent) return errorHandler(res, 404, "No agent with this Id");
      return res.json(agent);
    } catch (error) {
      return errorHandler(res, 500, `Something went wrong! due to ${error}`);
    }
  }

  const searchAgents =  async (req, res) => {
    const { practiceAreas } = req.query;
    try {
      const agentsSearched = await Agent.findAll({
        where: { practiceAreas: { [Op.like]: `%${practiceAreas}%` } },
      });
      if (agentsSearched.length === 0)
        return errorHandler(res, 404, "Oops no agent against this search");
      return res.json({
        success: true,
        agentsSearched,
      });
    } catch (error) {
      return errorHandler(res, 500, `Something went wrong! due to ${error}`);
    }
  }
  module.exports = {
    createNewAgent,
    getAllAgents,
    getSingleAgent,
    searchAgents
  }