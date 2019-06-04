import {Controller, Get, PathParams, Post, BodyParams} from "@tsed/common";
import Markdown from './MarkdownController'

@Controller("/contenttype")
export class ContenttypeController {
  @Get("/:contentType")
  getAllContent(@PathParams("contentType") contentType: string) {
    let posts = new Markdown('archetypes', '', contentType);
    return posts.getFiles();
  }

  @Post("/:name")
  store(@BodyParams() post: any, @PathParams("name") name: string) {
    let postWrite = new Markdown('archetypes', '', name);
    return postWrite.writeFile(post);
  }
}