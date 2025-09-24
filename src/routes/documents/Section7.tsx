import { Route } from 'react-router-dom';
import ProtectedRoute from '../ProtectedRoute';

import Step7_01_ImportanceOfDesign from '../../pages/documents/step7/01_ImportanceOfDesign/01_ImportanceOfDesign';
import Step7_02_NamingAndNamespace from '../../pages/documents/step7/02_NamingAndNamespace/02_NamingAndNamespace';
import Step7_03_FunctionAndSplit from '../../pages/documents/step7/03_FunctionAndSplit/03_FunctionAndSplit';
import Step7_04_MagicNumberEnum from '../../pages/documents/step7/04_MagicNumberEnum/04_MagicNumberEnum';
import Step7_05_StateDesign1 from '../../pages/documents/step7/05_StateDesign1/05_StateDesign1';
import Step7_06_StateDesign2 from '../../pages/documents/step7/06_StateDesign2/06_StateDesign2';

export default function Section7Routes() {
    return [
        <Route key="Step7_01_ImportanceOfDesign" path="/Step7_01_ImportanceOfDesign" element={<ProtectedRoute><Step7_01_ImportanceOfDesign /></ProtectedRoute>} />,
        <Route key="Step7_02_NamingAndNamespace" path="/Step7_02_NamingAndNamespace" element={<ProtectedRoute><Step7_02_NamingAndNamespace /></ProtectedRoute>} />,
        <Route key="Step7_03_FunctionAndSplit" path="/Step7_03_FunctionAndSplit" element={<ProtectedRoute><Step7_03_FunctionAndSplit /></ProtectedRoute>} />,
        <Route key="Step7_04_MagicNumberEnum" path="/Step7_04_MagicNumberEnum" element={<ProtectedRoute><Step7_04_MagicNumberEnum /></ProtectedRoute>} />,
        <Route key="Step7_05_StateDesign1" path="/Step7_05_StateDesign1" element={<ProtectedRoute><Step7_05_StateDesign1 /></ProtectedRoute>} />,
        <Route key="Step7_06_StateDesign2" path="/Step7_06_StateDesign2" element={<ProtectedRoute><Step7_06_StateDesign2 /></ProtectedRoute>} />,
    ];
}
