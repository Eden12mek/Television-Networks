const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const handleNewUser = async (req, res) => {
    const { username, password, phoneNum, email } = req.body;
    if (!username || !password) {
        return res.status(400).json({ "message": "Incomplete data form" });
    }

    if (password.length < 8) {
        return res.status(401).json({ "message": "Password is not strong enough" });
    }

    try {
        const hashedPwd = await bcrypt.hash(password, 10);
        const result = await prisma.user.create({
            data: {
                username,
                password: hashedPwd,
                email,
                phoneNum,
                imgUrl:"fghasgd",
                
            }
        });
        console.log(result);
        return res.status(201).json({ "success": "New user created" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ "message": "Server problem" });
    }
};

module.exports = {
    handleNewUser
};
