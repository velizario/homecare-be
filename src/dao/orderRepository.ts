import { AppDataSource } from "../DBConnectorData";
import { Order, OrderComment, OrderHistory, OrderHistoryLogType } from "../entity/Entities";

export const orderRepository = AppDataSource.getRepository(Order);
export const commentRepository = AppDataSource.getRepository(OrderComment);
export const historyRepository = AppDataSource.getRepository(OrderHistory);

interface OrderRepositoryInterface {}

class OrderRepository implements OrderRepositoryInterface {
  async addOrder(orderData: any) {
    const addNewOrder = await orderRepository.save(orderData);
    return addNewOrder;
  }

  async updateOrder(orderId: number, orderData: Partial<Order>) {
    console.log("orderRepository - updateOrder");
    const currentOrder = await this.findById(orderId);
    if (!currentOrder) return null;
    const updatedOrder = await orderRepository.save({ ...currentOrder, ...orderData });
    return updatedOrder;
  }

  async updateOrderWithoutArrays(orderId: number, orderData: Partial<Order>) {
    const currentOrder = await this.findById(orderId);
    if (!currentOrder) return null;
    console.log("updating without arrays");
    const updatedOrder = await orderRepository.update(orderId, orderData);
    if (!updatedOrder) return null;
    return {...currentOrder, ...orderData};
  }

  async updateOrderHistory(orderId: number, userId: number, updateType: OrderHistoryLogType) {
    const historyUpdate = { updateType: updateType, user: { id: userId }, order: { id: orderId } };
    await historyRepository.save(historyUpdate);
  }

  async findById(orderId: number) {
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
}

const orderDBHandler = new OrderRepository();
export default orderDBHandler;
