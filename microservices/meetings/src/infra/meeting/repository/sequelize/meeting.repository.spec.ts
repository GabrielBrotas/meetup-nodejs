import { Sequelize } from "sequelize-typescript";
import { v4 } from "uuid";
import { Meeting } from "domain/meeting/entities";
import { MeetingModel } from "./meeting.model";
import { MeetingRepository } from "./meeting.repository";

describe("Order repository test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    try {
      sequelize = new Sequelize({
        dialect: "sqlite",
        storage: ":memory:",
        logging: false,
        sync: { force: true },
      });
  
      sequelize.addModels([MeetingModel]);
  
      await sequelize.sync();
    } catch(err) {
      console.log(err)
    }
  });

  // afterEach(async () => {
  //   await sequelize.close();
  // });

  it("should create a new meeting", async () => {
    const meetingRepository = new MeetingRepository();

    const category_id = v4()
    const date = new Date()

    let meeting = new Meeting({ 
      name: "Docker",
      category_id: category_id,
      category_name: "xpto",
      date: date
    });

    console.log(meeting)
    // await meetingRepository.insert(meeting);

  //   const productRepository = new ProductRepository();
  //   const product = new Product("123", "Product 1", 10);
  //   await productRepository.create(product);

  //   const orderItem = new OrderItem(
  //     "1",
  //     product.name,
  //     product.price,
  //     product.id,
  //     2
  //   );

  //   const order = new Order("123", "123", [orderItem]);

  //   const orderRepository = new OrderRepository();
  //   await orderRepository.create(order);

  //   const orderModel = await OrderModel.findOne({
  //     where: { id: order.id },
  //     include: ["items"],
  //   });

  //   expect(orderModel.toJSON()).toStrictEqual({
  //     id: "123",
  //     customer_id: "123",
  //     total: order.total(),
  //     items: [
  //       {
  //         id: "1",
  //         name: "Product 1",
  //         price: 10,
  //         quantity: 2,
  //         order_id: "123",
  //         product_id: "123",
  //       },
  //     ],
  //   });
  });

  // it("should find an order by id", async () => {
  //   const customerRepository = new CustomerRepository();
  //   const customer = new Customer("123", "Customer 1");
  //   const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
  //   customer.changeAddress(address);
  //   await customerRepository.create(customer);

  //   const productRepository = new ProductRepository();
  //   const product = new Product("123", "Product 1", 10);
  //   await productRepository.create(product);

  //   const orderItem = new OrderItem(
  //     "1",
  //     product.name,
  //     product.price,
  //     product.id,
  //     2
  //   );

  //   const order = new Order("123", "123", [orderItem]);

  //   const orderRepository = new OrderRepository();
  //   await orderRepository.create(order);

  //   const orderFound = await orderRepository.findById(order.id);

  //   expect(orderFound).toEqual(order);
  // })

  // it("should return all orders", async () => {
  //   const customerRepository = new CustomerRepository();
  //   const customer = new Customer("c1", "Customer 1");
  //   const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
  //   customer.changeAddress(address);
  //   await customerRepository.create(customer);

  //   const productRepository = new ProductRepository();
  //   const product1 = new Product("p1", "Product 1", 10);
  //   const product2 = new Product("p2", "Product 2", 10);

  //   await productRepository.create(product1);
  //   await productRepository.create(product2);

  //   const orderItem1 = new OrderItem(
  //     "1",
  //     product1.name,
  //     product1.price,
  //     product1.id,
  //     2
  //   );
    
  //   const orderItem2 = new OrderItem(
  //     "2",
  //     product2.name,
  //     product2.price,
  //     product2.id,
  //     2
  //   );

  //   const order1 = new Order("o1", "c1", [orderItem1]);
  //   const order2 = new Order("o2", "c1", [orderItem2]);

  //   const orderRepository = new OrderRepository();
  //   await orderRepository.create(order1);
  //   await orderRepository.create(order2);

  //   const ordersFound = await orderRepository.findAll();
  //   expect(ordersFound).toEqual([order1, order2]);
  // })

  // it("should update an order", async () => {
  //   const customerRepository = new CustomerRepository();
  //   const orderRepository = new OrderRepository();
  //   const productRepository = new ProductRepository();

  //   const customer = new Customer("c1", "Customer 1");
  //   const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
  //   customer.changeAddress(address);
  //   await customerRepository.create(customer);

  //   const product1 = new Product("p1", "Product 1", 10);
  //   const product2 = new Product("p2", "Product 2", 10);

  //   await productRepository.create(product1);
  //   await productRepository.create(product2);

  //   const orderItem1 = new OrderItem(
  //     "1",
  //     product1.name,
  //     product1.price,
  //     product1.id,
  //     2
  //   );
  //   const orderItem2 = new OrderItem(
  //     "2",
  //     product2.name,
  //     product2.price,
  //     product2.id,
  //     2
  //   );

  //   const order = new Order("o1", "c1", [orderItem1]);
  //   await orderRepository.create(order);

  //   const orderFound = await orderRepository.findById(order.id);    
  //   expect(orderFound).toEqual(order);

  //   const newOrdemItems = [orderItem1, orderItem2];
  //   order.updateItems(newOrdemItems);
  
  //   await orderRepository.update(order);
  //   const orderUpdated = await orderRepository.findById(order.id);

  //   expect(orderUpdated).toEqual(order);
  // })
});
