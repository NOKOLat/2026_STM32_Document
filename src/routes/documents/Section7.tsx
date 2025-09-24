import { Route } from 'react-router-dom';
import ProtectedRoute from '../ProtectedRoute';

import Step7_00_ImportanceOfDesign from '../../pages/documents/step7/00_ImportanceOfDesign/00_ImportanceOfDesign';
import Step7_01_NamingAndNamespace from '../../pages/documents/step7/01_NamingAndNamespace/01_NamingAndNamespace';
import Step7_02_FunctionAndSplit from '../../pages/documents/step7/02_FunctionAndSplit/02_FunctionAndSplit';
import Step7_03_MagicNumberEnum from '../../pages/documents/step7/03_MagicNumberEnum/03_MagicNumberEnum';
import Step7_04_StateDesign1 from '../../pages/documents/step7/04_StateDesign1/04_StateDesign1';
import Step7_05_StateDesign2 from '../../pages/documents/step7/05_StateDesign2/05_StateDesign2';

export default function Section7Routes() {
    return [
        <Route key="Step7_00_ImportanceOfDesign" path="/Step7_00_ImportanceOfDesign" element={<ProtectedRoute><Step7_00_ImportanceOfDesign /></ProtectedRoute>} />,
        <Route key="Step7_01_NamingAndNamespace" path="/Step7_01_NamingAndNamespace" element={<ProtectedRoute><Step7_01_NamingAndNamespace /></ProtectedRoute>} />,
        <Route key="Step7_02_FunctionAndSplit" path="/Step7_02_FunctionAndSplit" element={<ProtectedRoute><Step7_02_FunctionAndSplit /></ProtectedRoute>} />,
        <Route key="Step7_03_MagicNumberEnum" path="/Step7_03_MagicNumberEnum" element={<ProtectedRoute><Step7_03_MagicNumberEnum /></ProtectedRoute>} />,
        <Route key="Step7_04_StateDesign1" path="/Step7_04_StateDesign1" element={<ProtectedRoute><Step7_04_StateDesign1 /></ProtectedRoute>} />,
        <Route key="Step7_05_StateDesign2" path="/Step7_05_StateDesign2" element={<ProtectedRoute><Step7_05_StateDesign2 /></ProtectedRoute>} />,
    ];
}
