import {ServerLoader, ServerSettings, GlobalAcceptMimesMiddleware} from "@tsed/common";
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const compress = require('compression');
const methodOverride = require('method-override');
const rootDir = __dirname;

@ServerSettings({
  rootDir,
  httpPort: "127.0.0.1:3000",
  httpsPort: false,
  mount: {
    "/api/v1": [
      "${rootDir}/app/controllers/**/*.ts",
    ]
  },
  acceptMimes: ["application/json"]
})
export class Server extends ServerLoader {
  /**
   * This method let you configure the express middleware required by your application to works.
   * @returns {Server}
   */
  public $onMountingMiddlewares(): void|Promise<any> {
      this
        .use(GlobalAcceptMimesMiddleware)
        .use(cookieParser())
        .use(compress({}))
        .use(methodOverride())
        .use(bodyParser.json())
        .use(bodyParser.urlencoded({
          extended: true
        }));

      return null;
  }
}