'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      accountId: {
        type: Sequelize.UUID,
        allowNull: false,
        unique: true, // Memastikan relasi One-to-One
        references: {
          model: 'Accounts', // Nama tabel referensi
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE' // Profil terhapus jika akun dihapus (Data Minimization - GDPR)
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      phoneNumber: {
        type: Sequelize.STRING
      },
      photoProfile: {
        type: Sequelize.STRING
      },
      tag: {
        type: Sequelize.STRING
      },
      bio: {
        type: Sequelize.TEXT
      },
      role: {
        type: Sequelize.ENUM('AUDITOR', 'DEVELOPER', 'ADMIN'),
        defaultValue: 'DEVELOPER',
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
    await queryInterface.dropTable('Users');
  }
};