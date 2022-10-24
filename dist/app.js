import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import usersRouter from "./routes/usersRouter";
import AppError from "./utils/appError";
import globalErrorHandler from "./utils/errorController";
import { readTextFile } from "./utils/getGeoLocations";
export const app = express();
async function start() {
    // Security http headers
    app.use(helmet());
    app.use(morgan('[:date[clf]] :remote-user ":method :url HTTP/:http-version" Status: :status Response time: :response-time ms'));
    // app.use("/", express.static(path.join(__dirname, "../public")));
    app.use(express.json()); //middleware to handle incoming request data i.e. data from  the body is added to the 'req' object argument. This way req.body is available as object
    // Additional middleware which will set headers that we need on each request.
    app.use(function (req, res, next) {
        // Set permissive CORS header - this allows this server to be used only as
        // an API server in conjunction with something like webpack-dev-server.
        res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
        res.setHeader("Access-Control-Allow-Credentials", "true");
        res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
        res.setHeader(`Access-Control-Allow-Methods`, `GET, POST, PUT, PATCH, DELETE, OPTIONS`);
        res.setHeader("Access-Control-Max-Age", 3600); // 1 hour
        // Disable caching so we'll always get the latest posts.
        res.setHeader("Cache-Control", "no-cache");
        next();
    });
    // Users Router
    app.use("/api/v1/users", usersRouter);
    // Default router
    app.all("*", (req, res, next) => {
        next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
    });
    app.use(globalErrorHandler);
    // Defines Route for HTTP method 'get' and for path '/products'. Gets all products
    // app.get("/api/v1/products", getAllProducts);
    // Defines Route for HTTP method 'get' and for path '/products/:id'. Gets single product
    // app.get("/api/v1/products/:id", getSingleProduct);
    // Defines Route for HTTP method 'post' and for path '/api/v1/products'. Creates new product
    // app.post("/api/v1/products", createProduct);
    // Defines Route for HTTP method 'patch' and for path '/api/v1/products'. Updates existing product
    // app.patch("/api/v1/products/:id", updateProduct);
    const areas = await readTextFile("C:/Users/velizar.stoyanov/Downloads/test.json");
    console.log(areas);
}
start();
