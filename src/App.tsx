import React from 'react';
import Layout from './hoc/layouts/layout';
import BurgerBuilder from './Containers/burgerBuilder/burgerBuilder';

function App() {
  return (
      <Layout>
        <BurgerBuilder></BurgerBuilder>
      </Layout>
  );
}

export default App;
