import {useState, useEffect} from 'react';
import {
    DndContext,
    PointerSensor,
    KeyboardSensor,
    useSensor,
    useSensors,
    closestCenter,
} from "@dnd-kit/core";

import{
    SortableContext,
    useSortable,
    arrayMove,
    verticalListSortingStrategy,
    sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";

import {CSS} from "@dnd-kit/utilities";

export default function DraggableBlocks ({blocks, onChange}){
    const [items, setItems] = useState([]);

    useEffect(() => {

        if(Array.isArray(blocks)){
            setItems(blocks);
            onChange?.(blocks);
        }
        else{
            setItems([]);
            onChange?.([]);
        }
    }, [blocks]);

    const sensors = useSensors(
        useSensor(PointerSensor, {activationConstraint: {distance: 6}}),
        // useSensors(KeyboardSensor, {coordinateGetter: sortableKeyboardCoordinates })
    );

    function handleDragEnd(event){
        const {active, over} = event;
        if(!over || active.id === over.id) return;

        setItems((prev)=> {
           const oldIndex = prev.findIndex((b) => b.id === active.id);
           const newIndex = prev.findIndex((b) => b.id === over.id);
           const next = arrayMove(prev, oldIndex, newIndex);
           onChange?.(next);
           return next;
        });
    }

    if(!items.length){
        return (
            <p>No Blocks Found</p>
        );
    }


return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={items.map((block) => block.id)} strategy={verticalListSortingStrategy}>
            <ul className="space-y-4">
                {items.map((block) => (
                    <SortableBlock key={block.id} id={block.id} text={block.text} />
                ))}
            </ul>
        </SortableContext>
    </DndContext>
)

}

function SortableBlock({id, text}) {

    const {setNodeRef, attributes, listeners,transform,transition, isDragging} = useSortable({id});

    const style = { transform: CSS.Transform.toString(transform), transition, };

    return(
        <li ref={setNodeRef} style={style}>
            <div className={["rounded-lg border bg-white p-4 shadow-sm flex items-start gap-3",
            isDragging ? "opacity-70": "",
            ].join(" ")}
                {...attributes}
                {...listeners}
                >
                <span className="cursor-grab select-none text-gray-400">=</span>
                <p className="w-full rounded-md bg-neutral-500 px-3 py-2 text-white font-mono whitespace-pre-wrap break-words">
                    {text}
                </p>


            </div>
        </li>

    );
}