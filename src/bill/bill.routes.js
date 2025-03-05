import { Router } from "express";
import { addBill, listBillByClient } from "./bill.controller.js";
import { ValidarToken } from "../middlewares/validar-JWT.js";

const router = Router()

router.post("/addBill", ValidarToken, addBill)

router.get("/listBillByClient/:uid_client", ValidarToken, listBillByClient)

export default router