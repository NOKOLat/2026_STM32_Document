import { Route } from 'react-router-dom';
import ProtectedRoute from '../ProtectedRoute';

import TestPage from '../../pages/documents/TestPage';

export default function TestRoute() {

    return [
        <Route key="test" path="/test" element={<ProtectedRoute><TestPage /></ProtectedRoute>} />,

    ];
}