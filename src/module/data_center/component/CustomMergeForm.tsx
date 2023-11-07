import { Button, Form, Input, Select, Space, Tag, theme } from "antd"
import { DndContext, PointerSensor, closestCenter, useSensor, useSensors } from '@dnd-kit/core';
import type { DragEndEvent } from '@dnd-kit/core/dist/types/index';
import { FC, useEffect, useRef, useState, Tooltip } from "react";
import type { InputRef } from 'antd';
import { TweenOneGroup } from 'rc-tween-one';

import {
  SortableContext,
  arrayMove,
  horizontalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CloseCircleOutlined, HolderOutlined, PlusOutlined } from "@ant-design/icons";

type MergeFieldType = {
  newField: string;
  mergeField: string[];
  fieldSeparator: string;
}

interface PropsType {
  onClosed: () => void
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


const CustomMergeForm: React.FC<PropsType> = ({
  onClosed
}) => {

  const [form] = Form.useForm();

  const initMergeFormValues = {
    newField: '',
    mergeField: [],
    fieldSeparator: ''
  }

  const { token } = theme.useToken();
  const [tags, setTags] = useState(['Tag 1', 'Tag 2', 'Tag 3']);
  const [selectVisible, setselectVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [selectValue, setSelectValue] = useState('');
  const inputRef = useRef<InputRef>(null);
  const [options, setOptions] = useState<Array<OptionsType>>([])

  const [items, setItems] = useState<Item[]>([
    {
      id: 'Tag 1',
      text: 'Tag 1',
    },
    {
      id: 'Tag 2',
      text: 'Tag 2',
    },
    {
      id: 'Tag 3',
      text: 'Tag 3',
    },
  ]);
  // const sensors = useSensors(useSensor(PointerSensor, {
  //   activationConstraint: {
  //     delay: 100,
  //     tolerance: 0,
  //   }
  // }));
  const sensors = useSensors(useSensor(PointerSensor));
  const handleDragEnd = (event: DragEndEvent) => {
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
    console.log('DraggableTag-----props', props)
    const { tag } = props;
    const { listeners, setNodeRef, setActivatorNodeRef, transform, transition, isDragging } = useSortable({ id: tag.id });
  
    const commonStyle = {
      display: 'inline-block',
      marginRight: '8px',
      padding: '8px',
      borderRadius: '4px',
      backgroundColor: '#EAEDF2',
      cursor: 'move',
      transition: 'unset', // Prevent element from shaking after drag
    };
  
    const style = transform
      ? {
          ...commonStyle,
          transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
          transition: isDragging ? 'unset' : transition, // Improve performance/visual effect when dragging
        }
      : commonStyle;
  
    return (
      
      <Tag
        style={style}
        ref={setNodeRef}
        closable
        onClose={() => handleClose(tag)}
      >
        <span {...listeners}><HolderOutlined />{tag.text}</span>
      </Tag>
    );
  };



  useEffect(() => {
    setOptions([
      { value: 'Tag 1', label: 'Tag 1' },
      { value: 'lucy', label: 'Lucy' },
      { value: 'Yiminghe', label: 'yiminghe'},
      { value: 'disabled', label: 'Disabled'},
    ])
  }, [])

  useEffect(() => {
    console.log('useEffect+++++', selectVisible)
    if (selectVisible) {
      console.log('focus------', selectVisible)
      inputRef.current?.focus();
    }
  }, [selectVisible]);

  const handleClose = (removedTag: Item) => {
    console.log('删除 🍠', removedTag)
    const newTags = items.filter((tag) => tag.id !== removedTag.id);
    console.log(newTags);
    // setTags(newTags);
    setItems(newTags)
  };

  const showInput = () => {
    setselectVisible(true);
  };
  
  const handleChange = (value: string) => {
    console.log('🌲', value, selectValue, items)
    // setSelectValue(value)
    // if (value && tags.indexOf(value) === -1) {
    if (value && !items.some((arg) => arg?.id === value)) {
      setItems([...items, {
        id: value,
        text: value
      }]);
    }
    setselectVisible(false);
    setSelectValue('')
  }
  
  const handleBlur = () => {
    console.log('################################')
    setselectVisible(false);
  }

  const tagPlusStyle: React.CSSProperties = {
    background: token.colorBgContainer,
    borderStyle: 'dashed',
  };

  const CustomTags = () => {
    console.log('重新渲染了吗 😈')
    
    return (
      <>
        <div style={{ marginBottom: 16 }}>
          <TweenOneGroup
            enter={{
              scale: 0.8,
              opacity: 0,
              type: 'from',
              duration: 100,
            }}
            onEnd={(e) => {
              if (e.type === 'appear' || e.type === 'enter') {
                (e.target as any).style = 'display: inline-block';
              }
            }}
            leave={{ opacity: 0, width: 0, scale: 0, duration: 200 }}
            appear={false}
          >
            {/* {tagChild} */}
            <DndContext sensors={sensors} onDragEnd={handleDragEnd} collisionDetection={closestCenter}>
              <SortableContext items={items} strategy={horizontalListSortingStrategy}>
                {items.map((item) => (
                  <DraggableTag tag={item} key={item.id} />
                ))}
              </SortableContext>
            </DndContext>
          </TweenOneGroup>
        </div>
        {selectVisible ? (
          <Select
            defaultValue=""
            value={selectValue}
            style={{ width: 120 }}
            onChange={handleChange}
            onBlur={handleBlur}
            options={options}
          />
        ) : (
          <Tag onClick={showInput} style={tagPlusStyle}>
            <PlusOutlined /> 添加
          </Tag>
        )}
      </>  
    )
  }
  

  const handleFinish = (values: any) => {
    console.log('Success:', values);
    // TODO: 提交的接口：
    // onClose()
   };
  
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <>
      <Form
        name="merge"
        form={form}
        initialValues={initMergeFormValues}
        preserve={false}
        labelCol={{
          style: { width: 120 }
        }}
        onFinish={handleFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item<MergeFieldType>
          label="新字段名称"
          name="newField"
          labelCol={{
            style: { width: 120 }
          }}
          rules={[{ required: true }]}
        >
          <Input className="w-[300px]"/>
        </Form.Item>
        <Form.Item<MergeFieldType>
          label="合并字段"
          name="mergeField"
          labelCol={{
            style: { width: 120 }
          }}
          rules={[{ required: true }]}
        >
          <CustomTags />
        </Form.Item>
        <Form.Item<MergeFieldType>
          label="字段分隔符"
          name="fieldSeparator"
          labelCol={{
            style: { width: 120 }
          }}
        >
          <Input className="w-[300px]"/>
        </Form.Item>
      </Form>
    </>
  )
}

export default CustomMergeForm