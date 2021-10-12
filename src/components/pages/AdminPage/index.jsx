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
import CarItem from '../../CarItem';
import PointsList from '../../PointsList';
import CategoriesList from '../../CategoriesList';
import CitiesList from '../../CitiesList';
import PointItem from '../../PointItem';
import CategoryItem from '../../CategoryItem';
import CityItem from '../../CityItem';

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
                                    <Route exact path="/admin/order" component={Orders} />
                                    <Route path="/admin/order/:id" component={OrderItem} />
                                    <Route exact path="/admin/car" component={CarsList} />
                                    <Route path="/admin/car/:id" component={CarItem} />
                                    <Route path="/admin/createCar" component={CarItem} />
                                    <Route exact path="/admin/point" component={PointsList} />
                                    <Route path="/admin/point/:id" component={PointItem} />
                                    <Route path="/admin/createPoint" component={PointItem} />
                                    <Route exact path="/admin/category" component={CategoriesList} />
                                    <Route path="/admin/category/:id" component={CategoryItem} />
                                    <Route path="/admin/createCategory" component={CategoryItem} />
                                    <Route exact path="/admin/city" component={CitiesList} />
                                    <Route path="/admin/city/:id" component={CityItem} />
                                    <Route path="/admin/createCity" component={CityItem} />
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
