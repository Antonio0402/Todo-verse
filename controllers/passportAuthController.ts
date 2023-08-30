import { Request, Response, NextFunction } from "express";

export const loginFailure = (_req: Request, res: Response, _next: NextFunction) => {
  res.status(401).json({
    success: false,
    message: "Your password or username are incorrect. Please check again"
  })
}

export const loginSuccess = (req: Request, res: Response, _next: NextFunction) => {
  if (req.user) {
    res.status(200).json({
      success: true,
      message: "You are authenticated",
      user: req.user
    })
  } else {
    res.status(401).json({
      success: false,
      message: "You are not authenticated",
    })
  }
}
