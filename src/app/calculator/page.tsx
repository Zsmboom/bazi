'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  BaziChartType, 
  PillarElement, 
  convertToSolarTime, 
  calculateBaziChart, 
  sendBaziToAPI 
} from '../../utils/baziCalculator';

// Year range for the date picker
const currentYear = new Date().getFullYear();
const yearRange = Array.from({ length: 100 }, (_, i) => currentYear - 99 + i);
const monthRange = Array.from({ length: 12 }, (_, i) => i + 1);
const dayRange = Array.from({ length: 31 }, (_, i) => i + 1);
const hourRange = Array.from({ length: 24 }, (_, i) => i);
const minuteRange = Array.from({ length: 60 }, (_, i) => i);

// Popular locations with their longitudes for solar time calculation
// East longitude is positive, West longitude is negative
const popularLocations = [
  { name: 'New York', longitude: -74.0060 },
  { name: 'Los Angeles', longitude: -118.2437 },
  { name: 'London', longitude: -0.1278 },
  { name: 'Paris', longitude: 2.3522 },
  { name: 'Tokyo', longitude: 139.6917 },
  { name: 'Sydney', longitude: 151.2093 },
  { name: 'Beijing', longitude: 116.4074 },
  { name: 'Shanghai', longitude: 121.4737 },
  { name: 'Hong Kong', longitude: 114.1694 },
  { name: 'Singapore', longitude: 103.8198 },
  { name: 'Mumbai', longitude: 72.8777 },
  { name: 'Dubai', longitude: 55.2708 },
  { name: 'Cairo', longitude: 31.2357 },
  { name: 'Moscow', longitude: 37.6173 },
  { name: 'Berlin', longitude: 13.4050 },
];

