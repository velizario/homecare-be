import { mapValues } from "lodash";
import { Client, Role, User, Vendor } from "../entity/Entities";
import { FlattenedUser, HydratedUser } from "../types/types";

export default function hydrateUserData(data: FlattenedUser) {
  // also remove passwordConfirm from the initial request
  const {
    website,
    instagram,
    facebook,
    companyName,
    passwordConfirm,
    address,
    city,
    about,
    district,
    servedDistrict,
    ...rest
  } = data;
  const hydratedUser: HydratedUser = Object.assign({}, rest);
  const vendorData: Partial<Vendor> = {
    companyName,
    about,
    website,
    instagram,
    facebook,
  };
  // NOTE: No specific client data at this point.
  const clientData: Partial<Client> = { address, city, district };
  if (hydratedUser.roles.includes(Role.CLIENT))
    hydratedUser.client = { id: hydratedUser.clientId, ...clientData };
  if (
    hydratedUser.roles.includes(Role.VENDOR_INDIVIDUAL) ||
    hydratedUser.roles.includes(Role.VENDOR_COMPANY)
  ) {
    hydratedUser.vendor = { id: hydratedUser.vendorId, ...vendorData };
    servedDistrict && (hydratedUser.vendor.servedDistrict = servedDistrict);
  }

  // replace "" values with null
console.log(hydratedUser)
  const userDataParsed = mapValues(hydratedUser, value => value === "" ? null : value)
  return userDataParsed as HydratedUser;
}
