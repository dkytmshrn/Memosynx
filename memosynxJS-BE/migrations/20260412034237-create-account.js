'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Accounts', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4 // Otomatis meng-generate UUID versi 4 saat insert
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true // Integritas data: memastikan tidak ada email ganda
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true // Integritas data: memastikan username unik
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  
  async down(queryInterface, Sequelize) {
    // Rollback method
    await queryInterface.dropTable('Accounts');
  }
};