# import jwt from 'jsonwebtoken';
# import { Request, Response, NextFunction } from 'express';
# import { IDecodedToken } from '../types/interfaces';

# export const verifyToken = (
# 	req: Request,
# 	res: Response,
# 	next: NextFunction,
# ) => {
# 	if (!req.headers.authorization) {
# 		return res
# 			.status(401)
# 			.send({ success: false, message: 'Unauthorized Access!' });
# 	}

# 	const token = req.headers.authorization.split(' ')[1];
# 	const tokenSecret = process.env.TOKEN_SECRET as string;

# 	jwt.verify(token, tokenSecret, (error, decoded) => {
# 		if (error) {
# 			return res
# 				.status(401)
# 				.send({ success: false, message: 'Unauthorized Access!' });
# 		}
# 		(req as any).user = decoded as IDecodedToken;
# 		next();
# 	});
# };

# "@ > src/middlewares/verify.ts

# Generate 64 Bit Secret Hex Code
@"
const crypto = require("crypto");

const secret = crypto.randomBytes(64).toString("hex");

console.log(secret);
