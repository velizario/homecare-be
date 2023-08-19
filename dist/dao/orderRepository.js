"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eventRepository = exports.historyRepository = exports.commentRepository = exports.orderRepository = void 0;
const DBConnectorData_1 = require("../DBConnectorData");
const Entities_1 = require("../entity/Entities");
exports.orderRepository = DBConnectorData_1.AppDataSource.getRepository(Entities_1.Order);
exports.commentRepository = DBConnectorData_1.AppDataSource.getRepository(Entities_1.OrderComment);
exports.historyRepository = DBConnectorData_1.AppDataSource.getRepository(Entities_1.OrderHistory);
exports.eventRepository = DBConnectorData_1.AppDataSource.getRepository(Entities_1.Event);
class OrderRepository {
    async addOrder(orderData) {
        const addNewOrder = await exports.orderRepository.save(orderData);
        return addNewOrder;
    }
    async updateOrder(orderId, orderData) {
        console.log("orderRepository - updateOrder");
        const currentOrder = await this.findById(orderId);
        if (!currentOrder)
            return null;
        const updatedOrder = await exports.orderRepository.save({ ...currentOrder, ...orderData });
        return updatedOrder;
    }
    async updateOrderWithoutArrays(orderId, orderData) {
        const currentOrder = await this.findById(orderId);
        if (!currentOrder)
            return null;
        console.log("updating without arrays");
        const updatedOrder = await exports.orderRepository.update(orderId, orderData);
        if (!updatedOrder)
            return null;
        return { ...currentOrder, ...orderData };
    }
    async updateOrderHistory(orderId, userId, updateType) {
        const historyUpdate = { updateType: updateType, user: { id: userId }, order: { id: orderId } };
        await exports.historyRepository.save(historyUpdate);
    }
    async findById(orderId) {
        return await exports.orderRepository.findOne({
            where: { id: orderId },
            relations: { vendor: { user: true }, client: { user: true }, orderComment: { user: true } },
        });
    }
    async findOrders(searchArg) {
        console.log(searchArg);
        return await exports.orderRepository.find({
            where: searchArg,
            relations: { vendor: { user: true }, client: { user: true }, event: true },
        });
    }
    async addOrderComment(commentData) {
        return await exports.commentRepository.save(commentData);
    }
    async upsertOrderEvent(eventData) {
        const updateEvent = await exports.eventRepository.upsert(eventData, ["id"]);
        if (!updateEvent)
            return null;
        const resData = await exports.eventRepository.findOneBy({ id: eventData.id });
        return resData;
    }
    async findEvents(searchArg) {
        console.log(searchArg);
        return await exports.eventRepository.find({
            where: searchArg,
            // relations: { vendor: { user: true }, client: { user: true } },
        });
    }
}
const orderDBHandler = new OrderRepository();
exports.default = orderDBHandler;
