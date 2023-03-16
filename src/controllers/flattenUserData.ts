import { Request, Response, NextFunction } from "express";
import { Client, Role,  User,  Vendor } from "../entity/Entities";
import { HydratedUser, UserUnion } from "../types/types";
import catchAsync from "../utils/errorHandler";


export const flattenUserData = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    
    // Flatten by taking out 'vendor' and 'client'. Strip off sensitive data to prepare for the frontend
    const { vendor, client, password, ...rest } = req.body as User;
    const userDataFlat = Object.assign({}, rest, vendor, client);
    console.log(userDataFlat)
    res.status(200).json({
        status: "success",
        data: userDataFlat,
    });
  }
);
