const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const handleAuth = async (req, res) => {
    console.log(req.body);
    const { phoneNum, password } = req.body; // Ensure this matches the frontend

    if (!phoneNum || !password) {
        return res.status(400).json({ "message": "Both phone number and password are required" });
    }

    try {
        const foundUser = await prisma.user.findUnique({ where: { phoneNum: phoneNum } });
        if (!foundUser) {
            return res.status(400).json({ "message": "Phone Number is not registered. Please sign up first" });
        }

        const match = await bcrypt.compare(password, foundUser.password);
        if (match) {
            const access_token = jwt.sign(
                {
                    "userInfo": {
                        "username": foundUser.username,
                        "id": foundUser.id,
                        "role": foundUser.role // Assuming you have a role property
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '1d' }
            );

            const refresh_token = jwt.sign(
                { "username": foundUser.username },
                process.env.REFRESH_TOKEN_SECRET,
                { expiresIn: '1d' }
            );

            await prisma.user.update({
                where: { id: foundUser.id },
                data: { refreshToken: refresh_token }
            });

            res.cookie('jwt', refresh_token, { httpOnly: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 }); // secure:true in production
            res.json({ access_token, foundUser });
        } else {
            res.status(401).json({ "message": "Wrong password" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ "message": "Server error" });
    }
}

module.exports = { handleAuth };
