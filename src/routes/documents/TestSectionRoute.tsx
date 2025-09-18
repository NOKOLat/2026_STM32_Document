import { Route } from 'react-router-dom';
import ProtectedRoute from '../ProtectedRoute.tsx';

import TestPage from '../../pages/documents/TestPage.tsx';

export default function TestRoute() {

    return [
        <Route key="test" path="/test" element={<ProtectedRoute><TestPage /></ProtectedRoute>} />,

    ];
}