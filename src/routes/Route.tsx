import { Routes, Route } from 'react-router-dom'

import Login from '../pages/Login/LoginPage'
import RegisterPage from '../pages/Login/RegisterPage'
import TestRoute from './documents/TestSectionRoute'

// 各ページへのルーティング設定
// ProtectedRoute でログイントークンが切れている場合はログインページにリダイレクトする
// セクションごとにRouteコンポーネントをまとめた関数を呼び出す形にする
export default function AppRoutes() {

    return (
    <Routes>

        {/* LoginPage */}
        <Route path="/" element={<Login />} />

        {/*account register page */}
        <Route path="/register" element={<RegisterPage />} />

        {TestRoute()}

        </Routes>
    )
}
