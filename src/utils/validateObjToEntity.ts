// Class validator allows use of decorator based validation
// Validation conditions are entered as decorators in the typeORM class based entities and then used by validator to validate a data object against that class
import { validate } from "class-validator";
import AppError from "./appError";

export default async function validateObjToEntity<T extends Record<string, any>>(data: T, Entity: new () => T) {
  // create new instance of the class against which data will be validated
  let instance = new Entity();
  // assign data to the instance
  Object.assign(instance, data);
  // validate data against instance type and decorator based conditions
  const errors = await validate(instance);
  if (errors.length > 0) throw new AppError("Validation error", 401, errors);
}
