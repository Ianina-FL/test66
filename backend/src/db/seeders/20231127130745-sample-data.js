const db = require('../models');
const Users = db.users;

const Categories = db.categories;

const CoffeeBlends = db.coffee_blends;

const Customers = db.customers;

const Orders = db.orders;

const Payments = db.payments;

const Reports = db.reports;

const CategoriesData = [
  {
    name: 'Espresso',
  },

  {
    name: 'Single Origin',
  },

  {
    name: 'Flavored',
  },

  {
    name: 'Dark Roast',
  },
];

const CoffeeBlendsData = [
  {
    name: 'Espresso Roast',

    price: 12.99,

    stock_level: 100,

    // type code here for "relation_one" field
  },

  {
    name: 'Colombian Single Origin',

    price: 14.99,

    stock_level: 50,

    // type code here for "relation_one" field
  },

  {
    name: 'French Vanilla',

    price: 10.99,

    stock_level: 75,

    // type code here for "relation_one" field
  },

  {
    name: 'Italian Dark Roast',

    price: 11.99,

    stock_level: 60,

    // type code here for "relation_one" field
  },
];

const CustomersData = [
  {
    first_name: 'John',

    last_name: 'Doe',

    email: 'john.doe@example.com',

    // type code here for "relation_many" field
  },

  {
    first_name: 'Jane',

    last_name: 'Smith',

    email: 'jane.smith@example.com',

    // type code here for "relation_many" field
  },

  {
    first_name: 'Alice',

    last_name: 'Johnson',

    email: 'alice.johnson@example.com',

    // type code here for "relation_many" field
  },

  {
    first_name: 'Bob',

    last_name: 'Brown',

    email: 'bob.brown@example.com',

    // type code here for "relation_many" field
  },
];

const OrdersData = [
  {
    order_date: new Date('2023-10-01T10:00:00Z'),

    // type code here for "relation_one" field

    // type code here for "relation_many" field

    // type code here for "relation_one" field
  },

  {
    order_date: new Date('2023-10-02T11:30:00Z'),

    // type code here for "relation_one" field

    // type code here for "relation_many" field

    // type code here for "relation_one" field
  },

  {
    order_date: new Date('2023-10-03T14:00:00Z'),

    // type code here for "relation_one" field

    // type code here for "relation_many" field

    // type code here for "relation_one" field
  },

  {
    order_date: new Date('2023-10-04T09:15:00Z'),

    // type code here for "relation_one" field

    // type code here for "relation_many" field

    // type code here for "relation_one" field
  },
];

const PaymentsData = [
  {
    amount: 25.98,

    status: 'Pending',

    // type code here for "relation_one" field
  },

  {
    amount: 14.99,

    status: 'Completed',

    // type code here for "relation_one" field
  },

  {
    amount: 27.98,

    status: 'Refunded',

    // type code here for "relation_one" field
  },

  {
    amount: 11.99,

    status: 'Completed',

    // type code here for "relation_one" field
  },
];

const ReportsData = [
  {
    generated_at: new Date('2023-10-06T08:00:00Z'),

    // type code here for "relation_many" field
  },

  {
    generated_at: new Date('2023-10-07T08:00:00Z'),

    // type code here for "relation_many" field
  },

  {
    generated_at: new Date('2023-10-08T08:00:00Z'),

    // type code here for "relation_many" field
  },

  {
    generated_at: new Date('2023-10-09T08:00:00Z'),

    // type code here for "relation_many" field
  },
];

// Similar logic for "relation_many"

async function associateCoffeeBlendWithCategory() {
  const relatedCategory0 = await Categories.findOne({
    offset: Math.floor(Math.random() * (await Categories.count())),
  });
  const CoffeeBlend0 = await CoffeeBlends.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (CoffeeBlend0?.setCategory) {
    await CoffeeBlend0.setCategory(relatedCategory0);
  }

  const relatedCategory1 = await Categories.findOne({
    offset: Math.floor(Math.random() * (await Categories.count())),
  });
  const CoffeeBlend1 = await CoffeeBlends.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (CoffeeBlend1?.setCategory) {
    await CoffeeBlend1.setCategory(relatedCategory1);
  }

  const relatedCategory2 = await Categories.findOne({
    offset: Math.floor(Math.random() * (await Categories.count())),
  });
  const CoffeeBlend2 = await CoffeeBlends.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (CoffeeBlend2?.setCategory) {
    await CoffeeBlend2.setCategory(relatedCategory2);
  }

  const relatedCategory3 = await Categories.findOne({
    offset: Math.floor(Math.random() * (await Categories.count())),
  });
  const CoffeeBlend3 = await CoffeeBlends.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (CoffeeBlend3?.setCategory) {
    await CoffeeBlend3.setCategory(relatedCategory3);
  }
}

