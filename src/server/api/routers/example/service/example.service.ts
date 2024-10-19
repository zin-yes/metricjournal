import { Logger } from "@/utils/logger";
import { exampleRepository } from "../repository/example.repository";

class ExampleService {
  private readonly logger = new Logger(ExampleService.name);

  public async example(): Promise<ExampleResult> {
    this.logger.info("Example service example() called");

    return exampleRepository.example();
  }
}

export const exampleService = new ExampleService();
