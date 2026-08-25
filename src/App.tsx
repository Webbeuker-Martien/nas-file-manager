import { Navigate, Route, BrowserRouter, Routes } from 'react-router-dom';

import LoginPage from '@/routes/LoginPage';
import BrowsePage from '@/routes/BrowsePage';
import ProtectedRoute from '@/routes/ProtectedRoute';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/browse" element={<BrowsePage />} />
        </Route>

        <Route path="/" element={<Navigate to="/browse" replace />} />
        <Route path="*" element={<Navigate to="/browse" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
