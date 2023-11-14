import { Button, Form, Input, InputNumber, Radio } from "antd";
import React from "react";

interface Props {
  onClosed: () => void;
}

type FieldType = {
  splitMethod: number;
  delimiter: string;
  splitPositon: string;
  splitNum: string | undefined;
};

/**
 * 使用 shouldUpdate属性 部分更新form表单
 * @param  
 * @returns 
 */
const CustomSplitForm: React.FC<Props> = ({ onClosed }) => {
  console.log("拆分dialog---shouldUpdate");

  const [form] = Form.useForm();
  const initFormValues = {
    splitMethod: 1,
    delimiter: "",
    splitPositon: 1,
    splitNum: undefined,
  };

  const handleSubmit = () => {
    console.log("提交", form.getFieldsValue());
    form.submit();
  };

  const onFinish = (values: any, onClose: () => void) => {
    console.log("Success:", values);
    // TODO: 提交的接口：
    // onClose()
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <Form
        name="basic"
        form={form}
        initialValues={initFormValues}
        preserve={false}
        labelCol={{
          style: { width: 100 },
        }}
        onFinish={(arg) => onFinish(arg, onClosed)}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item<FieldType>
          label="拆分方式"
          name="splitMethod"
          rules={[{ required: true }]}
        >
          <Radio.Group>
            <Radio value={1}>按分隔符</Radio>
            <Radio value={2}>按字符数</Radio>
          </Radio.Group>
        </Form.Item>
        {/* form部分表单项更新 方式一： 使用shouldUpdate属性*/}
        <Form.Item
          shouldUpdate={(prevValue, curValue) =>
            prevValue.splitMethod !== curValue.splitMethod
          }
        >
          {({ getFieldValue }) => {
            const diffForm = getFieldValue("splitMethod");
            if (diffForm === 1) {
              return (
                <>
                  <Form.Item<FieldType>
                    label="分隔符"
                    name="delimiter"
                    labelCol={{
                      style: { width: 100 },
                    }}
                    rules={[{ required: true }]}
                  >
                    <Input className="w-[300px]" />
                  </Form.Item>
                  <Form.Item<FieldType>
                    label="拆分"
                    name="splitPositon"
                    labelCol={{
                      style: { width: 100 },
                    }}
                    className="inline-block w-[220px]"
                  >
                    <Radio.Group>
                      <Radio value={1}>前</Radio>
                      <Radio value={2}>后</Radio>
                    </Radio.Group>
                  </Form.Item>
                  <Form.Item<FieldType>
                    name="splitNum"
                    className="inline-block"
                  >
                    <InputNumber min={1} />
                  </Form.Item>
                </>
              );
            } else {
              return (
                <>
                  <Form.Item<FieldType>
                    label="拆分位置"
                    name="splitPositon"
                    labelCol={{
                      style: { width: 100 },
                    }}
                    className="inline-block w-[220px]"
                  >
                    <Radio.Group>
                      <Radio value={1}>左</Radio>
                      <Radio value={2}>右</Radio>
                    </Radio.Group>
                  </Form.Item>
                  <Form.Item<FieldType>
                    name="splitNum"
                    className="inline-block"
                  >
                    <InputNumber min={1} />
                  </Form.Item>
                </>
              );
            }
          }}
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
export default CustomSplitForm;
