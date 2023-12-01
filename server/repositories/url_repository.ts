import Url, { IUrl } from "../models/ulr";
import { Repository } from "./repository";
import { H3Event, EventHandlerRequest } from "h3";

export class UrlRepository extends Repository {
  // get all urls
  public allUrls = async (event: any) => {
    await this.auth(event);

    const urls = Url.find({});

    return urls;
  };

  // create url
  public createUrl = async (event: H3Event<EventHandlerRequest>) => {
    await this.auth(event);

    const body = await readBody(event);

    const url = body.url;
    const slug = this.generateUniqueCode();
    const user = this.userId;

    const newUrl: IUrl = {
      url,
      slug,
      user,
      clicks: 0,
    };

    const createdUrl = await Url.create(newUrl);

    return createdUrl;
  };

  public getUrl = async (event: H3Event) => {
    await this.auth(event);

    const slug = getRouterParam(event, "code");

    const url = await Url.findOne({ slug });

    if (!url) {
      throw new Error("Url not found");
    }

    return url;
  };

  public deleteUrl = async (event: H3Event<EventHandlerRequest>) => {
    await this.auth(event);

    const slug = getRouterParam(event, "code");

    const url = await Url.deleteOne({ slug });

    if (!url) {
      throw new Error("Url not found");
    }

    if (url.deletedCount === 0) {
      throw new Error("Url not found");
    }

    return "Url deleted successfully";
  };
}
