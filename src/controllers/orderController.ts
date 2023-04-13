import { NextFunction, Request, Response } from "express";
import EssentialsDBHandler from "../dao/essentialsRepository";
import orderDBHandler from "../dao/orderRepository";
import { Order, OrderComment } from "../entity/Entities";
import AppError from "../utils/appError";
import catchAsync from "../utils/errorHandler";
import { ORDER_STATUS } from "../utils/staticData";


const flattenOrder = (order: Order) => {
  const { client, vendor, ...ordersFlattened } = order;
  console.log("user read")

  return {
    ...ordersFlattened,
    clientName: client.user.firstName + " " + client.user.lastName,
    vendorName: vendor.user.firstName + " " + vendor.user.lastName,
    vendorImgUrl: vendor.user.imageUrl,
    clientImgUrl: client.user.imageUrl,
  };
};

export const updateOrder = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const order = req.body as Order;
  
  // TODO: Evaluate in which case order becomes active
  // order.orderStatusId = ORDER_STATUS.ACTIVE;

  const orderRes = await orderDBHandler.updateOrder(order);
  res.status(200).json({ status: "success", data: orderRes });
});
export const createOrder = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const order = req.body as Order;
  // TODO add or calculate client and vendor id. One take from res.data but need to know if client or vendor
  const user = res.user;

  //TODO THIS IS COMMENTED ONLY FOR POSTMAN TO WORK. RETURN THIS AND ADD 'protect' to createOrder route
  // if (!user) return next(new AppError("User is not attached to the response!", 500));
  // order.clientId = Number(user.clientId);
  order.clientId = 1;
  order.vendorId = 1;

  order.orderStatusId = ORDER_STATUS.NEW;
  const orderRes = await orderDBHandler.addOrder(order);
  res.status(200).json({ status: "success", data: orderRes });
});

export const cancelOrder = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const orderId = Number(req.params.id);

  const order = await orderDBHandler.findOrderById(orderId);
  if (!order) return next(new AppError("Could not find the order in the DB", 404));

  // TODO add or calculate client and vendor id. One take from res.data but need to know if client or vendor
  order.orderStatus = (await EssentialsDBHandler.findOrderstatuses())[ORDER_STATUS.CANCELLED];

  const orderRes = await orderDBHandler.updateOrder(order);
  res.status(200).json({ status: "success", data: orderRes });
});

export const getOrder = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const orderId = Number(req.params.id);
  const orderRes = await orderDBHandler.findOrderById(orderId);

  if (!orderRes) return next(new AppError(`Cannot find order with id ${orderId} in database!`, 404));

  const orderFlattened = flattenOrder(orderRes);
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
  const orderComment = await orderDBHandler.addOrderComment(req.body as OrderComment);
  res.status(200).json({ status: "success", data: orderComment });
});
