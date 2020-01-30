import {Controller, Get, PathParams, Post, BodyParams, QueryParams} from "@tsed/common";
import Markdown from './MarkdownController'
const { readdirSync, existsSync } = require('fs')

@Controller("/contenttype")
export class ContenttypeController {
  @Get()
  getContentTypes(@QueryParams("language") language: string) {
    let dir  = './content';
    if (language) {
      dir = dir + '/' + language
    }

    if (existsSync(dir)) {
      return readdirSync(dir, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory() && dirent.name != 'spanish' && dirent.name != 'english')
      .map(dirent => dirent.name)
    } else {
      return []
    }

  }
  
  @Get("/:contentType")
  getAllContent(@PathParams("contentType") contentType: string) {
    let posts = new Markdown('archetypes', '', contentType);
    return posts.getFiles();
  }

  @Post("/:name")
  store(@BodyParams() post: any, @PathParams("name") name: string, @QueryParams("language") language: string) {
    let postWrite = new Markdown('archetypes', '', name);
    return postWrite.writeFile(post, language);
  }
}