import React from "react";
import IssueLoader from "./IssueLoader";
import IssuesList from "./IssueList";

function KanbanBoard() {
  return (
    <div>
      <IssueLoader />
      <IssuesList />
    </div>
  );
}

export default KanbanBoard;
