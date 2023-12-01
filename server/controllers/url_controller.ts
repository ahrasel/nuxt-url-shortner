import { UrlRepository } from "../repositories/url_repository";
import { BaseController } from "./controller";
import { H3Event, EventHandlerRequest } from "h3";

class UrlController extends BaseController {
  private repository: UrlRepository;

  constructor() {
    super();
    this.repository = new UrlRepository();
  }

  public index = async (event: H3Event) => {
    try {
      const urls = await this.repository.allUrls(event);
      return this.successResponse(urls, "All urls get successfully", 200);
    } catch (error: any) {
      return this.errorResponse(error.message, 500);
    }
  };

  public create = async (event: H3Event) => {
    try {
      const url = await this.repository.createUrl(event);

      return this.successResponse(url, "Url created successfully", 200);
    } catch (error: any) {
      return this.errorResponse(error.message, 500);
    }
  };

  public show = async (event: H3Event) => {
    try {
      const url = await this.repository.getUrl(event);

      return this.successResponse(url, "Url get successfully", 200);
    } catch (error: any) {
      return this.errorResponse(error.message, 500);
    }
  };

  public delete = async (event: H3Event) => {
    try {
      const url = await this.repository.deleteUrl(event);

      return this.successResponse(url, "Url deleted successfully", 200);
    } catch (error: any) {
      return this.errorResponse(error.message, 500);
    }
  };

  public click = async (event: H3Event) => {
    try {
      const url = await this.repository.clickUrl(event);

      return this.successResponse(url, "Url clicked successfully", 200);
    } catch (error: any) {
      return this.errorResponse(error.message, 500);
    }
  };
}

export default new UrlController();
