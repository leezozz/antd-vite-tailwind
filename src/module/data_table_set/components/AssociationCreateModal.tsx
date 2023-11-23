import { Button, Divider, Form, Input, Select } from "antd";
import React, { useEffect, useState } from "react";
import { createStyles, cx } from "antd-style";
import { useForm } from "antd/es/form/Form";
import { PauseOutlined, PlusOutlined } from "@ant-design/icons";

interface Props {
  formData: any;
  onFinish: (value: any) => void;
  onClosed: () => void;
}

type FieldType = {
  quick: {
    data_name: string;
    show_name: string;
    // data_sheetA?: string;
    // data_fieldA?: string;
    // data_sheetB?: string;
    // data_fieldB?: string;
    rela_mode: string;
    illustrate: string;
  };
  sql: {
    data_name: string;
    show_name: string;
    sqlEdit: string;
  };
};

const useStyle = createStyles({
  "create-container-item": {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "245px",
    height: "52px",
    cursor: "pointer",
    borderRadius: "4px",
    border: "1px solid #DEE2EA",
  },
  "current-height-create": {
    color: "#3a86ef",
    background: "#eaf2fd",
    border: "1px solid #3a86ef",
  },
});

const AssociationCreateModal: React.FC<Props> = ({
  formData,
  onFinish,
  onClosed,
}) => {
  const { styles } = useStyle();
  const { TextArea } = Input;
  const [form] = Form.useForm();
  const [checkNick, setCheckNick] = useState(false);
  const [checkSqlNick, setCheckSqlNick] = useState(false);
  const [active, setActive] = useState("quick");

  console.log("😯", formData, onFinish, onClosed);

  useEffect(
    () => {
      console.log('设置表单初始值')
      form.setFieldsValue({
        quick: {
          data_name: '',
          show_name: '',
          // data_sheetA?: string;
          // data_fieldA?: string;
          // data_sheetB?: string;
          // data_fieldB?: string;
          rela_mode: '',
          illustrate: '',
        },
        sql: {
          data_name: '',
          show_name: '',
          sqlEdit: '',
        }
      })
    }, [form]
  )

  const handleSubmit = () => {
    console.log('提交', form.getFieldsValue())
    // form.submit()

    if (active === 'quick') {
      // setCheckNick(true)
      console.log('quick 校验')
      form.validateFields(['quick.data_name'])
      .then((values) => {
        console.log('quick 校验通过', values)
        onFinish(form.getFieldsValue().quick);
        })
        .catch((error) => {
          console.log('校验未通过', error)
        })
    }

    if (active === 'sql') {
      // setCheckSqlNick(true)
      form.validateFields(['sql.data_name'])
        .then((values) => {
          console.log('sql 校验通过', values)
          onFinish(form.getFieldsValue().sql);
        })
        .catch(() => {
          console.log('校验未通过')
        })
    }
  }

  const handleFinish = (values: any) => {
    console.log("Success:", values);
    // const partialValues = {
    //   username: values.username
    // }
    
    // submitPartialForm(partialValues);
  };


  return (
    <>
      <div className="flex justify-between px-[24px] py-[16px]">
        <div
          className={cx({
            [styles["create-container-item"]]: true,
            [styles["current-height-create"]]: active === "quick",
          })}
          onClick={() => setActive("quick")}
        >
          <PlusOutlined />
          快捷创建
        </div>
        <div
          className={cx({
            [styles["create-container-item"]]: true,
            [styles["current-height-create"]]: active === "sql",
          })}
          onClick={() => setActive("sql")}
        >
          <PauseOutlined />
          SQL创建
        </div>
      </div>
      <Divider className="bg-[#EFF1F4] m-[0]" />
      <Form
        name="associationCreate"
        form={form}
        onFinish={handleFinish}
        labelAlign="right"
        className="pt-[16px] px-[24px]"
      >
        <Form.Item<FieldType> hidden={active !== "quick"}>
          <Form.Item<FieldType>
            style={{ marginTop: 0}}
            label="数据表名"
            name={["quick", "data_name"]}
            labelCol={{
              style: { width: 100 },
            }}
            rules={[{ required: true }]}
          >
            <Input placeholder="请输入" />
          </Form.Item>
          <Form.Item<FieldType>
            label="展示名称"
            labelCol={{
              style: { width: 100 },
            }}
            name={["quick", "show_name"]}
          >
            <Input placeholder="请输入" />
          </Form.Item>
          {/* TODO:熟悉逻辑 */}
          {/* <Form.Item label="数据表A" style={{ marginTop: 0, marginBottom: 16 }}>
            <Form.Item<FieldType>
              name="data_sheetA"
              style={{
                display: "inline-block",
                width: 160,
                marginRight: 8,
              }}
            >
              <Select style={{ width: 160 }} placeholder="请选择数据表">
                <Select.Option value="sheet1">数据表1</Select.Option>
                <Select.Option value="sheet2">数据表2</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item<FieldType>
              name="data_fieldA"
              style={{
                display: "inline-block",
                width: 160,
              }}
            >
              <Select style={{ width: 160 }} placeholder="请选择字段">
                <Select.Option value="field1" placeholder="请输入">
                  数据字段1
                </Select.Option>
                <Select.Option value="field2" placeholder="请输入">
                  数据字段2
                </Select.Option>
              </Select>
            </Form.Item>
          </Form.Item>
          <Form.Item label="数据表B" style={{ marginTop: 0, marginBottom: 16 }}>
            <Form.Item<FieldType>
              name="data_sheetB"
              style={{
                display: "inline-block",
                width: 160,
                marginRight: 8,
              }}
            >
              <Select placeholder="请选择数据表">
                <Select.Option value="sheet1">数据表1</Select.Option>
                <Select.Option value="sheet2">数据表2</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item<FieldType>
              name="data_fieldB"
              style={{
                display: "inline-block",
                width: 160,
              }}
            >
              <Select placeholder="请选择字段">
                <Select.Option value="field1">数据字段1</Select.Option>
                <Select.Option value="field2">数据字段2</Select.Option>
              </Select>
            </Form.Item>
          </Form.Item> */}
          <Form.Item<FieldType>
            label="关联方式"
            labelCol={{
              style: { width: 100 },
            }}
            name={["quick", "rela_mode"]}
          >
            <Select placeholder="请选择关联方式">
              <Select.Option value="mode1">数据字段1</Select.Option>
              <Select.Option value="mode2">数据字段2</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item<FieldType>
            label="说明"
            labelCol={{
              style: { width: 100 },
            }}
            name={["quick", "illustrate"]}
            style={{ marginTop: 0, marginBottom: 0 }}
          >
            <TextArea
              rows={4}
              style={{ resize: "none" }}
              placeholder="请输入"
            />
          </Form.Item>
        </Form.Item>
        <Form.Item<FieldType> hidden={active !== "sql"} labelCol={{
          style: { width: 100 },
        }}>
          <Form.Item<FieldType>
            label="数据表名"
            name={["sql", "data_name"]}
            labelCol={{
              style: { width: 100 },
            }}
            rules={[{ required: checkSqlNick }]}
          >
            <Input placeholder="请输入" />
          </Form.Item>
          <Form.Item<FieldType>
            label="展示名称"
            name={["sql", "show_name"]}
            labelCol={{
              style: { width: 100 },
            }}
          >
            <Input placeholder="请输入" />
          </Form.Item>
          <Form.Item<FieldType>
            label="SQL编辑"
            name={["sql", "sqlEdit"]}
            labelCol={{
              style: { width: 100 },
            }}
            rules={[{ required: checkSqlNick }]}
            style={{ marginTop: 0, marginBottom: 0 }}
          >
            <TextArea
              rows={11}
              style={{ resize: "none" }}
              placeholder="请输入"
            />
          </Form.Item>
        </Form.Item>
      </Form>
      <div className="flex justify-end space-x-3 px-6 py-3 border-0 border-t-[1px] border-slate-200 border-solid">
        <Button type="primary" htmlType="submit" onClick={handleSubmit}>
          提交
        </Button>
        <Button htmlType="button" onClick={onClosed}>
          取消
        </Button>
      </div>
    </>
  );
};
export default AssociationCreateModal