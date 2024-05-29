const jwt = require('jsonwebtoken');
const {
    config
} = require('../config/config');
async function firmaJwt(req, res) {
    try {
        const nuevoToken = await jwt.sign(
            { email: "varelahiram55@gmail.com" },
            config.auth.secretKey,
            { algorithm: 'HS256' }
        );

        res.status(200).json({
            message: "Token creado",
            jwt: nuevoToken
        });
    } catch (err) {
        res.status(500).json({
            message: "Error al crear el token jwt"
        });
    }

}
async function verifyJwt(req, res, next) {
    const headerToken = req.headers.authorization;
    
    if (headerToken) {
        const tokenParts = headerToken.split(' ');
        if(tokenParts.length == 2 && tokenParts[0] === "Bearer"){
            const authToken = tokenParts[1];
            try{
                await jwt.verify(authToken, config.auth.secretKey);
                next();
            } catch(err){
                console.error("INVALID TOKEN");
                return res.status(401).json({ message: "Token inválido" });
            }
        } else {
            return res.status(401).json({ message: "Formato de token incorrecto" });
        }
    } else {
        return res.status(401).json({ message: "Usuario no autentificado" });
    }
}

module.exports = {
    firmaJwt,
    verifyJwt
}