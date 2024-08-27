import Dashboards from '../pages/Dashboards';
import Events from '../pages/Events';
import BookSettings from '../pages/BookSettings';
import OrderSettings from '../pages/OrderSettings';
import UserManagement from '../pages/UserManagement';
import SignInPage from '../pages/SignIn';
import config from '../config';
import EventsLayouts from '../components/Layouts/EventsLayouts';
const publicRoutes = [
    { path: config.routes.dashboards, component: Dashboards },
    { path: config.routes.events, component: Events, layout: EventsLayouts },
    { path: config.routes.bookSettings, component: BookSettings },
    { path: config.routes.orderSettings, component: OrderSettings },
    { path: config.routes.userManagement, component: UserManagement },
    { path: config.routes.signin, component: SignInPage, layout: null },
];

const privateRoutes = [];
export { publicRoutes, privateRoutes };
