import { ConfigProvider, InputNumber } from "antd";
import { createStyles } from "antd-style";
import React, { useState } from "react";
import cx from "classnames";

interface custIptType {
  label: string;
  height?: number;
  minValue?: number;
  value?: number | null;
  onChange?: (value: number | null) => void;
}

const useStyle = createStyles({
  'custom-iptnumber-box': {
    '.ant-input-number-group-addon': {
      padding: 0
    }
  },
  "custom-iptnumber-container": {
    ".ant-input-number-group-addon": {
      "&:first-child": {
        cursor: "no-drop!important",
        backgroundColor: "#f5f5f5",
      },
    },
  },
  "custom-disabled-pre": {
    cursor: "no-drop!important",
  },
});

/**
 * 自定义数字输入框，默认min=0 （小于0时，左侧按钮禁用）
 * @param props
 *  minValue：最小值
 *  label: 描述
 *  value: 提供受控属性 value 或其它与 valuePropName 的值同名的属性
 *  onChange: 提供 onChange 事件或 trigger 的值同名的事件。
 * @returns
 */
const CustomInputNumber: React.FC<custIptType> = (props) => {

  const { styles } = useStyle();
  const [disabledStyle, setDisabledStyle] = useState(false);
  // 阈值大小change事件
  const handleReduceNum = (type = "reduce") => {
    const currentValue = props.value || 0;
    const newValue = type === "add" ? currentValue + 1 : currentValue - 1;
    if (
      (props.minValue !== undefined && newValue >= props.minValue) ||
      (props.minValue === undefined && newValue >= 0)
    ) {
      props.onChange && props.onChange(newValue);
      if (newValue > 0) {
        setDisabledStyle(false);
      }
    }
    if (
      (props.minValue !== undefined && newValue <= props.minValue) ||
      (props.minValue === undefined && newValue <= 0)
    ) {
      setDisabledStyle(true);
    }
  };

  return (
    <>
      <div className="flex items-center">
        <ConfigProvider
          theme={{
            components: {
              InputNumber: {
                controlHeight: props.height ? props.height : 36,
              },
            },
          }}
        >
          {/* precision: 0 不保留小数 */}
          <InputNumber
            min={props.minValue || 0}
            {...props}
            controls={false}
            precision={0}
            placeholder="请输入"
            className={cx({
              [styles['custom-iptnumber-box']]: true,
              [styles["custom-iptnumber-container"]]: disabledStyle,
            })}
            addonBefore={
              <span
                className={cx({
                  "cursor-pointer": true,
                  'width': '100%',
                  'height': '100%',
                  [styles["custom-disabled-pre"]]: disabledStyle,
                })}
                style={{ padding: '11px' }}
                onClick={() => handleReduceNum()}
              >
                -
              </span>
            }
            addonAfter={
              <span
                className="cursor-pointer w-full h-full p-[11px]"
                onClick={() => handleReduceNum("add")}
              >
                +
              </span>
            }
          />
          <span className="ml-[8px]">{props.label}</span>
        </ConfigProvider>
      </div>
    </>
  );
};

export default CustomInputNumber;
