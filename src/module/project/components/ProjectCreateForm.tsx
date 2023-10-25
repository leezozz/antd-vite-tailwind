import React, { useState } from "react";
import { Button, Form, Input, Select, Col, Row, DatePicker } from "antd";
import { Dayjs } from "dayjs";

export interface CreateFormData {
  name: string;
  id: string;
  time: Dayjs;
  category: string;
  director: string;
  description: string;
}

interface ProjectCreateFormProps {
  data?: CreateFormData;
  type: string;
  onFinish: (values: CreateFormData) => void;
  onClosed: () => void;
}

const dateFormat = 'YYYY-MM-DD';

const ProjectCreateForm: React.FC<ProjectCreateFormProps> = ({
  onFinish,
  onClosed,
}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const handleSubmit = () => {
    form.submit();
  };

  const handleFinish = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onFinish(form.getFieldsValue());
    }, 1000);
  };

  return (
    <div>
      <Form
        className="border-b px-6"
        layout={"vertical"}
        form={form}
        name="control-ref"
        onFinish={handleFinish}
        initialValues={{
          name: "",
          id: "2020BJIT0011",
          time: undefined,
          category: undefined,
          director: "张三",
          description: "",
        }}
      >
        <Row gutter={24}>
          <Col span={24}>
            <Form.Item
              name="name"
              label="项目名称"
              rules={[{ required: true }]}
            >
              <Input placeholder="请输入" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={12}>
            <Form.Item name="id" label="项目编号" rules={[{ required: true }]}>
              <Input placeholder="请输入" disabled />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="time"
              label="立项时间"
              rules={[{ required: true }]}
            >
              <DatePicker format={dateFormat} className="w-full" placeholder="请选择" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={12}>
            <Form.Item
              name="category"
              label="行业分类"
              rules={[{ required: true }]}
            >
              <Select
                placeholder="请选择"
                options={[
                  { value: "default", label: "默认" },
                  { value: "categoryA", label: "分类A" },
                  { value: "categoryB", label: "分类B" },
                ]}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="director" label="负责经理">
              <Input placeholder="请输入" disabled />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Form.Item name="description" label="立项说明">
              <Input.TextArea placeholder="请输入" />
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <div className="flex justify-end space-x-3 px-6 py-3">
        <Button htmlType="button" onClick={onClosed}>
          取消
        </Button>
        <Button
          type="primary"
          htmlType="submit"
          onClick={handleSubmit}
          loading={loading}
        >
          新建
        </Button>
      </div>
    </div>
  );
};

export default ProjectCreateForm;
