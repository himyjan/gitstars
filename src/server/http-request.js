import { $fetch } from 'ofetch';
import { useUserStore } from '@/store/user';

const GITHUB_API = 'https://api.github.com';

export async function getToken(code) {
  return await $fetch('/api/oauth/access_token', {
    method: 'POST',
    body: {
      code,
      client_id: import.meta.env.VITE_GITSTARS_CLIENT_ID,
    },
  });
}

export async function getUserInfo() {
  return await $fetch(`${GITHUB_API}/user`, {
    headers: {
      Authorization: `Bearer ${useUserStore().token}`,
    },
  });
}

export async function getStarredRepositories(params) {
  return await $fetch(`${GITHUB_API}/user/starred`, {
    query: params,
    headers: {
      Authorization: `Bearer ${useUserStore().token}`,
    },
  });
}

export async function getRepositoryReadme(params) {
  return await $fetch(
    `${GITHUB_API}/repos/${params.owner}/${params.name}/readme`,
    {
      headers: {
        Authorization: `Bearer ${useUserStore().token}`,
      },
    },
  );
}

export async function getReadmeByMarkdown(content) {
  return await $fetch(`${GITHUB_API}/markdown`, {
    method: 'POST',
    body: { text: content },
    headers: {
      Authorization: `Bearer ${useUserStore().token}`,
    },
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
