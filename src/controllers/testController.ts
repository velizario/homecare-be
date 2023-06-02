import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/errorHandler";
import { AppDataSource } from "../DBConnectorData";
import { Event } from "../entity/Entities";

export const testApi = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const resData = AppDataSource.manager.save(Event, {id: "1"})
  // const resData = await AppDataSource.query(`
  // select to_json(res) "client" from 
  // (
  // SELECT c.*, to_json(o) "order" 
  //     FROM "order" o
  // LEFT JOIN "client" c ON c.id = o."clientId" 
  // ) res
  // `);

  res.status(201).json({
    status: "success",
    data: resData,
  });
});
