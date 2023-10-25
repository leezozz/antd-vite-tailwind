import { Navigate, createBrowserRouter } from 'react-router-dom'
import ProjectListPage from "../module/project";
import Layouts from '../layout';
import DataQuality from '../module/data_center/page/data-quality';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to='/project' />
  },
  {
    path: '',
    element: <Layouts />,
    children: [
      {
        path: 'project',
        element: <ProjectListPage />,
      }
    ]
  },
  {
    path: '/test',
    element: <DataQuality />,
  }
])

export default router