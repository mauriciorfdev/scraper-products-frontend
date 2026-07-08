import 'bootstrap/dist/css/bootstrap.min.css';
import ProductsPage from '../pages/ProductsPage.tsx';
import LoginPage from '../pages/LoginPage.tsx';
import NotFoundPage from '../pages/NotFoundPage.tsx';
import UsersPage from '../pages/UsersPage.tsx';
import { Routes, Route } from 'react-router-dom';
import PrivateRoutes from '../routes/PrivateRoutes.tsx';
import PublicRoutes from '../routes/PublicRoutes.tsx';

function App() {
  return (
    <>
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path='/' element={<ProductsPage />}></Route>
          <Route path='/users' element={<UsersPage />}></Route>
        </Route>

        <Route element={<PublicRoutes />}>
          <Route path='/login' element={<LoginPage />}></Route>
        </Route>

        <Route path='*' element={<NotFoundPage />}></Route>
      </Routes>
    </>
  );
}

export default App;
