'use client';

import Link from 'next/link';

export default function DestinyAnalysisPage() {
  return (
    <div className="min-h-screen bg-ink-light dark:bg-ink-dark py-12 relative ink-wash-bg">
      <div className="ink-splash ink-splash-1"></div>
      <div className="ink-splash ink-splash-2"></div>
      <div className="ink-splash ink-splash-3"></div>
      <div className="absolute top-20 right-10 w-40 h-40 bagua-symbol opacity-20"></div>
      <div className="absolute bottom-20 left-10 w-40 h-40 bagua-symbol opacity-20"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-earth dark:text-earth mb-4 ink-text">Destiny Analysis</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Discover in-depth insights about your personality, relationships, career, and life path based on your BaZi chart.
          </p>
        </div>

        {/* Login or Redirect Section */}
        <div className="ink-card max-w-3xl mx-auto text-center mb-12">
          <div className="inline-block p-3 rounded-full bg-earth/20 dark:bg-earth/20 mb-6">
            <svg className="w-12 h-12 text-earth dark:text-earth" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-fire dark:text-fire mb-4">Access Your BaZi Analysis</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            To view your complete destiny analysis, please login to your account or calculate your BaZi chart first.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link href="/login" className="px-6 py-3 bg-fire hover:bg-fire/80 text-white font-medium rounded-lg shadow-md transition-colors">
              Login to Your Account
            </Link>
            <Link href="/calculator" className="px-6 py-3 bg-ink-light hover:bg-ink-light/80 text-earth border border-earth/30 font-medium rounded-lg shadow-md transition-colors">
              Calculate Your Chart
            </Link>
          </div>
        </div>

        {/* Analysis Types Overview */}
        <h2 className="text-2xl font-bold text-earth dark:text-earth text-center relative inline-block mx-auto w-max block mb-12 ink-text">
          What Your BaZi Analysis Includes
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Personal Character Analysis */}
          <div className="ink-card overflow-hidden">
            <div className="absolute top-0 right-0 w-12 h-12 bagua-symbol opacity-10"></div>
            <div className="text-earth dark:text-earth mb-4">
              <svg className="w-10 h-10 mx-auto" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-fire dark:text-fire mb-3 text-center">Personal Character Analysis</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Gain deep insights into your personality traits, strengths, and areas for growth based on your unique BaZi configuration.
            </p>
            <ul className="text-gray-600 dark:text-gray-300 list-disc list-inside mb-4">
              <li>Natural temperament and emotional tendencies</li>
              <li>Intellectual style and decision-making approach</li>
              <li>Core values and motivational drivers</li>
              <li>Communication style and social interactions</li>
            </ul>
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <p className="text-sm text-earth dark:text-earth font-medium">
                Sample insight: "Your strong Wood element indicates creativity and vision, balanced by Metal that brings analytical thinking."
              </p>
            </div>
          </div>

          {/* Career Path Analysis */}
          <div className="ink-card overflow-hidden">
            <div className="absolute top-0 right-0 w-12 h-12 bagua-symbol opacity-10"></div>
            <div className="text-earth dark:text-earth mb-4">
              <svg className="w-10 h-10 mx-auto" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd"></path>
                <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z"></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-fire dark:text-fire mb-3 text-center">Career Path Analysis</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Discover which professional fields align best with your natural talents and elemental balance.
            </p>
            <ul className="text-gray-600 dark:text-gray-300 list-disc list-inside mb-4">
              <li>Suitable industry sectors and job roles</li>
              <li>Leadership style and workplace dynamics</li>
              <li>Optimal work environments</li>
              <li>Career timeline and favorable periods for advancement</li>
            </ul>
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <p className="text-sm text-earth dark:text-earth font-medium">
                Sample insight: "Your Earth-dominated chart suggests excellence in advisory roles, management, and fields requiring patience and stability."
              </p>
            </div>
          </div>

          {/* Relationship Analysis */}
          <div className="ink-card overflow-hidden">
            <div className="absolute top-0 right-0 w-12 h-12 bagua-symbol opacity-10"></div>
            <div className="text-earth dark:text-earth mb-4">
              <svg className="w-10 h-10 mx-auto" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 5a1 1 0 100 2h5.586l-1.293 1.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L13.586 5H8zM12 15a1 1 0 100-2H6.414l1.293-1.293a1 1 0 10-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L6.414 15H12z"></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-fire dark:text-fire mb-3 text-center">Relationship Analysis</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Understand your relationship patterns and compatibility factors based on your BaZi chart.
            </p>
            <ul className="text-gray-600 dark:text-gray-300 list-disc list-inside mb-4">
              <li>Romantic relationship tendencies</li>
              <li>Communication patterns with partners</li>
              <li>Family dynamics and parenting style</li>
              <li>Friendship and professional relationship insights</li>
            </ul>
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <p className="text-sm text-earth dark:text-earth font-medium">
                Sample insight: "Your Fire element suggests passion and enthusiasm in relationships, while your Water brings depth and intuition."
              </p>
            </div>
          </div>

          {/* Health Trends Analysis */}
          <div className="ink-card overflow-hidden">
            <div className="absolute top-0 right-0 w-12 h-12 bagua-symbol opacity-10"></div>
            <div className="text-earth dark:text-earth mb-4">
              <svg className="w-10 h-10 mx-auto" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd"></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-fire dark:text-fire mb-3 text-center">Health Trends Analysis</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Receive insights about your constitutional tendencies and potential health considerations.
            </p>
            <ul className="text-gray-600 dark:text-gray-300 list-disc list-inside mb-4">
              <li>Elemental imbalances and their health correlations</li>
              <li>Seasonal influences on vitality</li>
              <li>Stress response patterns</li>
              <li>Lifestyle recommendations for optimal wellbeing</li>
            </ul>
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <p className="text-sm text-earth dark:text-earth font-medium">
                Sample insight: "Your Wood-Metal imbalance suggests paying attention to liver and respiratory health through balanced nutrition and exercise."
              </p>
            </div>
          </div>
        </div>
        
        {/* Wealth Analysis Section */}
        <div className="ink-card p-8 mb-16 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bagua-symbol opacity-10"></div>
          <div className="ink-splash ink-splash-2 opacity-5"></div>
          <div className="md:flex items-center">
            <div className="md:w-1/3 mb-6 md:mb-0 md:pr-8">
              <div className="text-center">
                <div className="inline-block p-4 rounded-full bg-earth/20 dark:bg-earth/20 mb-4">
                  <svg className="w-16 h-16 text-earth dark:text-earth" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z"></path>
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd"></path>
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-fire dark:text-fire ink-text">Wealth & Finance Analysis</h2>
              </div>
            </div>
            <div className="md:w-2/3">
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Your BaZi chart reveals your natural tendencies in wealth creation, management, and financial decision-making.
                Our comprehensive analysis identifies your wealth stars, favorable money-making periods, and personalized
                financial planning advice.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="bg-paper-white/80 dark:bg-ink-dark/80 p-4 rounded-md">
                  <h4 className="font-semibold text-fire dark:text-fire mb-2">Wealth Creation Style</h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Understand whether you're naturally inclined toward steady income, entrepreneurial ventures, investments, or creative pursuits.
                  </p>
                </div>
                <div className="bg-paper-white/80 dark:bg-ink-dark/80 p-4 rounded-md">
                  <h4 className="font-semibold text-fire dark:text-fire mb-2">Financial Decision Making</h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Discover your natural approach to risk, saving, spending, and long-term financial planning.
                  </p>
                </div>
              </div>
              <p className="text-sm text-earth dark:text-earth font-medium">
                Sample insight: "Your wealth element is well-positioned, suggesting success through methodical planning rather than high-risk ventures."
              </p>
            </div>
          </div>
        </div>

        {/* Premium Analysis CTA */}
        <div className="ink-card p-8 text-center relative overflow-hidden">
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-wood via-fire to-water opacity-70"></div>
          <div className="ink-splash ink-splash-1 opacity-5"></div>
          <div className="ink-splash ink-splash-3 opacity-5"></div>
          <h2 className="text-2xl font-bold text-fire dark:text-fire mb-4 ink-text">Ready for Your Complete BaZi Destiny Analysis?</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            Our premium analysis provides deeper insights, personalized recommendations, and a consultation with a BaZi expert to
            help you navigate life's journey with confidence.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link href="/calculator" className="px-6 py-3 bg-fire hover:bg-fire/80 text-white font-medium rounded-lg shadow-md transition-colors">
              Calculate Your Chart
            </Link>
            <Link href="/services" className="px-6 py-3 bg-ink-light hover:bg-ink-light/80 text-earth border border-earth/30 font-medium rounded-lg shadow-md transition-colors">
              View Premium Services
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 