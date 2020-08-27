import React from 'react';
import Layout from './components/layouts/layout';
import BurgerBuilder from './containers/burgerBuilder/burgerBuilder';
// import logo from './logo.svg';
// import appStyle from './App.module.css';


function App() {
  return (
      <Layout>
        <BurgerBuilder></BurgerBuilder>
      </Layout>
  );
}

export default App;
