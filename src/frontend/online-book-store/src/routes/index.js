import HomePage from '~/pages/Home';
import ShopBooksPage from '~/pages/ShopBooks';

const publicRoutes = [
    { path: '/', component: HomePage },
    { path: '/shopbooks', component: ShopBooksPage },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
