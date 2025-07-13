import { BrowserRouter, Route, Routes } from 'react-router';
import { Home } from './pages/Home';

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Home />} index />
      </Routes>
    </BrowserRouter>
  );
};
