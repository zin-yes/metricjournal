export class Logger {
  constructor(private readonly context: string) {
    this.context = context;
  }

  private static logMessage(
    type: "log" | "debug" | "info" | "error",
    context: string,
    messages: unknown[]
  ): void {
    // Implement centralized logging
    const logData = {
      timestamp: new Date().toISOString(),
      level: type.toUpperCase(),
      context,
      messages
    };

    // In production, send logs to a centralized logging service
    if (process.env.NODE_ENV === "production") {
      // TODO: Replace with actual centralized logging service
      // For example: sendToCentralizedLoggingService(logData);
      console.log("Sending to centralized logging service:", JSON.stringify(logData));
    } else {
      // In development, log to console
      const prefix = `[${logData.timestamp}] [${logData.level} | ${logData.context}] `;
      console.log(prefix, ...logData.messages);
    }

    // Always log errors, regardless of environment
    if (type === "error") {
      const prefix = `[${logData.timestamp}] [${logData.level} | ${logData.context}] `;
      console.error(prefix, ...messages);
    }
  }

  public log(...messages: unknown[]): void {
    Logger.logMessage("log", this.context, messages);
  }

  public debug(...messages: unknown[]): void {
    Logger.logMessage("debug", this.context, messages);
  }

  public error(...messages: unknown[]): void {
    Logger.logMessage("error", this.context, messages);
  }

  public info(...messages: unknown[]): void {
    Logger.logMessage("info", this.context, messages);
  }

  public static log(context: string, ...messages: unknown[]): void {
    this.logMessage("log", context, messages);
  }

  public static debug(context: string, ...messages: unknown[]): void {
    this.logMessage("debug", context, messages);
  }

  public static error(context: string, ...messages: unknown[]): void {
    this.logMessage("error", context, messages);
  }

  public static info(context: string, ...messages: unknown[]): void {
    this.logMessage("info", context, messages);
  }
}
