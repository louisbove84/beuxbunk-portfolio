import React from 'react';
import Link from 'next/link';
import { formatPostDate, type PostMeta } from '../lib/blog';

interface WritingProps {
  posts: PostMeta[];
}

/** Landing-page section surfacing the latest blog posts. */
const Writing = ({ posts }: WritingProps) => {
  if (posts.length === 0) return null;

  return (
    <section id="writing" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Latest Writing
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Engineering notes from projects I&apos;m building in the open
          </p>
        </div>

        <div className="space-y-6">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="block p-6 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 hover:border-blue-400 dark:hover:border-blue-500 transition-colors"
            >
              {post.series && (
                <p className="text-sm font-medium text-blue-600 dark:text-blue-400 mb-1">
                  {post.series}
                </p>
              )}
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {post.title}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                <time dateTime={post.date}>{formatPostDate(post.date)}</time>
                <span aria-hidden="true"> · </span>
                {post.readingTime} min read
              </p>
              <p className="text-gray-600 dark:text-gray-300">{post.description}</p>
            </Link>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/blog"
            className="inline-flex items-center px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200 font-semibold rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            View all posts
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Writing;
