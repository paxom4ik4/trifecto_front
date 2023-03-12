import * as React from 'react';
import { Route, Routes } from "react-router-dom";
import './admin.scss';
import { Verification } from "./components/verification/verification";
import { Withdraw } from "./components/withdraw/withdraw";
import { ContactInfo } from "./components/contactInfo/contactInfo";
import { Structure } from "../components/structure/structure";
import { Packages } from "./components/packages/packages";
import { AdminCharges } from "./components/charges/charges";
import { WithdrawHistory } from "./components/withdrawHistory/withdrawHistory";
import {AdditionalCharges} from "./components/additional-charges/additional-charges";

const DEFAULT_CLASSNAME = 'admin';

export const Admin = () => {
    return (
        <div className={`${DEFAULT_CLASSNAME}_wrapper`}>
            <Routes>
                <Route path={'/verification'} element={<Verification />} />
                <Route path={'/withdraw'} element={<Withdraw />} />
                <Route path={'/withdraw-history'} element={<WithdrawHistory />} />
                <Route path={'/contact-info'} element={<ContactInfo />} />
                <Route path={'/structure'} element={<Structure isAdmin />} />
                <Route path={'/packages'} element={<Packages />} />
                <Route path={'/charges'} element={<AdminCharges />} />
                <Route path={'/additional-charges'} element={<AdditionalCharges />} />
            </Routes>
        </div>
    )
}