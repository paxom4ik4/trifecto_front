import * as React from 'react';
import { Route, Routes } from "react-router-dom";
import './admin.scss';
import { Verification } from "./components/verification/verification";
import { Withdraw } from "./components/withdraw/withdraw";

const DEFAULT_CLASSNAME = 'admin';

export const Admin = () => {
    return (
        <div className={`${DEFAULT_CLASSNAME}_wrapper`}>
            <Routes>
                <Route path={'/verification'} element={<Verification />} />
                <Route path={'/withdraw'} element={<Withdraw />} />
            </Routes>
        </div>
    )
}