import { Routes, Route } from 'react-router-dom';
import Login from '../pages/Login/LoginPage';
import RegisterPage from '../pages/Login/RegisterPage';
import MyPage from '../pages/mypage';
import BugReport from '../pages/BugReport/BugReport';
import NotFound from '../pages/NotFound/NotFound';
import MainPage from '../pages/MainPage';
import ProtectedRoute from './ProtectedRoute';
import DocumentRoutes from './documentRoutes';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/mypage" element={<MyPage />} />
      <Route path="/report-bug" element={<BugReport />} />
      <Route path="/mainpage" element={<ProtectedRoute><MainPage /></ProtectedRoute>} />

      {DocumentRoutes()}

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