export default function Calculator() {
  const router = useRouter();
  const [calendarType, setCalendarType] = useState('solar');
  const [birthYear, setBirthYear] = useState(1990);
  const [birthMonth, setBirthMonth] = useState(1);
  const [birthDay, setBirthDay] = useState(1);
  const [birthHour, setBirthHour] = useState(12);
  const [birthMinute, setBirthMinute] = useState(0);
  const [gender, setGender] = useState('male');
  const [birthLocation, setBirthLocation] = useState(popularLocations[0].name);
  const [customLocation, setCustomLocation] = useState('');
  const [customLongitude, setCustomLongitude] = useState('');
  const [showCustomLocation, setShowCustomLocation] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [baziChart, setBaziChart] = useState<BaziChartType | null>(null);
  const [apiResponse, setApiResponse] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const generateBaziChart = async () => {
    try {
      setIsLoading(true);
      setError('');
      
      // Get the longitude for solar time calculation
      let longitude = 0;
      if (showCustomLocation) {
        longitude = parseFloat(customLongitude);
        if (isNaN(longitude)) {
          throw new Error('Please enter a valid longitude value');
        }
      } else {
        const selectedLocation = popularLocations.find(loc => loc.name === birthLocation);
        longitude = selectedLocation ? selectedLocation.longitude : 0;
      }
      
      // Step 1: Convert to solar time
      const solarTime = convertToSolarTime(
        birthYear,
        birthMonth,
        birthDay,
        birthHour,
        birthMinute,
        longitude
      );
      
      // Step 2: Calculate BaZi chart
      const chart = calculateBaziChart(
        birthYear,
        birthMonth,
        birthDay,
        solarTime.hour,
        solarTime.minute,
        gender as 'male' | 'female'
      );
      
      setBaziChart(chart);
      
      // Step 3: Send to API for detailed analysis
      const location = showCustomLocation ? customLocation : birthLocation;
      const userInfo = {
        birthYear,
        birthMonth,
        birthDay,
        birthHour,
        birthMinute,
        gender: gender as 'male' | 'female',
        location
      };
      
      const response = await sendBaziToAPI(chart, userInfo);
      setApiResponse(response);
      setShowResults(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
      console.error('Error generating BaZi chart:', err);
    } finally {
      setIsLoading(false);
    }
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
                  Birth Hour
                </label>
                <select
                  id="birthHour"
                  value={birthHour}
                  onChange={(e) => setBirthHour(Number(e.target.value))}
                  className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  {hourRange.map((hour) => (
                    <option key={hour} value={hour}>
                      {hour.toString().padStart(2, '0')}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label htmlFor="birthMinute" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Birth Minute
                </label>
                <select
                  id="birthMinute"
                  value={birthMinute}
                  onChange={(e) => setBirthMinute(Number(e.target.value))}
                  className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  {minuteRange.map((minute) => (
                    <option key={minute} value={minute}>
                      {minute.toString().padStart(2, '0')}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label htmlFor="gender" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Gender
                </label>
                <div className="flex space-x-4">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      className="form-radio text-amber-600"
                      name="gender"
                      value="male"
                      checked={gender === 'male'}
                      onChange={() => setGender('male')}
                    />
                    <span className="ml-2 text-gray-700 dark:text-gray-300">Male</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      className="form-radio text-amber-600"
                      name="gender"
                      value="female"
                      checked={gender === 'female'}
                      onChange={() => setGender('female')}
                    />
                    <span className="ml-2 text-gray-700 dark:text-gray-300">Female</span>
                  </label>
                </div>
              </div>
              
              <div className="md:col-span-2">
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Birth Location
                </label>
                
                <div className="mb-2">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      className="form-radio text-amber-600"
                      name="locationType"
                      checked={!showCustomLocation}
                      onChange={() => setShowCustomLocation(false)}
                    />
                    <span className="ml-2 text-gray-700 dark:text-gray-300">Select from common locations</span>
                  </label>
                  <label className="inline-flex items-center ml-4">
                    <input
                      type="radio"
                      className="form-radio text-amber-600"
                      name="locationType"
                      checked={showCustomLocation}
                      onChange={() => setShowCustomLocation(true)}
                    />
                    <span className="ml-2 text-gray-700 dark:text-gray-300">Enter custom location</span>
                  </label>
                </div>
                
                {!showCustomLocation ? (
                  <select
                    id="location"
                    value={birthLocation}
                    onChange={(e) => setBirthLocation(e.target.value)}
                    className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    {popularLocations.map((loc) => (
                      <option key={loc.name} value={loc.name}>
                        {loc.name} (Longitude: {loc.longitude}°)
                      </option>
                    ))}
                  </select>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <input
                        type="text"
                        id="customLocation"
                        placeholder="Location name"
                        value={customLocation}
                        onChange={(e) => setCustomLocation(e.target.value)}
                        className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        id="customLongitude"
                        placeholder="Longitude (e.g. 114.06 or -73.94)"
                        value={customLongitude}
                        onChange={(e) => setCustomLongitude(e.target.value)}
                        className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
                    <div className="col-span-2">
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        * Use positive values for East longitude and negative values for West longitude
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {error && (
            <div className="mb-6 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

          <div className="text-center">
            <button
              onClick={generateBaziChart}
              disabled={isLoading}
              className={`w-full md:w-auto px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white font-medium rounded-lg shadow-md transition-colors ${
                isLoading ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {isLoading ? 'Calculating...' : 'Calculate BaZi Chart'}
            </button>
          </div>
        </div>

        {showResults && baziChart && (
          <div className="mt-12 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 md:p-8 max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">你的八字命盘</h2>
            
            <div className="mb-8 overflow-hidden rounded-lg border border-amber-200 dark:border-amber-800">
              <div className="flex items-center border-b border-amber-200 dark:border-amber-800">
                <div className="w-1/6 bg-amber-50 dark:bg-gray-700 p-2 text-center border-r border-amber-200 dark:border-amber-800">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">生辰</span>
                </div>
                <div className="w-1/6 bg-amber-50 dark:bg-gray-700 p-2 text-center border-r border-amber-200 dark:border-amber-800">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">流盘</span>
                </div>
                <div className="w-1/6 bg-amber-50 dark:bg-gray-700 p-2 text-center border-r border-amber-200 dark:border-amber-800">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">参数</span>
                </div>
                <div className="w-1/2 bg-amber-50 dark:bg-gray-700 p-2 text-center">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">设置</span>
                </div>
              </div>
              
              {/* 八字盘面 */}
              <div className="grid grid-cols-4">
                {/* 列标题 */}
                <div className="border-r border-b border-amber-200 dark:border-amber-800 p-3 text-center">
                  <span className="block text-sm font-medium text-gray-700 dark:text-gray-300">年柱</span>
                </div>
                <div className="border-r border-b border-amber-200 dark:border-amber-800 p-3 text-center">
                  <span className="block text-sm font-medium text-gray-700 dark:text-gray-300">月柱</span>
                </div>
                <div className="border-r border-b border-amber-200 dark:border-amber-800 p-3 text-center">
                  <span className="block text-sm font-medium text-gray-700 dark:text-gray-300">日柱</span>
                </div>
                <div className="border-b border-amber-200 dark:border-amber-800 p-3 text-center">
                  <span className="block text-sm font-medium text-gray-700 dark:text-gray-300">时柱</span>
                </div>
                
                {/* 干神 - 命局类型或特殊信息 */}
                <div className="border-r border-b border-amber-200 dark:border-amber-800 p-3 text-center">
                  <span className="block text-sm font-medium text-gray-700 dark:text-gray-300">干神</span>
                  <span className="block text-sm text-blue-600 dark:text-blue-400">
                    {
                      baziChart.yearPillar.element === 'Metal' ? '偏财' : 
                      baziChart.yearPillar.element === 'Water' ? '正财' : 
                      baziChart.yearPillar.element === 'Wood' ? '食神' : 
                      baziChart.yearPillar.element === 'Fire' ? '伤官' : 
                      '正官'
                    }
                  </span>
                </div>
                <div className="border-r border-b border-amber-200 dark:border-amber-800 p-3 text-center">
                  <span className="block text-sm font-medium text-gray-700 dark:text-gray-300"></span>
                  <span className="block text-sm text-green-600 dark:text-green-400">
                    {
                      baziChart.monthPillar.element === 'Metal' ? '七杀' : 
                      baziChart.monthPillar.element === 'Water' ? '正官' : 
                      baziChart.monthPillar.element === 'Wood' ? '比肩' : 
                      baziChart.monthPillar.element === 'Fire' ? '劫财' : 
                      '食神'
                    }
                  </span>
                </div>
                <div className="border-r border-b border-amber-200 dark:border-amber-800 p-3 text-center">
                  <span className="block text-sm font-medium text-gray-700 dark:text-gray-300"></span>
                  <span className="block text-sm text-red-600 dark:text-red-400">
                    日主
                  </span>
                </div>
                <div className="border-b border-amber-200 dark:border-amber-800 p-3 text-center">
                  <span className="block text-sm font-medium text-gray-700 dark:text-gray-300"></span>
                  <span className="block text-sm text-indigo-600 dark:text-indigo-400">
                    {
                      baziChart.hourPillar.element === 'Metal' ? '正印' : 
                      baziChart.hourPillar.element === 'Water' ? '偏印' : 
                      baziChart.hourPillar.element === 'Wood' ? '偏财' : 
                      baziChart.hourPillar.element === 'Fire' ? '伤官' : 
                      '食神'
                    }
                  </span>
                </div>
                
                {/* 天干 */}
                <div className="border-r border-b border-amber-200 dark:border-amber-800 p-3 text-center">
                  <span className="block text-sm font-medium text-gray-700 dark:text-gray-300">天干</span>
                  <span className="block text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {baziChart.yearPillar.stemChinese}
                  </span>
                </div>
                <div className="border-r border-b border-amber-200 dark:border-amber-800 p-3 text-center">
                  <span className="block text-sm font-medium text-gray-700 dark:text-gray-300"></span>
                  <span className="block text-2xl font-bold text-green-600 dark:text-green-400">
                    {baziChart.monthPillar.stemChinese}
                  </span>
                </div>
                <div className="border-r border-b border-amber-200 dark:border-amber-800 p-3 text-center">
                  <span className="block text-sm font-medium text-gray-700 dark:text-gray-300"></span>
                  <span className="block text-2xl font-bold text-red-600 dark:text-red-400">
                    {baziChart.dayPillar.stemChinese}
                  </span>
                </div>
                <div className="border-b border-amber-200 dark:border-amber-800 p-3 text-center">
                  <span className="block text-sm font-medium text-gray-700 dark:text-gray-300"></span>
                  <span className="block text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                    {baziChart.hourPillar.stemChinese}
                  </span>
                </div>
                
                {/* 地支 */}
                <div className="border-r border-b border-amber-200 dark:border-amber-800 p-3 text-center">
                  <span className="block text-sm font-medium text-gray-700 dark:text-gray-300">地支</span>
                  <span className="block text-2xl font-bold text-amber-600 dark:text-amber-400">
                    {baziChart.yearPillar.branchChinese}
                  </span>
                </div>
                <div className="border-r border-b border-amber-200 dark:border-amber-800 p-3 text-center">
                  <span className="block text-sm font-medium text-gray-700 dark:text-gray-300"></span>
                  <span className="block text-2xl font-bold text-amber-600 dark:text-amber-400">
                    {baziChart.monthPillar.branchChinese}
                  </span>
                </div>
                <div className="border-r border-b border-amber-200 dark:border-amber-800 p-3 text-center">
                  <span className="block text-sm font-medium text-gray-700 dark:text-gray-300"></span>
                  <span className="block text-2xl font-bold text-amber-600 dark:text-amber-400">
                    {baziChart.dayPillar.branchChinese}
                  </span>
                </div>
                <div className="border-b border-amber-200 dark:border-amber-800 p-3 text-center">
                  <span className="block text-sm font-medium text-gray-700 dark:text-gray-300"></span>
                  <span className="block text-2xl font-bold text-amber-600 dark:text-amber-400">
                    {baziChart.hourPillar.branchChinese}
                  </span>
                </div>
                
                {/* 五行属性 */}
                <div className="border-r border-b border-amber-200 dark:border-amber-800 p-2 text-center">
                  <span className="inline-block px-2 py-1 bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-200 text-sm rounded">
                    {baziChart.yearPillar.elementChinese}
                  </span>
                </div>
                <div className="border-r border-b border-amber-200 dark:border-amber-800 p-2 text-center">
                  <span className="inline-block px-2 py-1 bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-200 text-sm rounded">
                    {baziChart.monthPillar.elementChinese}
                  </span>
                </div>
                <div className="border-r border-b border-amber-200 dark:border-amber-800 p-2 text-center">
                  <span className="inline-block px-2 py-1 bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-200 text-sm rounded">
                    {baziChart.dayPillar.elementChinese}
                  </span>
                </div>
                <div className="border-b border-amber-200 dark:border-amber-800 p-2 text-center">
                  <span className="inline-block px-2 py-1 bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-200 text-sm rounded">
                    {baziChart.hourPillar.elementChinese}
                  </span>
                </div>
                
                {/* 藏干 */}
                <div className="border-r border-amber-200 dark:border-amber-800 p-2 text-center">
                  <span className="block text-sm font-medium text-gray-700 dark:text-gray-300">藏干</span>
                  {baziChart.yearHiddenStems.map((stem, index) => (
                    <div key={index} className="text-xs text-gray-600 dark:text-gray-400">
                      {stem.stemChinese}·{stem.elementChinese}
                    </div>
                  ))}
                </div>
                <div className="border-r border-amber-200 dark:border-amber-800 p-2 text-center">
                  <span className="block text-sm font-medium text-gray-700 dark:text-gray-300"></span>
                  {baziChart.monthHiddenStems.map((stem, index) => (
                    <div key={index} className="text-xs text-gray-600 dark:text-gray-400">
                      {stem.stemChinese}·{stem.elementChinese}
                    </div>
                  ))}
                </div>
                <div className="border-r border-amber-200 dark:border-amber-800 p-2 text-center">
                  <span className="block text-sm font-medium text-gray-700 dark:text-gray-300"></span>
                  {baziChart.dayHiddenStems.map((stem, index) => (
                    <div key={index} className="text-xs text-gray-600 dark:text-gray-400">
                      {stem.stemChinese}·{stem.elementChinese}
                    </div>
                  ))}
                </div>
                <div className="p-2 text-center">
                  <span className="block text-sm font-medium text-gray-700 dark:text-gray-300"></span>
                  {baziChart.hourHiddenStems.map((stem, index) => (
                    <div key={index} className="text-xs text-gray-600 dark:text-gray-400">
                      {stem.stemChinese}·{stem.elementChinese}
                    </div>
                  ))}
                </div>
              </div>
              
              {/* 神煞等额外信息 */}
              <div className="border-t border-amber-200 dark:border-amber-800 p-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <span className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">神煞</span>
                    <div className="grid grid-cols-4 gap-2">
                      <div className="text-center">
                        <span className="text-xs text-gray-600 dark:text-gray-400 block">年柱</span>
                        {baziChart.yearGods.map((god, index) => (
                          <span key={index} className="text-xs text-blue-600 dark:text-blue-400 block">
                            {god.nameChinese}
                          </span>
                        ))}
                      </div>
                      <div className="text-center">
                        <span className="text-xs text-gray-600 dark:text-gray-400 block">月柱</span>
                        <span className="text-xs text-green-600 dark:text-green-400 block">
                          {baziChart.monthGods.length > 0 ? 
                            baziChart.monthGods.map(g => g.nameChinese).join('、') : 
                            '比肩'
                          }
                        </span>
                      </div>
                      <div className="text-center">
                        <span className="text-xs text-gray-600 dark:text-gray-400 block">日柱</span>
                        {baziChart.dayGods.map((god, index) => (
                          <span key={index} className="text-xs text-red-600 dark:text-red-400 block">
                            {god.nameChinese}
                          </span>
                        ))}
                      </div>
                      <div className="text-center">
                        <span className="text-xs text-gray-600 dark:text-gray-400 block">时柱</span>
                        <span className="text-xs text-indigo-600 dark:text-indigo-400 block">
                          {baziChart.hourGods.length > 0 ? 
                            baziChart.hourGods.map(g => g.nameChinese).join('、') : 
                            '财神'
                          }
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <span className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">纳音</span>
                    <div className="grid grid-cols-4 gap-2">
                      <div className="text-center">
                        <span className="text-xs text-blue-600 dark:text-blue-400 block">
                          {baziChart.yearNayin || '剑锋金'}
                        </span>
                      </div>
                      <div className="text-center">
                        <span className="text-xs text-green-600 dark:text-green-400 block">
                          {baziChart.monthNayin || '海中金'}
                        </span>
                      </div>
                      <div className="text-center">
                        <span className="text-xs text-red-600 dark:text-red-400 block">
                          {baziChart.dayNayin || '大驿土'}
                        </span>
                      </div>
                      <div className="text-center">
                        <span className="text-xs text-indigo-600 dark:text-indigo-400 block">
                          {baziChart.hourNayin || '山头火'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* 天干地支组合信息 */}
              <div className="border-t border-amber-200 dark:border-amber-800 p-3">
                <div className="grid grid-cols-1 gap-3">
                  <div>
                    <span className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">天干</span>
                    <span className="text-xs text-gray-600 dark:text-gray-400">
                      {baziChart.tianganCombinations}
                    </span>
                  </div>
                  <div>
                    <span className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">地支</span>
                    <span className="text-xs text-gray-600 dark:text-gray-400">
                      {baziChart.dizhiCombinations}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* 五行强弱图表 */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">五行强弱分析</h3>
              <div className="grid grid-cols-5 gap-2">
                {Object.entries(baziChart.fiveElements).map(([element, value]) => (
                  <div key={element} className="text-center">
                    <div className="mb-1 bg-gray-200 dark:bg-gray-700 rounded-full h-24 w-full flex flex-col items-center justify-end overflow-hidden">
                      <div 
                        className={`w-full ${getElementColor(element)}`} 
                        style={{ height: `${value * 20}%` }}
                      ></div>
                    </div>
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300 capitalize">
                      {getChineseElement(element)} <span className="text-xs">({value.toFixed(1)})</span>
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* 命主信息 */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">命主信息</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border border-amber-200 bg-amber-50 dark:bg-amber-900/20 dark:border-amber-800 rounded-lg">
                  <h4 className="text-lg font-medium text-amber-700 dark:text-amber-400 mb-2">日主</h4>
                  <p className="text-gray-700 dark:text-gray-300 text-lg font-bold">{baziChart.dayMasterChinese}命</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                    日主代表您的核心性格和命运特质
                  </p>
                </div>
                
                <div className="p-4 border border-amber-200 bg-amber-50 dark:bg-amber-900/20 dark:border-amber-800 rounded-lg">
                  <h4 className="text-lg font-medium text-amber-700 dark:text-amber-400 mb-2">空亡</h4>
                  <p className="text-gray-700 dark:text-gray-300 text-lg font-bold">{baziChart.voidsChinese || '戌亥'}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                    空亡代表命局中的虚浮或不稳定因素
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">用神与忌神</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border border-green-200 bg-green-50 dark:bg-green-900/20 dark:border-green-800 rounded-lg">
                  <h4 className="text-lg font-medium text-green-700 dark:text-green-400 mb-2">喜用神</h4>
                  <p className="text-gray-700 dark:text-gray-300 text-lg font-bold">{baziChart.luckyElementChinese}相助</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                    喜用神能带给您积极能量和好运势
                  </p>
                </div>
                
                <div className="p-4 border border-red-200 bg-red-50 dark:bg-red-900/20 dark:border-red-800 rounded-lg">
                  <h4 className="text-lg font-medium text-red-700 dark:text-red-400 mb-2">忌神</h4>
                  <p className="text-gray-700 dark:text-gray-300 text-lg font-bold">{baziChart.unluckyElementChinese}为忌</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                    忌神可能带来挑战，但也是成长的机会
                  </p>
                </div>
              </div>
            </div>
            
            {apiResponse && apiResponse.choices && apiResponse.choices[0] && (
              <div className="mt-8 p-6 bg-amber-50 dark:bg-gray-700 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">命局详解</h3>
                <div className="prose dark:prose-invert prose-amber max-w-none">
                  <pre className="whitespace-pre-wrap font-sans text-gray-700 dark:text-gray-300">
                    {apiResponse.choices[0].message?.content || '无法获取详细分析。'}
                  </pre>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function getElementColor(element: string): string {
  switch (element.toLowerCase()) {
    case 'wood':
      return 'bg-green-500';
    case 'fire':
      return 'bg-red-500';
    case 'earth':
      return 'bg-amber-500';
    case 'metal':
      return 'bg-gray-400';
    case 'water':
      return 'bg-blue-500';
    default:
      return 'bg-gray-300';
  }
}

function getChineseElement(element: string): string {
  switch (element.toLowerCase()) {
    case 'wood':
      return '木';
    case 'fire':
      return '火';
    case 'earth':
      return '土';
    case 'metal':
      return '金';
    case 'water':
      return '水';
    default:
      return element;
  }
} 