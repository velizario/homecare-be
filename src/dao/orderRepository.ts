import { AppDataSource } from "../DBConnectorData";
import { Order } from "../entity/Entities";
import AppError from "../utils/appError";

export const orderRepository = AppDataSource.getRepository(Order);

interface OrderRepositoryInterface {}

class OrderRepository implements OrderRepositoryInterface {
  async addOrder(orderData: Order) {
    return await orderRepository.save(orderData);
  }

  async updateOrder(orderData: Order) {
    return await orderRepository.save(orderData);
  }

  async findOrderById(orderId: string) {
    return await orderRepository.findOne({ where: { id: orderId }, relations: { vendor: true, client: true } });
  }

  async findAllOrders(searchArg: Record<string, string>) {
    return await orderRepository.find({ where: searchArg, relations: { vendor: {user:true}, client: {user:true} } });
  }
}

const orderDBHandler = new OrderRepository();
export default orderDBHandler;
