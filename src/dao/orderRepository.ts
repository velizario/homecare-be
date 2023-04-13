import { AppDataSource } from "../DBConnectorData";
import { Order, OrderComment, OrderHistory } from "../entity/Entities";

export const orderRepository = AppDataSource.getRepository(Order);
export const commentRepository = AppDataSource.getRepository(OrderComment);
export const historyRepository = AppDataSource.getRepository(OrderHistory);

interface OrderRepositoryInterface {}

class OrderRepository implements OrderRepositoryInterface {
  async addOrder(orderData: any) {
    console.log("adding NEW");
    orderData.orderHistory = [...orderData.orderHistory, { updateType: "NEW", user: { id: 1 } }];
    return await orderRepository.save(orderData);
  }

  async updateOrder(orderData: Order) {
    console.log(orderData.id)
    const orderUpdate = await orderRepository.save(orderData);
    
    const historyUpdate = { updateType: "UPDATED", user: { id: 1 }, order : {id: orderData.id} }
    await historyRepository.save(historyUpdate);
    
    return orderUpdate
  }

  async findOrderById(orderId: number) {
    return await orderRepository.findOne({
      where: { id: orderId },
      relations: { vendor: { user: true }, client: { user: true }, orderComment: { user: true } },
    });
  }

  async findOrders(searchArg: Record<string, string | number>) {
    return await orderRepository.find({
      where: searchArg,
      relations: { vendor: { user: true }, client: { user: true } },
    });
  }

  async addOrderComment(commentData: OrderComment) {
    console.log(commentData)
    return await commentRepository.save(commentData);
  }

  async addOrderHistory(historyData: OrderHistory) {
    console.log(historyData)
    return await historyRepository.save(historyData);
  }
}

const orderDBHandler = new OrderRepository();
export default orderDBHandler;
