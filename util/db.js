const { Sequelize } = require('sequelize');
const { DB_URL } = require('./config');

const sequelize = new Sequelize(DB_URL, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

const connect = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1);
  }
};

const disconnect = async () => {
  await sequelize.close();
};

module.exports = {
  sequelize,
  db: {
    connect,
    disconnect,
  },
};
