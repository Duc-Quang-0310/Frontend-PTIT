import moment from 'moment';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffectOnce } from 'hooks/useEffectOnce';
import { ListRouter } from 'router/router.routes';
import { RouterInterface } from 'types/router.model';

function App() {
  useEffectOnce(() => {
    moment.locale('vn');
  });

  return (
    <BrowserRouter>
      <Routes>
        {ListRouter.map((route: RouterInterface) => (
          <Route path={route.path} element={route.component} key={route.path} />
        ))}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
