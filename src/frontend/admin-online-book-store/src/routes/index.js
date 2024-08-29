import Dashboards from '../pages/Dashboards';
import Events from '../pages/Events';
import BookSettings from '../pages/BookSettings';
import AddBook from '../pages/AddBook';
import OrderSettings from '../pages/OrderSettings';
import OrderManagement from '../pages/OrderManagement';
import UserManagement from '../pages/UserManagement';
import SignInPage from '../pages/SignIn';
import config from '../config';
import EventsLayouts from '../components/Layouts/EventsLayouts';
const publicRoutes = [
    { path: config.routes.dashboards, component: Dashboards },
    { path: config.routes.events, component: Events, layout: EventsLayouts },
    { path: config.routes.bookSettings, component: BookSettings },
    { path: config.routes.addBook, component: AddBook, layout: null },
    { path: config.routes.orderSettings, component: OrderSettings },
    { path: config.routes.orderManagement, component: OrderManagement, layout: null  },
    { path: config.routes.userManagement, component: UserManagement },
    { path: config.routes.signin, component: SignInPage, layout: null },
];

const privateRoutes = [];
export { publicRoutes, privateRoutes };
