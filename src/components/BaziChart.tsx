import React from 'react';
import { BaziChartType, PillarElement } from '../utils/baziCalculator';

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

  return (
    <div className="mt-12 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 md:p-8 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">BaZi Chart</h2>
      
      <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-amber-50 dark:bg-gray-700 rounded-md">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Birth Information</h3>
          <div className="space-y-1 text-sm">
            <p><span className="font-medium">Date:</span> {userInfo.birthYear}-{userInfo.birthMonth}-{userInfo.birthDay}</p>
            <p><span className="font-medium">Time:</span> {userInfo.birthHour.toString().padStart(2, '0')}:{userInfo.birthMinute.toString().padStart(2, '0')}</p>
            <p><span className="font-medium">Gender:</span> {userInfo.gender === 'male' ? 'Male' : 'Female'}</p>
            <p><span className="font-medium">Location:</span> {userInfo.location}</p>
            {userInfo.lunarDate && (
              <p><span className="font-medium">Lunar Date:</span> {userInfo.lunarDate.year}-{userInfo.lunarDate.month}-{userInfo.lunarDate.day}</p>
            )}
            {userInfo.solarTime && (
              <p><span className="font-medium">Solar Time:</span> {userInfo.solarTime.hour.toString().padStart(2, '0')}:{userInfo.solarTime.minute.toString().padStart(2, '0')}</p>
            )}
          </div>
        </div>
        
        <div className="p-4 bg-amber-50 dark:bg-gray-700 rounded-md">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Chart Summary</h3>
          <div className="space-y-1 text-sm">
            <p>
              <span className="font-medium">Day Master:</span> 
              <span className={getElementColor(baziChart.dayMaster)}>
                {baziChart.dayMaster} ({getChineseElement(baziChart.dayMaster)})
              </span>
            </p>
            <p><span className="font-medium">Lucky Element:</span> {baziChart.luckyElement} ({baziChart.luckyElementChinese})</p>
            <p><span className="font-medium">Unlucky Element:</span> {baziChart.unluckyElement} ({baziChart.unluckyElementChinese})</p>
            <p><span className="font-medium">Void Branches:</span> {baziChart.voids} ({baziChart.voidsChinese})</p>
          </div>
        </div>
      </div>
      
      <div className="mb-8 overflow-hidden rounded-lg border border-amber-200 dark:border-amber-800">
        <div className="grid grid-cols-5 text-center bg-amber-50 dark:bg-gray-700 border-b border-amber-200 dark:border-amber-800">
          <div className="p-2 border-r border-amber-200 dark:border-amber-800">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Pillar</span>
          </div>
          <div className="p-2 border-r border-amber-200 dark:border-amber-800">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Year</span>
          </div>
          <div className="p-2 border-r border-amber-200 dark:border-amber-800">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Month</span>
          </div>
          <div className="p-2 border-r border-amber-200 dark:border-amber-800">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Day</span>
          </div>
          <div className="p-2">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Hour</span>
          </div>
        </div>
        
        {/* Relationship Row */}
        <div className="grid grid-cols-5 text-center border-b border-amber-200 dark:border-amber-800">
          <div className="p-2 border-r border-amber-200 dark:border-amber-800">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Relation</span>
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
        
        {/* Heavenly Stems Row */}
        <div className="grid grid-cols-5 text-center border-b border-amber-200 dark:border-amber-800">
          <div className="p-2 border-r border-amber-200 dark:border-amber-800">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Heavenly Stem</span>
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
        
        {/* Earthly Branches Row */}
        <div className="grid grid-cols-5 text-center border-b border-amber-200 dark:border-amber-800">
          <div className="p-2 border-r border-amber-200 dark:border-amber-800">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Earthly Branch</span>
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
        
        {/* Hidden Stems Row */}
        <div className="grid grid-cols-5 text-center">
          <div className="p-2 border-r border-amber-200 dark:border-amber-800">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Hidden Stems</span>
          </div>
          <div className="p-2 border-r border-amber-200 dark:border-amber-800">
            <div className="text-xs text-gray-600 dark:text-gray-400">
              {baziChart.yearHiddenStems.map((hs, i) => (
                <div key={i} className={hs.primary ? 'font-bold' : ''}>
                  {hs.stemChinese || hs.stem}
                </div>
              ))}
            </div>
          </div>
          <div className="p-2 border-r border-amber-200 dark:border-amber-800">
            <div className="text-xs text-gray-600 dark:text-gray-400">
              {baziChart.monthHiddenStems.map((hs, i) => (
                <div key={i} className={hs.primary ? 'font-bold' : ''}>
                  {hs.stemChinese || hs.stem}
                </div>
              ))}
            </div>
          </div>
          <div className="p-2 border-r border-amber-200 dark:border-amber-800">
            <div className="text-xs text-gray-600 dark:text-gray-400">
              {baziChart.dayHiddenStems.map((hs, i) => (
                <div key={i} className={hs.primary ? 'font-bold' : ''}>
                  {hs.stemChinese || hs.stem}
                </div>
              ))}
            </div>
          </div>
          <div className="p-2">
            <div className="text-xs text-gray-600 dark:text-gray-400">
              {baziChart.hourHiddenStems.map((hs, i) => (
                <div key={i} className={hs.primary ? 'font-bold' : ''}>
                  {hs.stemChinese || hs.stem}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Five Elements Distribution</h3>
          <div className="space-y-2">
            <div className="flex items-center">
              <div className="w-20 text-sm font-medium text-gray-700 dark:text-gray-300">Wood (木)</div>
              <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                <div className="bg-green-500 h-2.5 rounded-full" style={{ width: `${(baziChart.fiveElements.wood / 12) * 100}%` }}></div>
              </div>
              <div className="w-8 text-sm text-gray-700 dark:text-gray-300 text-right">{baziChart.fiveElements.wood}</div>
            </div>
            <div className="flex items-center">
              <div className="w-20 text-sm font-medium text-gray-700 dark:text-gray-300">Fire (火)</div>
              <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                <div className="bg-red-500 h-2.5 rounded-full" style={{ width: `${(baziChart.fiveElements.fire / 12) * 100}%` }}></div>
              </div>
              <div className="w-8 text-sm text-gray-700 dark:text-gray-300 text-right">{baziChart.fiveElements.fire}</div>
            </div>
            <div className="flex items-center">
              <div className="w-20 text-sm font-medium text-gray-700 dark:text-gray-300">Earth (土)</div>
              <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                <div className="bg-yellow-500 h-2.5 rounded-full" style={{ width: `${(baziChart.fiveElements.earth / 12) * 100}%` }}></div>
              </div>
              <div className="w-8 text-sm text-gray-700 dark:text-gray-300 text-right">{baziChart.fiveElements.earth}</div>
            </div>
            <div className="flex items-center">
              <div className="w-20 text-sm font-medium text-gray-700 dark:text-gray-300">Metal (金)</div>
              <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                <div className="bg-gray-500 h-2.5 rounded-full" style={{ width: `${(baziChart.fiveElements.metal / 12) * 100}%` }}></div>
              </div>
              <div className="w-8 text-sm text-gray-700 dark:text-gray-300 text-right">{baziChart.fiveElements.metal}</div>
            </div>
            <div className="flex items-center">
              <div className="w-20 text-sm font-medium text-gray-700 dark:text-gray-300">Water (水)</div>
              <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: `${(baziChart.fiveElements.water / 12) * 100}%` }}></div>
              </div>
              <div className="w-8 text-sm text-gray-700 dark:text-gray-300 text-right">{baziChart.fiveElements.water}</div>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Nayin Five Elements</h3>
          <div className="space-y-2">
            <div className="flex justify-between p-2 border-b border-amber-200 dark:border-amber-700">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Year</span>
              <span className="text-sm text-gray-600 dark:text-gray-400">{baziChart.yearNayin}</span>
            </div>
            <div className="flex justify-between p-2 border-b border-amber-200 dark:border-amber-700">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Month</span>
              <span className="text-sm text-gray-600 dark:text-gray-400">{baziChart.monthNayin}</span>
            </div>
            <div className="flex justify-between p-2 border-b border-amber-200 dark:border-amber-700">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Day</span>
              <span className="text-sm text-gray-600 dark:text-gray-400">{baziChart.dayNayin}</span>
            </div>
            <div className="flex justify-between p-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Hour</span>
              <span className="text-sm text-gray-600 dark:text-gray-400">{baziChart.hourNayin}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 