import {createClient} from "redis";
import { RateLimiterRedis } from "rate-limiter-flexible";
import { NextFunction, Request, Response } from "express";

import { AppError } from "@shared/erros/AppError";

const redisClient = createClient ({
    socket: {
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT)
    },
    legacyMode: true,
});

redisClient.connect();

const limiter = new RateLimiterRedis({
    storeClient: redisClient,
    keyPrefix: "rateLimiter",
    points: 5,
    duration: 5
});


export default async function rateLimiter(
    request: Request,
    response: Response,
    next: NextFunction
): Promise<void> {
    try {

        await limiter.consume(request.ip);
        next();
    } catch (err) {
        throw new AppError("Too many requests", 429)
    }
}


