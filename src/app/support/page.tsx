'use client';

import React from 'react';
import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';
import { CONTACT_INFO } from '../../constants/site';

const SupportPage = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Navigation />
      
      <main className="pt-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Support
            </h1>
            
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Need help? We&apos;re here to assist you with any questions or issues you may have.
            </p>

            <div className="space-y-8 text-gray-700 dark:text-gray-300">
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
                  App Support
                </h2>
                <p className="mb-4">
                  Need help with one of my applications? Whether you&apos;re experiencing technical issues, 
                  have questions about features, or want to provide feedback, I&apos;m here to help. Please 
                  reach out using the contact information below.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
                  How to Get Help
                </h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      Report a Bug
                    </h3>
                    <p className="mb-2">
                      If you encounter a bug or unexpected behavior, please contact us with:
                    </p>
                    <ul className="list-disc list-inside ml-4 space-y-1">
                      <li>Device type (iPhone/iPad) and iOS version</li>
                      <li>App version (found in Settings)</li>
                      <li>Steps to reproduce the issue</li>
                      <li>Screenshots if applicable</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      Feature Requests
                    </h3>
                    <p>
                      Have an idea for improving an app? I&apos;d love to hear from you! 
                      Send your suggestions and I&apos;ll consider them for future updates.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      General Questions
                    </h3>
                    <p>
                      For questions about how to use the app, account issues, or any other inquiries, 
                      feel free to reach out using the contact information below.
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
                  Contact Information
                </h2>
                <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                  <p className="mb-4">
                    For support inquiries, please contact us at:
                  </p>
                  <p className="mb-2">
                    <strong>Email:</strong>{' '}
                    <a 
                      href={`mailto:${CONTACT_INFO.email}?subject=App Support Request`}
                      className="text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      {CONTACT_INFO.email}
                    </a>
                  </p>
                  <p className="mb-2">
                    <strong>LinkedIn:</strong>{' '}
                    <a 
                      href={CONTACT_INFO.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      {CONTACT_INFO.linkedin}
                    </a>
                  </p>
                  <p>
                    <strong>Website:</strong>{' '}
                    <a 
                      href={CONTACT_INFO.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      {CONTACT_INFO.website}
                    </a>
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
                  Response Time
                </h2>
                <p className="mb-4">
                  We aim to respond to all support inquiries within 24-48 hours during business days. 
                  For urgent issues, please indicate &quot;URGENT&quot; in your email subject line.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
                  Privacy & Data
                </h2>
                <p className="mb-4">
                  Your privacy is important to us. For information about how we handle your data, 
                  please review our{' '}
                  <a 
                    href="/privacy"
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    Privacy Policy
                  </a>.
                </p>
              </section>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SupportPage;

