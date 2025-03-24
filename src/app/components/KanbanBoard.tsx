'use client'
import { useState } from 'react'
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
  arrayMove,
  sortableKeyboardCoordinates,
} from '@dnd-kit/sortable'
import DroppableContainer from './DroppableContainer';
import  ItemOverlay  from './IssueOverlay';
import IssueLoader from './IssueLoader'
import { Container } from '../types/types'
import RepoHeader from './RepoHeader'




export default function KanbanBoard() {

  
  const [containers, setContainers] = useState<Container[]>([
  ])
  void setContainers

  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null)
  void activeId

  const [repo, setRepo] = useState<{
    owner: { login: string; html_url: string };
    name: string;
    html_url: string;
    stargazers_count: number;
  } | null>(null);

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

  function findContainerId(
    itemId: UniqueIdentifier,
  ): UniqueIdentifier | undefined {
    if (containers.some((container) => container.id === itemId)) {
      return itemId
    }

    return containers.find((container) =>
      container.items.some((item) => item.id === itemId),
    )?.id
  }

  function handleDragStart(event: DragStartEvent) {
    setActiveId(event.active.id)
  }

  function handleDragCancel(event: DragCancelEvent) {
    void event
    setActiveId(null)
  }

  function handleDragOver(event: DragOverEvent) {
    const { active, over } = event

    if (!over) return

    const activeId = active.id
    const overId = over.id

    const activeContainerId = findContainerId(activeId)
    const overContainerId = findContainerId(overId)

    if (!activeContainerId || !overContainerId) return

    if (activeContainerId === overContainerId && activeId !== overId) {
      return
    }
    if (activeContainerId === overContainerId) return

    setContainers((prev) => {
      const activeContainer = prev.find((c) => c.id === activeContainerId)
      if (!activeContainer) return prev

      const activeItem = activeContainer.items.find(
        (item) => item.id === activeId,
      )
      if (!activeId) return

      const newContainers = prev.map((container) => {
        if (container.id === activeContainerId) {
          return {
            ...container,
            items: container.items.filter((item) => item.id !== activeId),
          }
        }

        if (container.id === overContainerId) {
          if (overId === overContainerId) {
            return {
              ...container,
              items: [...container.items, activeItem],
            }
          }

          const overItemIndex = container.items.findIndex(
            (item) => item.id === overId,
          )
          if (overItemIndex !== -1) {
            return {
              ...container,
              items: [
                ...container.items.slice(0, overItemIndex + 1),
                activeItem,
                ...container.items.slice(overItemIndex + 1),
              ],
            }
          }
        }

        return container
      })
      return newContainers
    })
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (!over) {
      setActiveId(null)
      return
    }
    const activeContainerId = findContainerId(active.id)
    const overContainerId = findContainerId(over.id)

    if (!activeContainerId || !overContainerId) {
      setActiveId(null)
      return
    }
    if (activeContainerId === overContainerId && active.id !== over.id) {
      const containerIndex = containers.findIndex(
        (c) => c.id === activeContainerId,
      )

      if (containerIndex === -1) {
        setActiveId(null)
        return
      }

      const container = containers[containerIndex]
      const activeIndex = container.items.findIndex(
        (item) => item.id === active.id,
      )
      const overIndex = container.items.findIndex((item) => item.id === over.id)

      if (activeIndex !== -1 && overIndex !== -1) {
        const newItems = arrayMove(container.items, activeIndex, overIndex)

        setContainers((containers) => {
          return containers.map((c, i) => {
            if (i === containerIndex) {
              return { ...c, items: newItems }
            }
            return c
          })
        })
      }
    }

    setActiveId(null)
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
      
      <IssueLoader setContainers={setContainers} setRepo={setRepo}/>
      {repo && <RepoHeader repo={repo} />}
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