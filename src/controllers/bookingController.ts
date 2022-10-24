import { Request, Response, NextFunction } from "express";
import catchAsync from "../utils/errorHandler";
import { bookingDBHandler } from "../dao/BookingRepository";
import { BookingModel } from "../model/bookingModel"
import { createSendToken } from "./authController";
import AppError from "../utils/appError";

export const getBooking = catchAsync(async (req: Request, res: Response) => {
  const booking = await bookingDBHandler.findById(req.params.id);
  res.status(201).json({
    status: "success",
    data: {
      booking,
    },
  });
});

// TODO: Validate that update is coming either from admin or from the booking itself by confirming token is for the same booking as the updates
export const updateBooking = catchAsync(async (req: Request, res: Response) => {
  const updatedBooking = await bookingDBHandler.edit(req.params.id, req.body);

  res.status(201).json({
    status: "success",
    data: {
      booking: updatedBooking,
    },
  });
});


export const createBooking = catchAsync(async (req: Request, res: Response) => {
  const newBooking = await bookingDBHandler.add(req.body);

  res.status(201).json({
    status: "success",
    data: {
      booking: newBooking,
    },
  });
});


export const getBookings = catchAsync(async (req: Request, res: Response) => {
  const bookings = await bookingDBHandler.findByQuery(req.query as Record <string, string>);
  res.status(201).json({
    status: "success",
    data: {
      bookings,
    },
  });
});


export const deleteBooking = catchAsync(async (req: Request, res: Response) => {
  await bookingDBHandler.deleteById(req.params.id);

  res.status(204).json({
    status: "success",
    data: null,
  });
});
