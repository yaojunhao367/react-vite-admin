import { Form } from "antd";
import { useEffect, useState } from "react";

export default function useCondition(form: any) {
  const [condition2, setCondition2] = useState<any>();
  const [condition3, setCondition3] = useState<any>();
  const [condition4, setCondition4] = useState<any>();
  const [addItem, setAddItem] = useState<any>({});
  const ENUM = {
    access: "01",
    intelligence: "02",
    step: "03",
    light: "05",
    talk: "06",
    consult: "07",
    other: "09",
  };
  const STEP: any = {
    "1": {
      label: "歩数",
      addItem: {
        label: "目標数字",
      },
    },
    "2": {
      label: "消費カロリー数",
      addItem: {
        label: "目標カロリー",
      },
    },
    "3": {
      label: "距離",
      addItem: {
        label: "目標距離",
      },
    },
    "4": {
      label: "時間",
      addItem: {
        label: "目標時間数字入力",
      },
    },
    "5": {
      label: "歩行速度",
      addItem: {
        label: "目標歩行速度",
      },
    },
  };
  const LIGHT: any = {
    "1": {
      label: "アクションボタン",
      addItem: {
        label: "なし",
      },
    },
    "2": {
      label: "コミニュケーションエリア",
      addItem: {
        label: "URL入力",
      },
    },
    "3": {
      label: "トップバナー",
      addItem: {
        label: "トップバナー",
      },
    },
    "4": {
      label: "アイコン",
      addItem: {
        label: "アイコン",
      },
    },
    "5": {
      label: "お得な情報バナー",
      addItem: {
        label: "お得な情報バナー",
      },
    },
  };
  const CONSULT: any = {
    "1": {
      label: "予約",
      addItem: {},
    },
    "2": {
      label: "決済",
      addItem: {},
    },
    "3": {
      label: "診療科選択",
      addItem: {
        label: "診療科選択",
      },
    },
  };
  // 目标设定的枚举值
  const CONDITION = [
    {
      label: "01_アクセス",
      value: ENUM.access,
      condition2: {
        type: "singleSelect",
        options: [{ label: "ログイン", value: "1" }],
      },
      condition3: {
        type: "singleSelect",
        options: [
          { label: "合計日数", value: "1" },
          { label: "連続日数", value: "2" },
        ],
      },
      condition4: {
        type: "singleSelect",
        options: [
          { label: "指定期間", value: "1" },
          { label: "なし", value: "2" },
        ],
      },
    },
    {
      label: "02_情報登録",
      value: ENUM.intelligence,
      condition2: {
        type: "multipleSelect",
        options: [
          { label: "メールアドレス", value: "1" },
          { label: "身長", value: "2" },
          { label: "体重", value: "3" },
          { label: "喫煙", value: "4" },
          { label: "飲酒", value: "5" },
          { label: "病歴", value: "6" },
          { label: "服用中の薬", value: "7" },
          { label: "アレルギー", value: "8" },
          { label: "睡眠", value: "9" },
          { label: "目標", value: "10" },
        ],
      },
      condition3: {
        type: "singleSelect",
        options: [
          { label: "登録", value: "1" },
          { label: "更新", value: "2" },
        ],
      },
      condition4: null,
    },
    {
      label: "03_歩数",
      value: ENUM.step,
      condition2: {
        type: "singleSelect",
        options: Object.keys(STEP).map((key) => {
          return {
            label: STEP[key].label,
            value: key,
          };
        }),
      },
      condition3: {
        type: "singleSelect",
        options: [
          { label: "合計数", value: "1" },
          { label: "平均数", value: "2" },
        ],
      },
      condition4: {
        type: "singleSelect",
        options: [
          { label: "指定期間", value: "1" },
          { label: "なし", value: "2" },
        ],
      },
    },
    {
      label: "05_ライトアクション",
      value: ENUM.light,
      condition2: {
        type: "singleSelect",
        options: Object.keys(LIGHT).map((key) => {
          return {
            label: LIGHT[key].label,
            value: key,
          };
        }),
      },
      condition3: null,
      condition4: null,
    },
    {
      label: "06_健康相談",
      value: ENUM.talk,
      condition2: {
        type: "singleSelect",
        options: [
          { label: "健康相談", value: "1" },
          { label: "お薬相談", value: "2" },
          { label: "フィードバック送信", value: "3" },
        ],
      },
      condition3: {
        type: "singleSelect",
        options: [{ label: "利用回数", value: "1" }],
      },
      condition4: {
        type: "singleSelect",
        options: [
          { label: "指定期間", value: "1" },
          { label: "なし", value: "2" },
        ],
      },
    },
    {
      label: "07_OL診療",
      value: ENUM.consult,
      condition2: {
        type: "singleSelect",
        options: [
          { label: "予約", value: "1" },
          { label: "決済", value: "2" },
          { label: "診療科選択", value: "3" },
        ],
      },
      condition3: null,
      condition4: {
        type: "singleSelect",
        options: [
          { label: "指定期間", value: "1" },
          { label: "なし", value: "2" },
        ],
      },
    },
    {
      label: "09_個別",
      value: ENUM.other,
      condition2: {
        type: "singleSelect",
        options: [
          { label: "歩数連携", value: "1" },
          { label: "ミッション達成", value: "2" },
        ],
      },
      condition3: null,
      condition4: null,
    },
  ];

  const condition1 = Form.useWatch("condition1", form);
  const _condition2 = Form.useWatch("condition2", form);

  useEffect(() => {
    const _condition2 = CONDITION.find(
      (item) => item.value === condition1
    )?.condition2;
    setCondition2(_condition2);
  }, [condition1]);

  useEffect(() => {
    const _condition3 = CONDITION.find(
      (item) => item.value === condition1
    )?.condition3;
    setCondition3(_condition3);
  }, [condition1]);

  useEffect(() => {
    const _condition4 = CONDITION.find(
      (item) => item.value === condition1
    )?.condition4;
    setCondition4(_condition4);
  }, [condition1]);

  useEffect(() => {
    if (condition1 === ENUM.access) {
      setAddItem({
        label: "日数入力",
        suffix: "日",
      });
      return;
    }
    if (condition1 === ENUM.step) {
      setAddItem(STEP[_condition2]?.addItem || {});
      return;
    }
    if (condition1 === ENUM.light) {
      setAddItem(LIGHT[_condition2]?.addItem || {});
      return;
    }
    if (condition1 === ENUM.talk) {
      setAddItem({
        label: "回数入力",
      });
      return;
    }
    if (condition1 === ENUM.consult) {
      setAddItem(CONSULT[_condition2]?.addItem || {});
      return;
    }
    setAddItem({});
  }, [condition1, _condition2]);

  return {
    CONDITION,
    condition2,
    condition3,
    condition4,
    addItem,
  };
}
