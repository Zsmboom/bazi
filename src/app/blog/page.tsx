'use client';

import Link from 'next/link';

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-paper-white dark:bg-ink-dark py-12 ink-wash-bg relative">
      <div className="ink-splash ink-splash-1"></div>
      <div className="ink-splash ink-splash-2"></div>
      <div className="ink-splash ink-splash-3"></div>
      <div className="absolute top-10 right-10 w-40 h-40 bagua-symbol opacity-20"></div>
      <div className="absolute bottom-10 left-10 w-40 h-40 bagua-symbol opacity-20"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-earth dark:text-earth mb-4 ink-text">Blog & News</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Explore the latest research, practical guides, and real case studies in BaZi metaphysics.
          </p>
        </div>

        {/* 特色文章部分 */}
        <section className="mb-16">
          <div className="ink-card relative overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bagua-symbol opacity-15"></div>
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-wood via-fire to-water opacity-70"></div>
            <div className="md:flex p-0 relative">
              <div className="md:flex-shrink-0 md:w-1/2 relative h-64 md:h-auto">
                <div className="absolute inset-0 bg-gray-300 flex items-center justify-center text-gray-500">
                  <div className="flex flex-col items-center justify-center">
                    <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd"></path>
                    </svg>
                    <span className="text-sm mt-2">文章配图</span>
                  </div>
                </div>
              </div>
              <div className="p-8 md:w-1/2">
                <span className="text-fire text-sm font-medium">特色文章</span>
                <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mt-2 mb-4">
                  BaZi and Modern Psychology: The Fusion of Ancient Wisdom and Scientific Theory
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Explore how Eastern BaZi metaphysics can complement Western modern psychology, providing a more comprehensive framework for personal growth. This article delves into the commonalities and differences between the two in personality analysis, understanding the subconscious, and development patterns.
                </p>
                <div className="flex items-center mb-4">
                  <div className="rounded-full w-8 h-8 bg-gray-200 flex items-center justify-center mr-3">
                    <span className="text-gray-500 font-medium text-xs">L</span>
                  </div>
                  <span className="text-sm text-gray-500">Professor Liu | March 18, 2024</span>
                </div>
                <Link href="/blog/bazi-psychology" className="text-fire hover:text-fire/80 font-medium">
                  Read Full Article →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* 最新文章部分 */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-earth dark:text-earth mb-8 text-center ink-text">Latest Articles</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="ink-card overflow-hidden">
              <div className="h-48 bg-gray-300 flex items-center justify-center text-gray-500">
                <div className="flex flex-col items-center justify-center">
                  <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd"></path>
                  </svg>
                  <span className="text-xs mt-2">文章配图</span>
                </div>
              </div>
              <div className="p-5">
                <span className="text-fire text-xs font-medium">研究动态</span>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mt-2 mb-2">
                  2024 Latest Research: Big Data Analysis Validates BaZi Prediction Accuracy
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
                  Through analysis of 10,000 BaZi cases, research has found significant correlations between BaZi predictions and career compatibility, relationship patterns, and life turning points, providing modern scientific support for this ancient system.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">March 26, 2024</span>
                  <Link href="/blog/big-data-bazi" className="text-fire hover:text-fire/80 text-sm font-medium">
                    Read More
                  </Link>
                </div>
              </div>
            </div>
            
            <div className="ink-card overflow-hidden">
              <div className="h-48 bg-gray-300 flex items-center justify-center text-gray-500">
                <div className="flex flex-col items-center justify-center">
                  <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd"></path>
                  </svg>
                  <span className="text-xs mt-2">文章配图</span>
                </div>
              </div>
              <div className="p-5">
                <span className="text-wood text-xs font-medium">命理解析</span>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mt-2 mb-2">
                  Comprehensive Analysis: Career Choices and Life Opportunities for Seven Killings BaZi Structure
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
                  The Seven Killings structure is a special pattern in BaZi that represents competition, authority, and challenge. This article details suitable career directions, life development strategies, and how to transform Seven Killings energy into success momentum.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">March 20, 2024</span>
                  <Link href="/blog/qisha-career" className="text-wood hover:text-wood/80 text-sm font-medium">
                    Read More
                  </Link>
                </div>
              </div>
            </div>
            
            <div className="ink-card overflow-hidden">
              <div className="h-48 bg-gray-300 flex items-center justify-center text-gray-500">
                <div className="flex flex-col items-center justify-center">
                  <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd"></path>
                  </svg>
                  <span className="text-xs mt-2">文章配图</span>
                </div>
              </div>
              <div className="p-5">
                <span className="text-water text-xs font-medium">实用指南</span>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mt-2 mb-2">
                  2024 Wealth Analysis: How Different BaZi Types Can Navigate the New Economic Landscape
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
                  Against the backdrop of global economic fluctuations, this article analyzes wealth trends for different BaZi structures in 2024, providing targeted financial advice and opportunity-seizing methods to help readers maintain financial stability and growth amid changes.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">March 15, 2024</span>
                  <Link href="/blog/wealth-2024" className="text-water hover:text-water/80 text-sm font-medium">
                    Read More
                  </Link>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-8">
            <Link href="/blog/all" className="bg-ink-light hover:bg-ink-light/80 text-earth border border-earth/30 font-medium px-5 py-2 rounded-lg shadow-sm inline-block">
              View More Articles
            </Link>
          </div>
        </section>

        {/* 实用指南部分 */}
        <section className="mb-16">
          <div className="ink-card p-8 relative overflow-hidden">
            <div className="absolute top-5 left-5 w-24 h-24 bagua-symbol opacity-15"></div>
            <h3 className="text-xl font-semibold text-fire dark:text-fire mb-6 text-center ink-text">Practical Guides</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="ink-card bg-earth/5 p-5 relative">
                <div className="flex items-start">
                  <div className="mr-4 text-earth">
                    <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"></path>
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
                      Self-Learning BaZi Analysis: A Complete Beginner's Guide
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                      This detailed guide will walk beginners through the fundamentals of BaZi, from Heavenly Stems and Earthly Branches to the interactions of the Five Elements, and how to interpret your own BaZi chart.
                    </p>
                    <Link href="/blog/beginners-guide" className="text-earth hover:text-earth/80 text-sm font-medium">
                      Read Guide →
                    </Link>
                  </div>
                </div>
              </div>
              
              <div className="ink-card bg-fire/5 p-5 relative">
                <div className="flex items-start">
                  <div className="mr-4 text-fire">
                    <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"></path>
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
                      How to Apply BaZi to Improve Relationships
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                      Learn how to adjust communication styles and interaction strategies by understanding your own and others' BaZi characteristics, resolving conflicts and building more harmonious relationships.
                    </p>
                    <Link href="/blog/relationship-guide" className="text-fire hover:text-fire/80 text-sm font-medium">
                      Read Guide →
                    </Link>
                  </div>
                </div>
              </div>
              
              <div className="ink-card bg-water/5 p-5 relative">
                <div className="flex items-start">
                  <div className="mr-4 text-water">
                    <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd"></path>
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
                      Methods for Balancing Five Element Imbalances
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                      Explore how to balance Five Element imbalances in your BaZi chart through adjustments in diet, environment, habits, and lifestyle to improve health and life conditions.
                    </p>
                    <Link href="/blog/five-elements-balance" className="text-water hover:text-water/80 text-sm font-medium">
                      Read Guide →
                    </Link>
                  </div>
                </div>
              </div>
              
              <div className="ink-card bg-metal/5 p-5 relative">
                <div className="flex items-start">
                  <div className="mr-4 text-metal">
                    <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"></path>
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
                      Choosing Key Timing: Luck Cycle and Annual Pillar Analysis Guide
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                      Learn how to analyze the relationship between luck cycles, annual pillars, and your natal BaZi chart to identify key points in your life, seize opportunities, and avoid risks.
                    </p>
                    <Link href="/blog/timing-guide" className="text-metal hover:text-metal/80 text-sm font-medium">
                      Read Guide →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 用户故事部分 */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-earth dark:text-earth mb-8 text-center ink-text">User Stories</h2>
          
          <div className="ink-card p-8 relative overflow-hidden">
            <div className="absolute bottom-5 right-5 w-24 h-24 bagua-symbol opacity-15"></div>
            <div className="md:flex items-center">
              <div className="md:w-1/3 mb-6 md:mb-0 text-center">
                <div className="rounded-full overflow-hidden w-40 h-40 mx-auto border-4 border-earth/20">
                  <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-500">
                    <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path>
                    </svg>
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-fire dark:text-fire mt-4">Zhang Mingyuan's Transformation Story</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Entrepreneur | 40 years old</p>
              </div>
              <div className="md:w-2/3 md:pl-8">
                <div className="text-earth text-3xl mb-4">"</div>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  I worked in the financial industry for 15 years but always felt unsatisfied and confused. Through BaZi analysis, I discovered that my chart had a strong Wood-Fire interaction, making me more suited for creative and expressive work. Under the guidance of a BaZi expert, I boldly changed careers at 38 to start a design company.
                </p>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Initially, my family didn't understand my decision, but two years later, the company is thriving, and I've found unprecedented career satisfaction. I'm grateful that BaZi analysis helped me recognize my true self and find a life path that aligns with my talents.
                </p>
                <div className="text-right">
                  <Link href="/blog/stories/zhang" className="text-fire hover:text-fire/80 font-medium">
                    Read Full Story →
                  </Link>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-8">
            <Link href="/blog/stories" className="bg-ink-light hover:bg-ink-light/80 text-earth border border-earth/30 font-medium px-5 py-2 rounded-lg shadow-sm inline-block">
              View More User Stories
            </Link>
          </div>
        </section>

        {/* 订阅部分 */}
        <section className="mb-16">
          <div className="ink-card p-8 bg-earth/5 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-earth/50"></div>
            <div className="absolute top-5 right-5 w-24 h-24 bagua-symbol opacity-15"></div>
            <div className="text-center max-w-2xl mx-auto">
              <h3 className="text-xl font-semibold text-earth dark:text-earth mb-4">Subscribe to Our Monthly BaZi Wisdom</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Receive monthly updates on the latest BaZi research, seasonal metaphysical guidance, and practical life advice to help you better understand and apply BaZi wisdom.
              </p>
              <div className="flex flex-col sm:flex-row gap-2 justify-center max-w-md mx-auto">
                <input type="email" placeholder="Your Email Address" className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 flex-grow" />
                <button className="bg-earth hover:bg-earth/80 text-white font-medium px-4 py-2 rounded-lg shadow-sm whitespace-nowrap">
                  Subscribe Now
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-3">
                We respect your privacy and will never share your personal information. You can unsubscribe at any time.
              </p>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
} 