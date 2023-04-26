import { ReactNode, lazy, Suspense } from "react";
import { RouteObject } from "react-router-dom";
import { Spin } from "antd";
import Layout from "@/layouts";
// 路由懒加载
const lazyLoad = (children: ReactNode) => {
  return <Suspense fallback={<LoadingPage />}>{children}</Suspense>;
};
// 路由加载loading动画
const LoadingPage = () => {
  return (
    <div className="flex-center" style={{ height: "80vh" }}>
      <Spin size="large" />
    </div>
  );
};
// 导入路由
const WeeklyMission = lazy(() => import("@/pages/WeeklyMission"));
const WeeklyModify = lazy(() => import("@/pages/WeeklyModify"));
const OnlineMission = lazy(() => import("@/pages/OnlineMission"));
const SecretMission = lazy(() => import("@/pages/SecretMission"));
const NotFound = lazy(() => import("@/pages/Error/404"));

const router: RouteObject[] = [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "weeklyMission",
        element: lazyLoad(<WeeklyMission />),
      },
      {
        path: "weeklyModify",
        element: lazyLoad(<WeeklyModify />),
      },
      {
        path: "onlineMission",
        element: lazyLoad(<OnlineMission />),
      },
      {
        path: "secretMission",
        element: lazyLoad(<SecretMission />),
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export default router;
