'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { doBaziCalculation, doBaziAnalysis, BaziChart as BaziChartType, AnalysisType } from '@/utils/deepseekApi';
import CitySearch, { City } from '@/components/CitySearch/CitySearch';

// 分析报告类型
interface AnalysisReport {
  type: AnalysisType;
  content: string;
  timestamp: string;
}

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
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [customLocation, setCustomLocation] = useState('');
  const [customLongitude, setCustomLongitude] = useState('');
  const [showCustomLocation, setShowCustomLocation] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // 新增状态
  const [baziChart, setBaziChart] = useState<BaziChartType | null>(null);
  const [selectedAnalysisType, setSelectedAnalysisType] = useState<AnalysisType | null>(null);
  const [analysisReport, setAnalysisReport] = useState<AnalysisReport | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleCitySelect = (city: City) => {
    setSelectedCity(city);
  };

  const handleCalculate = async () => {
    try {
      setIsLoading(true);
      setError('');
      
      // 准备用户数据
      const userData = {
        calendarType,
        birthYear,
        birthMonth,
        birthDay,
        birthHour,
        birthMinute,
        gender,
        location: showCustomLocation 
          ? customLocation 
          : selectedCity ? selectedCity.name : '未知地点',
        longitude: showCustomLocation 
          ? parseFloat(customLongitude) 
          : selectedCity ? parseFloat(selectedCity.lng) : 0
      };

      // 调用 DeepSeek API 进行八字排盘
      const chart = await doBaziCalculation(userData);
      setBaziChart(chart);
      
      // 重置之前的分析结果
      setSelectedAnalysisType(null);
      setAnalysisReport(null);
      
      setIsLoading(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : '发生未知错误');
      console.error('计算错误:', err);
      setIsLoading(false);
    }
  };

  // 处理分析请求
  const handleAnalysis = async (type: AnalysisType) => {
    try {
      setIsAnalyzing(true);
      setError('');
      setSelectedAnalysisType(type);

      if (!baziChart) {
        throw new Error('请先完成八字排盘');
      }

      // 调用 DeepSeek API 进行具体分析
      const analysisContent = await doBaziAnalysis(baziChart, type);
      
      setAnalysisReport({
        type,
        content: analysisContent,
        timestamp: new Date().toISOString()
      });

      setIsAnalyzing(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : '发生未知错误');
      console.error('分析错误:', err);
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">命理计算器</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            请输入您的出生信息以获取命理分析。
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
                阳历
              </button>
              <button
                onClick={() => setCalendarType('lunar')}
                className={`px-4 py-2 rounded-md ${
                  calendarType === 'lunar'
                    ? 'bg-amber-600 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                }`}
              >
                阴历
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="birthYear" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  出生年
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
                  出生月
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
                  出生日
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
                  出生时
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
                  出生分
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
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">性别</label>
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
                    <span className="ml-2 text-gray-700 dark:text-gray-300">男</span>
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
                    <span className="ml-2 text-gray-700 dark:text-gray-300">女</span>
                  </label>
                </div>
              </div>
              
              <div>
                <label htmlFor="birthLocation" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  出生地点
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
                    <span className="ml-2 text-gray-700 dark:text-gray-300">搜索城市</span>
                  </label>
                  <label className="inline-flex items-center ml-4">
                    <input
                      type="radio"
                      className="form-radio text-amber-600"
                      name="locationType"
                      checked={showCustomLocation}
                      onChange={() => setShowCustomLocation(true)}
                    />
                    <span className="ml-2 text-gray-700 dark:text-gray-300">输入自定义地点</span>
                  </label>
                </div>
                
                {!showCustomLocation ? (
                  <CitySearch 
                    selectedCity={selectedCity}
                    onCitySelect={handleCitySelect}
                  />
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <input
                        type="text"
                        id="customLocation"
                        placeholder="地点名称"
                        value={customLocation}
                        onChange={(e) => setCustomLocation(e.target.value)}
                        className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        id="customLongitude"
                        placeholder="经度 (如: 114.06 或 -73.94)"
                        value={customLongitude}
                        onChange={(e) => setCustomLongitude(e.target.value)}
                        className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
                    <div className="col-span-2">
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        * 东经为正值，西经为负值
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
              onClick={handleCalculate}
              disabled={isLoading}
              className={`w-full md:w-auto px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white font-medium rounded-lg shadow-md transition-colors ${
                isLoading ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {isLoading ? '计算中...' : '开始计算'}
            </button>
          </div>
        </div>

        {/* 八字排盘结果 */}
        {baziChart && (
          <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 md:p-8 max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">八字排盘结果</h2>
            
            <div className="grid grid-cols-4 gap-4 mb-8">
              <div className="text-center p-4 border border-amber-200 dark:border-amber-800 rounded-lg">
                <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">年柱</div>
                <div className="text-xl font-bold text-amber-600 dark:text-amber-400">{baziChart.yearPillar}</div>
              </div>
              <div className="text-center p-4 border border-amber-200 dark:border-amber-800 rounded-lg">
                <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">月柱</div>
                <div className="text-xl font-bold text-amber-600 dark:text-amber-400">{baziChart.monthPillar}</div>
              </div>
              <div className="text-center p-4 border border-amber-200 dark:border-amber-800 rounded-lg">
                <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">日柱</div>
                <div className="text-xl font-bold text-amber-600 dark:text-amber-400">{baziChart.dayPillar}</div>
              </div>
              <div className="text-center p-4 border border-amber-200 dark:border-amber-800 rounded-lg">
                <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">时柱</div>
                <div className="text-xl font-bold text-amber-600 dark:text-amber-400">{baziChart.hourPillar}</div>
              </div>
            </div>
            
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">基础分析</h3>
              <div className="prose dark:prose-invert prose-amber max-w-none">
                <p className="text-gray-600 dark:text-gray-300 whitespace-pre-wrap">
                  {baziChart.analysis}
                </p>
              </div>
            </div>

            {/* 分析类型选择 */}
            <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">选择分析类型</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <button
                  onClick={() => handleAnalysis('overall')}
                  disabled={isAnalyzing}
                  className={`p-4 border border-amber-200 dark:border-amber-800 rounded-lg hover:bg-amber-50 dark:hover:bg-amber-900/20 transition-colors ${
                    selectedAnalysisType === 'overall' ? 'bg-amber-100 dark:bg-amber-900/30' : ''
                  }`}
                >
                  <div className="text-lg font-medium text-amber-600 dark:text-amber-400">整体分析</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">全面解读您的八字命盘</div>
                </button>
                <button
                  onClick={() => handleAnalysis('age25')}
                  disabled={isAnalyzing}
                  className={`p-4 border border-amber-200 dark:border-amber-800 rounded-lg hover:bg-amber-50 dark:hover:bg-amber-900/20 transition-colors ${
                    selectedAnalysisType === 'age25' ? 'bg-amber-100 dark:bg-amber-900/30' : ''
                  }`}
                >
                  <div className="text-lg font-medium text-amber-600 dark:text-amber-400">25岁运势</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">专注25岁重要年份分析</div>
                </button>
                <button
                  onClick={() => handleAnalysis('career')}
                  disabled={isAnalyzing}
                  className={`p-4 border border-amber-200 dark:border-amber-800 rounded-lg hover:bg-amber-50 dark:hover:bg-amber-900/20 transition-colors ${
                    selectedAnalysisType === 'career' ? 'bg-amber-100 dark:bg-amber-900/30' : ''
                  }`}
                >
                  <div className="text-lg font-medium text-amber-600 dark:text-amber-400">事业分析</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">职业发展和事业机遇</div>
                </button>
                <button
                  onClick={() => handleAnalysis('marriage')}
                  disabled={isAnalyzing}
                  className={`p-4 border border-amber-200 dark:border-amber-800 rounded-lg hover:bg-amber-50 dark:hover:bg-amber-900/20 transition-colors ${
                    selectedAnalysisType === 'marriage' ? 'bg-amber-100 dark:bg-amber-900/30' : ''
                  }`}
                >
                  <div className="text-lg font-medium text-amber-600 dark:text-amber-400">婚姻分析</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">感情运势和婚姻状况</div>
                </button>
                <button
                  onClick={() => handleAnalysis('wealth')}
                  disabled={isAnalyzing}
                  className={`p-4 border border-amber-200 dark:border-amber-800 rounded-lg hover:bg-amber-50 dark:hover:bg-amber-900/20 transition-colors ${
                    selectedAnalysisType === 'wealth' ? 'bg-amber-100 dark:bg-amber-900/30' : ''
                  }`}
                >
                  <div className="text-lg font-medium text-amber-600 dark:text-amber-400">财运分析</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">财富机遇和理财建议</div>
                </button>
                <button
                  onClick={() => handleAnalysis('health')}
                  disabled={isAnalyzing}
                  className={`p-4 border border-amber-200 dark:border-amber-800 rounded-lg hover:bg-amber-50 dark:hover:bg-amber-900/20 transition-colors ${
                    selectedAnalysisType === 'health' ? 'bg-amber-100 dark:bg-amber-900/30' : ''
                  }`}
                >
                  <div className="text-lg font-medium text-amber-600 dark:text-amber-400">健康分析</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">身体状况和养生建议</div>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 分析报告 */}
        {analysisReport && (
          <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 md:p-8 max-w-3xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {analysisReport.type === 'overall' && '整体分析报告'}
                {analysisReport.type === 'age25' && '25岁运势分析'}
                {analysisReport.type === 'career' && '事业分析报告'}
                {analysisReport.type === 'marriage' && '婚姻分析报告'}
                {analysisReport.type === 'wealth' && '财运分析报告'}
                {analysisReport.type === 'health' && '健康分析报告'}
              </h2>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {new Date(analysisReport.timestamp).toLocaleString('zh-CN')}
              </div>
            </div>
            <div className="prose dark:prose-invert prose-amber max-w-none">
              <div className="whitespace-pre-wrap text-gray-600 dark:text-gray-300">
                {analysisReport.content}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 