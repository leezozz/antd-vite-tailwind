import { Navigate, createBrowserRouter } from "react-router-dom";
import ProjectListPage from "../module/project";
import Layouts from "../layout";
import DataQuality from "../module/data_center/page/data-quality";
import Test from "../module/data_center/page/test";
import DataGovernancePreview from "../module/data_center/page/data-preview";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/project" />,
  },
  {
    path: "",
    element: <Layouts />,
    children: [
      {
        path: "project",
        element: <ProjectListPage />,
      },
    ],
  },
  {
    // 数据质量
    path: "/test",
    element: <DataQuality />,
  },
  {
    // 拆分表单form
    path: "/test1",
    element: <Test />,
  },
  {
    // 数据预览
    path: "/test2",
    element: <DataGovernancePreview />,
  },
]);

export default router;
