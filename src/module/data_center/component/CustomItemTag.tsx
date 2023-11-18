import { Tag } from "antd";
import { Item } from "./CustomGroupTags";
import { CloseCircleOutlined, HolderOutlined } from "@ant-design/icons";
import { useSortable } from "@dnd-kit/sortable";

interface Props {
  tag: Item;
  key: string;
  onDelete: (arg: Item) => void;
}

/**
 * 自定义tag标签
 * @returns
 */
const CustomItemTag: React.FC<Props> = ({ tag, onDelete }) => {
  console.log("😈", tag);

  // useSortable：对元素排序
  const { listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: tag.id });

  const commonStyle = {
    display: "inline-block",
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

  const handleClose = (removedTag: Item) => {
    console.log("删除 🍠", removedTag);
    // const newTags = tagLists.filter((tag) => tag.id !== removedTag.id);
    // console.log(newTags);
    // handleTagList(newTags);
    onDelete(removedTag);
  };

  return (
    <Tag
      style={style}
      ref={setNodeRef}
      closable
      bordered={false}
      closeIcon={<CloseCircleOutlined className="ml-[12px] text-[14px]" />}
      onClose={() => handleClose(tag)}
    >
      <span {...listeners} className="text-[14px]">
        <HolderOutlined className="mr-[4px]" />
        {tag.text}
      </span>
    </Tag>
  );
};
export default CustomItemTag;
