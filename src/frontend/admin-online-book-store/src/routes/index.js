import SignInPage from '../pages/SignIn';
import Dashboards from '../pages/Dashboards';
import config from '../config';

const publicRoutes = [
    { path: config.routes.signin, component: SignInPage, layout: null },
    { path: config.routes.dashboard, component: Dashboards }
];

const privateRoutes = [];
export { publicRoutes, privateRoutes };
