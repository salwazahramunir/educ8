'use strict';

module.exports = {
  up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return queryInterface.addColumn("TransactionDetails", "TransactionId", {
      type: Sequelize.INTEGER,
      references: {
        model: "Transactions",
        key: "id"
      },
      onDelete: "cascade",
      onUpdate: "cascade"
    });
  },

  down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    return queryInterface.removeColumn("TransactionDetails", "TransactionId")
  }
};
