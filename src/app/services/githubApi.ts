import axios from "axios";

const GITHUB_API_URL = "https://api.github.com";
export const fetchIssues = async (repoUrl: string) => {
  try {
    const match = repoUrl.match(/github\.com\/(.+?)\/(.+?)(\.git|$)/);
    if (!match) {
      throw new Error("Invalid GitHub repository URL");
    }
    const [, repoOwner, repoName] = match;    

    const response = await axios.get(
      `${GITHUB_API_URL}/repos/${repoOwner}/${repoName}/issues`, {
        params: { state: "all", per_page: 50 }
  });

    return response.data;
  } catch (error) {
    console.error("Error fetching issues:", error);
    return [];
  }
};