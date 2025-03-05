import jwt from "jsonwebtoken"
import User from "../users/user.model.js"

export const ValidarToken = async (req, res, next) => {
    const token = req.header('Authorization');

    /*Valida el token del usuario*/
    if(!token) {
        return res.status(401).send({
            success: false,
            message: "El token es obligatorio.",
        });
    }

    try {
        const tokenJWT = token.replace('Bearer ', '');

        const { uid } = jwt.verify(tokenJWT, process.env.SECRET_KEY)

        const userExist = await User.findById(uid);

        if(!userExist){
            return res.status(404).send({
                success: false,
                message: "El usuario no existe",
            });
        }

        // Setear usuario al body
        req.body.user = userExist;
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al validar token",
            error: err.message
        });
    }

    next();
};