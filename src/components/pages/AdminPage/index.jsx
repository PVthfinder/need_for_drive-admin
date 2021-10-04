import React from 'react';
import { useSelector } from 'react-redux';
import { Switch, Route } from 'react-router-dom';

import Header from '../../layouts/Header';
import Footer from '../../layouts/Footer';
import Menu from '../../layouts/Menu';
import RequestError from '../../RequestError';
import Orders from '../../Orders';
import OrderItem from '../../OrderItem';
import CarsList from '../../CarsList';
import CarItem from '../../CarsList/CarItem';

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
                        : (
                            <section className="admin_content">
                                <Switch>
                                    <Route exact path="/admin/orders" component={Orders} />
                                    <Route path="/admin/orders/:id" component={OrderItem} />
                                    <Route exact path="/admin/cars" component={CarsList} />
                                    <Route path="/admin/cars/:id" component={CarItem} />
                                </Switch>
                            </section>
                        )
                    }
                </main>
                <Footer/>
            </div>
        </>
    );
}

export default AdminPage;
