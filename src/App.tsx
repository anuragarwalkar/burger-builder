import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Layout from './hoc/layouts/layout';
import BurgerBuilder from './containers/burgerBuilder/burgerBuilder';
import BurgerCheckout from './containers/burgerCheckout/burgerCheckout';
import Orders from './containers/orders/orders';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route path='/checkout' component={BurgerCheckout} />
          <Route path='/my-orders' component={Orders} />
          <Route path='/' exact component={BurgerBuilder} />
        </Switch>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