// Similar logic for "relation_many"

async function associateOrderWithCustomer() {
  const relatedCustomer0 = await Customers.findOne({
    offset: Math.floor(Math.random() * (await Customers.count())),
  });
  const Order0 = await Orders.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Order0?.setCustomer) {
    await Order0.setCustomer(relatedCustomer0);
  }

  const relatedCustomer1 = await Customers.findOne({
    offset: Math.floor(Math.random() * (await Customers.count())),
  });
  const Order1 = await Orders.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Order1?.setCustomer) {
    await Order1.setCustomer(relatedCustomer1);
  }

  const relatedCustomer2 = await Customers.findOne({
    offset: Math.floor(Math.random() * (await Customers.count())),
  });
  const Order2 = await Orders.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Order2?.setCustomer) {
    await Order2.setCustomer(relatedCustomer2);
  }

  const relatedCustomer3 = await Customers.findOne({
    offset: Math.floor(Math.random() * (await Customers.count())),
  });
  const Order3 = await Orders.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Order3?.setCustomer) {
    await Order3.setCustomer(relatedCustomer3);
  }
}

// Similar logic for "relation_many"

async function associateOrderWithPayment() {
  const relatedPayment0 = await Payments.findOne({
    offset: Math.floor(Math.random() * (await Payments.count())),
  });
  const Order0 = await Orders.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Order0?.setPayment) {
    await Order0.setPayment(relatedPayment0);
  }

  const relatedPayment1 = await Payments.findOne({
    offset: Math.floor(Math.random() * (await Payments.count())),
  });
  const Order1 = await Orders.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Order1?.setPayment) {
    await Order1.setPayment(relatedPayment1);
  }

  const relatedPayment2 = await Payments.findOne({
    offset: Math.floor(Math.random() * (await Payments.count())),
  });
  const Order2 = await Orders.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Order2?.setPayment) {
    await Order2.setPayment(relatedPayment2);
  }

  const relatedPayment3 = await Payments.findOne({
    offset: Math.floor(Math.random() * (await Payments.count())),
  });
  const Order3 = await Orders.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Order3?.setPayment) {
    await Order3.setPayment(relatedPayment3);
  }
}

async function associatePaymentWithOrder() {
  const relatedOrder0 = await Orders.findOne({
    offset: Math.floor(Math.random() * (await Orders.count())),
  });
  const Payment0 = await Payments.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Payment0?.setOrder) {
    await Payment0.setOrder(relatedOrder0);
  }

  const relatedOrder1 = await Orders.findOne({
    offset: Math.floor(Math.random() * (await Orders.count())),
  });
  const Payment1 = await Payments.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Payment1?.setOrder) {
    await Payment1.setOrder(relatedOrder1);
  }

  const relatedOrder2 = await Orders.findOne({
    offset: Math.floor(Math.random() * (await Orders.count())),
  });
  const Payment2 = await Payments.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Payment2?.setOrder) {
    await Payment2.setOrder(relatedOrder2);
  }

  const relatedOrder3 = await Orders.findOne({
    offset: Math.floor(Math.random() * (await Orders.count())),
  });
  const Payment3 = await Payments.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Payment3?.setOrder) {
    await Payment3.setOrder(relatedOrder3);
  }
}

// Similar logic for "relation_many"

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await Categories.bulkCreate(CategoriesData);

    await CoffeeBlends.bulkCreate(CoffeeBlendsData);

    await Customers.bulkCreate(CustomersData);

    await Orders.bulkCreate(OrdersData);

    await Payments.bulkCreate(PaymentsData);

    await Reports.bulkCreate(ReportsData);

    await Promise.all([
      // Similar logic for "relation_many"

      await associateCoffeeBlendWithCategory(),

      // Similar logic for "relation_many"

      await associateOrderWithCustomer(),

      // Similar logic for "relation_many"

      await associateOrderWithPayment(),

      await associatePaymentWithOrder(),

      // Similar logic for "relation_many"
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('categories', null, {});

    await queryInterface.bulkDelete('coffee_blends', null, {});

    await queryInterface.bulkDelete('customers', null, {});

    await queryInterface.bulkDelete('orders', null, {});

    await queryInterface.bulkDelete('payments', null, {});

    await queryInterface.bulkDelete('reports', null, {});
  },
};
