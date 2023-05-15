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

  const portfolioImages = await vendorDBHandler.getPortfolioImages(vendorId);

  // if (portfolioImages.length >= 12) {
  //   res.status(200).json({
  //     status: "Max number ofimages reached",
  //     data: {},
  //   });
  //   return;
  // }

  const imageExists = portfolioImages.find((image) => image.imgUrl === imageCandidate.name);
  if (imageExists) {
    res.status(200).json({
      status: "Image exists",
      data: {},
    });
    return;
  }

  const portfolioImage = new PortfolioImage();
  portfolioImage.imgUrl = imageCandidate.name;
  portfolioImage.vendor = { id: vendorId } as Vendor;

  const resData = await vendorDBHandler.addPortfolioImage(portfolioImage);
  if (!resData) res.status(400).json({ status: 400, data: "appliation error" });
  else
    res.status(resData.code).json({
      status: resData.status,
      data: resData.data,
    });
});

export const deletePortfolioImage = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  if (!req.body) return next(new AppError("no file!", 400));
  if (!res.user) return next(new AppError("User is not attached to response!", 500));

  const vendorId = (res.user as User).vendorId;
  const imageCandidate = req.body as PortfolioImage;

  const images = await vendorDBHandler.getPortfolioImages(vendorId);

  const numberOfImages = images.length;

  const filteredImages = images.filter((image) => image.id !== imageCandidate.id);

  if (numberOfImages === filteredImages.length) {
    res.status(404).json({
      status: "Not found",
      data: {},
    });
    return;
  }
  
  const resData = await vendorDBHandler.deletePortfolioImage(imageCandidate);
  if (!resData) return next(new AppError("Error updating", 401));
  res.status(201).json({
    status: "success",
    data: resData,
  });
});
