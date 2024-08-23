import SignInPage from '../pages/SignIn';
import config from '../config';

const privateRoutes = [
    { path: config.routes.signin, component: SignInPage, layout: null }
];

export { privateRoutes };
