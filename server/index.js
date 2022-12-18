// required modules imports
import express from "express";
import bodyParser from "body-parser";
import mongoose, { mongo } from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import clientRoutes from "./routes/client.js";
import generalRoutes from "./routes/general.js";
import managementRoutes from "./routes/management.js";
import salesRoutes from "./routes/sales.js";

// DATA Imports
import User from './models/User.js';
import Product from "./models/Product.js";
import ProductStat from "./models/ProductStat.js";
import Transaction from "./models/Transaction.js";
import { dataUser, dataProduct, dataProductStat, dataTransaction } from './data/index.js';

// SERVER Configurations
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// ROUTES Configurations
app.use("/client", clientRoutes);
app.use("/general", generalRoutes);
app.use("/management", managementRoutes);
app.use("/sales", salesRoutes);

// MONGOOSE Configuration
const PORT = process.env.PORT || 9000;

mongoose
.set("strictQuery", false);
mongoose
.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    app.listen(PORT, () => console.log(`Server PORT running at: ${PORT}`));

    // ADD USER DATA ONLY ONE TIME!
    // Product.insertMany( dataProduct);
    // ProductStat.insertMany( dataProductStat);
    // Transaction.insertMany(dataTransaction);
    // User.insertMany(dataUser);
})
.catch((error) => console.log(`${error}! Connection not successful!`) );