import { Route } from 'react-router-dom';
import ProtectedRoute from '../ProtectedRoute';

import Introduction from '../../pages/documents/step1/01_Introduction/01_Introduction';
import Install from '../../pages/documents/step1/02_Install/02_Install';
import MakeProject from '../../pages/documents/step1/03_MakeProject/03_MakeProject';
import LED from '../../pages/documents/step1/04_LED/04_LED';   

export default function Section1Routes() {

    return [

        <Route key="Step1_01_introduction" path="/Step1_01_introduction" element={<ProtectedRoute><Introduction /></ProtectedRoute>} />,
        <Route key="Step1_02_install" path="/Step1_02_install" element={<ProtectedRoute><Install /></ProtectedRoute>} />,
        <Route key="Step1_03_makeproject" path="/Step1_03_makeproject" element={<ProtectedRoute><MakeProject /></ProtectedRoute>} />,
        <Route key="Step1_04_led" path="/Step1_04_led" element={<ProtectedRoute><LED /></ProtectedRoute>} />,
    ];
}
