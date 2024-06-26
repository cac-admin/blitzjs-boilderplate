// import { SecurePassword } from "@blitzjs/auth"
import { api } from "../../blitz-server"
import db from "../../../prisma"
import { Role } from "../../../types"

const signup = api(async (req, res, ctx) => {
  // TODO: you can add a runtime validation (e.g. with zod) to ensure password length

  // SecurePassword not working currently
  // const hashedPassword = await SecurePassword.hash(req.body.password)

  const email = req.body.email
  const name = req.body.name
  const hashedPassword = req.body.password
  const role: Role = req.body.role
  const user = await db.user.create({
    data: { email, name, hashedPassword, role },
    select: { id: true, name: true, email: true, role: true },
  })
  await ctx.session.$create({
    userId: user.id,
    email: user.email,
    name: user.name,
    role: user.role as Role,
  })
  res
    .status(200)
    .json({ userId: ctx.session.userId, ...user, email: req.query.email })
})

export default signup