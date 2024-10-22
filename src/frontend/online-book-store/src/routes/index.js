import SignInPage from '~/pages/SignIn';
import SignUpPage from '~/pages/SignUp';
import HomePage from '~/pages/Home';
import ShopBooksPage from '~/pages/ShopBooks';
import ContactPage from '~/pages/Contact/Contact';
import AboutUsPage from '~/pages/AboutUs';
import ForgotPasswordPage from '~/pages/ForgotPassword';
import CartPage from '~/pages/CartPage';
import ProfilePage from '~/pages/Profile';
import DetailsBookPage from '~/pages/DetailsBook';
import OrderPage from '~/pages/Order';
import GuestHome from '../pages/GuestHome/GuestHome';
import GuestShopBooks from '../pages/GuestShopBooks/GuestShopBooks';
import GuestContact from '../pages/GuestContact/GuestContact';
import GuestAbout from '../pages/GuestAbout/GuestAbout';
import GuestDetailsBook from '~/pages/GuestDetailsBook/GuestDetailsBook';

import HeaderOnly from '~/components/Layouts/HeaderOnly';

import config from '~/config';

const publicRoutes = [
    { path: config.routes.signin, component: SignInPage, layout: null },
    { path: config.routes.forgotpassword, component: ForgotPasswordPage, layout: null },
    { path: config.routes.signup, component: SignUpPage, layout: null },
    { path: config.routes.home, component: HomePage },
    { path: config.routes.shopbooks, component: ShopBooksPage },
    { path: config.routes.contact, component: ContactPage },
    { path: config.routes.about, component: AboutUsPage },
    { path: config.routes.cart, component: CartPage, layout: HeaderOnly },
    { path: config.routes.profile, component: ProfilePage, layout: HeaderOnly },
    { path: config.routes.detailsbook, component: DetailsBookPage },
    { path: config.routes.order, component: OrderPage, layout: HeaderOnly },
    { path: config.routes.guesthome, component: GuestHome },
    { path: config.routes.guestshopbooks, component: GuestShopBooks },
    { path: config.routes.guestcontact, component: GuestContact },
    { path: config.routes.guestabout, component: GuestAbout },
    { path: config.routes.guestdetailsbook, component: GuestDetailsBook },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
