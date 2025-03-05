"use strict"

import express from 'express'
import cors from "cors"
import helmet from "helmet"
import morgan from "morgan"
import { dbConnection } from './mongo.js'
import authRoutes from "./../src/auth/auth.routes.js"
import userRoutes from "./../src/users/user.routes.js"
import categoryRoutes from "./../src/category/category.routes.js"
import productRoutes from "./../src/product/product.routes.js"
import shoppingCartRoutes from "./../src/shoppingCart/shopping.routes.js"
import billRoutes from "./../src/bill/bill.routes.js"
import billDetailRoutes from "./../src/billDetail/billDetail.routes.js"
import apiLimiter from "./../src/middlewares/validar-cant-peticiones.js"

const middlewares = (app) => {
    app.use(express.urlencoded({extended: false}))
    app.use(express.json())
    app.use(cors({
        origin: '*', // Permitir todas las solicitudes de origen
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization']
    }));
    app.use(helmet({
        contentSecurityPolicy: {
            directives: {
                defaultSrc: ["'self'"],
                scriptSrc: ["'self'", "'unsafe-inline'", `http://localhost:${process.env.PORT}`],
                connectSrc: ["'self'", `http://localhost:${process.env.PORT}`],
                imgSrc: ["'self'", "data:"],
                styleSrc: ["'self'", "'unsafe-inline'"],
            },
        },
    }));
    app.use(morgan("dev"))
    app.use(apiLimiter)
}

const routes = (app) => {
    app.use("/storeSystem/v1/auth", authRoutes)
    app.use("/storeSystem/v1/user", userRoutes)
    app.use("/storeSystem/v1/category", categoryRoutes)
    app.use("/storeSystem/v1/product", productRoutes)
    app.use("/storeSystem/v1/bill", billRoutes)
    app.use("/storeSystem/v1/cart", shoppingCartRoutes)
    app.use("/storeSystem/v1/billDetail", billDetailRoutes)
}

const conectarDB = async () => {
    try{
        await dbConnection()
    }catch(err){
        console.log(`Database connection failed: ${err}`)
    }
}

export const initServer = () => {
    const app = express()
    try {
        middlewares(app)
        conectarDB()
        routes(app)
        app.listen(process.env.PORT)
        console.log(`Server runing  on port: ${process.env.PORT}`)
    } catch (err) {
        console.log(`Server init failed: ${err}`)
    }
}