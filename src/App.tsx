import screen from './util/Screen';
import style from './App.module.css';
import { Route, Routes } from 'react-router';
import { init } from '@noriginmedia/norigin-spatial-navigation';
import React from 'react';
import withSuspense from './HOC/withSuspense';
import withErrorBoundary from './HOC/withErrorBoundary';
import { AliveScope } from 'react-activation';
import withKeepAlive from './HOC/withKeepAlive';

const HomeScreen = withKeepAlive(withSuspense(React.lazy(() => import('./screens/HomeScreen'))));
const DetailScreen = withSuspense(React.lazy(() => import('./screens/DetailScreen')));

screen.init({
  height: 1080,
  width: 1920,
  fontSize: 50,
  animationDuration: 0.2
});

init({
  // options
});

const App = () => {
  return (
    <AliveScope>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/detail" element={<DetailScreen />} />
      </Routes>
    </AliveScope>
  );
};

export default withErrorBoundary(App);
