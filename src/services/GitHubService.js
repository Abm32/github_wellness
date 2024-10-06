// src/services/GitHubService.js
import axios from 'axios';

const GITHUB_USERNAME = process.env.REACT_APP_GITHUB_USERNAME;
const GITHUB_TOKEN = process.env.REACT_APP_TOKEN;

export const fetchCommits = async (repo, owner = GITHUB_USERNAME) => {
  try {
    const response = await axios.get(
      `https://api.github.com/repos/${owner}/${repo}/commits`, 
      {
        headers: {
          Authorization: `token ${GITHUB_TOKEN}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching commits: ', error);
    throw error;
  }
};
