import React from "react";
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/home';
import About from '../pages/about';
import RootLayout from '../layouts/root';
import Counter  from '../features/counter/counter';
import Posts from "../pages/posts";
import Login from "../pages/login";


export const App = () => {

  return (
    <div className="App">
      <Routes>
          <Route element={ <RootLayout/> }>
           <Route  path='/' element={ <Home/> } />
           <Route  path='/about' element={ <About/> } />
           <Route  path='/posts' element={ <Posts/> } />
           <Route  path='/login' element={ <Login/> } />
          </Route>
      </Routes>
    </div>
  );
};
