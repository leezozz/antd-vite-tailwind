import {
  DndContext,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import type { DragEndEvent } from "@dnd-kit/core/dist/types/index";
import { FC, useEffect, useRef, useState, Tooltip, ReactElement } from "react";
import { TweenOneGroup } from "rc-tween-one";
import {
  SortableContext,
  arrayMove,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";

export type Item = {
  id: string;
  text: string;
};

interface Props {
  tagLists: Item[];
  children: Element[];
  renderExtra: ReactElement;
  handleTagList: (data: Item[]) => void;
}

/**
 *
 * 公用自定义tags标签
 *
 * */
const CustomGroupTags: React.FC<Props> = ({
  tagLists,
  handleTagList,
  children,
  renderExtra,
}) => {
  console.log("tagLists", tagLists, handleTagList);

  const sensors = useSensors(useSensor(PointerSensor));
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    if (active.id !== over.id) {
      handleTagList((data: Item[]) => {
        const oldIndex = data.findIndex((item) => item.id === active.id);
        const newIndex = data.findIndex((item) => item.id === over.id);

        return arrayMove(data, oldIndex, newIndex);
      });
    }
  };

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
          <DndContext
            sensors={sensors}
            onDragEnd={handleDragEnd}
            collisionDetection={closestCenter}
          >
            <SortableContext
              items={tagLists}
              strategy={horizontalListSortingStrategy}
            >
              {children}
              {renderExtra}
            </SortableContext>
          </DndContext>
        </TweenOneGroup>
      </div>
    </>
  );
};
export default CustomGroupTags;
