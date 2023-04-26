import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Style from "@/style/pageList.module.less";
import { Button, Empty, Form, Input, Popconfirm, Select, Table } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import type { DragEndEvent } from "@dnd-kit/core";
import { DndContext } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { ColumnsType } from "antd/es/table";
interface RowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  "data-row-key": string;
}

const Row = ({ children, ...props }: RowProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: props["data-row-key"],
  });

  const style: React.CSSProperties = {
    ...props.style,
    transform: CSS.Transform.toString(
      transform && { ...transform, scaleY: 1 }
    )?.replace(/translate3d\(([^,]+),/, "translate3d(0,"),
    transition,
    ...(isDragging ? { position: "relative", zIndex: 9999 } : {}),
  };

  return (
    <tr {...props} ref={setNodeRef} style={style} {...attributes}>
      {React.Children.map(children, (child) => {
        if ((child as React.ReactElement).key === "sort") {
          return React.cloneElement(child as React.ReactElement, {
            children: (
              <MenuOutlined
                ref={setActivatorNodeRef}
                style={{ touchAction: "none", cursor: "move" }}
                {...listeners}
              />
            ),
          });
        }
        return child;
      })}
    </tr>
  );
};
const OnlineMission: React.FC = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const list = [
    {
      name: "name1",
      key: 1,
    },
    {
      name: "name2",
      key: 2,
    },
    {
      name: "name3",
      key: 3,
    },
    {
      name: "name4",
      key: 4,
    },
    {
      name: "name5",
      key: 5,
    },
    {
      name: "name6",
      key: 6,
    },
    {
      name: "name7",
      key: 7,
    },
  ];

  const [dataSource, setDataSource] = useState(list);
  const [columns, setColumns] = useState<any>([
    {
      title: "表示順",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "アイコン",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "アイコン名",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "付与pt数",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "反映開始日",
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
  ]);

  const onDragEnd = ({ active, over }: DragEndEvent) => {
    if (active.id !== over?.id) {
      setDataSource((previous) => {
        const activeIndex = previous.findIndex((i) => i.key === active.id);
        const overIndex = previous.findIndex((i) => i.key === over?.id);
        return arrayMove(previous, activeIndex, overIndex);
      });
    }
  };

  return (
    <div className={Style.container}>
      <div className={Style.header}>
        <div className={Style.title}>オンボミッション</div>
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
          <div>
            {columns[0].key === "sort" ? (
              <Popconfirm
                title="表示順の編集に完了しましたか？"
                onConfirm={() => {
                  const _columns = [...columns];
                  _columns.splice(0, 1);
                  setColumns(_columns);
                }}
                okText="はい"
                cancelText="いいえ"
              >
                <Button style={{ marginRight: "24px" }}>完了</Button>
              </Popconfirm>
            ) : (
              <Button
                onClick={() => {
                  setColumns([{ key: "sort" }, ...columns]);
                }}
                style={{ marginRight: "24px" }}
              >
                表示順編集
              </Button>
            )}

            <Button type="primary">+ 新規作成</Button>
          </div>
        </div>
        <DndContext onDragEnd={onDragEnd}>
          <SortableContext
            // rowKey array
            items={dataSource.map((i) => i.key)}
            strategy={verticalListSortingStrategy}
          >
            <Table
              components={{
                body: {
                  row: Row,
                },
              }}
              rowKey="key"
              columns={columns}
              dataSource={dataSource}
              locale={{
                emptyText: (
                  <Empty
                    style={{ marginTop: "40px" }}
                    description="ミッションありません"
                  />
                ),
              }}
            />
          </SortableContext>
        </DndContext>
      </div>
    </div>
  );
};
export default OnlineMission;
