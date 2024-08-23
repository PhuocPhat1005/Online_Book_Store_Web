import SignInPage from '../pages/SignIn';
import Dashboard from '../pages/Dashboard';
import config from '../config';

const publicRoutes = [
    { path: config.routes.signin, component: SignInPage, layout: null },
    { path: config.routes.dashboard, component: Dashboard }
];

const privateRoutes = [];
export { publicRoutes, privateRoutes };
