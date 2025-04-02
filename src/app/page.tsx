import KanbanBoard from "./components/KanbanBoard";
import React from "react";
import { Metadata } from 'next';
 
export const metadata: Metadata = {
  title: 'Github Kanban Board',
  description: 'Github Kanban board with drag and drop functionality.',
};

export default function Home() {
  return (
      <KanbanBoard />
  );
}
