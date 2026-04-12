'use strict';
const { Model } = require('sequelize');
const bcrypt = require('bcrypt'); // Pastikan sudah menjalankan: npm install bcrypt

module.exports = (sequelize, DataTypes) => {
  class Account extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here nantinya
      // Contoh: Account.hasOne(models.Profile, { foreignKey: 'accountId' })
    }

    // Security Best Practice: Menghapus password dari object return 
    // agar tidak pernah bocor saat res.json(account) di Controller
    toJSON() {
      const values = Object.assign({}, this.get());
      delete values.password;
      return values;
    }
  }

  Account.init({
    // Mengganti uniqueId menjadi id (Sesuai dengan file migrasi)
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: 'Email sudah terdaftar.'
      },
      validate: {
        isEmail: {
          msg: 'Format email tidak valid.'
        },
        notEmpty: true
      }
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: 'Username sudah digunakan.'
      },
      validate: {
        len: {
          args: [5, 50],
          msg: 'Username harus antara 5 hingga 50 karakter.'
        },
        isAlphanumeric: {
          msg: 'Username hanya boleh berisi huruf dan angka (mencegah XSS/Injection).'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    }
  }, {
    sequelize,
    modelName: 'Account',
    // Menggunakan nama tabel secara eksplisit untuk mencegah pluralisasi otomatis yang tidak diinginkan
    tableName: 'Accounts', 
    hooks: {
      // Hook untuk meng-hash password sebelum disimpan (Create)
      beforeCreate: async (account) => {
        if (account.password) {
          const salt = await bcrypt.genSalt(12);
          account.password = await bcrypt.hash(account.password, salt);
        }
      },
      // Hook untuk meng-hash password jika ada perubahan (Update/Ganti Password)
      beforeUpdate: async (account) => {
        if (account.changed('password')) {
          const salt = await bcrypt.genSalt(12);
          account.password = await bcrypt.hash(account.password, salt);
        }
      }
    }
  });

  return Account;
};