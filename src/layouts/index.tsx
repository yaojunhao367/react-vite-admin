import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Breadcrumb, Divider, Layout, Menu, Radio } from "antd";
import Style from "./index.module.less";
import React, { memo, useEffect, useState } from "react";
import {
  DashboardOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from "@ant-design/icons";
import { ItemType } from "antd/lib/menu/hooks/useItems";
import Logo from "@/images/logo.png";
import Logout from "@/images/logout.png";
import useRouteConfig from "@/router/useRouteConfig";

function Index() {
  const { BREADCRUMB } = useRouteConfig();
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false); // 菜单是否收起
  const [selectedKeys, setSelectedKeys] = useState(""); // 菜单选中的key值
  const [menuList, setMenuList] = useState<ItemType[]>([]); // 菜单列表数据

  useEffect(() => {
    // mock菜单数据,一般从接口拿
    setMenuList([
      {
        label: "ミッション管理",
        icon: <DashboardOutlined />,
        key: "1",
        children: [
          {
            label: "Weeklyミッション",
            key: "/weeklyMission",
          },
          {
            label: "オンボミッション",
            key: "/onlineMission",
          },
          {
            label: "Secretミッション",
            key: "/secretMission",
          },
        ],
      },
    ]);
  }, []);

  useEffect(() => {
    setSelectedKeys(location.pathname);
  }, [location]);

  const renderMenu = () => {
    return (
      <div className={Style.menuwrap}>
        <div className={Style.menu}>
          <Menu
            onClick={(e: any) => {
              e.key && navigate(e.key);
            }}
            items={menuList}
            style={{ width: collapsed ? 48 : 208 }}
            selectedKeys={[selectedKeys]}
            defaultOpenKeys={["1"]}
            theme="light"
            mode="inline"
            inlineCollapsed={collapsed}
          />
        </div>
        <div className={Style.collapsed}>
          <div onClick={() => setCollapsed(!collapsed)} className={Style.icon}>
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={Style["layout-container"]}>
      <div className={`flex-bet ${Style["header"]}`}>
        <div className={`flex-center ${Style.logo}`}>
          <img src={Logo} alt="lego" />
          <div className={Style.title}>ミッション管理システム</div>
        </div>
        <div className={`flex-center ${Style.logout}`}>
          <div className={Style.name}>Yao Junhao</div>
          <img src={Logout} alt="logout" />
        </div>
      </div>
      <div className={Style["layout-content"]}>
        {renderMenu()}
        <div className={Style.children}>
          {BREADCRUMB.length > 0 && (
            <div className={Style.breadcrumb}>
              <Breadcrumb items={BREADCRUMB} />
            </div>
          )}
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default memo(Index);
