import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProductsPage from '../pages/ProductsPage.tsx';
import LoginPage from '../pages/LoginPage.tsx';
import NotFoundPage from '../pages/NotFoundPage.tsx';
import { Routes, Route } from 'react-router-dom';
import PrivateRoutes from '../routes/PrivateRoutes.tsx';

function App() {
  return (
    <>
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path='/products' element={<ProductsPage />}></Route>
        </Route>
        <Route path='/login' element={<LoginPage />}></Route>
        <Route path='*' element={<NotFoundPage />}></Route>
      </Routes>
    </>
  );
}

export default App;
