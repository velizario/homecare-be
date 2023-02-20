import { validate } from "class-validator";
import AppError from "./appError";

export default async function valdiateObjToEntity<T extends Record<string, any>>(data: T, Entity: new () => T) {
  let instance = new Entity();
  Object.assign(instance, data);
  const errors = await validate(instance);
  if (errors.length > 0) throw new AppError("Validation error", 401, errors);
}
