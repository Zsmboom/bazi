'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  BaziChartType, 
  PillarElement, 
  convertToSolarTime, 
  calculateBaziChart, 
  sendBaziToAPI 
} from '../../utils/baziCalculator';
import worldCitiesData, { WorldCity } from '../../utils/worldCitiesData';
import countriesList, { Country } from '../../utils/countriesData';
import BaziChart from '../../components/BaziChart';

// Year range for the date picker
const currentYear = new Date().getFullYear();
const yearRange = Array.from({ length: 100 }, (_, i) => currentYear - 99 + i);
const monthRange = Array.from({ length: 12 }, (_, i) => i + 1);
const dayRange = Array.from({ length: 31 }, (_, i) => i + 1);
const hourRange = Array.from({ length: 24 }, (_, i) => i);
const minuteRange = Array.from({ length: 60 }, (_, i) => i);

export default function Calculator() {
  const router = useRouter();
  const [calendarType, setCalendarType] = useState('solar');
  const [birthYear, setBirthYear] = useState(1990);
  const [birthMonth, setBirthMonth] = useState(1);
  const [birthDay, setBirthDay] = useState(1);
  const [birthHour, setBirthHour] = useState(12);
  const [birthMinute, setBirthMinute] = useState(0);
  const [gender, setGender] = useState('male');
  
  // 城市选择相关状态
  const [countries, setCountries] = useState<Country[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<string>('CN');
  const [citySearchQuery, setCitySearchQuery] = useState<string>('');
  const [searchResults, setSearchResults] = useState<WorldCity[]>([]);
  const [selectedCity, setSelectedCity] = useState<WorldCity | null>(null);
  const [isLoadingCities, setIsLoadingCities] = useState<boolean>(false);
  
  const [solarTime, setSolarTime] = useState<{hour: number, minute: number} | null>(null);
  const [lunarDate, setLunarDate] = useState<{year: number, month: number, day: number} | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [baziChart, setBaziChart] = useState<BaziChartType | null>(null);
  const [apiResponse, setApiResponse] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // 初始化加载国家列表
  useEffect(() => {
    const loadCountries = async () => {
      try {
        const availableCountries = await worldCitiesData.getAvailableCountries();
        setCountries(availableCountries);
      } catch (err) {
        console.error('Error loading countries:', err);
      }
    };
    
    loadCountries();
  }, []);
  
  // 当选择国家变化时加载该国家的城市
  useEffect(() => {
    const loadCitiesForCountry = async () => {
      if (!selectedCountry) return;
      
      try {
        setIsLoadingCities(true);
        
        // 加载国家的主要城市
        const cities = await worldCitiesData.getCitiesByCountry(selectedCountry, 10);
        
        if (cities && cities.length > 0) {
          // 设置默认选中的城市为第一个城市
          setSearchResults(cities);
          if (!selectedCity) {
            setSelectedCity(cities[0]);
          }
        } else {
          setSearchResults([]);
        }
      } catch (err) {
        console.error('Error loading cities for country:', err);
      } finally {
        setIsLoadingCities(false);
      }
    };
    
    loadCitiesForCountry();
  }, [selectedCountry]);

  // 当用户搜索城市时
  useEffect(() => {
    const searchCities = async () => {
      if (!citySearchQuery || citySearchQuery.trim() === '') {
        // 如果查询为空，显示选定国家的城市
        if (selectedCountry) {
          const cities = await worldCitiesData.getCitiesByCountry(selectedCountry, 10);
          setSearchResults(cities);
        }
        return;
      }
      
      try {
        setIsLoadingCities(true);
        const results = await worldCitiesData.searchCitiesByName(citySearchQuery);
        
        // 如果选择了国家，过滤搜索结果只包括该国家的城市
        if (selectedCountry) {
          const filteredResults = results.filter(city => city.countryCode === selectedCountry);
          setSearchResults(filteredResults);
        } else {
          setSearchResults(results);
        }
      } catch (err) {
        console.error('Error searching cities:', err);
      } finally {
        setIsLoadingCities(false);
      }
    };
    
    // 使用防抖，避免频繁搜索
    const timeoutId = setTimeout(searchCities, 300);
    return () => clearTimeout(timeoutId);
  }, [citySearchQuery, selectedCountry]);

  const generateBaziChart = async () => {
    try {
      setIsLoading(true);
      setError('');
      
      if (!selectedCity) {
        throw new Error('Please select a valid city');
      }
      
      // 从选定的城市获取经度、纬度和位置名称
      const longitude = selectedCity.longitude;
      const latitude = selectedCity.latitude;
      const location = `${selectedCity.city}, ${selectedCity.country}`;
      
      // 使用DeepSeek API计算八字
      const chart = await calculateBaziChart(
        birthYear,
        birthMonth,
        birthDay,
        birthHour,
        birthMinute,
        gender as 'male' | 'female',
        location,
        longitude,
        latitude
      );
      
      // 根据计算获得的真太阳时和农历日期
      const solarTimeResult = await convertToSolarTime(
        birthYear,
        birthMonth,
        birthDay,
        birthHour,
        birthMinute,
        longitude
      );
      
      // 保存太阳时和农历日期供显示
      setSolarTime({
        hour: solarTimeResult.hour,
        minute: solarTimeResult.minute
      });
      
      if (solarTimeResult.lunarYear && solarTimeResult.lunarMonth && solarTimeResult.lunarDay) {
        setLunarDate({
          year: solarTimeResult.lunarYear,
          month: solarTimeResult.lunarMonth,
          day: solarTimeResult.lunarDay
        });
      }
      
      setBaziChart(chart);
      
      // 步骤 6: 发送数据到API获取详细分析
      const userInfo = {
        birthYear,
        birthMonth,
        birthDay,
        birthHour,
        birthMinute,
        gender: gender as 'male' | 'female',
        location: `${selectedCity.city}, ${selectedCity.country} (${selectedCity.longitude.toFixed(4)}°, ${selectedCity.latitude.toFixed(4)}°)`
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

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 md:p-8 max-w-2xl mx-auto mb-12">
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
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Birth Location
                </label>
                
                <div className="mb-4">
                  <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
                    <div className="w-full md:w-1/3">
                  <select
                        value={selectedCountry}
                        onChange={(e) => {
                          setSelectedCountry(e.target.value);
                          setSelectedCity(null);
                          setCitySearchQuery('');
                        }}
                    className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                        {countries.map((country) => (
                          <option key={country.code} value={country.code}>
                            {country.chineseName} ({country.name})
                      </option>
                    ))}
                  </select>
                    </div>
                    
                    <div className="relative w-full md:w-2/3">
                      <input
                        type="text"
                        placeholder="Search for a city..."
                        value={citySearchQuery}
                        onChange={(e) => setCitySearchQuery(e.target.value)}
                        className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                      
                      {isLoadingCities && (
                        <div className="absolute right-3 top-2">
                          <svg className="animate-spin h-5 w-5 text-amber-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                        </div>
                      )}
                      
                      {searchResults.length > 0 && citySearchQuery && (
                        <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-lg max-h-60 overflow-auto">
                          {searchResults.map((city, index) => (
                            <div
                              key={`${city.id}-${index}`}
                              onClick={() => {
                                setSelectedCity(city);
                                setCitySearchQuery('');
                              }}
                              className="px-3 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600"
                            >
                              <div className="text-gray-900 dark:text-white">
                                {city.city}
                              </div>
                              <div className="text-xs text-gray-500 dark:text-gray-400">
                                {city.country} • Long: {city.longitude.toFixed(4)}° • Lat: {city.latitude.toFixed(4)}°
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                {selectedCity && (
                  <div className="p-3 bg-amber-50 dark:bg-gray-700 rounded-md">
                    <div className="flex flex-col md:flex-row md:justify-between">
                      <div>
                        <span className="font-medium">Selected City:</span> {selectedCity.city}
                      </div>
                      <div>
                        <span className="font-medium">Country:</span> {selectedCity.country}
                      </div>
                      <div>
                        <span className="font-medium">Longitude:</span> {selectedCity.longitude.toFixed(4)}°
                      </div>
                    </div>
                  </div>
                )}
                
                {!selectedCity && (
                  <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md text-red-700 dark:text-red-300">
                    Please select a city for accurate birth time calculations.
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
              disabled={isLoading || !selectedCity}
              className={`w-full md:w-auto px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white font-medium rounded-lg shadow-md transition-colors ${
                (isLoading || !selectedCity) ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {isLoading ? 'Calculating...' : 'Calculate BaZi Chart'}
            </button>
          </div>
        </div>

        {showResults && baziChart && (
          <BaziChart 
            baziChart={baziChart} 
            userInfo={{
              birthYear,
              birthMonth,
              birthDay,
              birthHour,
              birthMinute,
              gender: gender as 'male' | 'female',
              location: selectedCity ? `${selectedCity.city}, ${selectedCity.country}` : '',
              lunarDate: lunarDate || undefined,
              solarTime: solarTime || undefined
            }} 
          />
        )}

        {showResults && apiResponse && (
          <div className="mt-12 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 md:p-8 max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">BaZi Interpretation</h2>
            
            <div className="prose dark:prose-invert max-w-none">
              <h3>Summary</h3>
              <p>{apiResponse.interpretation.summary}</p>
              
              <h3>Career</h3>
              <p>{apiResponse.interpretation.career}</p>
              
              <h3>Relationships</h3>
              <p>{apiResponse.interpretation.relationships}</p>
              
              <h3>Health</h3>
              <p>{apiResponse.interpretation.health}</p>
              
              <h3>Luck</h3>
              <p>{apiResponse.interpretation.luck}</p>
            </div>
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