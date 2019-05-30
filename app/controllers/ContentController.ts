import {Controller, Get, PathParams, Post, BodyParams} from "@tsed/common";
import Markdown from './MarkdownController'

@Controller("/content")
export class ContentController {
  @Get("/:contentType")
  getAllContent(@PathParams("contentType") contentType: string) {
    let posts = new Markdown('content', contentType);
    return posts.getFiles();
  }

  @Post("/:contentType/:postName")
  store(@BodyParams() post: any, @PathParams("contentType") ContentType: string, @PathParams("postName") postName: string) {
    let postWrite = new Markdown('content', ContentType, postName);
    return postWrite.writeFile(post);
  }
}