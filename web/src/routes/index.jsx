import { createBrowserRouter } from 'react-router-dom';

const browserRouter = createBrowserRouter([
  {
    path: '/',
    element: <div>Hello World!</div>
  },
  {
    path: '*',
    element: <div>404<br />Page Not Found!</div>
  }
]);

export default browserRouter;
