"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const essentialsRouter_1 = __importDefault(require("./routes/essentialsRouter"));
const ordersRouter_1 = __importDefault(require("./routes/ordersRouter"));
const testRouter_1 = __importDefault(require("./routes/testRouter"));
const usersRouter_1 = __importDefault(require("./routes/usersRouter"));
const vendorsRouter_1 = __importDefault(require("./routes/vendorsRouter"));
const appError_1 = __importDefault(require("./utils/appError"));
const errorController_1 = __importDefault(require("./utils/errorController"));
exports.app = (0, express_1.default)();
// TODO: implement winston for error and security logging - https://www.npmjs.com/package/winston
// Security http headers
exports.app.use(helmet_1.default.crossOriginResourcePolicy({ policy: "cross-origin" })); //allow getting images from cross domains
exports.app.use((0, morgan_1.default)('[:date[clf]] :remote-user ":method :url HTTP/:http-version" Status: :status Response time: :response-time ms'));
// app.use("/", express.static(path.join(__dirname, "../public")));
exports.app.use(express_1.default.json()); //middleware to handle incoming request data i.e. data from  the body is added to the 'req' object argument. This way req.body is available as object
// Additional middleware which will set headers that we need on each request.
exports.app.use(function (req, res, next) {
    // Set permissive CORS header - this allows this server to be used only as
    // an API server in conjunction with something like webpack-dev-server.
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.setHeader(`Access-Control-Allow-Methods`, `GET, POST, PUT, PATCH, DELETE, OPTIONS`);
    res.setHeader("Access-Control-Max-Age", 3600); // 1 hour
    // Disable caching so we'll always get the latest posts.
    res.setHeader("Cache-Control", "no-cache");
    next();
});
exports.app.options("/*", (_, res) => {
    res.sendStatus(200);
});
// Users Router
exports.app.use("/api/v1/users", usersRouter_1.default);
// Vendors Router
exports.app.use("/api/v1/vendors", vendorsRouter_1.default);
// Vendors Router
exports.app.use("/api/v1/orders", ordersRouter_1.default);
// Essentials Router
exports.app.use("/api/v1/essentials", essentialsRouter_1.default);
// Test Router
exports.app.use("/api/v1/test", testRouter_1.default);
// Bookings Router
// app.use("/api/v1/bookings", bookingsRouter);
// Default router
exports.app.all("*", (req, res, next) => {
    next(new appError_1.default(`Can't find ${req.originalUrl} on this server!`, 404));
});
exports.app.use(errorController_1.default);
// Defines Route for HTTP method 'get' and for path '/products'. Gets all products
// app.get("/api/v1/products", getAllProducts);
// Defines Route for HTTP method 'get' and for path '/products/:id'. Gets single product
// app.get("/api/v1/products/:id", getSingleProduct);
// Defines Route for HTTP method 'post' and for path '/api/v1/products'. Creates new product
// app.post("/api/v1/products", createProduct);
// Defines Route for HTTP method 'patch' and for path '/api/v1/products'. Updates existing product
// app.patch("/api/v1/products/:id", updateProduct);
