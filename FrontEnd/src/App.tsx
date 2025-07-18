import { BrowserRouter, Route, Routes } from 'react-router';
import { GrammarCorrection } from './pages/GrammarCorrection';
import { Home } from './pages/Home';

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Home />} index />
        <Route element={<GrammarCorrection />} path="/corrigir" />
      </Routes>
    </BrowserRouter>
  );
};
