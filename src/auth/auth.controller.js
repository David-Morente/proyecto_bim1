import { hash, verify } from "argon2"
import User from "../users/user.model.js"
import { generateJWT } from "../helpers/generate-jwt.js"

export const register = async (req, res) => {
    try{
        const data = req.body
        data.role = "CLIENT_ROLE"
        const encryptedPassword = await hash(data.password)

        data.password = encryptedPassword
        const user = await User.create(data)
        return res.status(201).json({
            message: "Usuario registrado",
            name: user.name,
            email: user.email
        })

    }catch(err){
        console.log(err.message)
        return res.status(500).json({
            message: "Registro del usuario fallido",
            error: err.message
        })
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body
    try{
        const user = await User.findOne({
            email: email
        })

        if(!user){
            return res.status(404).json({
                message: "Credenciales inválidas",
                error: "Username o email no existe en la base de datos"
            })
        }

        const validPassword = await verify(user.password, password)

        if(!validPassword){
            return res.status(400).json({
                message: "Credenciales inválidas",
                error: "Contraseña incorrecta"
            })
        }

        const token = await generateJWT(user.id)
        return res.status(200).json({
            message: "Inicio de sesión exitoso",
            userDetails:{
                token: token,
            }
        })
    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error en inicio de sesión",
            error: err.message
        })
    }
}