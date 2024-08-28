import Header from '../DefaultLayout/Header';
import Sidebar from '../DefaultLayout/SideBar';
import EventsHeader from '../DefaultLayout/EventsHeader';
import React from 'react';

function EventsLayouts({ children }) {
    return (
        <div>
            <EventsHeader />
            <Header />
            <Sidebar />
            <div>{children}</div>
        </div>
    );
}

export default EventsLayouts;
