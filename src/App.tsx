import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Layout from './hoc/Layouts/layout';
import BurgerCheckout from './containers/BurgerCheckout/BurgerCheckout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';


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
