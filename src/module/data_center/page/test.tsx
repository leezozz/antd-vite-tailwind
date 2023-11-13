import { CloseOutlined } from "@ant-design/icons";
import {
  Button,
  ConfigProvider,
  Form,
  Input,
  InputNumber,
  Modal,
  Radio,
} from "antd";
import { createStyles } from "antd-style";
import { useEffect, useState } from "react";
import CustomMergeForm from "../component/CustomMergeForm";

type FieldType = {
  splitMethod: number;
  delimiter: string;
  splitPositon: string;
  splitNum: string | undefined;
};

type Method = "separator" | "characters";
type FieldNewType = {
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

const useStyle = createStyles({
  "my-modal-content": {
    padding: "0 !important",
  },
  "custom-member-management-modal": {
    ".ant-modal-confirm-paragraph": {
      maxWidth: "100%",
    },
  },
});

/**
 * 拆分字段：弹框嵌套表单，根据第一个表单项选择不同，显示不同的剩余表单项。【表单部分渲染更新：使用shouldUpdate属性；或者使用hidden属性（不会频繁操作DOM，通过css隐藏）】
 * 合并字段：tag标签拖拽、添加、删除
 * @returns
 */
const Test: React.FC = () => {
  console.log("Testing");

  const { styles } = useStyle();
  const [modal, contextHolder] = Modal.useModal();
  const [form] = Form.useForm();

  const classNames = {
    content: styles["my-modal-content"],
  };

  const initFormValues = {
    splitMethod: 1,
    delimiter: "",
    splitPositon: 1,
    splitNum: undefined,
  };

  const onFinish = (values: any, onClose: () => void) => {
    console.log("Success:", values);
    // TODO: 提交的接口：
    // onClose()
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  // useWatch：直接获取form表单中某个字段值
  const splitMethod = Form.useWatch("splitMethod", form);

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

  const CustomForm = ({ onClosed }) => (
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

  const CustomNewForm = ({ onClosed }) => (
    <>
      {/* initialValues={initNewFormValues} */}
      {/* preserve={true} */}
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
        <Form.Item<FieldNewType> hidden={splitMethod === "separator"}>
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
            <InputNumber className="w-[300px]" />
          </Form.Item>
        </Form.Item>
        <Form.Item className="mb-[0]" hidden={splitMethod !== "separator"}>
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
            <InputNumber className="w-[300px]" />
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

  const handleSplitClick = () => {
    console.log("handleSplitClick");

    const { destroy } = modal.info({
      className: styles["custom-member-management-modal"],
      title: (
        <div className="flex justify-between border-0 border-b-[1px] border-solid border-slate-200 px-6">
          <p>拆分字段</p>
          <CloseOutlined onClick={() => destroy()} />
        </div>
      ),
      footer: null,
      width: 600,
      // content: <CustomForm onClosed={() => destroy()} />,
      content: <CustomNewForm onClosed={() => destroy()} />,
      icon: <></>,
    });
  };

  const handleMergeClick = () => {
    console.log("handleMergeClick---");

    const { destroy } = modal.info({
      className: styles["custom-member-management-modal"],
      title: (
        <div className="flex justify-between border-0 border-b-[1px] border-solid border-slate-200 px-6">
          <p>合并字段</p>
          <CloseOutlined onClick={() => destroy()} />
        </div>
      ),
      footer: null,
      width: 600,
      content: <CustomMergeForm onClosed={() => destroy()} />,
      icon: <></>,
    });
  };

  return (
    <>
      <Button onClick={handleSplitClick}>拆分</Button>
      <Button onClick={handleMergeClick}>合并</Button>
      <ConfigProvider
        modal={{
          classNames,
        }}
      >
        <div>{contextHolder}</div>
      </ConfigProvider>
    </>
  );
};
export default Test;
