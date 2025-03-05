import { Router } from "express";
import { addCart, listCartByClient } from "./shopping.controller.js";
import { ValidarToken } from "../middlewares/validar-JWT.js";

const router = Router()

router.post("/addCart", ValidarToken, addCart)

router.get("/listCartByClient/:uid_client", ValidarToken, listCartByClient)

export default router