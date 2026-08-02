import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Navigation from '../../../components/Navigation'
import Footer from '../../../components/Footer'
import { CONTACT_INFO } from '../../../constants/site'
import { formatPostDate, getPostBySlug, getPostSlugs } from '../../../lib/blog'

type BlogPostPageProps = {
  params: Promise<{ slug: string }>
}

export const generateStaticParams = async () => getPostSlugs().map((slug) => ({ slug }))

export const generateMetadata = async ({ params }: BlogPostPageProps): Promise<Metadata> => {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) return { title: `Post not found - ${CONTACT_INFO.name}` }

  const url = `${CONTACT_INFO.website}/blog/${post.slug}`

  return {
    title: `${post.title} - ${CONTACT_INFO.name}`,
    description: post.description,
    keywords: post.tags.join(', '),
    authors: [{ name: CONTACT_INFO.name }],
    openGraph: {
      title: post.title,
      description: post.description,
      url,
      type: 'article',
      publishedTime: post.date,
      authors: [CONTACT_INFO.name],
      tags: post.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
    },
    alternates: { canonical: url },
  }
}

const BlogPostPage = async ({ params }: BlogPostPageProps) => {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) notFound()

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Navigation />

      <main className="pt-16">
        <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Link
            href="/blog"
            className="inline-flex items-center text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline mb-8"
          >
            <span aria-hidden="true" className="mr-1">
              &larr;
            </span>
            All posts
          </Link>

          <header className="mb-10">
            {post.series && (
              <p className="text-sm font-medium text-blue-600 dark:text-blue-400 mb-2">
                {post.series}
              </p>
            )}

            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">{post.title}</h1>

            <p className="text-sm text-gray-500 dark:text-gray-400">
              <time dateTime={post.date}>{formatPostDate(post.date)}</time>
              <span aria-hidden="true"> · </span>
              {post.readingTime} min read
            </p>

            {post.tags.length > 0 && (
              <ul className="flex flex-wrap gap-2 mt-4">
                {post.tags.map((tag) => (
                  <li
                    key={tag}
                    className="px-3 py-1 text-xs font-medium rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            )}
          </header>

          <div
            className="prose prose-lg dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: post.html }}
          />

          <footer className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700">
            <p className="text-gray-700 dark:text-gray-300">
              Questions or feedback?{' '}
              <a
                href={`mailto:${CONTACT_INFO.email}`}
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                Get in touch
              </a>
              .
            </p>
          </footer>
        </article>
      </main>

      <Footer />
    </div>
  )
}

export default BlogPostPage
