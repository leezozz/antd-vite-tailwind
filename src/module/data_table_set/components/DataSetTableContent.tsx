import { Button, Col, Form, Input, Row } from "antd";

import { forwardRef, useEffect, useImperativeHandle } from "react";
import CustomTable from "./CustomTable";

const DataSetTableContent = (props, ref) => {
  const [form] = Form.useForm();
  console.log("更新 ☀️");

  useEffect(() => {
    form.setFieldsValue({
      data_name: "",
      show_name: "毛利日均-Sheet1",
      location_directory: "",
      notes: "",
    });
  }, [form]);

  const formValidate = () => {
    console.log("form 校验");
    const submitRes = async () => {
      try {
        await form.validateFields();
        return true;
      } catch (error) {
        return false;
      }
    };
    return {
      validate: submitRes(),
      formValue: form.getFieldsValue(),
      // TODO: 表头修改数据
      headerData: "test",
    };
  };

  useImperativeHandle(ref, () => ({
    formValidate,
  }));

  const handleSubmit = () => {
    console.log("提交", form.getFieldsValue());
  };

  return (
    <>
      <div className="m-[16px] h-[calc(100%-32px)]">
        <Form
          name="dataSetForm"
          form={form}
          autoComplete="off"
          labelAlign="right"
          className="overflow-y-auto"
        >
          <Row>
            <Col span={8}>
              <Form.Item
                label="数据表名"
                name="data_name"
                rules={[{ required: true, message: "请输入数据表名" }]}
                style={{ marginRight: 16 }}
                labelCol={{
                  style: { width: 100 },
                }}
              >
                <Input placeholder="请输入" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="展示名称" name="show_name">
                <Input placeholder="请输入" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="submit"
                style={{ display: "flex", justifyContent: "flex-end" }}
              >
                {/* 提交逻辑：提交form表单的值，包括table表头修改过的值 */}
                <Button type="primary" onClick={handleSubmit}>提交</Button>
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={16}>
              <Form.Item
                label="备注"
                name="notes"
                labelCol={{
                  style: { width: 100 },
                }}
              >
                <Input placeholder="请输入" />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item
            name="table"
            style={{ height: "calc(100% - 112px)", marginBottom: 0 }}
          >
            {/* rules={[
              {
                validator: validateTable
              }
            ]} */}

            <CustomTable />
          </Form.Item>
        </Form>
      </div>
    </>
  );
};
export default forwardRef(DataSetTableContent);
