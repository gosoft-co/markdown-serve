import {Controller, Get, PathParams, Post, BodyParams, QueryParams} from "@tsed/common";
import Markdown from './MarkdownController'

const path = require('path');
const fs = require('fs');

@Controller("/content")
export class ContentController {
  @Get("/:contentType")
  getAllContent(@PathParams("contentType") contentType: string,) {
    let posts = new Markdown('content', contentType);
    return posts.getFiles();
  }

  @Post("/:contentType/:postName")
  store(
    @BodyParams() post: any, 
    @PathParams("contentType") ContentType: string, 
    @PathParams("postName") postName: string,
    @QueryParams("language") language: string
  ) {
    let postWrite = new Markdown('content', ContentType, postName);
    return postWrite.writeFile(post, language);
  }
}