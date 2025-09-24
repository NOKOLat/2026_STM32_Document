import { Route } from 'react-router-dom';
import ProtectedRoute from '../ProtectedRoute';

import Step5_00_SPI from '../../pages/documents/step5/00_SPI/00_SPI';
import Step5_01_GetAccel from '../../pages/documents/step5/01_GetAccel/01_GetAccel';
import Step5_02_AngleFromAccel from '../../pages/documents/step5/02_AngleFromAccel/02_AngleFromAccel';
import Step5_03_GetGyro from '../../pages/documents/step5/03_GetGyro/03_GetGyro';
import Step5_04_AngleFromGyro from '../../pages/documents/step5/04_AngleFromGyro/04_AngleFromGyro';
import Step5_05_Complementary from '../../pages/documents/step5/05_Complementary/05_Complementary';
import Step5_06_Madgwick from '../../pages/documents/step5/06_Madgwick/06_Madgwick';

export default function Section5Routes() {
    return [
        <Route key="Step5_00_SPI" path="/Step5_00_SPI" element={<ProtectedRoute><Step5_00_SPI /></ProtectedRoute>} />,
        <Route key="Step5_01_GetAccel" path="/Step5_01_GetAccel" element={<ProtectedRoute><Step5_01_GetAccel /></ProtectedRoute>} />,
        <Route key="Step5_02_AngleFromAccel" path="/Step5_02_AngleFromAccel" element={<ProtectedRoute><Step5_02_AngleFromAccel /></ProtectedRoute>} />,
        <Route key="Step5_03_GetGyro" path="/Step5_03_GetGyro" element={<ProtectedRoute><Step5_03_GetGyro /></ProtectedRoute>} />,
        <Route key="Step5_04_AngleFromGyro" path="/Step5_04_AngleFromGyro" element={<ProtectedRoute><Step5_04_AngleFromGyro /></ProtectedRoute>} />,
        <Route key="Step5_05_Complementary" path="/Step5_05_Complementary" element={<ProtectedRoute><Step5_05_Complementary /></ProtectedRoute>} />,
        <Route key="Step5_06_Madgwick" path="/Step5_06_Madgwick" element={<ProtectedRoute><Step5_06_Madgwick /></ProtectedRoute>} />,
    ];
}
