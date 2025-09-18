import { Routes, Route } from 'react-router-dom'

import Login from '../pages/Login/LoginPage'
import TestRoute from './documents/TestSectionRoute'

// 吁E�EージへのルーチE��ング設宁E
// ProtectedRoute でログイント�Eクンが�EれてぁE��場合�Eログインペ�EジにリダイレクトすめE
// セクションごとにRouteコンポ�Eネントをまとめた関数を呼び出す形にする
export default function AppRoutes() {

    return (
    <Routes>

        {/* LoginPage */}
        <Route path="/" element={<Login />} />

        {TestRoute()}

        </Routes>
    )
}
