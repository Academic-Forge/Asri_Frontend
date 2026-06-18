import { RouterProvider } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { router } from './routes/AppRoutes';

/**
 * Main application component.
 * Renders the RouterProvider and global Toast notifications configuration.
 */
export const App = () => {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster position="top-right" />
    </>
  );
};

export default App;