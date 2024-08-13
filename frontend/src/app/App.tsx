import { Routes, Route } from 'react-router-dom';
import Expenses from '../pages/expenses';
import Reporting from '../pages/reporting';
import RootLayout from '../layouts/root';
import SignIn from '../pages/signin';
import ProtectedRoute from './ProtectedRoute';
import SignUp from '../pages/signup';

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
            <Route
              path="/admin/expenses"
              element={<div>Admin Dashboard</div>}
            />
          </Route>
        </Route>
      </Routes>
    </div>
  );
};
