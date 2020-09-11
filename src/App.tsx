import React, { FunctionComponent, lazy, Suspense } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Layout from "./hoc/layouts/layout";
import BurgerBuilder from "./containers/burgerBuilder/burgerBuilder";
import { connect } from "react-redux";
import { RootState } from "./models/rootState.model";
import Spinner from "./components/UI/Spinner/Spinner";

// Lazy Imports
const Orders = lazy(() => import("./containers/orders/orders"));
const BurgerCheckout = lazy(() => import("./containers/BurgerCheckout/burgerCheckout"));
const Logout = lazy(() => import("./containers/auth/logout/logout"));
const Auth = lazy(() => import('./containers/auth/auth'));

interface AppProps {
  isAuth: boolean;
}

const absoluteCenter = {height:'80vh', display:'flex', alignItems:'center'};

const FullHWSpinner = () => <div style={absoluteCenter}><Spinner /></div>;

export const App: FunctionComponent<AppProps> = ({ isAuth }) => {
  const routeGuard = (Component: any) => {
    return isAuth ? <Component /> : <Redirect to="/" />;
  };

  return (
    <BrowserRouter>
      <Layout>
        <Suspense fallback={<FullHWSpinner />}>
          <Switch>
            <Route path="/auth" component={Auth} />
            <Route path="/logout">{routeGuard(Logout)}</Route>
            <Route path="/my-orders">{routeGuard(Orders)}</Route>
            <Route path="/checkout">{routeGuard(BurgerCheckout)}</Route>
            <Route path="/" exact component={BurgerBuilder} />
          </Switch>
        </Suspense>
      </Layout>
    </BrowserRouter>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    isAuth: state.auth.token !== "",
  };
};

export default connect(mapStateToProps)(App);
