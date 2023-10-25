import React, { useEffect, useState } from "react"
import { Button, Col, DatePicker, Drawer, Form, Input, InputNumber, Row, Select, Space } from 'antd';

type formDataType = {
  ruleName: string
  ruleDescription: string
  thresholdType: string
  expression: string
  thresholdSize: number
}

type optionsType = {
  label: string
  value: string
}

const DataQuality: React.FC = ({ id }) => {
  console.log('数据质量', id)

  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  const [initialData, setInitialData] = useState({});
  const [thresholdTypeOptions, setThresholdTypeOptions] = useState<Array<optionsType>>([])
  const [expressionOptions, setExpressionOptions] = useState<Array<optionsType>>([])

  useEffect(() => {
    console.log('useEffect')

    // TODO: 接口获取API
    
    setInitialData({
      ruleName: "11",
      ruleDescription: 'sasa',
      thresholdType: "1",
      expression: "2",
      thresholdSize: undefined,
    })

    setThresholdTypeOptions([
      {
        label: '固定值',
        value: '1'
      },
      {
        label: '固定值1',
        value: '2'
      }
    ])

    setExpressionOptions([
      {
        label: '等于',
        value: '1'
      },
      {
        label: '大于',
        value: '2'
      },
      {
        label: '小于',
        value: '3'
      }
    ])
  }, [id])

  const onChange = (value: number) => {
    console.log('changed', value);
  };

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const handleEditEvent = () => {
    console.log('编辑')
  }

  const handleCancel = () => {
    console.log('取消')
    setOpen(false);
  }

  const handleSubmit = () => {
    console.log('提交')
    form.submit();
  }

  return (
    <>
      <div>数据质量</div>
      <div>
        <Button type="link" onClick={showDrawer}>编辑</Button>
        <Drawer
          title="编辑规则"
          width={500}
          onClose={onClose}
          open={open}
          destroyOnClose
          styles={{
            body: {
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            },
          }}
        >
          <Form layout="horizontal" form={form} labelCol={{ span: 4 }} initialValues={initialData}>
            <Row gutter={16}> 
              <Col span={24}>
                <Form.Item
                  name="ruleName"
                  label="规则名称"
                  rules={[{ required: true}]}
                >
                  <Input placeholder="请输入" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item
                  name="ruleDescription"
                  label="规则描述"
                  rules={[{ required: true}]}
                >
                  <Input.TextArea
                    placeholder="请输入"
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item
                  name="thresholdType"
                  label="阈值类型"
                  rules={[{ required: true }]}
                >
                  <Select placeholder="请选择" options={thresholdTypeOptions} />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item
                  name="expression"
                  label="表达式"
                  rules={[{ required: true }]}
                >
                  <Select placeholder="请选择" options={expressionOptions}>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item
                  name="thresholdSize"
                  label="阈值大小"
                  rules={[{ required: true }]}
                >
                  <div>
                    <InputNumber min={1} max={10} onChange={onChange} />
                    <span className="ml-[4px]">行</span>
                  </div>
                </Form.Item>
              </Col>
            </Row>
          </Form>
          <div className="text-right">
            <Button style={{ margin: '0 8px' }} onClick={handleCancel}>
              取消
            </Button>
            <Button type="primary" onClick={handleSubmit}>
              提交
            </Button>
          </div>
        </Drawer>
      </div>
    </>  
  )
}

export default DataQuality