const { DataTypes } = require('sequelize');

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.addColumn('blogs', 'year', {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: { msg: 'Year should be greater than 1990', args: 1991 },
        max: { msg: `Year can not be greater than the current year: ${new Date().getFullYear()}`, args: new Date().getFullYear() },
      },
    });
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.removeColumn('blogs', 'year');
  },
};
