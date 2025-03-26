import React from 'react';
import { BaziChartType, PillarElement, HiddenStem, GodType } from '../utils/baziCalculator';

interface BaziChartProps {
  baziChart: BaziChartType;
  userInfo: {
    birthYear: number;
    birthMonth: number;
    birthDay: number;
    birthHour: number;
    birthMinute: number;
    gender: 'male' | 'female';
    location: string;
    lunarDate?: {
      year: number;
      month: number;
      day: number;
    };
    solarTime?: {
      hour: number;
      minute: number;
    };
  };
}

export default function BaziChart({ baziChart, userInfo }: BaziChartProps) {
  const getElementColor = (element: string): string => {
    switch (element) {
      case 'Wood':
        return 'text-green-600 dark:text-green-400';
      case 'Fire':
        return 'text-red-600 dark:text-red-400';
      case 'Earth':
        return 'text-yellow-600 dark:text-yellow-400';
      case 'Metal':
        return 'text-gray-600 dark:text-gray-400';
      case 'Water':
        return 'text-blue-600 dark:text-blue-400';
      default:
        return 'text-gray-900 dark:text-white';
    }
  };

  const getChineseElement = (element: string): string => {
    switch (element) {
      case 'Wood':
        return '木';
      case 'Fire':
        return '火';
      case 'Earth':
        return '土';
      case 'Metal':
        return '金';
      case 'Water':
        return '水';
      default:
        return '';
    }
  };

  const getDayMasterRelation = (pillarElement: string, dayMaster: string): string => {
    // Simplified relationship calculation
    if (pillarElement === dayMaster) {
      return '比肩';
    }
    
    // Generating phase (生)
    if (
      (dayMaster === 'Wood' && pillarElement === 'Fire') ||
      (dayMaster === 'Fire' && pillarElement === 'Earth') ||
      (dayMaster === 'Earth' && pillarElement === 'Metal') ||
      (dayMaster === 'Metal' && pillarElement === 'Water') ||
      (dayMaster === 'Water' && pillarElement === 'Wood')
    ) {
      return '食神';
    }
    
    // Controlling phase (克)
    if (
      (dayMaster === 'Wood' && pillarElement === 'Earth') ||
      (dayMaster === 'Earth' && pillarElement === 'Water') ||
      (dayMaster === 'Water' && pillarElement === 'Fire') ||
      (dayMaster === 'Fire' && pillarElement === 'Metal') ||
      (dayMaster === 'Metal' && pillarElement === 'Wood')
    ) {
      return '正官';
    }
    
    // Being generated phase (被生)
    if (
      (dayMaster === 'Wood' && pillarElement === 'Water') ||
      (dayMaster === 'Water' && pillarElement === 'Metal') ||
      (dayMaster === 'Metal' && pillarElement === 'Earth') ||
      (dayMaster === 'Earth' && pillarElement === 'Fire') ||
      (dayMaster === 'Fire' && pillarElement === 'Wood')
    ) {
      return '偏财';
    }
    
    // Being controlled phase (被克)
    if (
      (dayMaster === 'Wood' && pillarElement === 'Metal') ||
      (dayMaster === 'Metal' && pillarElement === 'Fire') ||
      (dayMaster === 'Fire' && pillarElement === 'Water') ||
      (dayMaster === 'Water' && pillarElement === 'Earth') ||
      (dayMaster === 'Earth' && pillarElement === 'Wood')
    ) {
      return '七杀';
    }
    
    return '未知';
  };

  // 展示藏干信息
  const renderHiddenStems = (hiddenStems: HiddenStem[]) => {
    if (!hiddenStems || hiddenStems.length === 0) {
      return <span className="text-gray-400">无</span>;
    }
    
    return (
      <div className="flex flex-col space-y-1">
        {hiddenStems.map((hs, idx) => (
          <div key={idx} className={`text-xs ${hs.primary ? 'font-bold' : ''}`}>
            {hs.stemChinese} ({hs.stem})
          </div>
        ))}
      </div>
    );
  };

  // 展示神煞信息
  const renderGods = (gods: GodType[]) => {
    if (!gods || gods.length === 0) {
      return <span className="text-gray-400">无</span>;
    }
    
    return (
      <div className="flex flex-wrap gap-1">
        {gods.map((god, idx) => (
          <span key={idx} className="text-xs bg-amber-100 dark:bg-amber-800 rounded px-1 py-0.5">
            {god.nameChinese}
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="mt-12 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 md:p-8 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">八字排盘</h2>
      
      <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-amber-50 dark:bg-gray-700 rounded-md">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">出生信息</h3>
          <div className="space-y-1 text-sm">
            <p><span className="font-medium">日期:</span> {userInfo.birthYear}年{userInfo.birthMonth}月{userInfo.birthDay}日</p>
            <p><span className="font-medium">时间:</span> {userInfo.birthHour.toString().padStart(2, '0')}:{userInfo.birthMinute.toString().padStart(2, '0')}</p>
            <p><span className="font-medium">性别:</span> {userInfo.gender === 'male' ? '男' : '女'}</p>
            <p><span className="font-medium">出生地:</span> {userInfo.location}</p>
            {userInfo.lunarDate && (
              <p><span className="font-medium">农历日期:</span> {userInfo.lunarDate.year}年{userInfo.lunarDate.month}月{userInfo.lunarDate.day}日</p>
            )}
            {userInfo.solarTime && (
              <p><span className="font-medium">真太阳时:</span> {userInfo.solarTime.hour.toString().padStart(2, '0')}:{userInfo.solarTime.minute.toString().padStart(2, '0')}</p>
            )}
          </div>
        </div>
        
        <div className="p-4 bg-amber-50 dark:bg-gray-700 rounded-md">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">八字总论</h3>
          <div className="space-y-1 text-sm">
            <p>
              <span className="font-medium">日主:</span> 
              <span className={getElementColor(baziChart.dayMaster)}>
                {baziChart.dayMasterChinese} ({baziChart.dayMaster})
              </span>
            </p>
            <p>
              <span className="font-medium">喜用神:</span> 
              <span className={getElementColor(baziChart.luckyElement)}>
                {baziChart.luckyElementChinese} ({baziChart.luckyElement})
              </span>
            </p>
            <p>
              <span className="font-medium">忌神:</span> 
              <span className={getElementColor(baziChart.unluckyElement)}>
                {baziChart.unluckyElementChinese} ({baziChart.unluckyElement})
              </span>
            </p>
            <p><span className="font-medium">空亡:</span> {baziChart.voidsChinese || '无'}</p>
          </div>
        </div>
      </div>
      
      <div className="mb-8 overflow-hidden rounded-lg border border-amber-200 dark:border-amber-800">
        <div className="grid grid-cols-5 text-center bg-amber-50 dark:bg-gray-700 border-b border-amber-200 dark:border-amber-800">
          <div className="p-2 border-r border-amber-200 dark:border-amber-800">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">柱位</span>
          </div>
          <div className="p-2 border-r border-amber-200 dark:border-amber-800">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">年柱</span>
          </div>
          <div className="p-2 border-r border-amber-200 dark:border-amber-800">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">月柱</span>
          </div>
          <div className="p-2 border-r border-amber-200 dark:border-amber-800">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">日柱</span>
          </div>
          <div className="p-2">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">时柱</span>
          </div>
        </div>
        
        {/* 干神 - 神煞关系 */}
        <div className="grid grid-cols-5 text-center border-b border-amber-200 dark:border-amber-800">
          <div className="p-2 border-r border-amber-200 dark:border-amber-800">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">干神</span>
          </div>
          <div className="p-2 border-r border-amber-200 dark:border-amber-800">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {getDayMasterRelation(baziChart.yearPillar.element, baziChart.dayMaster)}
            </span>
          </div>
          <div className="p-2 border-r border-amber-200 dark:border-amber-800">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {getDayMasterRelation(baziChart.monthPillar.element, baziChart.dayMaster)}
            </span>
          </div>
          <div className="p-2 border-r border-amber-200 dark:border-amber-800">
            <span className="text-sm text-red-600 dark:text-red-400">
              日主
            </span>
          </div>
          <div className="p-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {getDayMasterRelation(baziChart.hourPillar.element, baziChart.dayMaster)}
            </span>
          </div>
        </div>
        
        {/* 天干 */}
        <div className="grid grid-cols-5 text-center border-b border-amber-200 dark:border-amber-800">
          <div className="p-2 border-r border-amber-200 dark:border-amber-800">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">天干</span>
          </div>
          <div className="p-2 border-r border-amber-200 dark:border-amber-800">
            <span className={`text-2xl font-bold ${getElementColor(baziChart.yearPillar.element)}`}>
              {baziChart.yearPillar.stemChinese}
            </span>
            <span className="block text-xs text-gray-500 dark:text-gray-400">
              {baziChart.yearPillar.stem} ({getChineseElement(baziChart.yearPillar.element)})
            </span>
          </div>
          <div className="p-2 border-r border-amber-200 dark:border-amber-800">
            <span className={`text-2xl font-bold ${getElementColor(baziChart.monthPillar.element)}`}>
              {baziChart.monthPillar.stemChinese}
            </span>
            <span className="block text-xs text-gray-500 dark:text-gray-400">
              {baziChart.monthPillar.stem} ({getChineseElement(baziChart.monthPillar.element)})
            </span>
          </div>
          <div className="p-2 border-r border-amber-200 dark:border-amber-800">
            <span className={`text-2xl font-bold ${getElementColor(baziChart.dayPillar.element)}`}>
              {baziChart.dayPillar.stemChinese}
            </span>
            <span className="block text-xs text-gray-500 dark:text-gray-400">
              {baziChart.dayPillar.stem} ({getChineseElement(baziChart.dayPillar.element)})
            </span>
          </div>
          <div className="p-2">
            <span className={`text-2xl font-bold ${getElementColor(baziChart.hourPillar.element)}`}>
              {baziChart.hourPillar.stemChinese}
            </span>
            <span className="block text-xs text-gray-500 dark:text-gray-400">
              {baziChart.hourPillar.stem} ({getChineseElement(baziChart.hourPillar.element)})
            </span>
          </div>
        </div>
        
        {/* 地支 */}
        <div className="grid grid-cols-5 text-center border-b border-amber-200 dark:border-amber-800">
          <div className="p-2 border-r border-amber-200 dark:border-amber-800">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">地支</span>
          </div>
          <div className="p-2 border-r border-amber-200 dark:border-amber-800">
            <span className="text-2xl font-bold text-amber-600 dark:text-amber-400">
              {baziChart.yearPillar.branchChinese}
            </span>
            <span className="block text-xs text-gray-500 dark:text-gray-400">
              {baziChart.yearPillar.branch}
            </span>
          </div>
          <div className="p-2 border-r border-amber-200 dark:border-amber-800">
            <span className="text-2xl font-bold text-amber-600 dark:text-amber-400">
              {baziChart.monthPillar.branchChinese}
            </span>
            <span className="block text-xs text-gray-500 dark:text-gray-400">
              {baziChart.monthPillar.branch}
            </span>
          </div>
          <div className="p-2 border-r border-amber-200 dark:border-amber-800">
            <span className="text-2xl font-bold text-amber-600 dark:text-amber-400">
              {baziChart.dayPillar.branchChinese}
            </span>
            <span className="block text-xs text-gray-500 dark:text-gray-400">
              {baziChart.dayPillar.branch}
            </span>
          </div>
          <div className="p-2">
            <span className="text-2xl font-bold text-amber-600 dark:text-amber-400">
              {baziChart.hourPillar.branchChinese}
            </span>
            <span className="block text-xs text-gray-500 dark:text-gray-400">
              {baziChart.hourPillar.branch}
            </span>
          </div>
        </div>
        
        {/* 藏干 */}
        <div className="grid grid-cols-5 text-center border-b border-amber-200 dark:border-amber-800">
          <div className="p-2 border-r border-amber-200 dark:border-amber-800">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">藏干</span>
          </div>
          <div className="p-2 border-r border-amber-200 dark:border-amber-800">
            {renderHiddenStems(baziChart.yearHiddenStems)}
          </div>
          <div className="p-2 border-r border-amber-200 dark:border-amber-800">
            {renderHiddenStems(baziChart.monthHiddenStems)}
          </div>
          <div className="p-2 border-r border-amber-200 dark:border-amber-800">
            {renderHiddenStems(baziChart.dayHiddenStems)}
          </div>
          <div className="p-2">
            {renderHiddenStems(baziChart.hourHiddenStems)}
          </div>
        </div>
        
        {/* 神煞 */}
        <div className="grid grid-cols-5 text-center border-b border-amber-200 dark:border-amber-800">
          <div className="p-2 border-r border-amber-200 dark:border-amber-800">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">神煞</span>
          </div>
          <div className="p-2 border-r border-amber-200 dark:border-amber-800">
            {renderGods(baziChart.yearGods)}
          </div>
          <div className="p-2 border-r border-amber-200 dark:border-amber-800">
            {renderGods(baziChart.monthGods)}
          </div>
          <div className="p-2 border-r border-amber-200 dark:border-amber-800">
            {renderGods(baziChart.dayGods)}
          </div>
          <div className="p-2">
            {renderGods(baziChart.hourGods)}
          </div>
        </div>
        
        {/* 纳音 */}
        <div className="grid grid-cols-5 text-center">
          <div className="p-2 border-r border-amber-200 dark:border-amber-800">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">纳音</span>
          </div>
          <div className="p-2 border-r border-amber-200 dark:border-amber-800">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {baziChart.yearNayin || "未知"}
            </span>
          </div>
          <div className="p-2 border-r border-amber-200 dark:border-amber-800">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {baziChart.monthNayin || "未知"}
            </span>
          </div>
          <div className="p-2 border-r border-amber-200 dark:border-amber-800">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {baziChart.dayNayin || "未知"}
            </span>
          </div>
          <div className="p-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {baziChart.hourNayin || "未知"}
            </span>
          </div>
        </div>
      </div>
      
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">五行分布</h3>
          <div className="space-y-2">
            <div className="flex items-center">
              <div className="w-20 text-sm font-medium text-gray-700 dark:text-gray-300">木 (Wood)</div>
              <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                <div className="bg-green-500 h-2.5 rounded-full" style={{ width: `${(baziChart.fiveElements.wood / 12) * 100}%` }}></div>
              </div>
              <div className="w-8 text-sm text-gray-700 dark:text-gray-300 text-right">{baziChart.fiveElements.wood}</div>
            </div>
            <div className="flex items-center">
              <div className="w-20 text-sm font-medium text-gray-700 dark:text-gray-300">火 (Fire)</div>
              <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                <div className="bg-red-500 h-2.5 rounded-full" style={{ width: `${(baziChart.fiveElements.fire / 12) * 100}%` }}></div>
              </div>
              <div className="w-8 text-sm text-gray-700 dark:text-gray-300 text-right">{baziChart.fiveElements.fire}</div>
            </div>
            <div className="flex items-center">
              <div className="w-20 text-sm font-medium text-gray-700 dark:text-gray-300">土 (Earth)</div>
              <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                <div className="bg-yellow-500 h-2.5 rounded-full" style={{ width: `${(baziChart.fiveElements.earth / 12) * 100}%` }}></div>
              </div>
              <div className="w-8 text-sm text-gray-700 dark:text-gray-300 text-right">{baziChart.fiveElements.earth}</div>
            </div>
            <div className="flex items-center">
              <div className="w-20 text-sm font-medium text-gray-700 dark:text-gray-300">金 (Metal)</div>
              <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                <div className="bg-gray-500 h-2.5 rounded-full" style={{ width: `${(baziChart.fiveElements.metal / 12) * 100}%` }}></div>
              </div>
              <div className="w-8 text-sm text-gray-700 dark:text-gray-300 text-right">{baziChart.fiveElements.metal}</div>
            </div>
            <div className="flex items-center">
              <div className="w-20 text-sm font-medium text-gray-700 dark:text-gray-300">水 (Water)</div>
              <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: `${(baziChart.fiveElements.water / 12) * 100}%` }}></div>
              </div>
              <div className="w-8 text-sm text-gray-700 dark:text-gray-300 text-right">{baziChart.fiveElements.water}</div>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">六十甲子纳音五行</h3>
          <div className="space-y-2">
            <div className="flex justify-between p-2 border-b border-amber-200 dark:border-amber-700">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">年柱</span>
              <span className="text-sm text-gray-600 dark:text-gray-400">{baziChart.yearNayin || "未知"}</span>
            </div>
            <div className="flex justify-between p-2 border-b border-amber-200 dark:border-amber-700">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">月柱</span>
              <span className="text-sm text-gray-600 dark:text-gray-400">{baziChart.monthNayin || "未知"}</span>
            </div>
            <div className="flex justify-between p-2 border-b border-amber-200 dark:border-amber-700">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">日柱</span>
              <span className="text-sm text-gray-600 dark:text-gray-400">{baziChart.dayNayin || "未知"}</span>
            </div>
            <div className="flex justify-between p-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">时柱</span>
              <span className="text-sm text-gray-600 dark:text-gray-400">{baziChart.hourNayin || "未知"}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 