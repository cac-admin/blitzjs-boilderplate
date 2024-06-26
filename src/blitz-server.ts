import { setupBlitzServer } from "@blitzjs/next"
import {RpcServerPlugin} from "@blitzjs/rpc"
import {
  AuthServerPlugin,
  PrismaStorage,
  simpleRolesIsAuthorized,
} from "@blitzjs/auth"
import db from "../prisma"
import { authConfig } from "./blitz-auth-config"

export const { gSSP, gSP, api, useAuthenticatedBlitzContext, invoke, getBlitzContext } = setupBlitzServer({
  plugins: [
    AuthServerPlugin({
      ...authConfig,
      storage: PrismaStorage(db),
      isAuthorized: simpleRolesIsAuthorized,
    }),
    RpcServerPlugin({})
  ],
})