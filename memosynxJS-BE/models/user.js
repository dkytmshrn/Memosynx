'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // Relasi belongsTo ke Account
      User.belongsTo(models.Account, { 
        foreignKey: 'accountId', 
        as: 'account' // Alias untuk memudahkan query include nantinya
      });
    }
  }
  
  User.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    accountId: {
      type: DataTypes.UUID,
      allowNull: false,
      unique: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: {
          args: [2, 100],
          msg: "Nama harus antara 2 hingga 100 karakter."
        }
      }
    },
    phoneNumber: {
      type: DataTypes.STRING,
      validate: {
        isNumeric: {
          msg: "Nomor telepon hanya boleh berisi angka."
        },
        len: [8, 20]
      }
    },
    photoProfile: {
      type: DataTypes.STRING,
      // Catatan: Jika ini menyimpan URL, gunakan isUrl: true. 
      // Jika menyimpan path lokal (misal: /uploads/img.png), validasi regex bisa ditambahkan di sini.
    },
    tag: {
      type: DataTypes.STRING,
      validate: {
        len: [0, 50] // Membatasi panjang tag
      }
    },
    bio: {
      type: DataTypes.TEXT,
      validate: {
        len: {
          args: [0, 500],
          msg: "Bio tidak boleh lebih dari 500 karakter." // Mencegah payload data terlalu besar
        }
      }
    },
    role: {
      type: DataTypes.ENUM('AUDITOR', 'DEVELOPER', 'ADMIN'),
      defaultValue: 'DEVELOPER',
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'Users',
  });
  
  return User;
};