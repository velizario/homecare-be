import { Request, Response} from "express";
import catchAsync from "../utils/errorHandler";
import { bookingRepository } from "../dao/BookingRepository";
import { Event } from "../entity/Entities";


export const getBooking = catchAsync(async (req: Request, res: Response) => {
  const booking = await bookingRepository.findOneBy({id: req.params.id});
  res.status(201).json({
    status: "success",
    data: {
      booking,
    },
  });
});

// TODO: Validate that update is coming either from admin or from the booking itself by confirming token is for the same booking as the updates
export const updateBooking = catchAsync(async (req: Request, res: Response) => {
  const updatedBooking = await bookingRepository.update(req.params.id, req.body);

  res.status(201).json({
    status: "success",
    data: {
      booking: updatedBooking,
    },
  });
});


export const createBooking = catchAsync(async (req: Request, res: Response) => {
  const newBooking = await bookingRepository.save(req.body);

  res.status(201).json({
    status: "success",
    data: {
      booking: newBooking,
    },
  });
});

export const getBookings = catchAsync(async (req: Request, res: Response) => {
  const bookings = await bookingRepository.findBy(req.query);
  res.status(201).json({
    status: "success",
    data: {
      bookings,
    },
  });
});


export const deleteBooking = catchAsync(async (req: Request, res: Response) => {
  await bookingRepository.delete(req.params.id);

  res.status(204).json({
    status: "success",
    data: null,
  });
});
