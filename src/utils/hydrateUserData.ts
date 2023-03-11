import { Client, Role, User, Vendor } from "../entity/Entities";
import { HydratedUser, UserUnion } from "../types/types";

export default function hydrateUserData (data: UserUnion) {
    // also remove passwordConfirm from the initial request
    const {webPage, instagram, facebook, companyName, passwordConfirm, ...rest  } = data;
    const userHydrated: HydratedUser = Object.assign({}, rest)
    const vendorData: Partial<Vendor> = { companyName, webPage, instagram, facebook}
    // NOTE: No specific client data at this point.
    const clientData: Partial<Client> = {}
    if (userHydrated.roles.includes(Role.CLIENT)) userHydrated.client = clientData 
    if (userHydrated.roles.includes(Role.VENDOR_INDIVIDUAL) || userHydrated.roles.includes(Role.VENDOR_COMPANY)) userHydrated.vendor = vendorData 
    return userHydrated;
}