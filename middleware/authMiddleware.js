const User = require("../models/User");
const authMethod = require("../utils/authMethod");

const authMiddleware = {
    isAuth: async (req, res, next) => {
        // Lấy access token từ header
        const accessTokenFromHeader = req.headers.jwt_token;
        if (!accessTokenFromHeader) {
            return res.status(401).send("Auth Middleware không tìm thấy access token!");
        }

        const accessTokenSecret = process.env.SECRET_ACCESS_TOKEN;

        const verified = await authMethod.verifyToken(
            accessTokenFromHeader,
            accessTokenSecret
        );
        if (!verified) {
            return res
                .status(401)
                .send("Bạn không có quyền truy cập vào tính năng này!");
        }

        const user = await User.findOne({ email: verified.payload.email });
        req.user = user;

        return next();
    },
};

module.exports = authMiddleware;