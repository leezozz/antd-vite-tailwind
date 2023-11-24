import { Navigate, createBrowserRouter } from "react-router-dom";
import ProjectListPage from "../module/project";
import Layouts from "../layout";
import DataQuality from "../module/data_center/page/data-quality";
import Test from "../module/data_center/page/test";
import DataGovernancePreview from "../module/data_center/page/data-preview";
import TestAnchor from "../module/Test/page/TestAnchor";
import DataTableSet from "../module/data_table_set/page";
import TestSelect from "../module/Test/page/TestSelect";

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
  {
    // anchor描点
    path: "/anchor",
    element: <TestAnchor />,
  },
  {
    // 数据表设置
    path: "/data-set",
    element: <DataTableSet />,
  },
  {
    // 测试select
    path: "/test-select",
    element: <TestSelect />,
  },
]);

export default router;
