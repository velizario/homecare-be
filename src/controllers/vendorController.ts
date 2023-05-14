import { NextFunction, Request, Response } from "express";
import fileUpload from "express-fileupload";
import vendorDBHandler from "../dao/vendorRepository";
import { Portfolio, PortfolioImage, User, Vendor } from "../entity/Entities";
import AppError from "../utils/appError";
import catchAsync from "../utils/errorHandler";

export const getVendorById = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const vendorId = Number(req.params.id);
  const vendor = await vendorDBHandler.findVendorById(vendorId);
  if (!vendor) return next(new AppError("Vendor does not exist exists", 401));
  // Proper response handling!!!
  res.status(201).json({
    status: "success",
    data: vendor,
  });
});

export const getVendors = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const vendors = await vendorDBHandler.findAllVendors();
  if (!vendors) return next(new AppError("No vendors found", 401));
  res.status(201).json({
    status: "success",
    data: vendors,
  });
});

export const updatePortfolio = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  // getting the logged in vendor Id and adding it to the portfolio
  const vendor = await vendorDBHandler.findVendorById((res.user as User).vendorId);
  if (!vendor) return;
  vendor.portfolio = req.body.services as Portfolio[];

  const updatedPortfolio = await vendorDBHandler.updateVendor(vendor);
  if (!updatedPortfolio) return next(new AppError("Error updating", 401));
  res.status(201).json({
    status: "success",
    data: updatedPortfolio,
  });
});

export const updatePortfolioImage = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  // getting the logged in vendor Id and adding it to the portfolio
  if (!req.files) return next(new AppError("no file!", 400));
  if (!res.user) return next(new AppError("User is not attached to response!", 500));

  const vendorId = (res.user as User).vendorId;
  const imageCandidate = req.files.uploadCandidate as fileUpload.UploadedFile;

  const vendor = await vendorDBHandler.findVendorById(vendorId);
  if (!vendor) return next(new AppError("Cannot find vendor", 401));

  if (vendor.portfolioImage.length >= 12) {
    res.status(200).json({
      status: "Max number ofimages reached",
      data: {},
    });
    return;
  }

  const imageExists = vendor.portfolioImage.find((image) => image.imgUrl === imageCandidate.name);
  if (imageExists) {
    res.status(200).json({
      status: "Image exists",
      data: {},
    });
    return
  }

  vendor.portfolioImage.push({ imgUrl: imageCandidate.name } as PortfolioImage);

  const updatedPortfolioImages = await vendorDBHandler.updateVendor(vendor);
  if (!updatedPortfolioImages) return next(new AppError("Error updating", 401));
  res.status(201).json({
    status: "success",
    data: updatedPortfolioImages,
  });
});

export const deletePortfolioImage = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  if (!req.body) return next(new AppError("no file!", 400));
  if (!res.user) return next(new AppError("User is not attached to response!", 500));

  const vendorId = (res.user as User).vendorId;
  const imageCandidate = req.body as PortfolioImage;

  const vendor = await vendorDBHandler.findVendorById(vendorId);
  if (!vendor) return next(new AppError("Cannot find vendor", 401));

  const numberOfImages = vendor.portfolioImage.length;

  const filteredImages = vendor.portfolioImage.filter((image) => image.id !== imageCandidate.id);

  if (numberOfImages === filteredImages.length) {
    res.status(404).json({
      status: "Not found",
      data: {},
    });
    return;
  }
  vendor.portfolioImage = [...filteredImages];

  const vendorWithoutImage = await vendorDBHandler.updateVendor(vendor);
  if (!vendorWithoutImage) return next(new AppError("Error updating", 401));
  res.status(201).json({
    status: "success",
    data: vendorWithoutImage,
  });
});
