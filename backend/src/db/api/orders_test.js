const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class Orders_testDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const orders_test = await db.orders_test.create(
      {
        id: data.id || undefined,

        order_date: data.order_date || null,
        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await orders_test.setCustomer(data.customer || null, {
      transaction,
    });

    await orders_test.setPayment(data.payment || null, {
      transaction,
    });

    await orders_test.setCoffee_blends(data.coffee_blends || [], {
      transaction,
    });

    return orders_test;
  }

  static async bulkImport(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    // Prepare data - wrapping individual data transformations in a map() method
    const orders_testData = data.map((item, index) => ({
      id: item.id || undefined,

      order_date: item.order_date || null,
      importHash: item.importHash || null,
      createdById: currentUser.id,
      updatedById: currentUser.id,
      createdAt: new Date(Date.now() + index * 1000),
    }));

    // Bulk create items
    const orders_test = await db.orders_test.bulkCreate(orders_testData, {
      transaction,
    });

    // For each item created, replace relation files

    return orders_test;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const orders_test = await db.orders_test.findByPk(id, {}, { transaction });

    const updatePayload = {};

    if (data.order_date !== undefined)
      updatePayload.order_date = data.order_date;

    updatePayload.updatedById = currentUser.id;

    await orders_test.update(updatePayload, { transaction });

    if (data.customer !== undefined) {
      await orders_test.setCustomer(
        data.customer,

        { transaction },
      );
    }

    if (data.payment !== undefined) {
      await orders_test.setPayment(
        data.payment,

        { transaction },
      );
    }

    if (data.coffee_blends !== undefined) {
      await orders_test.setCoffee_blends(data.coffee_blends, { transaction });
    }

    return orders_test;
  }

  static async deleteByIds(ids, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const orders_test = await db.orders_test.findAll({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
      transaction,
    });

    await db.sequelize.transaction(async (transaction) => {
      for (const record of orders_test) {
        await record.update({ deletedBy: currentUser.id }, { transaction });
      }
      for (const record of orders_test) {
        await record.destroy({ transaction });
      }
    });

    return orders_test;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const orders_test = await db.orders_test.findByPk(id, options);

    await orders_test.update(
      {
        deletedBy: currentUser.id,
      },
      {
        transaction,
      },
    );

    await orders_test.destroy({
      transaction,
    });

    return orders_test;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const orders_test = await db.orders_test.findOne(
      { where },
      { transaction },
    );

    if (!orders_test) {
      return orders_test;
    }

    const output = orders_test.get({ plain: true });

    output.customer = await orders_test.getCustomer({
      transaction,
    });

    output.coffee_blends = await orders_test.getCoffee_blends({
      transaction,
    });

    output.payment = await orders_test.getPayment({
      transaction,
    });

    return output;
  }

  static async findAll(filter, options) {
    const limit = filter.limit || 0;
    let offset = 0;
    let where = {};
    const currentPage = +filter.page;

    offset = currentPage * limit;

    const orderBy = null;

    const transaction = (options && options.transaction) || undefined;

    let include = [
      {
        model: db.customers,
        as: 'customer',

        where: filter.customer
          ? {
              [Op.or]: [
                {
                  id: {
                    [Op.in]: filter.customer
                      .split('|')
                      .map((term) => Utils.uuid(term)),
                  },
                },
                {
                  first_name: {
                    [Op.or]: filter.customer
                      .split('|')
                      .map((term) => ({ [Op.iLike]: `%${term}%` })),
                  },
                },
              ],
            }
          : {},
      },

      {
        model: db.payments,
        as: 'payment',

        where: filter.payment
          ? {
              [Op.or]: [
                {
                  id: {
                    [Op.in]: filter.payment
                      .split('|')
                      .map((term) => Utils.uuid(term)),
                  },
                },
                {
                  amount: {
                    [Op.or]: filter.payment
                      .split('|')
                      .map((term) => ({ [Op.iLike]: `%${term}%` })),
                  },
                },
              ],
            }
          : {},
      },

      {
        model: db.coffee_blends,
        as: 'coffee_blends',
        required: false,
      },
    ];

    if (filter) {
      if (filter.id) {
        where = {
          ...where,
          ['id']: Utils.uuid(filter.id),
        };
      }

      if (filter.order_dateRange) {
        const [start, end] = filter.order_dateRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            order_date: {
              ...where.order_date,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            order_date: {
              ...where.order_date,
              [Op.lte]: end,
            },
          };
        }
      }

      if (filter.active !== undefined) {
        where = {
          ...where,
          active: filter.active === true || filter.active === 'true',
        };
      }

      if (filter.coffee_blends) {
        const searchTerms = filter.coffee_blends.split('|');

        include = [
          {
            model: db.coffee_blends,
            as: 'coffee_blends_filter',
            required: searchTerms.length > 0,
            where:
              searchTerms.length > 0
                ? {
                    [Op.or]: [
                      {
                        id: {
                          [Op.in]: searchTerms.map((term) => Utils.uuid(term)),
                        },
                      },
                      {
                        name: {
                          [Op.or]: searchTerms.map((term) => ({
                            [Op.iLike]: `%${term}%`,
                          })),
                        },
                      },
                    ],
                  }
                : undefined,
          },
          ...include,
        ];
      }

      if (filter.createdAtRange) {
        const [start, end] = filter.createdAtRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            ['createdAt']: {
              ...where.createdAt,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            ['createdAt']: {
              ...where.createdAt,
              [Op.lte]: end,
            },
          };
        }
      }
    }

    const queryOptions = {
      where,
      include,
      distinct: true,
      order:
        filter.field && filter.sort
          ? [[filter.field, filter.sort]]
          : [['createdAt', 'desc']],
      transaction: options?.transaction,
      logging: console.log,
    };

    if (!options?.countOnly) {
      queryOptions.limit = limit ? Number(limit) : undefined;
      queryOptions.offset = offset ? Number(offset) : undefined;
    }

    try {
      const { rows, count } = await db.orders_test.findAndCountAll(
        queryOptions,
      );

      return {
        rows: options?.countOnly ? [] : rows,
        count: count,
      };
    } catch (error) {
      console.error('Error executing query:', error);
      throw error;
    }
  }

  static async findAllAutocomplete(query, limit, offset) {
    let where = {};

    if (query) {
      where = {
        [Op.or]: [
          { ['id']: Utils.uuid(query) },
          Utils.ilike('orders_test', 'id', query),
        ],
      };
    }

    const records = await db.orders_test.findAll({
      attributes: ['id', 'id'],
      where,
      limit: limit ? Number(limit) : undefined,
      offset: offset ? Number(offset) : undefined,
      orderBy: [['id', 'ASC']],
    });

    return records.map((record) => ({
      id: record.id,
      label: record.id,
    }));
  }
};
