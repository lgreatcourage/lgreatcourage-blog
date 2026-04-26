import fs from "fs-extra";
import { globSync } from "glob";
import matter from "gray-matter";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const POSTS_DIR = path.join(__dirname, "../src/data/md"); // md 目录
const OUTPUT_FILE = path.join(__dirname, "../src/data/js"); // 输出 json

function generateLearnRecodePosts() {
  const posts = globSync(`${POSTS_DIR}/learnRecode/*.md`).map((file, index) => {
    const source = fs.readFileSync(file, "utf-8");
    const { data } = matter(source);
    return {
      id: index + 1,
      title: data.title,
      date: String(data.date).slice(0, 10),
      category: data.category,
      coverUrl: data.coverUrl,
      summary: data.summary,
      tags: data.tags,
      markdown: path.basename(file, ".md"),
    };
  });
  fs.writeJson(`${OUTPUT_FILE}/learnRecode/index.json`, posts, { spaces: 2 });
}

generateLearnRecodePosts();
