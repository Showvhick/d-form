import React, { Suspense,lazy } from 'react'
import { Routes, Route } from "react-router-dom";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const Form = lazy(() => import('./pages/Form'));
const NoPage = lazy(() => import('./pages/NoPage'));

function Router() {
    return (
        <Suspense>
            <Routes>   
                <Route path="/" element={<Form />} />
                <Route path="*" element={<NoPage />} />
            </Routes>
        </Suspense>
    )
}

export default Router;