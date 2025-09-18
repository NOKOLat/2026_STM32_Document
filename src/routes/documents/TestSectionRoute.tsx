import { Route } from 'react-router-dom';
import ProtectedRoute from '../ProtectedRoute';

import MainPage from '../../pages/MainPage';
import Basic01 from '../../pages/documents/basic/01_LED/basic_01_LED';
import Basic02 from '../../pages/documents/basic/02_UART/basic_02_UART';
import Basic03 from '../../pages/documents/basic/03_TIM/basic_03_TIM';

export default function TestRoute() {

    return [

        <Route key="login" path="/" element={<ProtectedRoute><MainPage /></ProtectedRoute>} />,
        <Route key="mainpage" path="/mainpage" element={<ProtectedRoute><MainPage /></ProtectedRoute>} />,
        <Route key="basic_01" path="/basic_01" element={<ProtectedRoute><Basic01 /></ProtectedRoute>} />,
        <Route key="basic_02" path="/basic_02" element={<ProtectedRoute><Basic02 /></ProtectedRoute>} />,
        <Route key="basic_03" path="/basic_03" element={<ProtectedRoute><Basic03 /></ProtectedRoute>} />,
    ];
}
