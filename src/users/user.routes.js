import { Router } from "express";
import { getUserById, getUsers, deleteUser, updatePassword, updateUser } from "./user.controller.js";
import { getUserByIdValidator, deleteUserValidator, updatePasswordValidator, updateUserValidator } from "../middlewares/check-validator.js";
import { ValidarToken } from "../middlewares/validar-JWT.js";

const router = Router()

router.get("/findUser/:uid", getUserByIdValidator, getUserById)

router.get("/", getUsers)

router.delete("/deleteUser/:uid", deleteUserValidator, ValidarToken, deleteUser)

router.patch("/updatePassword/:uid", updatePasswordValidator, ValidarToken, updatePassword)

router.put("/updateUser/:uid", updateUserValidator, ValidarToken, updateUser)

export default router