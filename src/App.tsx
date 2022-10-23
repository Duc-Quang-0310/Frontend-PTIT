import moment from 'moment';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'moment/dist/locale/vi';
import { useEffectOnce } from 'hooks/useEffectOnce';
import { listRouters } from 'router/router.routes';
import { RouterInterface } from 'types/router.model';
import AppLayout from 'layouts/AppLayout';

function App() {
  useEffectOnce(() => {
    moment.locale('vi');
  });

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />} key="Layout">
          {listRouters().map((route: RouterInterface) => (
            <Route
              path={route.path}
              element={route.component}
              key={route.path}
            />
          ))}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
