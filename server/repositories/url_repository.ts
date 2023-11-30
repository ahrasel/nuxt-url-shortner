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
}
