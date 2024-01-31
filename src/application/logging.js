import winston from "winston";

export const logger = winston.createLogger({
    level: "info",
    fromat: winston.format.json(),
    transports : [
        new winston.transports.Console({})
    ]
});