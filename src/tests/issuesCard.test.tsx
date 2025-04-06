import { render, screen } from "@testing-library/react";
import IssueCard from "../app/components/IssueCard";
import { describe, test, expect } from "vitest";
import { createMockIssue } from "./test-utils";
import React from "react";
import '@testing-library/jest-dom';  

const mockIssue = createMockIssue(123, "user123")

describe("IssueCard", () => {
  test("renders issue title and metadata", () => {
    render(<IssueCard issue={mockIssue} />);
    
    expect(screen.getByText("Issue 123")).toBeInTheDocument();
    expect(screen.getByText(/#\d+ \| \d+ days ago/)).toBeInTheDocument();
    expect(screen.getByText("💬 3")).toBeInTheDocument();
    expect(screen.getByText("user123")).toBeInTheDocument();
  });

  test("has anchor tag linking to issue", () => {
    render(<IssueCard issue={mockIssue} />);
    const link = screen.getByText("Issue 123") as HTMLAnchorElement;
    expect(link.href).toBe(mockIssue.html_url);
  });
});
