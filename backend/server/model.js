const Sequelize = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite3'
});

class Agent extends Sequelize.Model { }
Agent.init(
  {
    // attributes
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    firstName: {
      type: Sequelize.STRING,
      allowNull: false
    },
    lastName: {
      type: Sequelize.STRING,
      allowNull: false
    },
    photoUrl: {
      type: Sequelize.STRING
    },
    agentLicence: {
      type: Sequelize.STRING,
      allowNull: false
    },
    address: {
      type: Sequelize.STRING,
      allowNull: false
    },
    practiceAreas: {
      type: Sequelize.STRING
    },
    aboutMe: {
      type: Sequelize.TEXT
    }
  },
  {
    sequelize,
    modelName: 'Agents'
  }
);


class Review extends Sequelize.Model { }
Review.init(
  {
  // attributes
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    review: {
      type: Sequelize.TEXT
    },

    agentId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Agents',
        key: 'id'
      }
    }
  },
  {
    sequelize,
    modelName: 'Reviews'
  }
);

// Establish the association between Agent and Review
Agent.hasMany(Review, { foreignKey: 'agentId' });
Review.belongsTo(Agent, { foreignKey: 'agentId' });

module.exports = {
  sequelize,
  Agent,
  Review
};

