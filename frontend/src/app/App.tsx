import { Routes, Route } from 'react-router-dom';
import Expenses from '../pages/expenses';
import Reporting from '../pages/reporting';
import RootLayout from '../layouts/root';
import SignIn from '../pages/signin';
import ProtectedRoute from './ProtectedRoute';
import SignUp from '../pages/signup';
import AdminExpenses from '../pages/adminExpenses';
import AdminReporting from '../pages/adminReporting';
import AdminUsers from '../pages/adminUsers';

export const App = () => {
  return (
    <div style={{ margin: 0, padding: 0, boxSizing: 'border-box' }}>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route element={<ProtectedRoute />}>
          <Route element={<RootLayout />}>
            <Route path="/expenses" element={<Expenses />} />
            <Route path="/reporting" element={<Reporting />} />
          </Route>
        </Route>
        <Route element={<ProtectedRoute adminOnly={true} />}>
          <Route element={<RootLayout />}>
            <Route path="/admin/expenses" element={<AdminExpenses />} />
            <Route path="/admin/reporting" element={<AdminReporting />} />
            <Route path="/admin/users" element={<AdminUsers />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
};
