import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/errorHandler";
import { AppDataSource } from "../DBConnectorData";

export const testApi = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  // user is coming in req.user via authController, include guard clause because this function doesn't know
  const resData = await AppDataSource.query(`
  select to_json(res) "client" from 
  (
  SELECT c.*, to_json(o) "order" 
      FROM "order" o
  LEFT JOIN "client" c ON c.id = o."clientId" 
  ) res
  `);

  res.status(201).json({
    status: "success",
    data: resData,
  });
});
