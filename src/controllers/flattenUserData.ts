import { stringify } from "querystring";
import { User } from "../entity/Entities";
import { FlattenedUser } from "../types/types";
import mapValues from 'lodash/mapValues'


// TODO unnecessary - remove
export const flattenUserData = (data: User) => {
  // Flatten by taking out 'vendor' and 'client'.
  // Strip off password (anything else?) as sensitive data to prepare for the frontend
  const { vendor, client, password, ...rest } = data;

  const userDataFlat: FlattenedUser = Object.assign({}, vendor, client, rest);

  // let userData = {} as Record<string, any>

  // for (const [key, value] of Object.entries(userDataFlat)) {
  //   value === null ? (userData[key] = "") : (userData[key] = value);
  // }

  // replace null values with ""
  const userDataParsed = mapValues(userDataFlat, value => value === null ? "" : value)

  // Object.keys(userDataFlat).forEach(key => userDataFlat[key as keyof FlattenedUser]==='null' && (userDataFlat[key as keyof FlattenedUser] = ""))

  return userDataParsed as FlattenedUser
};
