import { useEffect, useState } from "react";
import { useLocation, useSearchParams, useNavigate } from "react-router-dom";

export default function useRouteConfig() {
  const navigate = useNavigate();
  const [BREADCRUMB, setBREADCRUMB] = useState([]);
  const [searchParams] = useSearchParams();
  const location = useLocation();
  // 采用url是否携带id参数判断是否是编辑页
  const idEdit = searchParams.has("id");
  const ROUTER_CONFIG: any = {
    "/weeklyMission": {
      BREADCRUMB: [
        { title: "Home" },
        { title: "ミッション管理" },
        { title: "Weeklyミッション" },
      ],
    },
    "/weeklyModify": {
      BREADCRUMB: [
        { title: "Home" },
        { title: "ミッション管理" },
        {
          title: (
            <span className="likea" onClick={() => navigate("/weeklyMission")}>
              Weeklyミッション
            </span>
          ),
        },
        { title: idEdit ? "編集" : "新規作成" },
      ],
    },
    "/onlineMission": {
      BREADCRUMB: [
        { title: "Home" },
        { title: "ミッション管理" },
        { title: "オンボミッション" },
      ],
    },
    "/secretMission": {
      BREADCRUMB: [
        { title: "Home" },
        { title: "ミッション管理" },
        { title: "Secretミッション" },
      ],
    },
  };

  useEffect(() => {
    setBREADCRUMB(
      ROUTER_CONFIG[location.pathname]
        ? ROUTER_CONFIG[location.pathname].BREADCRUMB
        : []
    );
  }, [location]);

  return {
    ROUTER_CONFIG,
    BREADCRUMB,
  };
}
