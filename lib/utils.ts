import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import * as crypto from "crypto";
import * as jose from "jose";
import * as dotenv from "dotenv";
import dotenvExpand from 'dotenv-expand';
dotenvExpand.expand(dotenv.config());

const saltRounds = 10;
const ALGORITHM = "HS256";
const SECRET_KEY = new TextEncoder().encode('mySecretKey')
const REFRESH_SECRET_KEY = new TextEncoder().encode('myRefreshSecretKey');

if (!(process.env.SERVER_ORIGIN_URL && process.env.CLIENT_ORIGIN_URL)) {
  throw new Error("Missing required environment variables");
}

const CLIENT_ORIGIN_URL = process.env.CLIENT_ORIGIN_URL;
const SERVER_ORIGIN_URL = process.env.SERVER_ORIGIN_URL;

export function bCryptGenPass(password: string) {
  const salt = bcrypt.genSaltSync(saltRounds)
  const hash = bcrypt.hashSync(password, salt)
  return hash
}

export function validPassword(password: string, salt: string, hash: string) {
  const hashVerify = crypto.pbkdf2Sync(password, salt, 10000, 64, "sha512").toString("hex");
  return hash === hashVerify;
}


export const signJwt = async (payload: any, kindOf: "access" | "refresh", expire: string) => {
  const PRIV_KEY = kindOf === "access"
    ? SECRET_KEY
    : REFRESH_SECRET_KEY
  return await new jose.SignJWT(payload)
    .setProtectedHeader({ alg: ALGORITHM })
    .setIssuer(SERVER_ORIGIN_URL)
    .setAudience(CLIENT_ORIGIN_URL)
    .setIssuedAt()
    .setExpirationTime(expire)
    .sign(PRIV_KEY)
}

export const verifyJwt = async (jwt: string, publicKey: Uint8Array) => {
  return await jose.jwtVerify(jwt, publicKey, {
    issuer: SERVER_ORIGIN_URL,
    audience: CLIENT_ORIGIN_URL,
    algorithms: [ALGORITHM]
  })
}

export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  const accessToken = req.session.user?.accessToken;
  if (accessToken && accessToken.match(/\S+\.\S+\.\S+/) !== null) {
    try {
      const { payload } = await verifyJwt(accessToken, SECRET_KEY);
      if (payload.sub) {
        req.user_email = payload?.sub;
      }
      next();
    } catch (error) {
      res.status(403).json("Token is not valid!");
    }
  } else {
    res.status(401).json("You are not authenticated!")
  }
}