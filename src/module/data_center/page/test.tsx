import { CloseOutlined } from "@ant-design/icons";
import { Button, ConfigProvider, Form, Modal, Space } from "antd";
import { createStyles } from "antd-style";
import CustomMergeForm from "../component/CustomMergeForm";
import CustomSplitForm from "../component/CustomSplitForm";
import CustomSplitNewForm, {
  FieldNewType,
} from "../component/CustomSplitNewForm";
import CustomMergeFormTest from "../component/CustomMergeFormTest";

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
  const [form] = Form.useForm();
  const [modal, contextHolder] = Modal.useModal();
  const classNames = {
    content: styles["my-modal-content"],
  };

  const handleSplitClick = () => {
    console.log("handleSplitClick");

    const handleFinished = (value: FieldNewType) => {
      console.log("handleFinished", value);
      destroy();
    };

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
      // 使用 shouldUpdate属性 部分更新form表单
      // content: <CustomSplitForm onClosed={() => destroy()} />,
      // 使用 hideen属性 部分显示form表单
      content: (
        <CustomSplitNewForm
          form={form}
          onClosed={() => destroy()}
          onFinished={handleFinished}
        />
      ),
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

  const handleTestTagClick = () => {
    console.log("handleTestTagClick---");

    const { destroy } = modal.info({
      className: styles["custom-member-management-modal"],
      title: (
        <div className="flex justify-between border-0 border-b-[1px] border-solid border-slate-200 px-6">
          <p>Test</p>
          <CloseOutlined onClick={() => destroy()} />
        </div>
      ),
      footer: null,
      width: 600,
      content: <CustomMergeFormTest onClosed={() => destroy()} />,
      icon: <></>,
    });
  };

  return (
    <>
      <Space>
        <Button onClick={handleSplitClick}>拆分</Button>
        <Button onClick={handleMergeClick}>合并</Button>
        <Button onClick={handleTestTagClick}>
          合并---测试抽离的公用tag组件
        </Button>
      </Space>
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
