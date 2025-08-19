import type { Response } from "express";

export function setAuthCookie(res: Response, token: string, user: any) {
  res.cookie("auth_token", token, {
    httpOnly: true,
    secure: true,           
    sameSite: "none",        
    maxAge: 3600000,         
  });
  return { user };
}
