"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const Entities_1 = require("../entity/Entities");
function hydrateUserData(data) {
    // also remove passwordConfirm from the initial request
    const { website, instagram, facebook, companyName, passwordConfirm, address, city, about, district, servedDistrict, ...rest } = data;
    const hydratedUser = Object.assign({}, rest);
    const vendorData = {
        companyName,
        about,
        website,
        instagram,
        facebook,
        city
    };
    // NOTE: No specific client data at this point.
    const clientData = { address, city, district };
    if (hydratedUser.roles.includes(Entities_1.Role.CLIENT))
        hydratedUser.client = { id: hydratedUser.clientId, ...clientData };
    if (hydratedUser.roles.includes(Entities_1.Role.VENDOR_INDIVIDUAL) || hydratedUser.roles.includes(Entities_1.Role.VENDOR_COMPANY)) {
        hydratedUser.vendor = { id: hydratedUser.vendorId, ...vendorData };
        servedDistrict && (hydratedUser.vendor.servedDistrict = servedDistrict);
    }
    // replace "" values with null
    const userDataParsed = (0, lodash_1.mapValues)(hydratedUser, (value) => (value === "" ? null : value));
    return userDataParsed;
}
exports.default = hydrateUserData;
