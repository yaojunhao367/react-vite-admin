import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Style from "./index.module.less";
import { PlusOutlined, CheckOutlined } from "@ant-design/icons";
import {
  Form,
  Input,
  InputNumber,
  Switch,
  DatePicker,
  Upload,
  Select,
  message,
  Button,
  Popconfirm,
} from "antd";
const { RangePicker } = DatePicker;
import useCondition from "@/hooks/useCondition";
import { checkImage } from "@/utils/tools";

const WeeklyModify: React.FC = () => {
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { CONDITION, condition2, condition3, condition4, addItem } =
    useCondition(form);
  const yjh = Form.useWatch("yjh", form);
  const hasDate = Form.useWatch("condition4", form);

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const beforeUpload = (file: any) => {
    checkImage(file, 200, 200, 200)
      .then(() => {
        alert(111);
      })
      .catch((err: string) => {
        message.error(err);
        return false;
      });
  };

  return (
    <div className={Style.container}>
      <div className="commonTitle">基本情報</div>
      <Form
        onValuesChange={(changedValues, allValues) => {
          console.log(allValues);
          setBtnDisabled(
            Object.keys(allValues).some(
              (field) => allValues[field] === undefined || !allValues[field]
            )
          );
        }}
        requiredMark={false}
        className={Style.baseInfo}
        form={form}
      >
        <Form.Item
          label="ステータス"
          name="a"
          valuePropName="checked"
          initialValue={true}
        >
          <Switch checkedChildren="ON" unCheckedChildren="OFF" />
        </Form.Item>
        <div className="flex">
          <Form.Item label="アイコン名" name="b">
            <Input
              style={{ width: "260px" }}
              placeholder="10文字以内"
              maxLength={10}
            ></Input>
          </Form.Item>
          <Form.Item label="付与pt数" name="c" initialValue={1}>
            <InputNumber min={0} max={9999} />
          </Form.Item>
        </div>
        <Form.Item label="表示期間" name="d">
          <RangePicker placeholder={["開始日", "終了日"]} />
        </Form.Item>
        <div className="flex">
          <Form.Item
            extra="※ 100px * 100px 　200kb以下のjpg/png"
            className={Style.upload}
            label="表示アイコン"
            name="e"
            valuePropName="fileList"
            getValueFromEvent={(e) => {
              if (Array.isArray(e)) {
                return e;
              }
              return e && e.fileList;
            }}
          >
            <Upload
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              listType="picture-card"
              accept="image/png, image/jpg"
              beforeUpload={beforeUpload}
            >
              {uploadButton}
            </Upload>
          </Form.Item>
          <Form.Item
            extra="※ 500px *500px 　200kb以下のjpg/png"
            label="イラスト"
            name="f"
            valuePropName="fileList"
          >
            <Upload
              action=""
              listType="picture-card"
              accept="image/png, image/jpg"
            >
              {uploadButton}
            </Upload>
          </Form.Item>
        </div>
        <Form.Item label="ミッションタイトル" name="g">
          <Input
            style={{ width: "460px" }}
            placeholder="20文字以内"
            maxLength={20}
          ></Input>
        </Form.Item>
        <Form.Item label="ミッション詳細" name="h">
          <Input.TextArea
            autoSize
            style={{ width: "460px" }}
            placeholder="100文字以内"
            showCount
            maxLength={100}
          ></Input.TextArea>
        </Form.Item>
        <Form.Item label="ボタン設定" name="yjh" initialValue={"0"}>
          <Select
            style={{ width: 210 }}
            options={[
              { value: "0", label: "なし" },
              { value: "1", label: "あり" },
            ]}
          />
        </Form.Item>
        {yjh === "1" && (
          <div className="flex">
            <Form.Item label="ボタン文言" name="h">
              <Input
                style={{ width: "210px" }}
                placeholder="10文字以内"
                maxLength={10}
              ></Input>
            </Form.Item>
            <Form.Item label="URL" name="i">
              <Input
                style={{ width: "210px" }}
                placeholder="100文字以内"
                maxLength={100}
              ></Input>
            </Form.Item>
          </div>
        )}
        <div style={{ marginTop: "60px" }} className="commonTitle">
          達成条件設定
        </div>
        <div style={{ flexWrap: "wrap" }} className="flex">
          <Form.Item label="カテゴリ1" name="condition1">
            <Select style={{ width: 210 }} options={CONDITION} />
          </Form.Item>
          <Form.Item label="カテゴリ2" name="condition2">
            <Select
              {...(condition2?.type === "multipleSelect"
                ? { mode: "multiple" }
                : {})}
              style={{ width: 210 }}
              options={condition2?.options}
            />
          </Form.Item>
          {condition3 && (
            <Form.Item label="カテゴリ3" name="condition3">
              <Select style={{ width: 210 }} options={condition3?.options} />
            </Form.Item>
          )}
          {condition4 && (
            <Form.Item label="集計期間">
              <Form.Item noStyle name="condition4">
                <Select
                  style={{ width: 100, marginRight: 10 }}
                  options={condition4?.options}
                />
              </Form.Item>
              {hasDate === "1" && (
                <Form.Item noStyle name="during">
                  <RangePicker placeholder={["開始日", "終了日"]} />
                </Form.Item>
              )}
            </Form.Item>
          )}
          {addItem?.label && (
            <Form.Item label={addItem.label} name="addItem">
              <Input style={{ width: "210px" }}></Input>
            </Form.Item>
          )}
        </div>
      </Form>
      <div className={Style.btnBottom}>
        <Popconfirm
          title={"戻りますか？"}
          description="入力したデータは保存されません。"
          onConfirm={() => {
            navigate(-1);
          }}
          okText="はい"
          cancelText="いいえ"
        >
          <Button>戻る</Button>
        </Popconfirm>

        <Button
          disabled={btnDisabled}
          style={{ margin: "0 80px 0 20px" }}
          type="primary"
          onClick={() => {
            navigate(-1);
            setTimeout(() => {
              message.success("adsklkj");
            }, 200);
          }}
        >
          作成完了
        </Button>
      </div>
    </div>
  );
};
export default WeeklyModify;
