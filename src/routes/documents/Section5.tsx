import { Route } from 'react-router-dom';
import ProtectedRoute from '../ProtectedRoute';

import Step5_01_SPI from '../../pages/documents/step5/01_SPI/01_SPI';
import Step5_02_GetAccel from '../../pages/documents/step5/02_GetAccel/02_GetAccel';
import Step5_03_AngleFromAccel from '../../pages/documents/step5/03_AngleFromAccel/03_AngleFromAccel';
import Step5_04_GetGyro from '../../pages/documents/step5/04_GetGyro/04_GetGyro';
import Step5_05_AngleFromGyro from '../../pages/documents/step5/05_AngleFromGyro/05_AngleFromGyro';
import Step5_06_Complementary from '../../pages/documents/step5/06_Complementary/06_Complementary';
import Step5_07_Madgwick from '../../pages/documents/step5/07_Madgwick/07_Madgwick';

export default function Section5Routes() {
    return [
        <Route key="Step5_01_SPI" path="/Step5_01_SPI" element={<ProtectedRoute><Step5_01_SPI /></ProtectedRoute>} />,
        <Route key="Step5_02_GetAccel" path="/Step5_02_GetAccel" element={<ProtectedRoute><Step5_02_GetAccel /></ProtectedRoute>} />,
        <Route key="Step5_03_AngleFromAccel" path="/Step5_03_AngleFromAccel" element={<ProtectedRoute><Step5_03_AngleFromAccel /></ProtectedRoute>} />,
        <Route key="Step5_04_GetGyro" path="/Step5_04_GetGyro" element={<ProtectedRoute><Step5_04_GetGyro /></ProtectedRoute>} />,
        <Route key="Step5_05_AngleFromGyro" path="/Step5_05_AngleFromGyro" element={<ProtectedRoute><Step5_05_AngleFromGyro /></ProtectedRoute>} />,
        <Route key="Step5_06_Complementary" path="/Step5_06_Complementary" element={<ProtectedRoute><Step5_06_Complementary /></ProtectedRoute>} />,
        <Route key="Step5_07_Madgwick" path="/Step5_07_Madgwick" element={<ProtectedRoute><Step5_07_Madgwick /></ProtectedRoute>} />,
    ];
}
