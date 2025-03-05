import { Router } from "express"
import { registerProduct, listProducts, findProductById, editProduct, deleteProduct } from "./product.controller.js"

const router = Router()

router.post("/registerProduct", registerProduct)

router.get("/listProducts", listProducts)

router.get("/findProduct/:uid", findProductById)

router.put("/editProduct/:uid", editProduct)

router.delete("/deleteProduct/:uid", deleteProduct)

export default router