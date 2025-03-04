import { Router } from "express"
import { createCategory, listCategories, editCategory, deleteCategory } from "./category.controller.js"

const router = Router()

router.post("/createCategory", createCategory)

router.get("/listCategories", listCategories)

router.put("/editCategory/:uid", editCategory)

router.delete("/deleteCategory/:uid", deleteCategory)

export default router