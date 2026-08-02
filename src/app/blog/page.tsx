import type { Metadata } from 'next'
import Link from 'next/link'
import Navigation from '../../components/Navigation'
import Footer from '../../components/Footer'
import { CONTACT_INFO } from '../../constants/site'
import { formatPostDate, getAllPosts } from '../../lib/blog'

export const metadata: Metadata = {
  title: `Blog - ${CONTACT_INFO.name}`,
  description:
    'Engineering notes on machine learning, local-first AI infrastructure, and building systems in the open.',
  openGraph: {
    title: `Blog - ${CONTACT_INFO.name}`,
    description:
      'Engineering notes on machine learning, local-first AI infrastructure, and building systems in the open.',
    url: `${CONTACT_INFO.website}/blog`,
    type: 'website',
  },
}

const BlogIndex = () => {
  const posts = getAllPosts()

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Navigation />

      <main className="pt-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <header className="mb-12">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Blog</h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Engineering notes on machine learning, local-first AI infrastructure, and building
              systems in the open.
            </p>
          </header>

          {posts.length === 0 ? (
            <p className="text-gray-600 dark:text-gray-400">
              No posts published yet. Check back soon.
            </p>
          ) : (
            <ul className="space-y-10">
              {posts.map((post) => (
                <li
                  key={post.slug}
                  className="border-b border-gray-200 dark:border-gray-700 pb-10 last:border-b-0"
                >
                  {post.series && (
                    <p className="text-sm font-medium text-blue-600 dark:text-blue-400 mb-2">
                      {post.series}
                    </p>
                  )}

                  <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                      {post.title}
                    </Link>
                  </h2>

                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                    <time dateTime={post.date}>{formatPostDate(post.date)}</time>
                    <span aria-hidden="true"> · </span>
                    {post.readingTime} min read
                  </p>

                  <p className="text-gray-700 dark:text-gray-300 mb-4">{post.description}</p>

                  {post.tags.length > 0 && (
                    <ul className="flex flex-wrap gap-2">
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
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default BlogIndex
