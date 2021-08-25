import React from 'react';
import { hot } from 'react-hot-loader/root';

import Layout from './components/Layout';
import Extractor from './components/Extractor';

const App = () => (
  <Layout>
    <>
    <h1 className="md:text-6xl text-2xl text-center">Image Extractor</h1>
    <Extractor />
    </>
  </Layout>
);

export default hot(App);
