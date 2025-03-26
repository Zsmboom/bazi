'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

// Mock data for BaZi heavenly stems and earthly branches
const heavenlyStems = ['Jia', 'Yi', 'Bing', 'Ding', 'Wu', 'Ji', 'Geng', 'Xin', 'Ren', 'Gui'];
const earthlyBranches = ['Zi', 'Chou', 'Yin', 'Mao', 'Chen', 'Si', 'Wu', 'Wei', 'Shen', 'You', 'Xu', 'Hai'];
const elements = ['Wood', 'Fire', 'Earth', 'Metal', 'Water'];

// Year range for the date picker
const currentYear = new Date().getFullYear();
const yearRange = Array.from({ length: 100 }, (_, i) => currentYear - 99 + i);
const monthRange = Array.from({ length: 12 }, (_, i) => i + 1);
const dayRange = Array.from({ length: 31 }, (_, i) => i + 1);
const hourRange = Array.from({ length: 24 }, (_, i) => i);

export default function Calculator() {
  const router = useRouter();
  const [calendarType, setCalendarType] = useState('solar');
  const [birthYear, setBirthYear] = useState(1990);
  const [birthMonth, setBirthMonth] = useState(1);
  const [birthDay, setBirthDay] = useState(1);
  const [birthHour, setBirthHour] = useState(12);
  const [showResults, setShowResults] = useState(false);
  const [baziChart, setBaziChart] = useState<any>(null);

  const generateBaziChart = () => {
    // In a real application, this would call an API or use a library to calculate the actual BaZi chart
    // For now, we'll use mock data to demonstrate the UI
    
    // Randomly select stems and branches for demonstration
    const yearStem = heavenlyStems[Math.floor(Math.random() * heavenlyStems.length)];
    const yearBranch = earthlyBranches[Math.floor(Math.random() * earthlyBranches.length)];
    
    const monthStem = heavenlyStems[Math.floor(Math.random() * heavenlyStems.length)];
    const monthBranch = earthlyBranches[Math.floor(Math.random() * earthlyBranches.length)];
    
    const dayStem = heavenlyStems[Math.floor(Math.random() * heavenlyStems.length)];
    const dayBranch = earthlyBranches[Math.floor(Math.random() * earthlyBranches.length)];
    
    const hourStem = heavenlyStems[Math.floor(Math.random() * heavenlyStems.length)];
    const hourBranch = earthlyBranches[Math.floor(Math.random() * earthlyBranches.length)];
    
    const mockChart = {
      yearPillar: { stem: yearStem, branch: yearBranch, element: elements[Math.floor(Math.random() * elements.length)] },
      monthPillar: { stem: monthStem, branch: monthBranch, element: elements[Math.floor(Math.random() * elements.length)] },
      dayPillar: { stem: dayStem, branch: dayBranch, element: elements[Math.floor(Math.random() * elements.length)] },
      hourPillar: { stem: hourStem, branch: hourBranch, element: elements[Math.floor(Math.random() * elements.length)] },
    };
    
    setBaziChart(mockChart);
    setShowResults(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">BaZi Calculator</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Enter your birth details below to calculate your BaZi chart and discover insights about your destiny.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 md:p-8 max-w-2xl mx-auto">
          <div className="mb-6">
            <div className="flex justify-center space-x-4 mb-6">
              <button
                onClick={() => setCalendarType('solar')}
                className={`px-4 py-2 rounded-md ${
                  calendarType === 'solar'
                    ? 'bg-amber-600 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                }`}
              >
                Solar Calendar
              </button>
              <button
                onClick={() => setCalendarType('lunar')}
                className={`px-4 py-2 rounded-md ${
                  calendarType === 'lunar'
                    ? 'bg-amber-600 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                }`}
              >
                Lunar Calendar
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="birthYear" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Birth Year
                </label>
                <select
                  id="birthYear"
                  value={birthYear}
                  onChange={(e) => setBirthYear(Number(e.target.value))}
                  className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  {yearRange.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="birthMonth" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Birth Month
                </label>
                <select
                  id="birthMonth"
                  value={birthMonth}
                  onChange={(e) => setBirthMonth(Number(e.target.value))}
                  className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  {monthRange.map((month) => (
                    <option key={month} value={month}>
                      {month}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="birthDay" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Birth Day
                </label>
                <select
                  id="birthDay"
                  value={birthDay}
                  onChange={(e) => setBirthDay(Number(e.target.value))}
                  className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  {dayRange.map((day) => (
                    <option key={day} value={day}>
                      {day}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="birthHour" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Birth Hour (0-23)
                </label>
                <select
                  id="birthHour"
                  value={birthHour}
                  onChange={(e) => setBirthHour(Number(e.target.value))}
                  className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  {hourRange.map((hour) => (
                    <option key={hour} value={hour}>
                      {hour}:00
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={generateBaziChart}
              className="w-full md:w-auto px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white font-medium rounded-lg shadow-md transition-colors"
            >
              Calculate BaZi Chart
            </button>
          </div>
        </div>

        {showResults && baziChart && (
          <div className="mt-12 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 md:p-8 max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">Your BaZi Chart</h2>
            
            <div className="grid grid-cols-4 gap-4 mb-8">
              <div className="bg-amber-50 dark:bg-gray-700 p-4 rounded-md text-center">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Year Pillar</h3>
                <div className="mb-2">
                  <span className="block text-xl font-bold text-amber-600 dark:text-amber-400">
                    {baziChart.yearPillar.stem} {baziChart.yearPillar.branch}
                  </span>
                </div>
                <span className="inline-block px-2 py-1 bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-200 text-sm rounded">
                  {baziChart.yearPillar.element}
                </span>
              </div>
              
              <div className="bg-amber-50 dark:bg-gray-700 p-4 rounded-md text-center">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Month Pillar</h3>
                <div className="mb-2">
                  <span className="block text-xl font-bold text-amber-600 dark:text-amber-400">
                    {baziChart.monthPillar.stem} {baziChart.monthPillar.branch}
                  </span>
                </div>
                <span className="inline-block px-2 py-1 bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-200 text-sm rounded">
                  {baziChart.monthPillar.element}
                </span>
              </div>
              
              <div className="bg-amber-50 dark:bg-gray-700 p-4 rounded-md text-center">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Day Pillar</h3>
                <div className="mb-2">
                  <span className="block text-xl font-bold text-amber-600 dark:text-amber-400">
                    {baziChart.dayPillar.stem} {baziChart.dayPillar.branch}
                  </span>
                </div>
                <span className="inline-block px-2 py-1 bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-200 text-sm rounded">
                  {baziChart.dayPillar.element}
                </span>
              </div>
              
              <div className="bg-amber-50 dark:bg-gray-700 p-4 rounded-md text-center">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Hour Pillar</h3>
                <div className="mb-2">
                  <span className="block text-xl font-bold text-amber-600 dark:text-amber-400">
                    {baziChart.hourPillar.stem} {baziChart.hourPillar.branch}
                  </span>
                </div>
                <span className="inline-block px-2 py-1 bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-200 text-sm rounded">
                  {baziChart.hourPillar.element}
                </span>
              </div>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg mb-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Basic Analysis</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Your BaZi chart reveals a dominant {baziChart.dayPillar.element} energy, which influences your core personality and life path.
                The combination of {baziChart.yearPillar.stem} {baziChart.yearPillar.branch} in your year pillar suggests you have natural
                talents in leadership and strategic thinking.
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                The relationship between your day and hour pillars indicates potential for success in {baziChart.dayPillar.element === 'Wood' ? 'creative fields' : 
                baziChart.dayPillar.element === 'Fire' ? 'entertainment or leadership roles' : 
                baziChart.dayPillar.element === 'Earth' ? 'service or consulting' : 
                baziChart.dayPillar.element === 'Metal' ? 'finance or technology' : 
                'research or philosophy'}.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <button className="px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white font-medium rounded-lg shadow-md transition-colors">
                Save Chart
              </button>
              <button 
                onClick={() => router.push('/destiny-analysis')}
                className="px-6 py-3 bg-white hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 text-amber-600 dark:text-amber-400 font-medium rounded-lg shadow-md border border-amber-200 dark:border-gray-600 transition-colors"
              >
                Full Destiny Analysis
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 