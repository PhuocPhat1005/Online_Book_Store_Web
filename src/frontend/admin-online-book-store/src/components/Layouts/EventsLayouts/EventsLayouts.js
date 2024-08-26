import Header from '../DefaultLayout/Header';
import Sidebar from '../SideBar';
function EventsLayouts({ children }) {
    return (
        <div>
            <Header />
            <Sidebar />
            <div>{children}</div>
        </div>
    );
}

export default EventsLayouts;
