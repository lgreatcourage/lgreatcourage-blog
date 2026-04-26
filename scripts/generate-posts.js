import fs from "fs-extra";
import { globSync } from "glob";
import matter from "gray-matter";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { loadEnv } from "vite";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.join(__dirname, "..");
const MODE = process.env.MODE || process.env.NODE_ENV || "development";
const ENV = loadEnv(MODE, ROOT_DIR, "");

const POSTS_DIR = path.join(ROOT_DIR, "src/data/md"); // md 目录
const OUTPUT_FILE = path.join(ROOT_DIR, "src/data/js"); // 输出 json
const CLOUD_URL = (
  ENV.VITE_TENCENT_CLOUD_URL ||
  process.env.VITE_TENCENT_CLOUD_URL ||
  ""
).replace(/\/$/, "");

function formatDate(value) {
  if (typeof value === "string") {
    const m = value.match(/^(\d{4}-\d{2}-\d{2})/);
    if (m) return m[1];
    return value.slice(0, 10);
  }
  if (value instanceof Date) {
    return value.toISOString().slice(0, 10);
  }
  return String(value ?? "").slice(0, 10);
}

function resolveCoverUrl(raw) {
  const text = String(raw ?? "").trim();
  if (!text) return "";
  if (/^https?:\/\//i.test(text) || text.startsWith("/")) return text;
  return CLOUD_URL
    ? `${CLOUD_URL}/learnRecodeImg/${text}`
    : `/learnRecodeImg/${text}`;
}

function generateLearnRecodePosts() {
  const posts = globSync(`${POSTS_DIR}/learnRecode/*.md`).map((file, index) => {
    const source = fs.readFileSync(file, "utf-8");
    const { data } = matter(source);
    return {
      id: index + 1,
      title: data.title,
      date: formatDate(data.date),
      category: data.category,
      coverUrl: resolveCoverUrl(data.coverUrl),
      summary: data.summary,
      tags: data.tags,
      markdown: path.basename(file, ".md"),
    };
  });
  fs.writeJson(`${OUTPUT_FILE}/learnRecode/index.json`, posts, { spaces: 2 });
}

generateLearnRecodePosts();
