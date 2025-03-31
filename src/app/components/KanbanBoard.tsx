'use client'
import {
  DndContext,
  DragCancelEvent,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  UniqueIdentifier,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import {
  sortableKeyboardCoordinates,
} from '@dnd-kit/sortable'
import DroppableContainer from './DroppableContainer';
import  ItemOverlay  from './IssueOverlay';
import IssueLoader from './IssueLoader'
import RepoHeader from './RepoHeader'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { dragEnd, dragOver, setActiveId } from '../store/slices/issuesSlice';


export default function KanbanBoard() {

  const dispatch = useDispatch<AppDispatch>()
  const { containers, loading, error } = useSelector(
    (state: RootState) => state.issues
  );

  const activeId = useSelector((state: RootState) => state.issues.activeId);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        delay: 100,
        tolerance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )
  function handleDragStart(event: DragStartEvent) {
    dispatch(setActiveId((event.active.id)))
  }

  function handleDragCancel(event: DragCancelEvent) {
    void event
    dispatch(setActiveId(null))
  }

  function handleDragOver(event: DragOverEvent) {
    const { active, over } = event    
    if (active && over) {
    dispatch(dragOver({ activeId: active.id, overId: over.id }));
    }
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (!over) {
      dispatch(setActiveId(null))
      return
    }
    if (event.active && event.over) {
    dispatch(dragEnd({ activeId: active.id, overId: over.id}));
    }
  }
  const getActiveIssue = () => {
    for (const container of containers) {
      const issue = container.items.find((issue) => issue.id === activeId);
      if (issue) return issue;
    }
    return null;
  };

  return (
    <div className="mx-auto max-w-[1400px] py-8 bg-white">
      <h2 className="mb-4 text-xl font-bold dark:text-white">Kanban Board</h2>
      
      <IssueLoader/>
      <RepoHeader />
      <DndContext
        sensors={sensors}
        onDragCancel={handleDragCancel}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <div className="grid gap-4 md:grid-cols-3 p-6 text-center">
          {containers.map((container) => (
            <DroppableContainer
              key={container.id}
              id={container.id}
              title={container.title}
              items={container.items}
            />
          ))}
        </div>
        <DragOverlay
          dropAnimation={{
            duration: 150,
            easing: 'cubic-bezier(0.18, 0.67, 0.6, 1.22',
          }}
        >
          {activeId ? (
            <ItemOverlay issue={getActiveIssue()} />
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  )
}