import { Route } from 'react-router-dom';
import ProtectedRoute from '../ProtectedRoute';

import MainPage from '../../pages/MainPage';


export default function TestRoute() {

    return [

        <Route key="login" path="/" element={<ProtectedRoute><MainPage /></ProtectedRoute>} />,
        <Route key="mainpage" path="/mainpage" element={<ProtectedRoute><MainPage /></ProtectedRoute>} />,
    ];
}
