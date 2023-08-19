"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEvents = exports.upsertEvent = exports.publishOrderComment = exports.getAllOrders = exports.getOrder = exports.changeOrderStatus = exports.createOrder = exports.updateOrder = void 0;
const orderRepository_1 = __importDefault(require("../dao/orderRepository"));
const Entities_1 = require("../entity/Entities");
const appError_1 = __importDefault(require("../utils/appError"));
const errorHandler_1 = __importDefault(require("../utils/errorHandler"));
// const flattenOrder = (order: Order) => {
//   const { client, vendor, ...ordersFlattened } = order;
//   console.log("user read");
//   return {
//     ...ordersFlattened,
//     clientName: client.user.firstName + " " + client.user.lastName,
//     vendorName: vendor.user.firstName + " " + vendor.user.lastName,
//     vendorImgUrl: vendor.user.imageUrl,
//     clientImgUrl: client.user.imageUrl,
//   };
// };
exports.updateOrder = (0, errorHandler_1.default)(async (req, res, next) => {
    const order = req.body;
    const orderRes = await orderRepository_1.default.updateOrder(order.id, order);
    //TODO change 1 (user Id) to res.user.id after adding 'protect' to route
    await orderRepository_1.default.updateOrderHistory(order.id, 1, Entities_1.OrderHistoryLogType.UPDATED);
    res.status(200).json({ status: "success", data: orderRes });
});
exports.createOrder = (0, errorHandler_1.default)(async (req, res, next) => {
    const order = req.body;
    // TODO add or calculate client and vendor id. One take from res.data but need to know if client or vendor
    const user = res.user;
    //TODO THIS IS COMMENTED ONLY FOR POSTMAN TO WORK. RETURN THIS AND ADD 'protect' to createOrder route
    // if (!user) return next(new AppError("User is not attached to the response!", 500));
    // order.clientId = Number(user.clientId);
    order.clientId = 1;
    order.vendorId = 1;
    // when client selects only one day or hour, make it mandatory for the vendor
    if (order.clientDayChoice.length === 1)
        order.visitDay = order.clientDayChoice[0];
    if (order.clientHourChoice.length === 1)
        order.visitHour = order.clientHourChoice[0];
    // when client selects a single day and a single hour, request is considered as reservation
    if (order.visitDay && order.visitHour)
        order.orderStatusId = Entities_1.ORDER_STATUS.RESERVATION;
    else
        order.orderStatusId = Entities_1.ORDER_STATUS.NEW;
    const orderRes = await orderRepository_1.default.addOrder(order);
    orderRepository_1.default.updateOrderHistory(order.id, 1, Entities_1.OrderHistoryLogType.NEW);
    res.status(200).json({ status: "success", data: orderRes });
});
exports.changeOrderStatus = (0, errorHandler_1.default)(async (req, res, next) => {
    const orderId = Number(req.params.id);
    const newStatus = Number(req.body.newStatus);
    // const orderStatus = <OrderStatus>{ id: newStatus };
    await orderRepository_1.default.updateOrderWithoutArrays(orderId, { orderStatusId: newStatus });
    //TODO change 1 (user Id) to res.user.id after adding 'protect' to route
    await orderRepository_1.default.updateOrderHistory(orderId, 1, newStatus);
    const orderRes = await orderRepository_1.default.findById(orderId);
    res.status(200).json({ status: "success", data: orderRes });
});
exports.getOrder = (0, errorHandler_1.default)(async (req, res, next) => {
    const orderId = Number(req.params.id);
    const orderRes = await orderRepository_1.default.findById(orderId);
    if (!orderRes)
        return next(new appError_1.default(`Cannot find order with id ${orderId} in database!`, 404));
    res.status(200).json({ status: "success", data: orderRes });
});
exports.getAllOrders = (0, errorHandler_1.default)(async (req, res, next) => {
    const user = res.user;
    if (!user)
        return next(new appError_1.default("User is not attached to the response!", 500));
    const vendorId = user.vendorId;
    const clientId = user.clientId;
    // if (vendorId && clientId)
    //   return next(new AppError("Application error - both client and vendor exist on this user", 500));
    if (!vendorId && !clientId)
        return next(new appError_1.default("Application error - neither client nor vendir exist on this user", 500));
    const searchIdArg = vendorId ? "vendorId" : "clientId";
    const searchIdVal = vendorId ? vendorId : clientId;
    const orders = await orderRepository_1.default.findOrders({ [searchIdArg]: searchIdVal });
    // const ordersHydrated = orders.map((order) => flattenOrder(order));
    res.status(200).json({ status: "success", data: orders });
    // if (!orderRes) return next(new AppError(`Cannot find order with id ${orderId} in database!`, 404))
});
exports.publishOrderComment = (0, errorHandler_1.default)(async (req, res, next) => {
    console.log("OrderController - publishOrderComment");
    const resData = await orderRepository_1.default.addOrderComment(req.body);
    res.status(200).json({ status: "success", data: resData });
});
exports.upsertEvent = (0, errorHandler_1.default)(async (req, res, next) => {
    console.log("OrderController - addEvent");
    const resData = await orderRepository_1.default.upsertOrderEvent(req.body);
    res.status(200).json({ status: "success", data: resData });
});
exports.getEvents = (0, errorHandler_1.default)(async (req, res, next) => {
    console.log("OrderController - getEvents");
    const resData = await orderRepository_1.default.findEvents(req.body);
    res.status(200).json({ status: "success", data: resData });
});
