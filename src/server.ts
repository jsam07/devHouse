import App from './app/app';
import HomeRoute from './routes/Home.route';
import AuthenticationRoute from './routes/Authentication.route';
import PostRoute from './routes/Post.route';
import SearchRoute from './routes/Search.route';

const app: App = new App([new HomeRoute(), new AuthenticationRoute(), new PostRoute(), new SearchRoute()]);

app.listen();
