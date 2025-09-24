import { Routes, Route } from 'react-router-dom'

import Login from '../pages/Login/LoginPage'
import RegisterPage from '../pages/Login/RegisterPage'
import TestRoute from './documents/TestSectionRoute'
import Section1Routes from './documents/Section1'
import Section2Routes from './documents/Section2'
import Section3Routes from './documents/Section3.tsx'
import Section4Routes from './documents/Section4.tsx'
import Section5Routes from './documents/Section5.tsx'
import Section6Routes from './documents/Section6.tsx'
import Section7Routes from './documents/Section7.tsx'


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

        {Section1Routes()}

        {Section2Routes()}

        {Section3Routes()}

        {Section4Routes()}

        {Section5Routes()}

        {Section6Routes()}

        {Section7Routes()}

        </Routes>
    )
}
