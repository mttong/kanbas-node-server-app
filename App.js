import Hello from "./Hello.js";
import Lab5 from "./Lab5.js";
import express from 'express';
import cors from 'cors';
import CourseRoutes from "./Kanbas/courses/routes.js";
import ModuleRoutes from "./Kanbas/modules/routes.js";
import mongoose from "mongoose";
import UserRoutes from "./Users/routes.js";

import session from "express-session";
import "dotenv/config";

const CONNECTION_STRING = process.env.DB_CONNECTION_STRING || 'mongodb://127.0.0.1:27017/kanbas';
mongoose.connect("mongodb://127.0.0.1:27017/kanbas");
const app = express(CONNECTION_STRING);
app.use(cors(
    {
        credentials: true,
        origin: process.env.FRONTEND_URL,
    }
));

const sessionOptions = {
    secret: "secret",
    resave: false,
    saveUninitialized: false,
};

if (process.env.NODE_ENV !== "development") {
    sessionOptions.proxy = true;
    sessionOptions.cookie = {
        sameSite: "none",
        secure: true,
        domain: process.env.HTTP_SERVER_DOMAIN,
    };
}
app.use(session(sessionOptions));

CourseRoutes(app);

app.use(express.json());
UserRoutes(app);
ModuleRoutes(app);
Lab5(app);
Hello(app);

app.listen(process.env.PORT || 4000);

