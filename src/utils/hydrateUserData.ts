import { Client, Role, User, Vendor } from "../entity/Entities";
import { HydratedUser, UserUnion } from "../types/types";

export default function hydrateUserData(data: UserUnion) {
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
  const userHydrated: HydratedUser = Object.assign({}, rest);
  const vendorData: Partial<Vendor> = {
    companyName,
    about,
    website,
    instagram,
    facebook,
  };
  // NOTE: No specific client data at this point.
  const clientData: Partial<Client> = { address, city, district };
  if (userHydrated.roles.includes(Role.CLIENT))
    userHydrated.client = { id: userHydrated.clientId, ...clientData };
  if (
    userHydrated.roles.includes(Role.VENDOR_INDIVIDUAL) ||
    userHydrated.roles.includes(Role.VENDOR_COMPANY)
  ) {
    userHydrated.vendor = { id: userHydrated.vendorId, ...vendorData };
    servedDistrict && (userHydrated.vendor.servedDistrict = servedDistrict);
  }
  return userHydrated;
}
