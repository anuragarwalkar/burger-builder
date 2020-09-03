import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Layout from './hoc/layouts/layout';
import BurgerBuilder from './containers/burgerBuilder/burgerBuilder';
import BurgerCheckout from './containers/burgerCheckout/burgerCheckout';


function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Switch>
        <Route path='/' exact component={BurgerBuilder}></Route>
        <Route path='/checkout' component={BurgerCheckout}></Route>
        </Switch>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
