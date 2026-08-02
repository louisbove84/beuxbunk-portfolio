/**
 * File-based blog content layer.
 *
 * Posts are Markdown files in `content/blog/` with YAML frontmatter. Everything
 * here runs on the server at build time, so the filesystem reads never reach the
 * browser bundle.
 */

import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import remarkRehype from 'remark-rehype'
import rehypeSlug from 'rehype-slug'
import rehypeHighlight from 'rehype-highlight'
import rehypeStringify from 'rehype-stringify'

const POSTS_DIRECTORY = path.join(process.cwd(), 'content', 'blog')

const WORDS_READ_PER_MINUTE = 200

export type PostMeta = {
  slug: string
  title: string
  date: string
  description: string
  tags: string[]
  series?: string
  readingTime: number
}

export type Post = PostMeta & {
  html: string
}

/** Average-reader estimate, rounded up so a short post never reads "0 min". */
const calculateReadingTime = (markdown: string): number =>
  Math.max(1, Math.ceil(markdown.trim().split(/\s+/).length / WORDS_READ_PER_MINUTE))

const parsePost = (fileName: string) => {
  const slug = fileName.replace(/\.md$/, '')
  const fileContents = fs.readFileSync(path.join(POSTS_DIRECTORY, fileName), 'utf8')
  const { data, content } = matter(fileContents)

  return {
    slug,
    content,
    draft: data.draft === true,
    meta: {
      slug,
      title: String(data.title ?? slug),
      date: String(data.date ?? ''),
      description: String(data.description ?? ''),
      tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
      series: data.series ? String(data.series) : undefined,
      readingTime: calculateReadingTime(content),
    } satisfies PostMeta,
  }
}

const readPostFileNames = (): string[] => {
  if (!fs.existsSync(POSTS_DIRECTORY)) return []

  return fs.readdirSync(POSTS_DIRECTORY).filter((fileName) => fileName.endsWith('.md'))
}

const renderMarkdown = async (markdown: string): Promise<string> => {
  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeSlug)
    .use(rehypeHighlight, { detect: true })
    .use(rehypeStringify)
    .process(markdown)

  return String(file)
}

/** Published posts, newest first. Drafts are omitted. */
export const getAllPosts = (): PostMeta[] =>
  readPostFileNames()
    .map((fileName) => parsePost(fileName))
    .filter((post) => !post.draft)
    .map((post) => post.meta)
    .sort((a, b) => (a.date < b.date ? 1 : -1))

/** Slugs of published posts, for `generateStaticParams`. */
export const getPostSlugs = (): string[] => getAllPosts().map((post) => post.slug)

/** A single post with its Markdown rendered to HTML, or null if the slug is unknown. */
export const getPostBySlug = async (slug: string): Promise<Post | null> => {
  const fileName = `${slug}.md`

  if (!readPostFileNames().includes(fileName)) return null

  const post = parsePost(fileName)

  if (post.draft) return null

  return { ...post.meta, html: await renderMarkdown(post.content) }
}

/** Renders a frontmatter date without locale-dependent server/client drift. */
export const formatPostDate = (date: string): string => {
  const parsed = new Date(`${date}T00:00:00Z`)

  if (Number.isNaN(parsed.getTime())) return date

  return parsed.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  })
}
