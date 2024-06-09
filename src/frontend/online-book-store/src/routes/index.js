import SignInPage from '~/pages/SignIn';
import SignUpPage from '~/pages/SignUp';
import HomePage from '~/pages/Home';
import ShopBooksPage from '~/pages/ShopBooks';
import ContactPage from '~/pages/Contact/Contact';
import AboutUsPage from '~/pages/AboutUs';
import config from '~/config';

const publicRoutes = [
    { path: config.routes.signin, component: SignInPage, layout: null },
    { path: config.routes.signup, component: SignUpPage, layout: null },
    { path: config.routes.home, component: HomePage },
    { path: config.routes.shopbooks, component: ShopBooksPage },
    { path: config.routes.contact, component: ContactPage },
    { path: config.routes.about, component: AboutUsPage },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
