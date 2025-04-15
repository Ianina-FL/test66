const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const payments = sequelize.define(
    'payments',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      amount: {
        type: DataTypes.DECIMAL,
      },

      status: {
        type: DataTypes.ENUM,

        values: ['Pending', 'Completed', 'Refunded'],
      },

      importHash: {
        type: DataTypes.STRING(255),
        allowNull: true,
        unique: true,
      },
    },
    {
      timestamps: true,
      paranoid: true,
      freezeTableName: true,
    },
  );

  payments.associate = (db) => {
    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    db.payments.hasMany(db.orders, {
      as: 'orders_payment',
      foreignKey: {
        name: 'paymentId',
      },
      constraints: false,
    });

    db.payments.hasMany(db.orders_test, {
      as: 'orders_test_payment',
      foreignKey: {
        name: 'paymentId',
      },
      constraints: false,
    });

    //end loop

    db.payments.belongsTo(db.orders, {
      as: 'order',
      foreignKey: {
        name: 'orderId',
      },
      constraints: false,
    });

    db.payments.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.payments.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return payments;
};
