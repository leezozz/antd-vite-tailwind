import React, { useEffect } from "react";
import type { SelectProps } from "antd";
import { ConfigProvider, Select, Space } from "antd";
import { createStyles } from "antd-style";

const handleChange = (value: string, option: any) => {
  console.log(`selected ${value}`, option);
};

const options: SelectProps["options"] = [
  { value: "Float32", label: "#", desc: "数值" },
  { value: "String", label: "T", desc: "字符" },
  { value: "Datetime", label: "D", desc: "日期" },
  { value: "UInt8", label: "T/F", desc: "布尔值" },
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

  useEffect(
    () => {
      // console.log('😈',)
      // setTimeout(() => {
      //   handleChange('Float32', { value: "Float32", label: "#", desc: "数值" })
      // }, 1000)
    }, [])

  return (
    <ConfigProvider
      theme={{
        components: {
          Select: {
            optionSelectedFontWeight: 400,
            optionSelectedColor: "#3A86EF",
          },
        },
      }}
    >
      <Select
        defaultValue={"Float32"}
        className={styles["custom-select-style"]}
        onChange={handleChange}
        optionLabelProp="label"
      >
        {options.map((item) => {
          console.log("item", item);
          return (
            <Select.Option key={item.value} value={item.value} label={item.label}>
              <span className="mr-[8px] inline-flex w-[32px] justify-center rounded-[4px] bg-[#DEE2EA]">
                {item.label}
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
