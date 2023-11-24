import React from "react";
import type { SelectProps } from "antd";
import { ConfigProvider, Select, Space } from "antd";
import { createStyles } from "antd-style";

const handleChange = (value: string) => {
  console.log(`selected ${value}`);
};

const options: SelectProps["options"] = [
  { value: "#", label: "# 数值", tag: "#", desc: "数值" },
  { value: "T", label: "T 字符", tag: "T", desc: "字符" },
  { value: "D", label: "D 日期", tag: "D", desc: "日期" },
  { value: "T/F", label: "T/F 布尔值", tag: "T/F", desc: "布尔值" },
];

const useStyle = createStyles({
  "custom-select-style": {
    width: "200px",
    ".ant-select-item-option-selected": {
      color: "red!important",
      "custom-select-item-text": {
        color: "#3A86EF!important",
      },
    },
  },
});

const TestSelect: React.FC = () => {
  console.log("Select");
  const { styles } = useStyle();

  return (
    <ConfigProvider
      theme={{
        components: {
          Select: {
            optionSelectedFontWeight: 400,
            optionSelectedColor: '#3A86EF',
          },
        },
      }}
    >
      <Select
        className={styles["custom-select-style"]}
        defaultValue={"#"}
        onChange={handleChange}
        optionLabelProp="value"
      >
        {options.map((item) => {
          console.log("item", item);
          return (
            <Select.Option key={item.value} value={item.emoji}>
              <span className="mr-[8px] inline-flex w-[32px] justify-center rounded-[4px] bg-[#DEE2EA]">
                {item.tag}
              </span>
              <span className="custom-select-item-text">{item.desc}</span>
            </Select.Option>
          );
        })}
      </Select>
    </ConfigProvider>
  );
};

export default TestSelect;
