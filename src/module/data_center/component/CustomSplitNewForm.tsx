import { Button, Form, FormInstance, Input, InputNumber, Radio } from "antd";
import React, { useEffect } from "react";
import CustomInputNumber from "./CustomInputNumber";

interface Props {
  form: FormInstance
  onClosed: () => void;
  onFinished: (value: FieldNewType) => void;
}

type Method = "separator" | "characters";
export type FieldNewType = {
  splitMethod: Method;
  separatorOption: {
    delimiter: string;
    splitPositon: "before" | "after";
    splitNum: string | undefined;
  };
  charactersOption: {
    splitPositon: "left" | "right";
    splitNum: string | undefined;
  };
};

/**
 * 使用 hideen属性 部分显示form表单
 * @param
 * @returns
 */
const CustomSplitNewForm: React.FC<Props> = ({ form, onClosed, onFinished }) => {
  console.log("拆分dialog---hidden");

  // useWatch：直接获取form表单中某个字段值
  const splitMethod = Form.useWatch("splitMethod", form);

  const onFinish = (values: any, onClose: () => void) => {
    console.log("Success:", values);
    // TODO: 提交的接口：
    // onClose()
    onFinished(values)
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  useEffect(() => {
    const initNewFormValues = {
      splitMethod: "separator",
      separatorOption: {
        delimiter: "",
        splitPositon: "before",
        splitNum: undefined,
      },
      charactersOption: {
        splitPositon: "right",
        splitNum: undefined,
      },
    };

    console.log("form", form.getFieldsValue());
    form.setFieldsValue(initNewFormValues);
    // console.log("😈", splitMethod, JSON.stringify(splitMethod));
  }, [form]);

  const handleSubmit = () => {
    console.log("提交", form.getFieldsValue());
    form.submit();
  };

  return (
    <>
      <Form
        name="basicNewForm"
        form={form}
        labelCol={{
          style: { width: 100 },
        }}
        onFinish={(arg) => onFinish(arg, onClosed)}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item<FieldNewType>
          label="拆分方式"
          name="splitMethod"
          rules={[{ required: true }]}
        >
          <Radio.Group>
            <Radio value={"separator"}>按分隔符</Radio>
            <Radio value={"characters"}>按字符数</Radio>
          </Radio.Group>
        </Form.Item>
        {/* form部分表单项更新 方式二： 使用hidden属性*/}
        <Form.Item<FieldNewType> hidden={splitMethod !== "separator"}>
          <Form.Item<FieldNewType>
            name={["separatorOption", "delimiter"]}
            label="分隔符"
            labelCol={{
              style: { width: 100 },
            }}
            rules={[{ required: true }]}
          >
            <Input className="w-[300px]" />
          </Form.Item>
          <Form.Item
            label="拆分"
            name={["separatorOption", "splitPositon"]}
            labelCol={{
              style: { width: 100 },
            }}
            className="inline-block w-[218px]"
          >
            <Radio.Group>
              <Radio value="before">前</Radio>
              <Radio value="after">后</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            name={["separatorOption", "splitNum"]}
            className="inline-block"
          >
            <CustomInputNumber height={56} label={"个"} />
          </Form.Item>
        </Form.Item>
        <Form.Item className="mb-[0]" hidden={splitMethod === "separator"}>
          <Form.Item
            label="拆分位置"
            name={["charactersOption", "splitPositon"]}
            labelCol={{
              style: { width: 100 },
            }}
            className="inline-block w-[216px]"
          >
            <Radio.Group>
              <Radio value="left">左</Radio>
              <Radio value="right">右</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            name={["charactersOption", "splitNum"]}
            className="ml-[12px] inline-block"
          >
            <CustomInputNumber label={"个字符处"} />
          </Form.Item>
        </Form.Item>
      </Form>
      <div className="flex h-[33px] justify-end space-x-3 border-0 border-t-[1px] border-solid border-slate-200 px-6 py-3">
        <Button type="primary" onClick={handleSubmit}>
          提交
        </Button>
        <Button style={{ margin: "0 8px" }} onClick={() => onClosed()}>
          取消
        </Button>
      </div>
    </>
  );
};

export default CustomSplitNewForm;
