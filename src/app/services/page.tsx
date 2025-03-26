'use client';

import Link from 'next/link';

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-paper-white dark:bg-ink-dark py-12 ink-wash-bg relative">
      <div className="ink-splash ink-splash-1"></div>
      <div className="ink-splash ink-splash-2"></div>
      <div className="ink-splash ink-splash-3"></div>
      <div className="absolute top-10 right-10 w-40 h-40 bagua-symbol opacity-20"></div>
      <div className="absolute bottom-10 left-10 w-40 h-40 bagua-symbol opacity-20"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-earth dark:text-earth mb-4 ink-text">Professional Services</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Get personalized BaZi readings and guidance from our experts to understand your destiny path and growth opportunities.
          </p>
        </div>

        {/* 服务介绍部分 */}
        <section className="mb-16">
          <div className="ink-card relative overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bagua-symbol opacity-15"></div>
            <div className="p-8">
              <h3 className="text-xl font-semibold text-fire dark:text-fire mb-4 text-center ink-text">Our Professional Services</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-8 text-center max-w-3xl mx-auto">
                While our online calculator provides basic BaZi analysis, our professional consultants offer more comprehensive and personalized guidance for deeper destiny readings and life direction.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="ink-card bg-fire/5 h-full relative">
                  <div className="absolute top-0 left-0 w-full h-1 bg-fire/50"></div>
                  <div className="text-fire mb-4 text-center">
                    <svg className="w-12 h-12 mx-auto" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"></path>
                    </svg>
                  </div>
                  <h4 className="text-lg font-semibold text-fire dark:text-fire text-center mb-2">Basic BaZi Reading</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-6">
                    Through video or phone consultation, our BaZi expert will provide a detailed analysis of your chart, including:
                  </p>
                  <ul className="text-gray-600 dark:text-gray-400 text-sm list-disc list-inside mb-6">
                    <li>Detailed chart structure analysis</li>
                    <li>Personality traits and talents interpretation</li>
                    <li>Career inclinations and development directions</li>
                    <li>Relationship patterns analysis</li>
                    <li>Recent fortune trends and challenges</li>
                  </ul>
                  <div className="text-center mt-auto">
                    <div className="text-fire font-semibold mb-2">From $99</div>
                    <Link href="/contact" className="bg-fire hover:bg-fire/80 text-white font-medium px-4 py-2 rounded-lg shadow-sm text-sm inline-block">
                      Book Now
                    </Link>
                  </div>
                </div>
                
                <div className="ink-card bg-earth/5 h-full relative">
                  <div className="absolute top-0 left-0 w-full h-1 bg-earth/50"></div>
                  <div className="text-earth mb-4 text-center">
                    <svg className="w-12 h-12 mx-auto" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"></path>
                    </svg>
                  </div>
                  <h4 className="text-lg font-semibold text-earth dark:text-earth text-center mb-2">In-depth Life Planning</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-6">
                    A more comprehensive consultation service to help you create long-term life plans, including:
                  </p>
                  <ul className="text-gray-600 dark:text-gray-400 text-sm list-disc list-inside mb-6">
                    <li>Detailed personal BaZi analysis</li>
                    <li>10-year fortune prediction and key turning points</li>
                    <li>Career planning and development strategies</li>
                    <li>Family and marriage relationship analysis</li>
                    <li>Health trends and wellness advice</li>
                    <li>Wealth planning and investment guidance</li>
                  </ul>
                  <div className="text-center mt-auto">
                    <div className="text-earth font-semibold mb-2">From $199</div>
                    <Link href="/contact" className="bg-earth hover:bg-earth/80 text-white font-medium px-4 py-2 rounded-lg shadow-sm text-sm inline-block">
                      Book Now
                    </Link>
                  </div>
                </div>
                
                <div className="ink-card bg-water/5 h-full relative">
                  <div className="absolute top-0 left-0 w-full h-1 bg-water/50"></div>
                  <div className="text-water mb-4 text-center">
                    <svg className="w-12 h-12 mx-auto" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"></path>
                    </svg>
                  </div>
                  <h4 className="text-lg font-semibold text-water dark:text-water text-center mb-2">VIP Ongoing Advisory</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-6">
                    Long-term professional support for clients who value metaphysical guidance:
                  </p>
                  <ul className="text-gray-600 dark:text-gray-400 text-sm list-disc list-inside mb-6">
                    <li>Initial in-depth BaZi analysis</li>
                    <li>Quarterly fortune updates and consultations</li>
                    <li>Major decision-specific analysis</li>
                    <li>Daily question support</li>
                    <li>Feng Shui and environment optimization advice</li>
                    <li>Personalized fortune enhancement plan</li>
                    <li>Major life event timing selection</li>
                  </ul>
                  <div className="text-center mt-auto">
                    <div className="text-water font-semibold mb-2">From $599/year</div>
                    <Link href="/contact" className="bg-water hover:bg-water/80 text-white font-medium px-4 py-2 rounded-lg shadow-sm text-sm inline-block">
                      Book Now
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 专家团队部分 */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-earth dark:text-earth ink-text">Our Expert Team</h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400">BaZi destiny consultants with rich experience and professional knowledge</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="ink-card p-6 relative">
              <div className="rounded-full overflow-hidden w-32 h-32 mx-auto mb-4 border-4 border-fire/20">
                <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-500">
                  <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path>
                  </svg>
                </div>
              </div>
              <h3 className="text-lg font-semibold text-fire dark:text-fire text-center mb-1">Master Wang</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 text-center mb-4">Chief BaZi Destiny Expert</p>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                With 30 years of BaZi research experience, Master Wang is proficient in multiple metaphysical systems including Purple Star Astrology and Qi Men Dun Jia. He has provided destiny consulting services to many entrepreneurs and public figures.
              </p>
              <div className="text-center">
                <Link href="/experts/wang" className="text-fire hover:text-fire/80 text-sm font-medium">
                  View Profile
                </Link>
              </div>
            </div>
            
            <div className="ink-card p-6 relative">
              <div className="rounded-full overflow-hidden w-32 h-32 mx-auto mb-4 border-4 border-earth/20">
                <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-500">
                  <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path>
                  </svg>
                </div>
              </div>
              <h3 className="text-lg font-semibold text-earth dark:text-earth text-center mb-1">Professor Li</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 text-center mb-4">Career Destiny Analyst</p>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                Focusing on career planning and professional development applications of BaZi, Professor Li excels at analyzing personal talents and optimal career directions. She has helped hundreds of clients successfully transition careers or gain promotions.
              </p>
              <div className="text-center">
                <Link href="/experts/li" className="text-earth hover:text-earth/80 text-sm font-medium">
                  View Profile
                </Link>
              </div>
            </div>
            
            <div className="ink-card p-6 relative">
              <div className="rounded-full overflow-hidden w-32 h-32 mx-auto mb-4 border-4 border-water/20">
                <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-500">
                  <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path>
                  </svg>
                </div>
              </div>
              <h3 className="text-lg font-semibold text-water dark:text-water text-center mb-1">Consultant Zhang</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 text-center mb-4">Relationship & Marriage Expert</p>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                Specializing in marriage compatibility and relationship analysis, Consultant Zhang combines psychology knowledge with BaZi theory to provide clients with comprehensive relationship consultation and improvement strategies.
              </p>
              <div className="text-center">
                <Link href="/experts/zhang" className="text-water hover:text-water/80 text-sm font-medium">
                  View Profile
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* 客户评价部分 */}
        <section className="mb-16">
          <div className="ink-card p-8 relative overflow-hidden">
            <div className="absolute top-5 right-5 w-24 h-24 bagua-symbol opacity-15"></div>
            <h3 className="text-xl font-semibold text-fire dark:text-fire mb-6 text-center ink-text">Client Testimonials</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="ink-card bg-wood/5 p-4 relative">
                <div className="absolute top-2 left-2 text-wood opacity-30 text-4xl">"</div>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 pl-4">
                  Master Wang's BaZi analysis amazed me. He not only accurately pointed out my past life turning points but also helped me find a more suitable career direction. After adjusting according to his advice, both my work and family life have become more harmonious.
                </p>
                <div className="flex items-center">
                  <div className="rounded-full w-10 h-10 bg-gray-200 flex items-center justify-center mr-3">
                    <span className="text-gray-500 font-medium">C</span>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-800 dark:text-gray-200">Ms. Chen</div>
                    <div className="text-xs text-gray-500">Corporate Executive</div>
                  </div>
                </div>
              </div>
              
              <div className="ink-card bg-water/5 p-4 relative">
                <div className="absolute top-2 left-2 text-water opacity-30 text-4xl">"</div>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 pl-4">
                  李老师对我的职业分析非常到位，帮我看清了自己的优势和不足。通过他的指导，我成功转行进入了更适合的领域，不仅工作更有成就感，收入也提高了不少。
                </p>
                <div className="flex items-center">
                  <div className="rounded-full w-10 h-10 bg-gray-200 flex items-center justify-center mr-3">
                    <span className="text-gray-500 font-medium">Z</span>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-800 dark:text-gray-200">赵先生</div>
                    <div className="text-xs text-gray-500">软件工程师</div>
                  </div>
                </div>
              </div>
              
              <div className="ink-card bg-metal/5 p-4 relative">
                <div className="absolute top-2 left-2 text-metal opacity-30 text-4xl">"</div>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 pl-4">
                  张顾问的婚姻匹配分析帮助我和伴侣更好地理解彼此的性格差异，学会了如何互补而非冲突。我们的关系因此变得更加稳固和幸福。
                </p>
                <div className="flex items-center">
                  <div className="rounded-full w-10 h-10 bg-gray-200 flex items-center justify-center mr-3">
                    <span className="text-gray-500 font-medium">L</span>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-800 dark:text-gray-200">林女士</div>
                    <div className="text-xs text-gray-500">教育工作者</div>
                  </div>
                </div>
              </div>
              
              <div className="ink-card bg-fire/5 p-4 relative">
                <div className="absolute top-2 left-2 text-fire opacity-30 text-4xl">"</div>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 pl-4">
                  作为一名创业者，VIP顾问服务对我来说非常有价值。每次做重要决策前都会咨询专家意见，避免了许多潜在风险，也抓住了更多机会。
                </p>
                <div className="flex items-center">
                  <div className="rounded-full w-10 h-10 bg-gray-200 flex items-center justify-center mr-3">
                    <span className="text-gray-500 font-medium">W</span>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-800 dark:text-gray-200">吴先生</div>
                    <div className="text-xs text-gray-500">企业创始人</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 预约流程部分 */}
        <section className="mb-16">
          <div className="ink-card p-8 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-water via-wood to-fire opacity-70"></div>
            <h3 className="text-xl font-semibold text-fire dark:text-fire mb-6 text-center ink-text">预约流程</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
              <div className="md:col-span-4 absolute top-1/2 left-0 w-full h-0.5 bg-gray-200 dark:bg-gray-700 -translate-y-1/2 hidden md:block"></div>
              
              <div className="relative">
                <div className="ink-card h-full">
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-fire text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-xl z-10">1</div>
                  <h4 className="text-lg font-semibold text-fire dark:text-fire mb-3 pt-2 text-center">选择服务</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-center text-sm">
                    根据您的需求选择合适的服务类型和专家顾问。
                  </p>
                </div>
              </div>
              
              <div className="relative">
                <div className="ink-card h-full">
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-fire text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-xl z-10">2</div>
                  <h4 className="text-lg font-semibold text-fire dark:text-fire mb-3 pt-2 text-center">提交资料</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-center text-sm">
                    提供您的出生年月日时等基本信息，以便我们进行初步分析。
                  </p>
                </div>
              </div>
              
              <div className="relative">
                <div className="ink-card h-full">
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-fire text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-xl z-10">3</div>
                  <h4 className="text-lg font-semibold text-fire dark:text-fire mb-3 pt-2 text-center">付款预约</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-center text-sm">
                    选择咨询时间并完成付款，系统将自动确认您的预约。
                  </p>
                </div>
              </div>
              
              <div className="relative">
                <div className="ink-card h-full">
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-fire text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-xl z-10">4</div>
                  <h4 className="text-lg font-semibold text-fire dark:text-fire mb-3 pt-2 text-center">获取解读</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-center text-sm">
                    在约定时间进行视频或电话咨询，获取专业的八字解读和建议。
                  </p>
                </div>
              </div>
            </div>
            
            <div className="text-center mt-10">
              <Link href="/contact" className="bg-fire hover:bg-fire/80 text-white font-medium px-6 py-3 rounded-lg shadow-md transition-colors">
                立即咨询
              </Link>
            </div>
          </div>
        </section>

        {/* FAQ部分 */}
        <section className="mb-16">
          <div className="ink-card p-8 relative overflow-hidden">
            <div className="absolute top-5 left-5 w-24 h-24 bagua-symbol opacity-15"></div>
            <h3 className="text-xl font-semibold text-fire dark:text-fire mb-6 text-center ink-text">常见问题</h3>
            
            <div className="space-y-4 max-w-3xl mx-auto">
              <div className="ink-card bg-gray-50 dark:bg-gray-800">
                <h4 className="text-lg font-medium text-earth dark:text-earth mb-2">咨询需要准备哪些信息？</h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  为了进行准确的八字分析，我们需要您的出生年、月、日、时（尽量精确到小时），以及出生地点。如果不确定具体出生时间，可以提前告知我们，专家会有相应的调整方法。
                </p>
              </div>
              
              <div className="ink-card bg-gray-50 dark:bg-gray-800">
                <h4 className="text-lg font-medium text-earth dark:text-earth mb-2">咨询方式有哪些？</h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  我们提供视频咨询、电话咨询和面对面咨询（仅限特定地区）三种方式。您可以根据自己的喜好和便利性选择合适的咨询形式。
                </p>
              </div>
              
              <div className="ink-card bg-gray-50 dark:bg-gray-800">
                <h4 className="text-lg font-medium text-earth dark:text-earth mb-2">如何评估咨询效果？</h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  我们的每位客户在咨询后都会收到一份详细的书面报告，包含所有分析内容和建议。您可以根据这份报告评估咨询的准确性和有用性。同时，我们提供7天的免费追问服务，确保您理解所有内容。
                </p>
              </div>
              
              <div className="ink-card bg-gray-50 dark:bg-gray-800">
                <h4 className="text-lg font-medium text-earth dark:text-earth mb-2">是否提供退款保证？</h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  如果您在咨询前24小时取消预约，我们提供全额退款。咨询开始后，由于专家已经投入时间和精力进行分析，我们不再提供退款。但我们承诺提供高质量的服务，如有任何不满，可以联系客服寻求解决方案。
                </p>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
} 