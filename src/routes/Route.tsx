import { Routes, Route } from 'react-router-dom'

import Login from '../pages/Login/LoginPage'
import TestRoute from './documents/TestSectionRoute'

// 各ページへのルーティング設定
// ProtectedRoute でログイントークンが切れている場合はログインページにリダイレクトする
// セクションごとにRouteコンポーネントをまとめた関数を呼び出す形にする
export default function AppRoutes() {

    return (
    <Routes>

        {/* LoginPage */}
        <Route path="/" element={<Login />} />

        {TestRoute()}

        </Routes>
    )
}
