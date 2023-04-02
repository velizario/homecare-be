import catchAsync from "../utils/errorHandler";
import { NextFunction, Request, Response } from "express";
import EssentialsDBHandler from "../dao/essentialsRepository";


export const getAllServices = catchAsync(async (req: Request, res: Response, next: NextFunction) => { 
    console.log("starting to get services")
    const servicesRes = await EssentialsDBHandler.findAllServices();
    console.log("We got the services", servicesRes)
    res.status(201).json({
        status: "success",
        data: servicesRes,
      });
})