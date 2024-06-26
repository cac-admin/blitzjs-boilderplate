
import { AuthenticationError } from "blitz";
import db from "../../../prisma";
import { api } from "@/blitz-server";
import { Role } from "../../../types";
// import { SecurePassword } from "@blitzjs/auth"

export const authenticateUser = async (
    email: string,
    password: string
) => {
    const user = await db.user.findFirst({
        where: {email}
    })
    if (!user) throw new AuthenticationError
    // const result = await SecurePassword.verify(
    //     user.hashedPassword,
    //     password
    // )
    return user
}

const login = api(async (req, res, ctx) => {
    const email = req.body.email
    const password = req.body.password
    const user = await authenticateUser(email, password);

    await ctx.session.$create({
        email: user.email,
        userId: user.id,
        name: user.name,
        role: user.role,
    })
    res.status(200).json({email: req.query.email, userId: ctx.session.userId})
})

export default login