import HomePage from '~/pages/Home';
import ShopBooksPage from '~/pages/ShopBooks';
import AboutUsPage from '~/pages/AboutUs';

const publicRoutes = [
    { path: '/', component: HomePage },
    { path: '/shopbooks', component: ShopBooksPage },
    { path: '/aboutus', component: AboutUsPage },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
