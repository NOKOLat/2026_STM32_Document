import { Routes, Route } from 'react-router-dom'

import Login from '../pages/Login/LoginPage'
import TestRoute from './documents/TestSectionRoute'

// 蜷・・繝ｼ繧ｸ縺ｸ縺ｮ繝ｫ繝ｼ繝・ぅ繝ｳ繧ｰ險ｭ螳・
// ProtectedRoute 縺ｧ繝ｭ繧ｰ繧､繝ｳ繝医・繧ｯ繝ｳ縺悟・繧後※縺・ｋ蝣ｴ蜷医・繝ｭ繧ｰ繧､繝ｳ繝壹・繧ｸ縺ｫ繝ｪ繝繧､繝ｬ繧ｯ繝医☆繧・
// 繧ｻ繧ｯ繧ｷ繝ｧ繝ｳ縺斐→縺ｫRoute繧ｳ繝ｳ繝昴・繝阪Φ繝医ｒ縺ｾ縺ｨ繧√◆髢｢謨ｰ繧貞他縺ｳ蜃ｺ縺吝ｽ｢縺ｫ縺吶ｋ
export default function AppRoutes() {

    return (
    <Routes>

        {/* LoginPage */}
        <Route path="/" element={<Login />} />

        {TestRoute()}

        </Routes>
    )
}
