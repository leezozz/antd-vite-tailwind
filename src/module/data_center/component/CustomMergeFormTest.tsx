import { Button, Form, Input, Select, Space, Tag, theme, Tooltip } from "antd";
import { FC, ReactNode, useEffect, useRef, useState } from "react";
import { TweenOneGroup } from "rc-tween-one";
import { PlusOutlined } from "@ant-design/icons";
import { createStyles } from "antd-style";
import { LabeledValue } from "antd/es/select";
import CustomGroupTags from "./CustomGroupTags";
import CustomItemTag from "./CustomItemTag";

type MergeFieldType = {
  newField: string;
  mergeField: string[];
  fieldSeparator: string;
};

interface PropsType {
  onClosed: () => void;
}

type Item = {
  id: string;
  text: string;
};

interface OptionsType {
  value: string;
  label: string;
}

const useStyle = createStyles({
  "custom-tag-mb-style": {
    marginBottom: 0,
  },
  "custom-tag-style": {
    marginBottom: "16px!important",
  },
});

const CustomMergeFormTest: React.FC<PropsType> = () => {
  const [form] = Form.useForm();

  const initMergeFormValues = {
    newField: "",
    mergeField: [],
    fieldSeparator: "",
  };

  // tag标签属性、事件
  const { token } = theme.useToken();
  const [selectVisible, setSelectVisible] = useState(false);
  const [selectValue, setSelectValue] = useState<LabeledValue | object>({});
  // tag标签下拉数据
  const [options, setOptions] = useState<Array<OptionsType>>([]);
  const [items, setItems] = useState<Item[]>([
    {
      id: "1",
      text: "Tag 1",
    },
    {
      id: "Tag 2",
      text: "Tag 2",
    },
    {
      id: "Tag 3",
      text: "Tag 3",
    },
  ]);

  useEffect(() => {
    setOptions([
      { value: "1", label: "Tag 1" },
      { value: "lucy", label: "Lucy标签" },
      { value: "111", label: "回复看到了萨菲隆啦啦啦啦啦" },
      { value: "Yiminghe", label: "yiminghe" },
      { value: "disabled", label: "Disabled" },
    ]);
  }, []);

  const showSelect = () => {
    setSelectVisible(true);
  };

  const handleChange = (value: { value: string; label: string }) => {
    console.log("🌲", value, selectValue, items);
    // 选择重复的tag标签不会添加，这里会过滤
    if (value && !items.some((arg) => arg?.id === value.value)) {
      setSelectValue({
        label: value.label,
        value: value.value,
      });
      setItems([
        ...items,
        {
          id: value.value,
          text: value?.label,
        },
      ]);
    }
    setSelectVisible(false);
    setSelectValue({});
  };

  const handleBlur = () => {
    setSelectVisible(false);
  };

  const tagPlusStyle: React.CSSProperties = {
    marginBottom: "8px",
    padding: "8px 16px",
    fontSize: "14px",
    background: token.colorBgContainer,
    borderStyle: "dashed",
    borderColor: "#3A86EF",
    color: "#3A86EF",
  };

  const handleFinish = (values: any) => {
    console.log("Success:", values);
    // TODO: 提交的接口：
    // onClose()
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const handleDelete = (value: Item) => {
    console.log("删除事件", value);
    const newTags = items.filter((tag) => tag.id !== value.id);
    console.log(newTags);
    setItems(newTags);
  };

  return (
    <>
      <Form
        name="merge"
        form={form}
        initialValues={initMergeFormValues}
        preserve={false}
        labelCol={{
          style: { width: 120 },
        }}
        onFinish={handleFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item<MergeFieldType>
          label="新字段名称"
          name="newField"
          labelCol={{
            style: { width: 120 },
          }}
          rules={[{ required: true }]}
        >
          <Input className="w-[300px]" />
        </Form.Item>
        <Form.Item<MergeFieldType>
          label="合并字段"
          name="mergeField"
          labelCol={{
            style: { width: 120 },
          }}
          rules={[{ required: true }]}
          className="mb-[12px]"
        >
          <CustomGroupTags
            tagLists={items}
            handleTagList={setItems}
            renderExtra={
              // {/* 显示：添加，下拉框 */}
              selectVisible ? (
                <Select
                  labelInValue
                  value={selectValue}
                  style={{ width: 120, height: "38px", marginBottom: "8px" }}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  options={options}
                />
              ) : (
                <Tag onClick={showSelect} style={tagPlusStyle}>
                  <PlusOutlined /> 添加
                </Tag>
              )
            }
          >
            {items.map((item) => (
              <CustomItemTag tag={item} key={item.id} onDelete={handleDelete} />
            ))}
          </CustomGroupTags>
        </Form.Item>
        <Form.Item<MergeFieldType>
          label="字段分隔符"
          name="fieldSeparator"
          labelCol={{
            style: { width: 120 },
          }}
        >
          <Input className="w-[300px]" />
        </Form.Item>
      </Form>
    </>
  );
};

export default CustomMergeFormTest;
