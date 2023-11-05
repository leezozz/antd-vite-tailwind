import { CloseOutlined } from "@ant-design/icons";
import { Button, ConfigProvider, Form, Input, InputNumber, Modal, Radio } from "antd"
import { createStyles } from "antd-style";
import { useEffect, useState } from "react";

type FieldType = {
  splitMethod: string;
  delimiter: string;
  splitPositon: string;
  splitNum: string | undefined;
};

const useStyle = createStyles({
  "my-modal-content": {
    padding: "0 !important",
  },
  'custom-member-management-modal': {
    '.ant-modal-confirm-paragraph': {
      maxWidth: '100%',
    }
  }
})

const Test: React.FC = () => {
  console.log('Testing')

  const {styles} = useStyle()
  const [modal, contextHolder] = Modal.useModal();
  const [form] = Form.useForm();

  const classNames = {
    content: styles["my-modal-content"],
  };

  const initFormValues = {
    splitMethod: 1,
    delimiter: '',
    splitPositon: 1,
    splitNum: undefined
  }

   const onFinish = (values: any, onClose: () => void) => {
    console.log('Success:', values);
    // TODO: 提交的接口：
    // onClose()
   };
  
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  // useWatch：直接获取form表单中某个字段值
  const splitMethod = Form.useWatch('splitMethod', form);
  
  useEffect(() => {
    console.log('拆分方式', splitMethod)
  }, [splitMethod])


  const handleSubmit = () => {
    console.log('提交', form.getFieldsValue())
    form.submit();
  }

  const CustomForm = ({ onClosed }) => (
    <>
      <Form
        name="basic"
        form={form}
        initialValues={initFormValues}
        preserve={false}
        labelCol={{ span: 4 }}
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
        <Form.Item shouldUpdate={(prevValue, curValue) => prevValue.splitMethod !== curValue.splitMethod}>
          {
            ({ getFieldValue }) => {
              const diffForm = getFieldValue('splitMethod')
              if (diffForm === 1) {
                return <>
                  <Form.Item<FieldType>
                    label="分隔符"
                    name="delimiter"
                    labelCol={{ span: 4 }}
                    rules={[{ required: true }]}
                  >
                    <Input className="w-[300px]"/>
                  </Form.Item>
                  <Form.Item<FieldType>
                    label="拆分"
                    name="splitPositon"
                    labelCol={{ span: 11 }}
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
                    {/* TODO: 添加后缀 */}
                    <InputNumber min={1} />
                  </Form.Item>
                </> 
              } else {
                return <>
                  <Form.Item<FieldType>
                    label="拆分位置"
                    name="splitPositon"
                    labelCol={{ span: 11 }}
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
                    {/* TODO: 添加后缀 */}
                    <InputNumber min={1} />
                  </Form.Item>
                </>
              }
            }
          }
        </Form.Item>
      </Form>
      <div className="flex justify-end space-x-3 h-[33px] px-6 py-3 border-0 border-t-[1px] border-slate-200 border-solid">
        <Button type="primary" onClick={handleSubmit}>
          提交
        </Button>
        <Button style={{ margin: '0 8px' }} onClick={() => onClosed()}>
          取消
        </Button>
      </div>
    </>
  )

  const handleClick = () => { 
    console.log('Click')
        
    const { destroy } = modal.info({
      className: styles['custom-member-management-modal'],
      title: (
        <div className="flex justify-between px-6 border-0 border-b-[1px] border-slate-200 border-solid">
          <p>拆分字段</p>
          <CloseOutlined onClick={() => destroy()} />
        </div>
      ),
      footer: null,
      width: 600,
      content: <CustomForm onClosed={ () => destroy() } />,
      icon: <></>,
    })
  }

  return (
    <>
      <Button onClick={handleClick}>拆分</Button>
      <ConfigProvider
          modal={{
            classNames,
          }}
        >
          <div>{contextHolder}</div>
        </ConfigProvider>
    </>
  )
}
export default Test