import React from 'react';

import Header from '../../layouts/Header';
import Footer from '../../layouts/Footer';
import Menu from '../../layouts/Menu';

import './AdminPage.scss';

function AdminPage() {
    return (
        <>
            <Menu/>
            <div className="app_content">
                <Header/>
                <main>Hello</main>
                <Footer/>
            </div>
        </>
    );
}

export default AdminPage;
