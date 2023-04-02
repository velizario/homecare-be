import { NextFunction, Request, Response } from "express";
import orderDBHandler, { orderRepository } from "../dao/orderRepository";
import { Order, OrderStatus } from "../entity/Entities";
import AppError from "../utils/appError";
import catchAsync from "../utils/errorHandler";

const flattenOrder = (order: Order) => {
  const { client, vendor, ...ordersFlattened } = order;
  console.log(order)
  return {
    ...ordersFlattened,
    clientName: client.user.firstName + " " + client.user.lastName,
    vendorName: vendor.user.firstName + " " + vendor.user.lastName,
    vendorImgUrl: vendor.user.imageUrl,
    clientImgUrl: client.user.imageUrl
  };
};

export const createOrder = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const order = req.body as Order;
  // TODO add or calculate client and vendor id. One take from res.data but need to know if client or vendor
  const user = res.user;
  if (!user) return next(new AppError("User is not attached to the response!", 500));

  order.clientId = Number(user.clientId);
  order.status = OrderStatus.NEW;

  console.log(order)
  const orderRes = await orderDBHandler.addOrder(order);
  res.status(200).json({ status: "success", data: orderRes });
});

export const cancelOrder = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const orderId = req.params.id as string;

  const order = await orderDBHandler.findOrderById(orderId);
  if (!order) return next(new AppError("Could not find the order in the DB", 404));

  // TODO add or calculate client and vendor id. One take from res.data but need to know if client or vendor
  order.status = OrderStatus.CANCELLED;

  const orderRes = await orderDBHandler.updateOrder(order);
  res.status(200).json({ status: "success", data: orderRes });
});

export const getOrder = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const orderId = req.params.id;

  const orderRes = await orderDBHandler.findOrderById(orderId);
  
  if (!orderRes) return next(new AppError(`Cannot find order with id ${orderId} in database!`, 404));
  const orderFlattened  = flattenOrder(orderRes);
  console.log("test")

  res.status(200).json({ status: "success", data: orderFlattened });
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

  const orders = await orderDBHandler.findAllOrders({ [searchIdArg]: searchIdVal });

  // loop through orders, get only name of user WTFFF
  const ordersHydrated = orders.map((order) => flattenOrder(order));
  // if (!orders || orders.length > 0)
  console.log("order received!");
  res.status(200).json({ status: "success", data: ordersHydrated });

  // if (!orderRes) return next(new AppError(`Cannot find order with id ${orderId} in database!`, 404))
});
