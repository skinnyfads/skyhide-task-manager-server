import { Request, Response, NextFunction } from "express";

function log(req: Request, res: Response, next: NextFunction) {
  res.on("finish", function () {
    console.log(req.method, decodeURI(req.originalUrl), res.statusCode, res.statusMessage);
  });
  next();
}

export default log;
