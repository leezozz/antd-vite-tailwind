import { Button, Form, Input, Select, Space, Tag, theme, Tooltip } from "antd";
import {
  DndContext,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import type { DragEndEvent } from "@dnd-kit/core/dist/types/index";
import { FC, ReactNode, useEffect, useRef, useState } from "react";
import { TweenOneGroup } from "rc-tween-one";

import {
  SortableContext,
  arrayMove,
  horizontalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import {
  CloseCircleOutlined,
  HolderOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { createStyles } from "antd-style";
import { LabeledValue } from "antd/es/select";

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

type DraggableTagProps = {
  tag: Item;
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

const CustomMergeForm: React.FC<PropsType> = () => {
  const { styles } = useStyle();
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
  // sensors传感器：自动检测不同的拖拽交互
  // PointerSensor: 检测指针(鼠标/触摸)的事件,如按下、移动、抬起等
  const sensors = useSensors(useSensor(PointerSensor));
  const handleDragEnd = (event: DragEndEvent) => {
    // active：当前拖动的元素
    const { active, over } = event;
    if (!over) return;

    if (active.id !== over.id) {
      setItems((data) => {
        const oldIndex = data.findIndex((item) => item.id === active.id);
        const newIndex = data.findIndex((item) => item.id === over.id);

        return arrayMove(data, oldIndex, newIndex);
      });
    }
  };
  const DraggableTag: FC<DraggableTagProps> = (props) => {
    console.log("DraggableTag-----props", props);
    const { tag } = props;
    // useSortable：对元素排序
    // listeners：激活器的DOM节点，拖拽把手
    const { listeners, setNodeRef, transform, transition, isDragging } =
      useSortable({ id: tag.id });

    const commonStyle = {
      display: "inline-flex",
      marginRight: "8px",
      marginBottom: "8px",
      padding: "8px",
      borderRadius: "4px",
      backgroundColor: "#EAEDF2",
      cursor: "move",
      transition: "unset", // 防止元素拖动后晃动
    };

    const style = transform
      ? {
          ...commonStyle,
          transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
          transition: isDragging ? "unset" : transition, // 提高拖动时的性能/视觉效果
        }
      : commonStyle;

    return (
      <Tag
        style={style}
        ref={setNodeRef}
        closable
        bordered={false}
        closeIcon={<CloseCircleOutlined className="ml-[12px] text-[14px]" />}
        onClose={() => handleClose(tag)}
      >
        {/* 没有tooltip提示 */}
        {/* <span {...listeners} className="text-[14px]">
          <HolderOutlined className="mr-[4px]" />
          {tag.text}
        </span> */}
        {/* 有tooltip提示 */}
        <div {...listeners} className="flex text-[14px]">
          <HolderOutlined className="mr-[4px]" />
          <Tooltip title={tag.text}>
            <span className="inline-block max-w-[200px] truncate">
              {tag.text}
            </span>
          </Tooltip>
        </div>
      </Tag>
    );
  };

  useEffect(() => {
    setOptions([
      { value: "1", label: "Tag 1" },
      { value: "lucy", label: "Lucy标签" },
      { value: "111", label: "回复看到了萨菲隆啦啦啦啦啦" },
      { value: "Yiminghe", label: "yiminghe" },
      { value: "disabled", label: "Disabled" },
    ]);
  }, []);

  const handleClose = (removedTag: Item) => {
    console.log("删除 🍠", removedTag);
    const newTags = items.filter((tag) => tag.id !== removedTag.id);
    console.log(newTags);
    setItems(newTags);
  };

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

  // 自定义tags标签
  const CustomTags = () => {
    console.log("重新渲染了吗 😈");

    return (
      <>
        <div className="inline-block">
          <TweenOneGroup
            enter={{
              scale: 0.8,
              opacity: 0,
              type: "from",
              duration: 100,
            }}
            onEnd={(e) => {
              if (e.type === "appear" || e.type === "enter") {
                (e.target as any).style = "display: inline-block";
              }
            }}
            leave={{ opacity: 0, width: 0, scale: 0, duration: 200 }}
            appear={false}
          >
            {/* 定制可拖动元素和可拖动区域的行为；配置传感器sensors */}
            {/* collisionDetection用于配置拖拽时的碰撞检测方式，基于拖拽项的中心点到放置目标的最近距离来检测碰撞 */}
            <DndContext
              sensors={sensors}
              onDragEnd={handleDragEnd}
              collisionDetection={closestCenter}
            >
              {/* strategy：配置排序策略。horizontalListSortingStrategy：表示水平列表的排序策略 */}
              <SortableContext
                items={items}
                strategy={horizontalListSortingStrategy}
              >
                {items.map((item) => (
                  <DraggableTag tag={item} key={item.id} />
                ))}
                {/* 显示：添加，下拉框 */}
                {selectVisible ? (
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
                )}
              </SortableContext>
            </DndContext>
          </TweenOneGroup>
        </div>
      </>
    );
  };

  const handleFinish = (values: any) => {
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
          <CustomTags />
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

export default CustomMergeForm;
