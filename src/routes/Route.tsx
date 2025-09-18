import { Routes, Route } from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute'

import Login from '../LoginPage'
import TestPage from '../pages/Documents/TestPage'


// 各ページへのルーティング設定
// ProtectedRoute でログイントークンが切れている場合はログインページにリダイレクトする
export default function AppRoutes() {

    return (
    <Routes>

        {/* LoginPage */}
        <Route path="/" element={<Login />} />


        {/* DocumentPages */}
        <Route
            path="/test"
            element={
            <ProtectedRoute>
                <TestPage />
            </ProtectedRoute>
            }
        />

        </Routes>
    )
}
