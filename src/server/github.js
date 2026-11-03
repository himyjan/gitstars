import { httpRequestGithub } from './http-request';

export async function getUserInfo() {
  return httpRequestGithub('/user');
}

export async function getStarredRepositories(params) {
  return httpRequestGithub('/user/starred', { query: params });
}

export async function getRepositoryReadme(params) {
  return httpRequestGithub(`/repos/${params.owner}/${params.name}/readme`);
}

export async function getReadmeByMarkdown(content) {
  return httpRequestGithub('/markdown', {
    method: 'POST',
    body: { text: content },
  });
}

export async function getGithubRankingLanguageList() {
  const res = await fetch(
    'https://raw.githubusercontent.com/cfour-hi/github-ranking/main/languages.json',
  );
  const list = await res.json();
  return list;
}

export async function getGithubRankingLanguageMap() {
  const res = await fetch(
    `https://raw.githubusercontent.com/cfour-hi/github-ranking/main/ranking.json`,
  );
  const map = await res.json();
  return map;
}
