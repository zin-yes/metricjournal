import { Logger } from "@/utils/logger";

class ExampleRepository {
  private readonly logger = new Logger(ExampleRepository.name);

  public async example(): Promise<ExampleResult> {
    this.logger.info("Example repository example() called");

    return new Promise((resolve) => resolve({ hello: "world" }));
  }
}

export const exampleRepository = new ExampleRepository();
