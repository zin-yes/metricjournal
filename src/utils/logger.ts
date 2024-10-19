export class Logger {
  constructor(private readonly context: string) {
    this.context = context;
  }

  private static logMessage(
    type: "log" | "debug" | "info" | "error",
    context: string,
    messages: unknown[]
  ): void {
    if (
      process.env.NODE_ENV !== "production" ||
      type === "log" ||
      type === "info" ||
      type === "error"
    ) {
      const prefix = `[${new Date().toLocaleString()}] [${type.toUpperCase()} | ${context}] `;
      console.log(prefix, ...messages);
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
