'use client';

import Link from 'next/link';

export default function ApplicationsPage() {
  return (
    <div className="min-h-screen bg-paper-white dark:bg-ink-dark py-12 ink-wash-bg relative">
      <div className="ink-splash ink-splash-1"></div>
      <div className="ink-splash ink-splash-2"></div>
      <div className="ink-splash ink-splash-3"></div>
      <div className="absolute top-10 right-10 w-40 h-40 bagua-symbol opacity-20"></div>
      <div className="absolute bottom-10 left-10 w-40 h-40 bagua-symbol opacity-20"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-earth dark:text-earth mb-4 ink-text">Applications & Practice</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Explore how to apply BaZi theory to various aspects of daily life, from career choices to relationships and personal decisions.
          </p>
        </div>

        {/* 生活应用部分 */}
        <section className="mb-16">
          <div className="ink-card relative overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bagua-symbol opacity-15"></div>
            <div className="md:flex">
              <div className="md:flex-shrink-0 md:w-1/3 relative h-64 md:h-auto">
                <div className="absolute inset-0 bg-wood opacity-10"></div>
                <div className="h-full flex items-center justify-center p-8">
                  <div className="relative z-10 text-center">
                    <div className="inline-block p-3 rounded-full bg-wood/10 dark:bg-wood/20 mb-4">
                      <svg className="w-10 h-10 text-wood dark:text-wood" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                      </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-wood dark:text-wood ink-text">Life Applications</h2>
                  </div>
                </div>
              </div>
              <div className="p-8 md:w-2/3">
                <h3 className="text-xl font-semibold text-fire dark:text-fire mb-4">Practical Value of BaZi in Daily Life</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  BaZi is not just an ancient metaphysical system but also a practical tool for self-awareness. By understanding your BaZi, you can gain guidance and insights in multiple areas of life.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  <div className="border border-wood/30 dark:border-wood/30 rounded-md p-4 bg-wood/5">
                    <h4 className="font-semibold text-wood dark:text-wood mb-2">Name Selection</h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      Choose names that balance the Five Elements in your chart to enhance personal fortune and improve destiny paths.
                    </p>
                  </div>
                  <div className="border border-water/30 dark:border-water/30 rounded-md p-4 bg-water/5">
                    <h4 className="font-semibold text-water dark:text-water mb-2">Academic Planning</h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      Select suitable study fields and methods based on your BaZi characteristics to leverage natural talents and improve learning efficiency.
                    </p>
                  </div>
                  <div className="border border-fire/30 dark:border-fire/30 rounded-md p-4 bg-fire/5">
                    <h4 className="font-semibold text-fire dark:text-fire mb-2">Marriage Compatibility</h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      Analyze relationship compatibility between BaZi charts to understand potential interaction patterns and enhance harmonious relationships.
                    </p>
                  </div>
                  <div className="border border-earth/30 dark:border-earth/30 rounded-md p-4 bg-earth/5">
                    <h4 className="font-semibold text-earth dark:text-earth mb-2">Lifestyle Adjustment</h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      Adjust your lifestyle and environment based on your BaZi characteristics to improve quality of life.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 职业规划部分 */}
        <section className="mb-16">
          <div className="ink-card relative overflow-hidden">
            <div className="absolute top-0 left-0 w-20 h-20 bagua-symbol opacity-15"></div>
            <div className="md:flex flex-row-reverse">
              <div className="md:flex-shrink-0 md:w-1/3 relative h-64 md:h-auto">
                <div className="absolute inset-0 bg-metal opacity-10"></div>
                <div className="h-full flex items-center justify-center p-8">
                  <div className="relative z-10 text-center">
                    <div className="inline-block p-3 rounded-full bg-metal/10 dark:bg-metal/20 mb-4">
                      <svg className="w-10 h-10 text-metal dark:text-metal" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                      </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-metal dark:text-metal ink-text">Career Planning</h2>
                  </div>
                </div>
              </div>
              <div className="p-8 md:w-2/3">
                <h3 className="text-xl font-semibold text-fire dark:text-fire mb-4">BaZi-Based Career Development Guidance</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  The element combinations in your BaZi chart can reveal career inclinations and the most suitable work environments. Understanding this information helps make more informed career choices.
                </p>
                <div className="overflow-hidden rounded-lg mb-6 border border-gray-200 dark:border-gray-700">
                  <div className="bg-gray-200 dark:bg-gray-700 p-3 text-center font-semibold text-gray-700 dark:text-gray-300">
                    Five Elements and Career Correspondences
                  </div>
                  <div className="grid grid-cols-2 text-sm">
                    <div className="bg-wood/10 p-3 border-r border-b border-gray-200 dark:border-gray-700">
                      <span className="text-wood font-bold">Wood</span>: Education, Law, Environment, Art, Writing
                    </div>
                    <div className="bg-fire/10 p-3 border-b border-gray-200 dark:border-gray-700">
                      <span className="text-fire font-bold">Fire</span>: Media, Performance, Food, Lighting, Energy
                    </div>
                    <div className="bg-earth/10 p-3 border-r border-b border-gray-200 dark:border-gray-700">
                      <span className="text-earth font-bold">Earth</span>: Real Estate, Agriculture, Construction, Ceramics, Logistics
                    </div>
                    <div className="bg-metal/10 p-3 border-b border-gray-200 dark:border-gray-700">
                      <span className="text-metal font-bold">Metal</span>: Finance, IT, Mechanics, Jewelry, Law Enforcement
                    </div>
                    <div className="bg-water/10 p-3 border-r border-gray-200 dark:border-gray-700">
                      <span className="text-water font-bold">Water</span>: Philosophy, Research, Tourism, Transportation, Sales
                    </div>
                    <div className="p-3">
                      <span className="font-bold">Combinations</span>: Require holistic chart analysis
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  Beyond the Five Elements' career correspondences, special structures in your BaZi chart (such as Seven Killings, Injury, Officer, etc.) can also indicate specific career tendencies and talents, helping you find the most suitable development direction.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 决策指导部分 */}
        <section className="mb-16">
          <div className="ink-card relative overflow-hidden">
            <div className="absolute bottom-5 right-5 w-24 h-24 bagua-symbol opacity-15"></div>
            <div className="p-8">
              <h3 className="text-xl font-semibold text-fire dark:text-fire mb-4 text-center ink-text">Timing Selection for Major Decisions</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6 text-center max-w-3xl mx-auto">
                In traditional Chinese culture, choosing favorable timing for important activities is believed to increase the likelihood of success. Through BaZi analysis, you can identify timing that resonates with your personal chart.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="ink-card bg-water/5 h-full">
                  <div className="text-water mb-4 text-center">
                    <svg className="w-12 h-12 mx-auto" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"></path>
                    </svg>
                  </div>
                  <h4 className="text-lg font-semibold text-fire dark:text-fire text-center mb-2">Luck Cycles and Annual Pillars</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-center">
                    Analyze the relationship between luck cycles, annual pillars, and your natal chart to identify golden periods and challenging times, planning major life events accordingly.
                  </p>
                </div>
                <div className="ink-card bg-earth/5 h-full">
                  <div className="text-earth mb-4 text-center">
                    <svg className="w-12 h-12 mx-auto" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3 12v3c0 1.657 3.134 3 7 3s7-1.343 7-3v-3c0 1.657-3.134 3-7 3s-7-1.343-7-3z"></path>
                      <path d="M3 7v3c0 1.657 3.134 3 7 3s7-1.343 7-3V7c0 1.657-3.134 3-7 3S3 8.657 3 7z"></path>
                      <path d="M17 5c0 1.657-3.134 3-7 3S3 6.657 3 5s3.134-3 7-3 7 1.343 7 3z"></path>
                    </svg>
                  </div>
                  <h4 className="text-lg font-semibold text-fire dark:text-fire text-center mb-2">Project Launch Timing</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-center">
                    Choose times that support your personal chart to start new projects, increasing the likelihood of smooth development and reducing unnecessary obstacles.
                  </p>
                </div>
                <div className="ink-card bg-fire/5 h-full">
                  <div className="text-fire mb-4 text-center">
                    <svg className="w-12 h-12 mx-auto" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd"></path>
                    </svg>
                  </div>
                  <h4 className="text-lg font-semibold text-fire dark:text-fire text-center mb-2">Crisis Response Strategy</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-center">
                    Develop personalized crisis response methods based on your BaZi characteristics, preparing for challenging periods and minimizing losses.
                  </p>
                </div>
              </div>
              
              <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                <h4 className="text-lg font-semibold text-fire dark:text-fire mb-4">How to Use BaZi to Improve Life Quality</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h5 className="font-medium text-earth dark:text-earth mb-2">Environment Adjustment</h5>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                      Select favorable living environments, workspaces, and color schemes based on your BaZi characteristics to create more harmonious atmospheres and enhance your fortune.
                    </p>
                    <h5 className="font-medium text-earth dark:text-earth mb-2">Relationships</h5>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      Understand interaction patterns with different types of people, optimize your network, and find partners and friends who can complement and support you.
                    </p>
                  </div>
                  <div>
                    <h5 className="font-medium text-earth dark:text-earth mb-2">Habit Formation</h5>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                      Cultivate habits and interests that align with your BaZi, strengthening advantages, balancing deficiencies, and promoting healthy development.
                    </p>
                    <h5 className="font-medium text-earth dark:text-earth mb-2">Mindset Adjustment</h5>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      Embrace insights from metaphysical analysis, balance your mindset, and face life's challenges and opportunities with a more positive approach.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 行动号召部分 */}
        <section className="text-center mb-16">
          <div className="ink-card p-8 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-wood via-fire to-water opacity-70"></div>
            <h3 className="text-xl font-semibold text-fire dark:text-fire mb-4">Start Using BaZi Wisdom to Guide Your Life</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-3xl mx-auto">
              Whether you're looking to improve career development, optimize relationships, or find the best timing for major life decisions, BaZi analysis can provide unique perspectives and practical guidance. Start exploring the wisdom BaZi has to offer today!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/calculator" className="bg-fire hover:bg-fire/80 text-white font-medium px-6 py-3 rounded-lg shadow-md transition-colors">
                Generate Your BaZi
              </Link>
              <Link href="/services" className="bg-ink-light hover:bg-ink-light/80 text-earth border border-earth/30 font-medium px-6 py-3 rounded-lg shadow-md transition-colors">
                Consult Professional Reading
              </Link>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
} 