import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Style from "@/style/pageList.module.less";
import { Button, Empty, Form, Input, Select, Table } from "antd";
const WeeklyMission: React.FC = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const columns = [
    {
      title: "アイコン",
      dataIndex: "name",
      key: "name",
    },
    {
      title: " アイコン名",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "付与pt数",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "表示開始日",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "ステータス",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "更新日時",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "作成者",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "オペレーション",
      dataIndex: "name",
      key: "name",
    },
  ];
  return (
    <div className={Style.container}>
      <div className={Style.header}>
        <div className={Style.title}>Weeklyミッション</div>
        <div className={Style.subTitle}>
          Advanced forms are commonly seen in scenarios where large quantities
          of data are entered and submitted at once.
        </div>
        <Form layout="inline" form={form}>
          <Form.Item label="ステータス" name="a">
            <Select style={{ width: "210px" }}></Select>
          </Form.Item>
          <Form.Item label="ミッション名" name="b">
            <Input style={{ width: "210px" }}></Input>
          </Form.Item>
          <Form.Item>
            <Button type="primary">検索</Button>
          </Form.Item>
        </Form>
      </div>
      <div className={Style.content}>
        <div className="flex-bet mb15">
          <div className={Style.contentTitle}>ミッションリスト</div>
          <Button onClick={() => navigate("/weeklyModify")} type="primary">
            + 新規作成
          </Button>
        </div>
        <Table
          columns={columns}
          dataSource={[]}
          locale={{
            emptyText: (
              <Empty
                style={{ marginTop: "40px" }}
                description="ミッションありません"
              />
            ),
          }}
        ></Table>
      </div>
    </div>
  );
};
export default WeeklyMission;
