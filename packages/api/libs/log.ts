import * as winston from "winston";

const getFilePath = (module: NodeModule) => {
  // Add filename in log statements
  return module.filename.split("/").slice(-2).join("/");
};

let logger: winston.Logger = winston.createLogger({
  transports: [
    new winston.transports.File({
      level: "info",
      filename: process.cwd() + "/logs/all.log",
      handleExceptions: true,
      format: winston.format.json(),
      maxsize: 5242880, //5mb
      maxFiles: 2,
    }),
    new winston.transports.Console({
      level: "debug",
      handleExceptions: true,
      format: winston.format.combine(
        winston.format.splat(),
        winston.format.label({ label: getFilePath(module) }),
        winston.format.colorize(),
        winston.format.printf((nfo) => {
          return `${nfo.level}: [${nfo.label}] ${nfo.message}`;
        })
      ),
    }),
  ],
  exitOnError: false,
});

export default logger;
