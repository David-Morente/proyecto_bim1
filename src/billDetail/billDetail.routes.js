import { Router } from "express";
import { updateBill } from "./billDetail.controller.js";

const router = Router()

router.put("/updateBill/:uid", updateBill)

export default router