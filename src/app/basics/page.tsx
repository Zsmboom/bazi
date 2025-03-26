'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function BasicsPage() {
  return (
    <div className="min-h-screen bg-paper-white dark:bg-ink-dark py-12 ink-wash-bg relative">
      <div className="ink-splash ink-splash-1"></div>
      <div className="ink-splash ink-splash-2"></div>
      <div className="ink-splash ink-splash-3"></div>
      <div className="absolute top-10 right-10 w-40 h-40 bagua-symbol opacity-20"></div>
      <div className="absolute bottom-10 left-10 w-40 h-40 bagua-symbol opacity-20"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-earth dark:text-earth mb-4 ink-text">BaZi Basics</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Understanding the fundamental concepts of BaZi (Four Pillars of Destiny) and its significance in Chinese metaphysics.
          </p>
        </div>

        {/* Solar Time Section */}
        <section className="mb-16">
          <div className="ink-card relative overflow-hidden">
            <div className="absolute top-5 left-5 w-24 h-24 bagua-symbol opacity-15"></div>
            <div className="md:flex flex-row-reverse">
              <div className="md:flex-shrink-0 md:w-2/5 relative h-64 md:h-auto">
                <div className="h-full flex items-center justify-center p-8 bg-fire/10 rounded-r-lg">
                  <div className="relative z-10 text-center">
                    <div className="w-full h-48 relative">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-32 h-32 rounded-full bg-paper-white dark:bg-ink-dark border-4 border-earth flex items-center justify-center">
                          <div className="w-2 h-16 bg-fire absolute" style={{ transform: 'rotate(45deg)', transformOrigin: 'bottom center' }}></div>
                          <div className="w-2 h-12 bg-water absolute" style={{ transform: 'rotate(135deg)', transformOrigin: 'bottom center' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-8 md:w-3/5">
                <h3 className="text-xl font-semibold text-fire dark:text-fire mb-4 ink-text">Why Does BaZi Use Solar Time?</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  In BaZi destiny analysis, using true solar time rather than standard civil time is crucial. Solar time is calculated based on the actual position of the sun in the sky, not on standardized time zones.
                </p>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  <span className="text-earth font-semibold">Accuracy Reasons:</span> Traditional BaZi theory holds that a person's destiny is intimately connected to the cosmic energies present at birth. The sun's position directly influences these energies, so using true solar time more accurately captures the cosmic state at that moment.
                </p>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  <span className="text-earth font-semibold">Historical Origins:</span> The BaZi system developed in an era without standardized time zones, when people used the sun's position to determine time. To maintain consistency with traditional methods, modern BaZi calculations still adhere to solar time.
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  <span className="text-earth font-semibold">Conversion Method:</span> Converting modern standard time to solar time requires considering longitude correction (4 minutes per degree) and the equation of time correction (varies throughout the year). This ensures the accuracy of BaZi charting, especially crucial for determining the hour pillar.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* History and Origins Section */}
        <section className="mb-16">
          <div className="ink-card relative overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bagua-symbol opacity-15"></div>
            <div className="md:flex">
              <div className="md:flex-shrink-0 md:w-1/3 relative h-64 md:h-auto">
                <div className="absolute inset-0 bg-earth opacity-10"></div>
                <div className="h-full flex items-center justify-center p-8">
                  <div className="relative z-10 text-center">
                    <div className="inline-block p-3 rounded-full bg-earth/10 dark:bg-earth/20 mb-4">
                      <svg className="w-10 h-10 text-earth dark:text-earth" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                      </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-earth dark:text-earth ink-text">History & Origins</h2>
                  </div>
                </div>
              </div>
              <div className="p-8 md:w-2/3">
                <h3 className="text-xl font-semibold text-fire dark:text-fire mb-4">Ancient Roots of BaZi</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  BaZi, also known as Four Pillars of Destiny, has its origins in ancient China dating back over 2,000 years. It evolved from the I Ching (Book of Changes) and was refined during the Tang and Song dynasties (7th-13th centuries) into the system we recognize today.
                </p>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Originally, BaZi was used by imperial astrologers to predict the fate of the empire and guide important state decisions. Later, as the culture spread, BaZi gradually became accessible to the general population as a tool for personal destiny analysis and life planning.
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  Throughout Chinese history, BaZi masters were highly respected and served as advisors to emperors, nobles, and eventually common people, guiding important life decisions from marriage to career choices based on the cosmic energies present at a person's birth.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Basic Concepts Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-earth dark:text-earth mb-8 text-center ink-text">Basic Concepts</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="ink-card relative">
              <div className="absolute -top-2 -right-2 w-12 h-12 bagua-symbol opacity-20"></div>
              <div className="text-earth mb-4 text-center">
                <svg className="w-10 h-10 mx-auto" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-fire dark:text-fire mb-3 text-center">Heavenly Stems</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                The 10 Heavenly Stems (甲, 乙, 丙, 丁, 戊, 己, 庚, 辛, 壬, 癸) represent the Yin and Yang expressions of the Five Elements.
              </p>
              <ul className="text-gray-600 dark:text-gray-300 list-disc list-inside">
                <li>甲 (Jia, Yang Wood), 乙 (Yi, Yin Wood)</li>
                <li>丙 (Bing, Yang Fire), 丁 (Ding, Yin Fire)</li>
                <li>戊 (Wu, Yang Earth), 己 (Ji, Yin Earth)</li>
                <li>庚 (Geng, Yang Metal), 辛 (Xin, Yin Metal)</li>
                <li>壬 (Ren, Yang Water), 癸 (Gui, Yin Water)</li>
              </ul>
            </div>
            
            <div className="ink-card relative">
              <div className="absolute -top-2 -right-2 w-12 h-12 bagua-symbol opacity-20"></div>
              <div className="text-earth mb-4 text-center">
                <svg className="w-10 h-10 mx-auto" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-fire dark:text-fire mb-3 text-center">Earthly Branches</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                The 12 Earthly Branches, originally representing animal signs, correspond to the months and hours of the day.
              </p>
              <ul className="text-gray-600 dark:text-gray-300 list-disc list-inside">
                <li>子 (Zi, Rat), 丑 (Chou, Ox), 寅 (Yin, Tiger)</li>
                <li>卯 (Mao, Rabbit), 辰 (Chen, Dragon), 巳 (Si, Snake)</li>
                <li>午 (Wu, Horse), 未 (Wei, Goat), 申 (Shen, Monkey)</li>
                <li>酉 (You, Rooster), 戌 (Xu, Dog), 亥 (Hai, Pig)</li>
              </ul>
            </div>
            
            <div className="ink-card relative">
              <div className="absolute -top-2 -right-2 w-12 h-12 bagua-symbol opacity-20"></div>
              <div className="text-earth mb-4 text-center">
                <svg className="w-10 h-10 mx-auto" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z" clipRule="evenodd"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-fire dark:text-fire mb-3 text-center">Five Elements</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                The Five Elements (Wu Xing) form the foundation of BaZi theory, representing the cyclical transformations of energy.
              </p>
              <ul className="text-gray-600 dark:text-gray-300 list-disc list-inside">
                <li><span className="text-wood font-semibold">Wood (木)</span>: Growth, expansion, vitality</li>
                <li><span className="text-fire font-semibold">Fire (火)</span>: Energy, passion, transformation</li>
                <li><span className="text-earth font-semibold">Earth (土)</span>: Stability, nourishment, centering</li>
                <li><span className="text-metal font-semibold">Metal (金)</span>: Structure, clarity, precision</li>
                <li><span className="text-water font-semibold">Water (水)</span>: Wisdom, adaptability, introspection</li>
              </ul>
            </div>
          </div>
          
          <div className="ink-card p-8 mb-8 relative">
            <div className="absolute bottom-5 right-5 w-24 h-24 bagua-symbol opacity-15"></div>
            <h3 className="text-xl font-semibold text-fire dark:text-fire mb-4 ink-text">The Four Pillars</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              A BaZi chart consists of four pillars derived from a person's birth date and time. Each pillar contains a Heavenly Stem and an Earthly Branch, creating eight characters that form the basis of the analysis.
            </p>
            
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
                    <span className="text-earth font-bold">己 (Ji)</span>
                    <span className="text-gray-600 dark:text-gray-400">Yin Earth</span>
                  </div>
                </div>
                <div className="bg-wood/20 p-3 border-r border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <span className="text-wood font-bold">甲 (Jia)</span>
                    <span className="text-gray-600 dark:text-gray-400">Yang Wood</span>
                  </div>
                </div>
                <div className="bg-earth/20 p-3 border-r border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <span className="text-earth font-bold">己 (Ji)</span>
                    <span className="text-gray-600 dark:text-gray-400">Yin Earth</span>
                  </div>
                </div>
                <div className="bg-wood/20 p-3">
                  <div className="flex items-center justify-between">
                    <span className="text-wood font-bold">乙 (Yi)</span>
                    <span className="text-gray-600 dark:text-gray-400">Yin Wood</span>
                  </div>
                </div>
              </div>
              
              {/* Earthly Branches Row */}
              <div className="grid grid-cols-4 text-center">
                <div className="bg-fire/20 p-3 border-r border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <span className="text-fire font-bold">巳 (Si)</span>
                    <span className="text-gray-600 dark:text-gray-400">Snake</span>
                  </div>
                </div>
                <div className="bg-fire/20 p-3 border-r border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <span className="text-fire font-bold">午 (Wu)</span>
                    <span className="text-gray-600 dark:text-gray-400">Horse</span>
                  </div>
                </div>
                <div className="bg-wood/20 p-3 border-r border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <span className="text-wood font-bold">卯 (Mao)</span>
                    <span className="text-gray-600 dark:text-gray-400">Rabbit</span>
                  </div>
                </div>
                <div className="bg-fire/20 p-3">
                  <div className="flex items-center justify-between">
                    <span className="text-fire font-bold">巳 (Si)</span>
                    <span className="text-gray-600 dark:text-gray-400">Snake</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="border border-water/30 dark:border-water/30 rounded-md p-4 text-center bg-water/5">
                <h4 className="font-semibold text-water dark:text-water mb-2">Year Pillar</h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Represents your ancestors, family background, and early childhood environment.
                </p>
              </div>
              <div className="border border-wood/30 dark:border-wood/30 rounded-md p-4 text-center bg-wood/5">
                <h4 className="font-semibold text-wood dark:text-wood mb-2">Month Pillar</h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Indicates your career path, resources, and support from mentors and colleagues.
                </p>
              </div>
              <div className="border border-fire/30 dark:border-fire/30 rounded-md p-4 text-center bg-fire/5">
                <h4 className="font-semibold text-fire dark:text-fire mb-2">Day Pillar</h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Represents your core self, spouse, and partnerships in life.
                </p>
              </div>
              <div className="border border-earth/30 dark:border-earth/30 rounded-md p-4 text-center bg-earth/5">
                <h4 className="font-semibold text-earth dark:text-earth mb-2">Hour Pillar</h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Indicates your children, future aspirations, and later life experiences.
                </p>
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-300">
              These pillars interact with each other, creating a dynamic system that reveals your strengths, weaknesses, opportunities, and challenges throughout life.
            </p>
          </div>
          
          <div className="ink-card p-8 relative">
            <div className="absolute top-5 left-5 w-20 h-20 bagua-symbol opacity-15"></div>
            <h3 className="text-xl font-semibold text-fire dark:text-fire mb-4 ink-text">Element Interactions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold text-wood dark:text-wood mb-3">Generating Cycle (生)</h4>
                <p className="text-gray-600 dark:text-gray-300 mb-3">Elements create and nurture each other in this sequence:</p>
                <ul className="text-gray-600 dark:text-gray-300 list-disc list-inside mb-4">
                  <li><span className="text-wood">Wood</span> generates <span className="text-fire">Fire</span> (wood burns to produce fire)</li>
                  <li><span className="text-fire">Fire</span> generates <span className="text-earth">Earth</span> (fire ash forms earth)</li>
                  <li><span className="text-earth">Earth</span> generates <span className="text-metal">Metal</span> (earth bears minerals)</li>
                  <li><span className="text-metal">Metal</span> generates <span className="text-water">Water</span> (metal condenses water)</li>
                  <li><span className="text-water">Water</span> generates <span className="text-wood">Wood</span> (water nourishes plants)</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-fire dark:text-fire mb-3">Controlling Cycle (克)</h4>
                <p className="text-gray-600 dark:text-gray-300 mb-3">Elements control and restrict each other in this sequence:</p>
                <ul className="text-gray-600 dark:text-gray-300 list-disc list-inside mb-4">
                  <li><span className="text-wood">Wood</span> controls <span className="text-earth">Earth</span> (roots break up soil)</li>
                  <li><span className="text-earth">Earth</span> controls <span className="text-water">Water</span> (earth dams water)</li>
                  <li><span className="text-water">Water</span> controls <span className="text-fire">Fire</span> (water extinguishes fire)</li>
                  <li><span className="text-fire">Fire</span> controls <span className="text-metal">Metal</span> (fire melts metal)</li>
                  <li><span className="text-metal">Metal</span> controls <span className="text-wood">Wood</span> (metal cuts wood)</li>
                </ul>
              </div>
            </div>
            <div className="mt-4 p-4 bg-ink-light/20 rounded-lg border border-earth/20">
              <p className="text-gray-600 dark:text-gray-300">
                Understanding these relationships is crucial for interpreting a BaZi chart, as they determine whether elements in your chart are in harmony or conflict. This balance or imbalance has profound implications for one's destiny.
              </p>
            </div>
          </div>
        </section>

        {/* Bazi Calculation Logic Section */}
        <section className="mb-16">
          <div className="ink-card relative overflow-hidden">
            <div className="absolute top-10 right-10 w-32 h-32 bagua-symbol opacity-15"></div>
            <h2 className="text-2xl font-bold text-earth dark:text-earth mb-6 text-center ink-text">BaZi Calculation Logic</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
              <div>
                <h3 className="text-xl font-semibold text-fire dark:text-fire mb-4">Date Conversion Mechanism</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  BaZi calculation first requires accurate conversion of Gregorian (solar) calendar dates to the Chinese (lunar) calendar. This step is crucial because traditional BaZi is based on the lunar calendar system.
                </p>
                <div className="bg-ink-light/20 p-4 rounded-lg mb-4 border border-earth/20">
                  <h4 className="font-semibold text-wood dark:text-wood mb-2">Key Conversion Points:</h4>
                  <ul className="text-gray-600 dark:text-gray-300 list-disc list-inside">
                    <li>Consideration of lunar leap months</li>
                    <li>Managing date changes at solar term boundaries</li>
                    <li>Accounting for regional differences in calculations</li>
                  </ul>
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  Modern BaZi calculation software can precisely calculate these factors, avoiding errors that traditional manual calculations might introduce, especially for births near solar term boundaries.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-fire dark:text-fire mb-4">Four Pillars Determination Process</h3>
                <div className="space-y-4">
                  <div className="bg-wood/10 p-3 rounded-lg border border-wood/20">
                    <h4 className="font-semibold text-wood">Year Pillar Determination</h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      Based on the lunar year, using the stem-branch dating method. Each lunar year has a fixed Heavenly Stem and Earthly Branch combination. Note the transition point of the lunar new year.
                    </p>
                  </div>
                  
                  <div className="bg-fire/10 p-3 rounded-lg border border-fire/20">
                    <h4 className="font-semibold text-fire">Month Pillar Determination</h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      Based on solar terms rather than lunar months. The 24 solar terms in a year are divided into 12 groups, each corresponding to a month pillar. Thus, month pillar conversion requires using a solar term table.
                    </p>
                  </div>
                  
                  <div className="bg-earth/10 p-3 rounded-lg border border-earth/20">
                    <h4 className="font-semibold text-earth">Day Pillar Determination</h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      Uses the Sixty Jiazi cycle, starting from a Jiazi day. You need to know a reference Jiazi day in history, then calculate the number of days between the target date and this reference point.
                    </p>
                  </div>
                  
                  <div className="bg-water/10 p-3 rounded-lg border border-water/20">
                    <h4 className="font-semibold text-water">Hour Pillar Determination</h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      Based on the solar time hour. A day is divided into 12 two-hour periods, starting with Zi hour (23:00-1:00). The hour pillar is influenced by the day pillar's Heavenly Stem, following a specific pattern.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-8 pt-0">
              <div className="bg-ink-light/20 p-4 rounded-lg border border-earth/20">
                <h4 className="font-semibold text-earth dark:text-earth mb-2">Why Are These Calculations So Complex?</h4>
                <p className="text-gray-600 dark:text-gray-300">
                  The complexity of BaZi calculations reflects ancient China's precise observations of cosmic patterns. The system aims to capture the exact state of cosmic energies at birth, including the relationships between the sun, moon, and earth, and the cyclical changes of the Five Elements across different time scales. This complexity ensures the accuracy and personalization of the chart, enabling each person's BaZi chart to accurately reflect their unique birth energy field.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Cultural Significance Section */}
        <section className="mb-16">
          <div className="ink-card p-8 relative ink-wash-bg">
            <div className="ink-splash ink-splash-1"></div>
            <div className="absolute bottom-5 left-5 w-24 h-24 bagua-symbol opacity-15"></div>
            <h2 className="text-2xl font-bold text-earth dark:text-earth mb-6 text-center ink-text relative z-10">BaZi in Chinese Culture</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
              <div>
                <h3 className="text-xl font-semibold text-fire dark:text-fire mb-4">Traditional Festivals</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Many Chinese traditional festivals are closely tied to the lunar calendar and the concepts that form the basis of BaZi calculation.
                </p>
                <ul className="text-gray-600 dark:text-gray-300 space-y-2">
                  <li className="p-2 bg-ink-light/10 rounded">
                    <span className="font-semibold text-wood">Chinese New Year</span>: Marks the beginning of the lunar year, with celebrations and customs related to the year's animal sign.
                  </li>
                  <li className="p-2 bg-ink-light/10 rounded">
                    <span className="font-semibold text-fire">Dragon Boat Festival</span>: Held on the fifth day of the fifth lunar month, a time believed to have imbalanced cosmic energies.
                  </li>
                  <li className="p-2 bg-ink-light/10 rounded">
                    <span className="font-semibold text-water">Winter Solstice</span>: Celebrates the return of Yang energy after the longest night of the year, significant in BaZi theory.
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-fire dark:text-fire mb-4">Modern Applications</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  BaZi continues to influence many aspects of modern Chinese society and is gaining recognition worldwide.
                </p>
                <ul className="text-gray-600 dark:text-gray-300 space-y-2">
                  <li className="p-2 bg-ink-light/10 rounded">
                    <span className="font-semibold text-metal">Business Planning</span>: Companies may consult BaZi masters for auspicious dates to launch products or sign contracts.
                  </li>
                  <li className="p-2 bg-ink-light/10 rounded">
                    <span className="font-semibold text-earth">Personal Development</span>: Many use BaZi insights to understand their strengths and choose appropriate career paths.
                  </li>
                  <li className="p-2 bg-ink-light/10 rounded">
                    <span className="font-semibold text-water">Relationship Compatibility</span>: BaZi analysis is often used to assess compatibility between partners or business associates.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Call-to-Action Section */}
        <section>
          <div className="ink-card p-8 text-center relative">
            <div className="absolute -top-4 -right-4 w-16 h-16 bagua-symbol opacity-20"></div>
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bagua-symbol opacity-20"></div>
            <h2 className="text-2xl font-bold text-earth dark:text-earth mb-4 ink-text">Ready to Discover Your BaZi Chart?</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Now that you understand the basics of BaZi, take the next step to calculate your personal chart and gain insights into your destiny path.
            </p>
            <Link href="/calculator" className="inline-block px-6 py-3 bg-fire hover:bg-fire/80 text-white font-medium rounded-lg shadow-md transition-colors">
              Calculate Your BaZi Chart
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
} 