import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const markdownFiles = import.meta.glob("/src/data/md/**/*.md", {
  query: "?raw",
  import: "default",
}) as Record<string, () => Promise<string>>;

function stripFrontmatter(raw: string) {
  const text = raw.replace(/^\uFEFF/, "")
  const lines = text.split(/\r?\n/)

  let firstNonEmpty = 0
  while (firstNonEmpty < lines.length && lines[firstNonEmpty].trim() === "") firstNonEmpty += 1
  if (lines[firstNonEmpty]?.trim() !== "---") return text

  let end = firstNonEmpty + 1
  while (end < lines.length) {
    const marker = lines[end].trim()
    if (marker === "---" || marker === "...") break
    end += 1
  }
  if (end >= lines.length) return text

  let nextStart = end + 1
  if (lines[nextStart]?.trim() === "") nextStart += 1
  return lines.slice(nextStart).join("\n")
}

const MarkdownPage = ({ mdPath }: { mdPath: string }) => {
  const [content, setContent] = useState('');

  useEffect(() => {
    const run = async () => {
      const localKey = `/src/data/md/learnRecode/${mdPath}.md`.replaceAll("\\", "/");
      const loader = markdownFiles[localKey];
      if (loader) {
        const text = await loader();
        setContent(stripFrontmatter(text));
        return;
      }

      const res = await fetch(`/markdown/${mdPath}`);
      const text = await res.text();
      if (text.trim().toLowerCase().startsWith("<!doctype html")) {
        setContent("Markdown 文件未找到");
        return;
      }
      setContent(stripFrontmatter(text));
    };

    run().catch(() => setContent("Markdown 加载失败"));
  }, [mdPath]);

  return (
    <div className="markdown-content">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          img: ({ ...props }) => (
            <img
              {...props}
              loading="lazy"
              referrerPolicy="no-referrer"
              style={{ maxWidth: "100%", height: "auto", display: "block" }}
            />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownPage;
