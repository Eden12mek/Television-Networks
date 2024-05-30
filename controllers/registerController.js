const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const handleNewUser = async (req, res) => {
    try {
        const { username, password, phoneNum, email, role } = req.body;

        if (!username || !password || !role) {
            return res.status(400).json({ "message": "Incomplete data form" });
        }

        if (password.length < 8) {
            return res.status(401).json({ "message": "Password is not strong enough" });
        }

        const hashedPwd = await bcrypt.hash(password, 10);
        const newUser = await prisma.user.create({
            data: {
                username,
                password: hashedPwd,
                email,
                phoneNum,
                imgUrl: "fghasgd",
                role,
            }
        });

        console.log(newUser);
        return res.status(201).json({ "message": "New user created", user: newUser });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ "message": "Server error", "error": err.message });
    }
};

module.exports = {
    handleNewUser
};
