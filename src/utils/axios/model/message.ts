import service from "../request";

const CONFIG = {
    // GitHub 用户名
  OWNER: 'lgreatcourage',
  // 仓库名
  REPO: 'lgreatcourage-blog',
  // 留言板 Issue 的编号
  ISSUE_NUMBER: 1,
  // GitHub Token
  TOKEN: (import.meta.env.VITE_GITHUB_TOKEN || '').trim(),
}

const GITHUB_BASE_URLS = [
  "https://api.github.com",
  "https://api.github-proxy.com",
] as const

export function getMessageList() {
  const headers = CONFIG.TOKEN ? { Authorization: `Bearer ${CONFIG.TOKEN}` } : undefined
  const path = `/repos/${CONFIG.OWNER}/${CONFIG.REPO}/issues/${CONFIG.ISSUE_NUMBER}/comments`

  const run = (baseUrl: string) =>
    service.request({
      url: `${baseUrl}${path}`,
      method: "get",
      headers,
    })

  return run(GITHUB_BASE_URLS[0]).catch(() => run(GITHUB_BASE_URLS[1]))
}

export function addMessage(message: string) {
  if (!CONFIG.TOKEN) {
    return Promise.reject(new Error("未配置 VITE_GITHUB_TOKEN，无法发送留言。"))
  }
  const headers = CONFIG.TOKEN ? { Authorization: `Bearer ${CONFIG.TOKEN}` } : undefined
  const path = `/repos/${CONFIG.OWNER}/${CONFIG.REPO}/issues/${CONFIG.ISSUE_NUMBER}/comments`

  const run = (baseUrl: string) =>
    service.request({
      url: `${baseUrl}${path}`,
      method: "post",
      headers,
      data: {
        body: message,
      },
    })

  return run(GITHUB_BASE_URLS[0]).catch(() => run(GITHUB_BASE_URLS[1]))
}
