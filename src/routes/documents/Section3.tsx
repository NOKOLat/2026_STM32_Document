import { Route } from 'react-router-dom';
import ProtectedRoute from '../ProtectedRoute';

import Step3_01_SignalAndAutodrop from '../../pages/documents/step3/01_SignalAndAutodrop/01_SignalAndAutodrop';
import Step3_02_SBUSRead from '../../pages/documents/step3/02_SBUSRead/02_SBUSRead';
import Step3_03_ServoMotor from '../../pages/documents/step3/03_ServoMotor/03_ServoMotor';
import Step3_04_Infrared from '../../pages/documents/step3/04_Infrared/04_Infrared';
import Step3_05_AutodropDesign from '../../pages/documents/step3/05_AutodropDesign/05_AutodropDesign';

export default function Section3Routes() {

    return [
        <Route key="Step3_01_SignalAndAutodrop" path="/Step3_01_SignalAndAutodrop" element={<ProtectedRoute><Step3_01_SignalAndAutodrop /></ProtectedRoute>} />,
        <Route key="Step3_02_SBUSRead" path="/Step3_02_SBUSRead" element={<ProtectedRoute><Step3_02_SBUSRead /></ProtectedRoute>} />,
        <Route key="Step3_03_ServoMotor" path="/Step3_03_ServoMotor" element={<ProtectedRoute><Step3_03_ServoMotor /></ProtectedRoute>} />,
        <Route key="Step3_04_Infrared" path="/Step3_04_Infrared" element={<ProtectedRoute><Step3_04_Infrared /></ProtectedRoute>} />,
        <Route key="Step3_05_AutodropDesign" path="/Step3_05_AutodropDesign" element={<ProtectedRoute><Step3_05_AutodropDesign /></ProtectedRoute>} />,
    ];
}
