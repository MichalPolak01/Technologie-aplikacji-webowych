import UserController from "./controllers/user.controller";
import App from "./app";
import IndexController from "./controllers/IndexController";
import PostController from "./controllers/data.controller";

const app: App = new App([
    new UserController(),
    new IndexController(),
    new PostController()
]);

app.listen();