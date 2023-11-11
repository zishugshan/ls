import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import ArticleForm from './components/ArticleForm';
import ArticleView from './components/ArticleView';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
    <Route path="/" element={<ArticleForm />} />
    <Route path="link/:link_name" element={<ArticleView />} /></>
  )
);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
