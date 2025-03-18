import React from 'react'
import {Issue} from '@/app/types/types'

type IssueCardProps = {
    issue: Issue;
};

function IssueCard({ issue }: IssueCardProps) {

    const createdAt = new Date(issue.created_at);
    const now = new Date();
    const diffInDays = Math.floor((now.getTime() - createdAt.getTime()) / (1000 * 60 * 60 * 24));

  return (
    <li key={issue.id} className="m-2 p-2 border rounded bg-gray-100">
            <a href={issue.html_url} target="_blank" rel="noopener noreferrer">
              {issue.title || "Title"}
            </a>
            <p>
              #{issue.number || "?"} | {diffInDays} days ago
              <br />
              <a href={issue.user.html_url}>{issue.user?.login || "Anonim"} </a>
              | Comments:{" "} {issue.comments || 0}
            </p>
          </li>
  )
}

export default IssueCard