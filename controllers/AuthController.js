const bcrypt = require("bcrypt");
const randToken = require("rand-token");
const User = require("../models/User");
const dotenv = require("dotenv");
const authMethod = require("../utils/authMethod");
const CONST_VALUE = require("../const/index");

dotenv.config();

const authController = {
    register: async (req, res) => {
        try {
            const salt = await bcrypt.genSalt(10);
            const hashed = await bcrypt.hash(req.body.password, salt);
            const newUser = await new User({
                email: req.body.email,
                password: hashed,
            });
            const user = await newUser.save();
            res.status(200).json(user);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    loginUser: async (req, res) => {
        try {
            // Simple login
            if (req.body.email && req.body.password) {
                // Check email
                const user = await User.findOne({ email: req.body.email });
                if (!user) {
                    res.status(401).json("Email is incorrect");
                    return;
                }
                // Check password
                const isPasswordValid = bcrypt.compareSync(
                    req.body.password,
                    user.password
                );
                if (!isPasswordValid) {
                    res.status(401).json("Password is incorrect");
                    return;
                }

                const accessTokenLife = process.env.ACCESS_TOKEN_LIFE;
                const accessTokenSecret = process.env.SECRET_ACCESS_TOKEN;

                // Generate access token
                const dataForAccessToken = {
                    email: user.email,
                };
                const accessToken = await authMethod.generateToken(
                    dataForAccessToken,
                    accessTokenSecret,
                    accessTokenLife
                );
                if (!accessToken) {
                    return res.status(401).json("Login failed");
                }

                // Generate refresh token
                let refreshToken = randToken.generate(CONST_VALUE.TOKEN_SIZE);
                if (!user.refreshToken) {
                    user.refreshToken = refreshToken;
                    await user.save();
                } else {
                    refreshToken = user.refreshToken;
                }

                return res.json({
                    accessToken,
                    refreshToken,
                    user,
                });
            } else {
                // Login with google
                const user = await User.findOne({ email: req.body.email });
                if (!user || user === null) {
                    console.log(req.body);
                    const newUser = new User({
                        name: req.body.name,
                        email: req.body.email,
                        imageUrl: req.body.imageUrl,
                        googleId: req.body.googleId,
                    });
                    await newUser.save();
                    res.status(200).json(newUser);
                } else {
                    console.log("Login successfully with google");
                    res.status(200).json(user);
                }
            }
        } catch (err) {
            res.status(500).json(err);
        }
    },
    refreshToken: async (req, res) => {
        try {
            // L???y access token t??? header
            const accessTokenFromHeader = req.headers.jwt_token;
            if (!accessTokenFromHeader) {
                return res.status(400).send("Kh??ng t??m th???y access token.");
            }

            // L???y refresh token t??? body
            const refreshTokenFromBody = req.body.refreshToken;
            if (!refreshTokenFromBody) {
                return res.status(400).send("Kh??ng t??m th???y refresh token.");
            }

            const accessTokenSecret = process.env.SECRET_ACCESS_TOKEN;
            const accessTokenLife = process.env.ACCESS_TOKEN_LIFE;

            // Decode access token ????
            const decoded = await authMethod.decodeToken(
                accessTokenFromHeader,
                accessTokenSecret
            );
            if (!decoded) {
                return res.status(400).send("Access token kh??ng h???p l???.");
            }

            const email = decoded.payload.email; // L???y username t??? payload

            const user = await User.findOne({email: email});
            console.log(user)
            if (!user) {
                return res.status(401).send("User kh??ng t???n t???i.");
            }

            if (refreshTokenFromBody !== user.refreshToken) {
                return res.status(400).send("Refresh token kh??ng h???p l???.");
            }

            // T???o access token m???i
            const dataForAccessToken = {
                email,
            };

            const accessToken = await authMethod.generateToken(
                dataForAccessToken,
                accessTokenSecret,
                accessTokenLife
            );
            if (!accessToken) {
                return res
                    .status(400)
                    .send(
                        "T???o access token kh??ng th??nh c??ng, vui l??ng th??? l???i."
                    );
            }
            return res.json({
                accessToken,
            });
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
};

module.exports = authController;
