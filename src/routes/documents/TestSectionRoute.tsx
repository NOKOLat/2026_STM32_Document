import { Route } from 'react-router-dom';
import ProtectedRoute from '../ProtectedRoute';

import MainPage from '../../pages/MainPage';
import Basic01 from '../../pages/documents/basic/01_LED/basic_01_LED';

export default function TestRoute() {

    return [

        <Route key="login" path="/" element={<ProtectedRoute><MainPage /></ProtectedRoute>} />,
        <Route key="mainpage" path="/mainpage" element={<ProtectedRoute><MainPage /></ProtectedRoute>} />,
        <Route key="basic_01" path="/basic_01" element={<ProtectedRoute><Basic01 /></ProtectedRoute>} />,
    ];
}
