import React from 'react';
import { useSelector } from 'react-redux';

import Header from '../../layouts/Header';
import Footer from '../../layouts/Footer';
import Menu from '../../layouts/Menu';
import RequestError from '../../RequestError';

import './AdminPage.scss';

function AdminPage() {
    const {isError} = useSelector((state) => state.requestError);

    return (
        <>
            <Menu/>
            <div className="app_content">
                <Header/>
                <main>
                    {
                        isError
                        ? <RequestError/>
                        : 'Hello'
                    }
                </main>
                <Footer/>
            </div>
        </>
    );
}

export default AdminPage;
