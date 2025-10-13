import { Route } from 'react-router-dom';
import ProtectedRoute from '../ProtectedRoute';

import Step4_01_SensorCommunication from '../../pages/documents/step4/01_SensorCommunication/01_SensorCommunication';
import Step4_02_Ultrasonic from '../../pages/documents/step4/02_Ultrasonic/02_Ultrasonic';
import Step4_03_ToF from '../../pages/documents/step4/03_ToF/03_ToF';

export default function Section4Routes() {
    return [
        <Route key="Step4_01_SensorCommunication" path="/Step4_01_SensorCommunication" element={<ProtectedRoute><Step4_01_SensorCommunication /></ProtectedRoute>} />,
        <Route key="Step4_02_Ultrasonic" path="/Step4_02_Ultrasonic" element={<ProtectedRoute><Step4_02_Ultrasonic /></ProtectedRoute>} />,
        <Route key="Step4_03_ToF" path="/Step4_03_ToF" element={<ProtectedRoute><Step4_03_ToF /></ProtectedRoute>} />,
    ];
}
