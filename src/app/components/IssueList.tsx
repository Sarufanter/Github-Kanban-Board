"use client";

import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import IssueCard from "./IssueCard";

const IssuesList = () => {
  const { todo, inProgress, done } = useSelector(
    (state: RootState) => state.issues
  );

  const renderColumn = (title: string, issues: any[]) => (
    
    <div className="bg-gray-300 p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      <ul>
      {issues.map((issue) => <IssueCard key={issue.id} issue={issue} />)}
      </ul>
    </div>
  );

  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      {renderColumn("ToDo", todo)}
      {renderColumn("In Progress", inProgress)}
      {renderColumn("Done", done)}
    </div>
  );
};

export default IssuesList;
