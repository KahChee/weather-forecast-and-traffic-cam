import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/home';

const browserRouter = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '*',
    element: <div>404<br />Page Not Found!</div>
  }
]);

export default browserRouter;
