import {Controller, Get} from "@tsed/common";

@Controller("/")
export class HomeController {
  @Get()
  findAll(): string {
    return "This action returns all calendars";
  }
}