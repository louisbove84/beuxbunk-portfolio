'use client';

import React from 'react';
import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';
import { CONTACT_INFO } from '../../constants/site';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Navigation />
      
      <main className="pt-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Privacy Policy
            </h1>
            
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>

            <div className="space-y-6 text-gray-700 dark:text-gray-300">
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
                  Data Collection
                </h2>
                <p className="mb-4">
                  I do not collect, store, or process any personal data from visitors to this website.
                </p>
                <p className="mb-4">
                  This website is a static portfolio site that does not use cookies, analytics tracking, 
                  or any other data collection mechanisms. Your visit to this site is completely private 
                  and anonymous.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
                  Third-Party Services
                </h2>
                <p className="mb-4">
                  This website may contain links to external websites, including social media platforms 
                  (LinkedIn, GitHub, Twitter/X) and project demonstrations hosted on other domains. 
                  These external sites have their own privacy policies, and I am not responsible for 
                  their data collection practices.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
                  Contact Information
                </h2>
                <p className="mb-4">
                  If you choose to contact me through the email address provided on this website, 
                  I will only use the information you provide to respond to your inquiry. I do not 
                  share, sell, or use your contact information for any other purpose.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
                  Changes to This Policy
                </h2>
                <p className="mb-4">
                  I may update this privacy policy from time to time. Any changes will be reflected 
                  on this page with an updated &quot;Last updated&quot; date.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
                  Contact Me
                </h2>
                <p className="mb-4">
                  If you have any questions about this privacy policy, please contact me at:{' '}
                  <a 
                    href={`mailto:${CONTACT_INFO.email}`}
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    {CONTACT_INFO.email}
                  </a>
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

export default PrivacyPolicy;

