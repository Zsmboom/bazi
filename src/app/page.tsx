'use client';

import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="font-[family-name:var(--font-geist-sans)]">
      {/* Hero Section */}
      <section className="relative bg-ink-light py-20 overflow-hidden ink-wash-bg">
        <div className="ink-splash ink-splash-1"></div>
        <div className="ink-splash ink-splash-2"></div>
        <div className="ink-splash ink-splash-3"></div>
        <div className="absolute top-10 right-10 w-40 h-40 bagua-symbol opacity-20"></div>
        <div className="absolute bottom-10 left-10 w-40 h-40 bagua-symbol opacity-20"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-earth mb-8 ink-text">
              Discover Your Destiny with BaZi
            </h1>
            <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto mb-10">
              Unlock the ancient wisdom of Chinese BaZi astrology and understand your life path with our powerful calculator and expert analysis.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/calculator" className="bg-fire hover:bg-fire/80 text-white font-medium px-6 py-3 rounded-lg shadow-md transition-colors">
                Try BaZi Calculator
              </Link>
              <Link href="/basics" className="bg-ink-light hover:bg-ink-light/80 text-earth border border-earth/30 font-medium px-6 py-3 rounded-lg shadow-md transition-colors">
                Learn About BaZi
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent dark:from-ink-dark dark:to-transparent"></div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-paper-white dark:bg-ink-dark relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-wood via-fire to-water opacity-70"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-earth dark:text-earth relative inline-block ink-text">
              Our Key Features
            </h2>
            <p className="mt-4 text-gray-600 dark:text-gray-400">Powerful tools to help you understand your BaZi chart</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="ink-card">
              <div className="text-earth mb-4 text-center">
                <svg className="w-12 h-12 mx-auto" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-fire dark:text-fire text-center">Accurate BaZi Calculator</h3>
              <p className="mt-2 text-gray-600 dark:text-gray-400 text-center">Calculate your BaZi chart based on your birth date and time with precise lunar calendar conversion.</p>
            </div>
            <div className="ink-card">
              <div className="text-earth mb-4 text-center">
                <svg className="w-12 h-12 mx-auto" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-fire dark:text-fire text-center">Personalized Analysis</h3>
              <p className="mt-2 text-gray-600 dark:text-gray-400 text-center">Receive detailed insights about your character, relationships, career path, and financial prospects.</p>
            </div>
            <div className="ink-card">
              <div className="text-earth mb-4 text-center">
                <svg className="w-12 h-12 mx-auto" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-fire dark:text-fire text-center">Expert Guidance</h3>
              <p className="mt-2 text-gray-600 dark:text-gray-400 text-center">Connect with BaZi masters for professional consultations and in-depth life planning advice.</p>
            </div>
          </div>
        </div>
      </section>

      {/* What Is Section */}
      <section className="py-16 bg-ink-light dark:bg-ink-dark relative ink-wash-bg">
        <div className="ink-splash ink-splash-1"></div>
        <div className="ink-splash ink-splash-2"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold text-earth dark:text-earth mb-6 relative inline-block ink-text">
                What Is BaZi?
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                BaZi, also known as Four Pillars of Destiny, is an ancient Chinese astrological system used to understand an individual's destiny and character based on their birth date and time.
              </p>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                The system analyzes the cosmic energies present at the time of your birth using the concepts of Yin and Yang, Five Elements, and the interaction between Heavenly Stems and Earthly Branches.
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                Through BaZi, you can gain insights into your personality traits, strengths and weaknesses, career prospects, relationship compatibility, and life's potential challenges and opportunities.
              </p>
            </div>
            <div className="mt-10 lg:mt-0 flex justify-center">
              <div className="ink-card w-full max-w-md relative overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bagua-symbol opacity-15"></div>
                <div className="text-center relative z-10">
                  <h3 className="text-xl font-semibold text-fire dark:text-fire mb-4">The Four Pillars</h3>
                  
                  {/* BaZi Chart Table */}
                  <div className="overflow-hidden rounded-lg mb-6">
                    {/* Header Row */}
                    <div className="grid grid-cols-4 text-center">
                      <div className="bg-gray-200 dark:bg-gray-700 p-2 text-sm">
                        <span className="block text-gray-700 dark:text-gray-300">Hour Pillar</span>
                        <span className="block text-gray-500 dark:text-gray-400 text-xs">9:17</span>
                      </div>
                      <div className="bg-gray-200 dark:bg-gray-700 p-2 text-sm">
                        <span className="block text-gray-700 dark:text-gray-300">Day Pillar</span>
                        <span className="block text-gray-500 dark:text-gray-400 text-xs">26</span>
                      </div>
                      <div className="bg-gray-200 dark:bg-gray-700 p-2 text-sm">
                        <span className="block text-gray-700 dark:text-gray-300">Month Pillar</span>
                        <span className="block text-gray-500 dark:text-gray-400 text-xs">03</span>
                      </div>
                      <div className="bg-gray-200 dark:bg-gray-700 p-2 text-sm">
                        <span className="block text-gray-700 dark:text-gray-300">Year Pillar</span>
                        <span className="block text-gray-500 dark:text-gray-400 text-xs">2025</span>
                      </div>
                    </div>
                    
                    {/* Heavenly Stems Row */}
                    <div className="grid grid-cols-4 text-center">
                      <div className="bg-earth/20 p-3 border-r border-gray-200 dark:border-gray-700">
                        <div className="flex items-center justify-between">
                          <span className="text-earth font-bold">己</span>
                          <span className="text-gray-600 dark:text-gray-400">Yin-Earth</span>
                        </div>
                      </div>
                      <div className="bg-wood/20 p-3 border-r border-gray-200 dark:border-gray-700">
                        <div className="flex items-center justify-between">
                          <span className="text-wood font-bold">甲</span>
                          <span className="text-gray-600 dark:text-gray-400">Yang-Wood</span>
                        </div>
                      </div>
                      <div className="bg-earth/20 p-3 border-r border-gray-200 dark:border-gray-700">
                        <div className="flex items-center justify-between">
                          <span className="text-earth font-bold">己</span>
                          <span className="text-gray-600 dark:text-gray-400">Yin-Earth</span>
                        </div>
                      </div>
                      <div className="bg-wood/20 p-3">
                        <div className="flex items-center justify-between">
                          <span className="text-wood font-bold">乙</span>
                          <span className="text-gray-600 dark:text-gray-400">Yin-Wood</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Earthly Branches Row */}
                    <div className="grid grid-cols-4 text-center">
                      <div className="bg-fire/20 p-3 border-r border-gray-200 dark:border-gray-700">
                        <div className="flex items-center justify-between">
                          <span className="text-fire font-bold">巳</span>
                          <span className="text-gray-600 dark:text-gray-400">Snake</span>
                        </div>
                      </div>
                      <div className="bg-fire/20 p-3 border-r border-gray-200 dark:border-gray-700">
                        <div className="flex items-center justify-between">
                          <span className="text-fire font-bold">午</span>
                          <span className="text-gray-600 dark:text-gray-400">Horse</span>
                        </div>
                      </div>
                      <div className="bg-wood/20 p-3 border-r border-gray-200 dark:border-gray-700">
                        <div className="flex items-center justify-between">
                          <span className="text-wood font-bold">卯</span>
                          <span className="text-gray-600 dark:text-gray-400">Rabbit</span>
                        </div>
                      </div>
                      <div className="bg-fire/20 p-3">
                        <div className="flex items-center justify-between">
                          <span className="text-fire font-bold">巳</span>
                          <span className="text-gray-600 dark:text-gray-400">Snake</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Pillar Explanations */}
                  <div className="text-left text-gray-600 dark:text-gray-400 space-y-2">
                    <p className="text-sm"><span className="text-wood font-semibold">Year Pillar:</span> Influences your life foundation, ancestral luck, and early childhood</p>
                    <p className="text-sm"><span className="text-earth font-semibold">Month Pillar:</span> Represents your career path, resources, and middle age</p>
                    <p className="text-sm"><span className="text-fire font-semibold">Day Pillar:</span> Represents your self, personality, and marriage</p>
                    <p className="text-sm"><span className="text-metal font-semibold">Hour Pillar:</span> Influences your children, wealth, and later life</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How To Section */}
      <section className="py-16 bg-paper-white dark:bg-ink-dark relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-water via-metal to-wood opacity-70"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-earth dark:text-earth relative inline-block ink-text">
              How To Use Our BaZi Calculator
            </h2>
            <p className="mt-4 text-gray-600 dark:text-gray-400">Follow these simple steps to discover your BaZi chart</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="relative">
              <div className="ink-card h-full">
                <div className="absolute -top-4 -left-4 bg-fire text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-xl">1</div>
                <h3 className="text-xl font-semibold text-fire dark:text-fire mb-3 pt-2">Enter Birth Details</h3>
                <p className="text-gray-600 dark:text-gray-400">Input your date and time of birth accurately, selecting whether it's in solar or lunar calendar.</p>
              </div>
            </div>
            <div className="relative">
              <div className="ink-card h-full">
                <div className="absolute -top-4 -left-4 bg-fire text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-xl">2</div>
                <h3 className="text-xl font-semibold text-fire dark:text-fire mb-3 pt-2">Generate Chart</h3>
                <p className="text-gray-600 dark:text-gray-400">Our system will calculate your BaZi chart, displaying your four pillars and their elements.</p>
              </div>
            </div>
            <div className="relative">
              <div className="ink-card h-full">
                <div className="absolute -top-4 -left-4 bg-fire text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-xl">3</div>
                <h3 className="text-xl font-semibold text-fire dark:text-fire mb-3 pt-2">Review Analysis</h3>
                <p className="text-gray-600 dark:text-gray-400">Explore the basic interpretation of your chart, including element strengths and personality traits.</p>
              </div>
            </div>
            <div className="relative">
              <div className="ink-card h-full">
                <div className="absolute -top-4 -left-4 bg-fire text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-xl">4</div>
                <h3 className="text-xl font-semibold text-fire dark:text-fire mb-3 pt-2">Explore Further</h3>
                <p className="text-gray-600 dark:text-gray-400">For deeper insights, save your chart, explore detailed reports, or consult with our BaZi experts.</p>
              </div>
            </div>
          </div>
          <div className="text-center mt-10">
            <Link href="/calculator" className="inline-block bg-fire hover:bg-fire/80 text-white font-medium px-6 py-3 rounded-lg shadow-md transition-colors">
              Try It Now
            </Link>
          </div>
        </div>
      </section>

      {/* Why Section */}
      <section className="py-16 bg-ink-light dark:bg-ink-dark relative ink-wash-bg">
        <div className="ink-splash ink-splash-2"></div>
        <div className="ink-splash ink-splash-3"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-earth dark:text-earth relative inline-block ink-text">
              Why Choose Our BaZi Calculator
            </h2>
            <p className="mt-4 text-gray-600 dark:text-gray-400">What sets our service apart from others</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="ink-card">
              <div className="text-earth mb-4">
                <svg className="w-10 h-10 mx-auto" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-fire dark:text-fire mb-3 text-center">Precise Calculations</h3>
              <p className="text-gray-600 dark:text-gray-400">Our calculator uses advanced algorithms to ensure accurate lunar calendar conversion and BaZi chart generation.</p>
            </div>
            <div className="ink-card">
              <div className="text-earth mb-4">
                <svg className="w-10 h-10 mx-auto" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-fire dark:text-fire mb-3 text-center">Expert Community</h3>
              <p className="text-gray-600 dark:text-gray-400">Connect with certified BaZi masters and a supportive community to deepen your understanding of your chart.</p>
            </div>
            <div className="ink-card">
              <div className="text-earth mb-4">
                <svg className="w-10 h-10 mx-auto" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-fire dark:text-fire mb-3 text-center">Comprehensive Resources</h3>
              <p className="text-gray-600 dark:text-gray-400">Access extensive learning materials, articles, and guides to help you apply BaZi wisdom to your daily life.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-paper-white dark:bg-ink-dark relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-earth via-metal to-water opacity-70"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-earth dark:text-earth relative inline-block ink-text">
              Frequently Asked Questions
            </h2>
            <p className="mt-4 text-gray-600 dark:text-gray-400">Answers to common questions about BaZi and our services</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="ink-card bg-opacity-50">
              <h3 className="text-xl font-semibold text-fire dark:text-fire mb-3">What is the difference between BaZi and Western astrology?</h3>
              <p className="text-gray-600 dark:text-gray-400">While Western astrology focuses primarily on the positions of planets and stars, BaZi centers on the cosmic energies of time cycles based on the lunar calendar and the interaction of the Five Elements and Yin-Yang forces.</p>
            </div>
            <div className="ink-card bg-opacity-50">
              <h3 className="text-xl font-semibold text-fire dark:text-fire mb-3">How accurate is the BaZi calculator?</h3>
              <p className="text-gray-600 dark:text-gray-400">Our BaZi calculator provides highly accurate chart calculations based on traditional methods. However, the interpretation of the chart can vary based on the reader's expertise and the specific school of BaZi practice they follow.</p>
            </div>
            <div className="ink-card bg-opacity-50">
              <h3 className="text-xl font-semibold text-fire dark:text-fire mb-3">Do I need to know my exact birth time?</h3>
              <p className="text-gray-600 dark:text-gray-400">For the most accurate BaZi chart, knowing your exact birth time is ideal, as it affects your Hour Pillar. However, you can still get valuable insights from a partial chart if you only know your birth date.</p>
            </div>
            <div className="ink-card bg-opacity-50">
              <h3 className="text-xl font-semibold text-fire dark:text-fire mb-3">Can BaZi predict my future?</h3>
              <p className="text-gray-600 dark:text-gray-400">BaZi doesn't predict specific events but reveals tendencies and potentials in your life. It helps you understand your natural inclinations and possible life patterns, allowing you to make more informed decisions.</p>
            </div>
          </div>
          <div className="mt-10 text-center">
            <Link href="/faq" className="inline-block text-earth dark:text-earth hover:text-earth/80 dark:hover:text-earth/80 font-medium ink-btn">
              View More FAQs <span aria-hidden="true" className="ml-1">→</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
