import React from 'react';
import Layout from './components/layouts/layout';
import BurgerBuilder from './containers/burgerBuilder/burgerBuilder';
// import logo from './logo.svg';
// import appStyle from './App.module.css';


function App() {
  return (
    <div>
      <Layout>
        <BurgerBuilder></BurgerBuilder>
      </Layout>
    </div>
  );
}

export default App;
