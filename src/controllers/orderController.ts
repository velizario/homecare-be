import { NextFunction, Request, Response } from "express";
import orderDBHandler from "../dao/orderRepository";
import { Event, Order, OrderComment, OrderHistory, OrderHistoryLogType, OrderStatus, ORDER_STATUS } from "../entity/Entities";
import AppError from "../utils/appError";
import catchAsync from "../utils/errorHandler";

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

export const updateOrder = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const order = req.body as Order;
  const orderRes = await orderDBHandler.updateOrder(order.id, order);
  //TODO change 1 (user Id) to res.user.id after adding 'protect' to route
  await orderDBHandler.updateOrderHistory(order.id, 1, OrderHistoryLogType.UPDATED);
  res.status(200).json({ status: "success", data: orderRes });
});

export const createOrder = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const order = req.body as Order;
  console.log(order)
  // TODO add or calculate client and vendor id. One take from res.data but need to know if client or vendor
  const user = res.user;

  if (!user) return next(new AppError("User is not attached to the response!", 500));

  order.clientId = Number(user.clientId);

  // if client selected only one day or hour from choices, transfer them to visitDay/Hour
  if (order.clientDayChoice?.length === 1 && !order.visitDay) order.visitDay = order.clientDayChoice[0];
  if (order.clientHourChoice?.length === 1 && !order.visitHour) order.visitHour = order.clientHourChoice[0];

  // when client selects a single day and a single hour, request is considered as reservation
  if (order.visitDay && order.visitHour) order.orderStatusId = ORDER_STATUS.RESERVATION;
  else order.orderStatusId = ORDER_STATUS.NEW;

  const orderRes = await orderDBHandler.addOrder(order);
  orderDBHandler.updateOrderHistory(order.id, 1, OrderHistoryLogType.NEW);
  res.status(200).json({ status: "success", data: orderRes });
});

export const changeOrderStatus = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const orderId = Number(req.params.id);
  const newStatus = Number(req.body.newStatus);
  // const orderStatus = <OrderStatus>{ id: newStatus };
  await orderDBHandler.updateOrderWithoutArrays(orderId, { orderStatusId: newStatus });
  //TODO change 1 (user Id) to res.user.id after adding 'protect' to route
  await orderDBHandler.updateOrderHistory(orderId, 1, newStatus as OrderHistoryLogType);
  const orderRes = await orderDBHandler.findById(orderId);
  res.status(200).json({ status: "success", data: orderRes });
});

export const getOrder = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const orderId = Number(req.params.id);
  const orderRes = await orderDBHandler.findById(orderId);

  if (!orderRes) return next(new AppError(`Cannot find order with id ${orderId} in database!`, 404));

  res.status(200).json({ status: "success", data: orderRes });
});

export const getAllOrders = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const user = res.user;
  if (!user) return next(new AppError("User is not attached to the response!", 500));

  const vendorId = user.vendorId;
  const clientId = user.clientId;

  // if (vendorId && clientId)
  //   return next(new AppError("Application error - both client and vendor exist on this user", 500));

  if (!vendorId && !clientId)
    return next(new AppError("Application error - neither client nor vendir exist on this user", 500));

  const searchIdArg = vendorId ? "vendorId" : "clientId";
  const searchIdVal = vendorId ? vendorId : clientId;

  const orders = await orderDBHandler.findOrders({ [searchIdArg]: searchIdVal });
  // const ordersHydrated = orders.map((order) => flattenOrder(order));
  res.status(200).json({ status: "success", data: orders });

  // if (!orderRes) return next(new AppError(`Cannot find order with id ${orderId} in database!`, 404))
});

export const publishOrderComment = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  console.log("OrderController - publishOrderComment");
  const resData = await orderDBHandler.addOrderComment(req.body as OrderComment);
  res.status(200).json({ status: "success", data: resData });
});

export const upsertEvent = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  console.log("OrderController - addEvent");
  const resData = await orderDBHandler.upsertOrderEvent(req.body as Event);
  res.status(200).json({ status: "success", data: resData });
});

export const getEvents = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  console.log("OrderController - getEvents");
  const resData = await orderDBHandler.findEvents(req.body as Record<string, string | number>);
  res.status(200).json({ status: "success", data: resData });
});
