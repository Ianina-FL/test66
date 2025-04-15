const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const orders_test = sequelize.define(
    'orders_test',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      order_date: {
        type: DataTypes.DATE,
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

  orders_test.associate = (db) => {
    db.orders_test.belongsToMany(db.coffee_blends, {
      as: 'coffee_blends',
      foreignKey: {
        name: 'orders_test_coffee_blendsId',
      },
      constraints: false,
      through: 'orders_testCoffee_blendsCoffee_blends',
    });

    db.orders_test.belongsToMany(db.coffee_blends, {
      as: 'coffee_blends_filter',
      foreignKey: {
        name: 'orders_test_coffee_blendsId',
      },
      constraints: false,
      through: 'orders_testCoffee_blendsCoffee_blends',
    });

    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    //end loop

    db.orders_test.belongsTo(db.customers, {
      as: 'customer',
      foreignKey: {
        name: 'customerId',
      },
      constraints: false,
    });

    db.orders_test.belongsTo(db.payments, {
      as: 'payment',
      foreignKey: {
        name: 'paymentId',
      },
      constraints: false,
    });

    db.orders_test.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.orders_test.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return orders_test;
};
