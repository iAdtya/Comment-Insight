import winston from "winston";

winston.addColors({
  error: "red",
  warn: "yellow",
  info: "blue",
  success: "green",
});

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.colorize({ all: true }), // This will colorize the logs
    winston.format.timestamp(),
    winston.format.align(),
    winston.format.printf(
      (info: any) => `${info.timestamp} ${info.level}: ${info.message}`
    )
  ),
  defaultMeta: { service: "user-service" },
  transports: [
    new winston.transports.File({ filename: "error.log", level: "error" }),
    new winston.transports.File({ filename: "combined.log" }),
  ],
});

if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    })
  );
}

export default logger;
