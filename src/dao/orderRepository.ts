import { AppDataSource } from "../DBConnectorData";
import { Order, OrderComment, OrderHistory } from "../entity/Entities";

export const orderRepository = AppDataSource.getRepository(Order);
export const OrderCommentRepository = AppDataSource.getRepository(OrderComment);
export const OrderHistoryRepository = AppDataSource.getRepository(OrderHistory);

interface OrderRepositoryInterface {}

class OrderRepository implements OrderRepositoryInterface {
  async addOrder(orderData: any) {
    // const visitHour = orderData.visitHour.map((hour: string) => ({ id: hour }));
    // const visitDay = orderData.visitDay.map((day: string) => ({ id: day }));
    // orderData.visitHour = visitHour as VisitHour[];
    // orderData.visitDay = visitDay as VisitDay[];

    // await validateObjToEntity<Order>(orderData, Order);
    //  const test = (await EssentialsDBHandler.findAllVisitHours()).find(hour => hour.id === orderData.visitHour[0])
    console.log("adding NEW");
    orderData.orderHistory = [...orderData.orderHistory, { updateType: "NEW", user: { id: 1 } }];
    return await orderRepository.save(orderData);
  }

  async updateOrder(orderData: Order) {
    OrderHistoryRepository.save({ updateType: "UPDATED", user: { id: 1 }, order: { id: orderData.id } });
    return await orderRepository.save(orderData);
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
    return await OrderCommentRepository.save(commentData);
  }
}

const orderDBHandler = new OrderRepository();
export default orderDBHandler;
