import React, { useState, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Header } from "./common/header/header";
import { Main } from "./components/main/main";
import { BrowserRouter, Navigate, useLocation } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import { About } from "./components/about/about";
import { Footer } from "./common/footer/footer";
import {Contacts} from "./components/contacts/contacts";
import {Docs} from "./components/contacts/docs/docs"
import { useLayoutEffect } from 'react'
import { Login } from "./components/login/login";
import {Products} from "./components/products/products";
import {Billing} from "./components/billing/billing";
import {TrifectaApp} from "./app/app";

const Wrapper = ({children}) => {
    const location = useLocation();
    useLayoutEffect(() => {
        document.documentElement.scrollTo(0, 0);
    }, [location.pathname]);
    return children
}

const App = () => {
    const [isRegisterMode, setIsRegisterMode] = useState(false);

    return (
        <>
            <ToastContainer />
            <Header setIsRegisterMode={setIsRegisterMode} />
            <div className="trifecta">
                <Routes>
                    <Route path={"/login"} element={<Login isRegisterMode={isRegisterMode} />} />
                    <Route path={"/register"} element={<Login isRegisterMode={true} />} />
                    <Route path="/" element={<Main />} />
                    <Route path="about" element={<About />} />
                    <Route path="products" element={<Products />} />
                    <Route path="contacts" element={<Contacts />} />
                    <Route path="docs" element={<Docs />} />
                    <Route path="billing" element={<Billing />} />
                    <Route path="app/*" element={<TrifectaApp />} />
                    <Route
                        path="*"
                        element={<Navigate to="/" replace />}
                    />
                </Routes>
            </div>
            <Footer />
        </>
    )
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Wrapper>
                <Suspense>
                    <App />
                </Suspense>
            </Wrapper>
        </BrowserRouter>
    </React.StrictMode>
);
