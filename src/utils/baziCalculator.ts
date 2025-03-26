// BaZi Calculator Utility
// This utility provides functions for converting civil time to solar time
// and calculating the BaZi chart (Four Pillars of Destiny)
import SunCalc from 'suncalc';
// 导入DeepSeek类型定义
import { DeepSeekBaziData, DeepSeekResponse } from './deepseek';
// 修复导入问题
// import { getLunar } from 'chinese-lunar-calendar';

// DeepSeek API配置
const DEEPSEEK_API_URL = 'https://api.siliconflow.cn/v1/chat/completions';
const DEEPSEEK_API_KEY = 'sk-lukbxmkdvtntxrmnnhskyinswixcehvxfovsxvqpuoojeywo';
const DEEPSEEK_MODEL = 'deepseek-ai/DeepSeek-V3';

// Types for BaZi Chart
export interface PillarElement {
  stem: string;
  branch: string;
  element: string;
  stemChinese: string;    // 天干中文
  branchChinese: string;  // 地支中文
  elementChinese: string; // 五行中文
}

export interface HiddenStem {
  stem: string;
  primary: boolean;
  stemChinese?: string;
}

export interface GodType {
  name: string;      // 神煞名称
  nameChinese: string; // 神煞中文名称
}

export interface SolarTimeResult {
  hour: number;
  minute: number;
  lunarYear?: number;
  lunarMonth?: number;
  lunarDay?: number;
  lunarHour?: number;
}

export interface BaziChartType {
  yearPillar: PillarElement;
  monthPillar: PillarElement;
  dayPillar: PillarElement;
  hourPillar: PillarElement;
  
  // 藏干 (Hidden Stems)
  yearHiddenStems: HiddenStem[];
  monthHiddenStems: HiddenStem[];
  dayHiddenStems: HiddenStem[];
  hourHiddenStems: HiddenStem[];
  
  // 神煞 (Gods/Spirits)
  yearGods: GodType[];
  monthGods: GodType[];
  dayGods: GodType[];
  hourGods: GodType[];
  
  // 五行统计
  fiveElements: {
    wood: number;
    fire: number;
    earth: number;
    metal: number;
    water: number;
  };
  
  // 命主、日元
  dayMaster: string;
  dayMasterChinese: string;
  
  // 吉神凶煞
  luckyElement: string;
  unluckyElement: string;
  luckyElementChinese: string;
  unluckyElementChinese: string;
  
  // 纳音
  yearNayin: string;
  monthNayin: string;
  dayNayin: string;
  hourNayin: string;
  
  // 空亡
  voids: string;
  voidsChinese: string;
  
  // 合化冲
  tianganCombinations: string;
  dizhiCombinations: string;
  
  // 真太阳时
  solarTime?: SolarTimeResult;
  
  // 农历日期
  lunarDate?: {
    year: number;
    month: number;
    day: number;
  };
}

// Constants for BaZi calculation
const HEAVENLY_STEMS = ['Jia', 'Yi', 'Bing', 'Ding', 'Wu', 'Ji', 'Geng', 'Xin', 'Ren', 'Gui'];
const EARTHLY_BRANCHES = ['Zi', 'Chou', 'Yin', 'Mao', 'Chen', 'Si', 'Wu', 'Wei', 'Shen', 'You', 'Xu', 'Hai'];
const ELEMENTS = ['Wood', 'Fire', 'Earth', 'Metal', 'Water'];

// 中文对应
const HEAVENLY_STEMS_CHINESE = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
const EARTHLY_BRANCHES_CHINESE = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];
const ELEMENTS_CHINESE = ['木', '火', '土', '金', '水'];

// Stem to element mapping
const STEM_TO_ELEMENT = {
  'Jia': 'Wood',
  'Yi': 'Wood',
  'Bing': 'Fire',
  'Ding': 'Fire',
  'Wu': 'Earth',
  'Ji': 'Earth',
  'Geng': 'Metal',
  'Xin': 'Metal',
  'Ren': 'Water',
  'Gui': 'Water'
};

// Branch to element mapping
const BRANCH_TO_ELEMENT = {
  'Zi': 'Water',
  'Chou': 'Earth',
  'Yin': 'Wood',
  'Mao': 'Wood',
  'Chen': 'Earth',
  'Si': 'Fire',
  'Wu': 'Fire',
  'Wei': 'Earth',
  'Shen': 'Metal',
  'You': 'Metal',
  'Xu': 'Earth',
  'Hai': 'Water'
};

// 地支藏干
export const HIDDEN_STEMS: Record<string, HiddenStem[]> = {
  'Zi': [{ stem: 'Gui', primary: true, stemChinese: '癸' }],
  'Chou': [
    { stem: 'Ji', primary: true, stemChinese: '己' }, 
    { stem: 'Gui', primary: false, stemChinese: '癸' }, 
    { stem: 'Xin', primary: false, stemChinese: '辛' }
  ],
  'Yin': [
    { stem: 'Jia', primary: true, stemChinese: '甲' }, 
    { stem: 'Bing', primary: false, stemChinese: '丙' }, 
    { stem: 'Wu', primary: false, stemChinese: '戊' }
  ],
  'Mao': [{ stem: 'Yi', primary: true, stemChinese: '乙' }],
  'Chen': [
    { stem: 'Wu', primary: true, stemChinese: '戊' }, 
    { stem: 'Yi', primary: false, stemChinese: '乙' }, 
    { stem: 'Gui', primary: false, stemChinese: '癸' }
  ],
  'Si': [
    { stem: 'Bing', primary: true, stemChinese: '丙' }, 
    { stem: 'Wu', primary: false, stemChinese: '戊' }, 
    { stem: 'Geng', primary: false, stemChinese: '庚' }
  ],
  'Wu': [
    { stem: 'Ding', primary: true, stemChinese: '丁' }, 
    { stem: 'Ji', primary: false, stemChinese: '己' }
  ],
  'Wei': [
    { stem: 'Ji', primary: true, stemChinese: '己' }, 
    { stem: 'Ding', primary: false, stemChinese: '丁' }, 
    { stem: 'Yi', primary: false, stemChinese: '乙' }
  ],
  'Shen': [
    { stem: 'Geng', primary: true, stemChinese: '庚' }, 
    { stem: 'Ren', primary: false, stemChinese: '壬' }, 
    { stem: 'Wu', primary: false, stemChinese: '戊' }
  ],
  'You': [{ stem: 'Xin', primary: true, stemChinese: '辛' }],
  'Xu': [
    { stem: 'Wu', primary: true, stemChinese: '戊' }, 
    { stem: 'Xin', primary: false, stemChinese: '辛' }, 
    { stem: 'Ding', primary: false, stemChinese: '丁' }
  ],
  'Hai': [
    { stem: 'Ren', primary: true, stemChinese: '壬' }, 
    { stem: 'Jia', primary: false, stemChinese: '甲' }
  ]
};

// 纳音五行表（六十甲子）
export const NAYIN_TABLE: Record<string, string> = {
  'JiaZi': '海中金', 'YiChou': '海中金', 'BingYin': '炉中火', 'DingMao': '炉中火',
  'WuChen': '大林木', 'JiSi': '大林木', 'GengWu': '路旁土', 'XinWei': '路旁土',
  'RenShen': '剑锋金', 'GuiYou': '剑锋金', 'JiaXu': '山头火', 'YiHai': '山头火',
  'BingZi': '涧下水', 'DingChou': '涧下水', 'WuYin': '城墙土', 'JiMao': '城墙土',
  'GengChen': '白腊金', 'XinSi': '白腊金', 'RenWu': '杨柳木', 'GuiWei': '杨柳木',
  'JiaShen': '泉中水', 'YiYou': '泉中水', 'BingXu': '屋上土', 'DingHai': '屋上土',
  'WuZi': '霹雳火', 'JiChou': '霹雳火', 'GengYin': '松柏木', 'XinMao': '松柏木',
  'RenChen': '长流水', 'GuiSi': '长流水', 'JiaWu': '砂石金', 'YiWei': '砂石金',
  'BingShen': '山下火', 'DingYou': '山下火', 'WuXu': '平地木', 'JiHai': '平地木',
  'GengZi': '壁上土', 'XinChou': '壁上土', 'RenYin': '金箔金', 'GuiMao': '金箔金',
  'JiaChen': '覆灯火', 'YiSi': '覆灯火', 'BingWu': '天河水', 'DingWei': '天河水',
  'WuShen': '大驿土', 'JiYou': '大驿土', 'GengXu': '钗环金', 'XinHai': '钗环金',
  'RenZi': '桑松木', 'GuiChou': '桑松木', 'JiaYin': '大溪水', 'YiMao': '大溪水',
  'BingChen': '沙中土', 'DingSi': '沙中土', 'WuWu': '天上火', 'JiWei': '天上火',
  'GengShen': '石榴木', 'XinYou': '石榴木', 'RenXu': '大海水', 'GuiHai': '大海水'
};

// 神煞表 (Gods/Spirits)
const GOD_TYPES = {
  // 年支神煞
  YEAR_BRANCH_GODS: {
    'Zi': ['将星'],  // 子
    'Chou': ['将星'], // 丑
    'Yin': ['文昌贵人'], // 寅
    'Mao': ['文昌贵人'], // 卯
    'Chen': ['福星贵人'], // 辰
    'Si': ['福星贵人'], // 巳
    'Wu': ['将星'], // 午
    'Wei': ['将星'], // 未
    'Shen': ['太极贵人'], // 申
    'You': ['文昌贵人'], // 酉
    'Xu': ['文昌贵人'], // 戌
    'Hai': ['太极贵人']  // 亥
  },
  
  // 日支神煞
  DAY_BRANCH_GODS: {
    'Zi': ['食神'], // 子
    'Chou': ['伤官'], // 丑
    'Yin': ['偏财'], // 寅
    'Mao': ['正财'], // 卯
    'Chen': ['偏官'], // 辰
    'Si': ['正官'], // 巳
    'Wu': ['七杀'], // 午
    'Wei': ['正印'], // 未
    'Shen': ['偏印'], // 申
    'You': ['比肩'], // 酉
    'Xu': ['劫财'], // 戌
    'Hai': ['食神']  // 亥
  }
};

// 神煞中文名称映射
const GOD_CHINESE_NAMES = {
  '将星': 'Jiang Xing',
  '文昌贵人': 'Wen Chang Gui Ren',
  '福星贵人': 'Fu Xing Gui Ren',
  '太极贵人': 'Tai Ji Gui Ren',
  '食神': 'Shi Shen',
  '伤官': 'Shang Guan',
  '偏财': 'Pian Cai',
  '正财': 'Zheng Cai',
  '偏官': 'Pian Guan',
  '正官': 'Zheng Guan',
  '七杀': 'Qi Sha',
  '正印': 'Zheng Yin',
  '偏印': 'Pian Yin',
  '比肩': 'Bi Jian',
  '劫财': 'Jie Cai'
};

// 自定义简易农历转换函数（作为后备方案）
const simpleLunarDateConverter = (
  year: number,
  month: number,
  day: number
): {lunarYear: number, lunarMonth: number, lunarDay: number} => {
  // 这是一个简化的农历转换，仅用于演示
  // 实际应用中应使用更准确的农历转换库
  
  // 使用公历年份作为农历年份的近似值
  // 实际上应该考虑春节的日期作为农历新年
  const lunarYear = month >= 2 ? year : year - 1;
  
  // 简单估算农历月份和日期（不准确，仅用于演示）
  // 如果有条件，应替换为更准确的农历算法
  let lunarMonth = ((month + 1) % 12) + 1;
  let lunarDay = ((day + 15) % 30) + 1;
  
  // 确保月份和日期在有效范围内
  lunarMonth = Math.max(1, Math.min(12, lunarMonth));
  lunarDay = Math.max(1, Math.min(30, lunarDay));
  
  return {
    lunarYear,
    lunarMonth,
    lunarDay
  };
};

// 使用SunCalc库计算真太阳时
export async function convertToSolarTime(
  year: number,
  month: number,
  day: number,
  hour: number,
  minute: number,
  longitude: number | string
): Promise<SolarTimeResult> {
  try {
    // 确保经度为数字类型
    const numLongitude = typeof longitude === 'string' ? parseFloat(longitude) : longitude;
    
    // 创建Date对象
    const date = new Date(year, month - 1, day, hour, minute);
    
    // 使用北半球中部位置的默认纬度 (35°N)
    const defaultLatitude = 35.0;
    
    // 使用SunCalc获取太阳事件时间
    const times = SunCalc.getTimes(date, defaultLatitude, numLongitude);
    
    // 获取太阳正午时间
    const solarNoon = times.solarNoon;
    
    // 创建正午12点的标准时间
    const standardNoon = new Date(date);
    standardNoon.setHours(12, 0, 0, 0);
    
    // 计算偏移量（分钟）
    const offsetMinutes = (solarNoon.getTime() - standardNoon.getTime()) / (60 * 1000);
    
    // 应用偏移量到原始时间
    const solarDate = new Date(date.getTime() + offsetMinutes * 60 * 1000);
    
    // 提取小时和分钟
    const solarHour = solarDate.getHours();
    const solarMinute = solarDate.getMinutes();
    
    // 使用简易农历转换（由于导入问题）
    const lunar = simpleLunarDateConverter(year, month, day);
    
    return {
      hour: solarHour,
      minute: solarMinute,
      lunarYear: lunar.lunarYear,
      lunarMonth: lunar.lunarMonth,
      lunarDay: lunar.lunarDay,
      lunarHour: Math.floor(solarHour / 2)
    };
  } catch (error) {
    console.error('Error calculating solar time:', error);
    return { hour: hour, minute: minute };
  }
}

// 使用简易农历计算代替chinese-lunar-calendar
export function calculateLunarDate(year: number, month: number, day: number) {
  // 使用简易农历转换（由于导入问题）
  const lunar = simpleLunarDateConverter(year, month, day);
  
  return {
    year: lunar.lunarYear,
    month: lunar.lunarMonth,
    day: lunar.lunarDay
  };
}

// Get Chinese name from English name
const getChineseName = (english: string, type: 'stem' | 'branch' | 'element'): string => {
  if (type === 'stem') {
    const index = HEAVENLY_STEMS.indexOf(english);
    return index >= 0 ? HEAVENLY_STEMS_CHINESE[index] : '';
  } else if (type === 'branch') {
    const index = EARTHLY_BRANCHES.indexOf(english);
    return index >= 0 ? EARTHLY_BRANCHES_CHINESE[index] : '';
  } else if (type === 'element') {
    const index = ELEMENTS.indexOf(english);
    return index >= 0 ? ELEMENTS_CHINESE[index] : '';
  }
  return '';
};

// Get hidden stems for a branch
const getHiddenStemsInternal = (branch: string): HiddenStem[] => {
  const hiddenStemsInfo = HIDDEN_STEMS[branch as keyof typeof HIDDEN_STEMS] || [];
  
  return hiddenStemsInfo.map(info => {
    const stem = info.stem;
    return {
      stem,
      primary: info.primary,
      stemChinese: getChineseName(stem, 'stem')
    };
  });
};

// 根据日主天干确定日主五行
const getDayMaster = (dayStem: string): string => {
  return STEM_TO_ELEMENT[dayStem as keyof typeof STEM_TO_ELEMENT] || 'Unknown';
};

// 根据日主五行确定喜用神
const getLuckyElement = (dayStem: string): string => {
  const dayMasterElement = getDayMaster(dayStem);
  
  // 五行相生关系: 木生火，火生土，土生金，金生水，水生木
  const luckyElementMap: Record<string, string> = {
    'Wood': 'Fire',   // 木喜火
    'Fire': 'Earth',  // 火喜土
    'Earth': 'Metal', // 土喜金
    'Metal': 'Water', // 金喜水
    'Water': 'Wood'   // 水喜木
  };
  
  return luckyElementMap[dayMasterElement] || 'Unknown';
};

// 根据日主五行确定忌神
const getUnluckyElement = (dayStem: string): string => {
  const dayMasterElement = getDayMaster(dayStem);
  
  // 五行相克关系: 木克土，土克水，水克火，火克金，金克木
  const unluckyElementMap: Record<string, string> = {
    'Wood': 'Metal', // 木忌金
    'Fire': 'Water', // 火忌水
    'Earth': 'Wood', // 土忌木
    'Metal': 'Fire', // 金忌火
    'Water': 'Earth'  // 水忌土
  };
  
  return unluckyElementMap[dayMasterElement] || 'Unknown';
};

// Get Nayin (五行纳音) for a stem-branch combination
const getNayinInternal = (stem: string, branch: string): string => {
  const key = stem + branch;
  return NAYIN_TABLE[key] || '';
};

// Get Gods/Spirits (神煞) for a branch
const getGods = (branch: string, pillar: 'year' | 'day'): GodType[] => {
  let gods: string[] = [];
  
  if (pillar === 'year') {
    gods = GOD_TYPES.YEAR_BRANCH_GODS[branch as keyof typeof GOD_TYPES.YEAR_BRANCH_GODS] || [];
  } else if (pillar === 'day') {
    gods = GOD_TYPES.DAY_BRANCH_GODS[branch as keyof typeof GOD_TYPES.DAY_BRANCH_GODS] || [];
  }
  
  return gods.map(god => ({
    name: GOD_CHINESE_NAMES[god as keyof typeof GOD_CHINESE_NAMES] || '',
    nameChinese: god
  }));
};

// 使用DeepSeek API计算八字
async function getDeepSeekBazi(
  birthYear: number,
  birthMonth: number,
  birthDay: number,
  birthHour: number,
  birthMinute: number,
  gender: 'male' | 'female',
  location: string,
  longitude: number | string,
  latitude: number | string
): Promise<DeepSeekBaziData> {
  try {
    // 确保经纬度为数字类型
    const numLongitude = typeof longitude === 'string' ? parseFloat(longitude) : longitude;
    const numLatitude = typeof latitude === 'string' ? parseFloat(latitude) : latitude;
    
    const prompt = `
      请根据以下出生信息进行精确的八字排盘，并返回JSON格式：
      
      出生年月日：${birthYear}年${birthMonth}月${birthDay}日
      出生时间：${birthHour}时${birthMinute}分
      性别：${gender === 'male' ? '男' : '女'}
      出生地点：${location}
      经度：${numLongitude}
      纬度：${numLatitude}
      
      请按照以下步骤进行精确计算：
      1. 先计算真太阳时（考虑地理经度调整）
      2. 计算农历日期
      3. 计算年柱、月柱、日柱和时柱的天干地支
      4. 计算四柱五行属性、十神关系
      5. 确定日主五行喜忌
      
      请将结果以严格的JSON格式返回，包含以下字段：
      {
        "yearPillar": {"stem": "天干", "branch": "地支", "stemChinese": "天干汉字", "branchChinese": "地支汉字", "element": "五行属性"},
        "monthPillar": {"stem": "天干", "branch": "地支", "stemChinese": "天干汉字", "branchChinese": "地支汉字", "element": "五行属性"},
        "dayPillar": {"stem": "天干", "branch": "地支", "stemChinese": "天干汉字", "branchChinese": "地支汉字", "element": "五行属性"},
        "hourPillar": {"stem": "天干", "branch": "地支", "stemChinese": "天干汉字", "branchChinese": "地支汉字", "element": "五行属性"},
        "solarTime": {"hour": 数字, "minute": 数字},
        "lunarDate": {"year": 数字, "month": 数字, "day": 数字},
        "dayMaster": "日主五行",
        "luckyElement": "喜用神五行",
        "unluckyElement": "忌神五行"
      }
      
      不要添加任何额外解释，只返回标准JSON。
    `;

    const response = await fetch(DEEPSEEK_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${DEEPSEEK_API_KEY}`
      },
      body: JSON.stringify({
        model: DEEPSEEK_MODEL,
        messages: [
          {
            role: 'system',
            content: '你是一位精通中国传统八字命理学的大师，擅长精确计算八字排盘。'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.2, // 低温度以获得更确定性的结果
        max_tokens: 1000
      })
    });

    if (!response.ok) {
      throw new Error(`DeepSeek API 请求失败: ${response.status} ${response.statusText}`);
    }

    const data = await response.json() as DeepSeekResponse;
    
    if (!data.choices || !data.choices[0] || !data.choices[0].message || !data.choices[0].message.content) {
      throw new Error('DeepSeek API 返回数据格式错误');
    }

    // 提取JSON内容
    const content = data.choices[0].message.content;
    let jsonMatch = content.match(/\{[\s\S]*\}/);
    
    if (!jsonMatch) {
      throw new Error('无法从DeepSeek回复中提取JSON数据');
    }
    
    const baziData = JSON.parse(jsonMatch[0]) as DeepSeekBaziData;
    
    // 标准化天干地支和五行的英文名
    standardizeBaziFormat(baziData);
    
    return baziData;
  } catch (error) {
    console.error('DeepSeek八字计算失败:', error);
    throw error;
  }
}

// 标准化来自DeepSeek的数据，确保与现有系统兼容
function standardizeBaziFormat(baziData: DeepSeekBaziData): void {
  // 标准化天干
  const stemMap: Record<string, string> = {
    '甲': 'Jia', '乙': 'Yi', '丙': 'Bing', '丁': 'Ding', '戊': 'Wu',
    '己': 'Ji', '庚': 'Geng', '辛': 'Xin', '壬': 'Ren', '癸': 'Gui'
  };
  
  // 标准化地支
  const branchMap: Record<string, string> = {
    '子': 'Zi', '丑': 'Chou', '寅': 'Yin', '卯': 'Mao', '辰': 'Chen',
    '巳': 'Si', '午': 'Wu', '未': 'Wei', '申': 'Shen', '酉': 'You',
    '戌': 'Xu', '亥': 'Hai'
  };
  
  // 标准化五行
  const elementMap: Record<string, string> = {
    '木': 'Wood', '火': 'Fire', '土': 'Earth', '金': 'Metal', '水': 'Water'
  };
  
  // 标准化年柱
  if (typeof baziData.yearPillar.stem === 'string' && baziData.yearPillar.stem.length === 1) {
    baziData.yearPillar.stem = stemMap[baziData.yearPillar.stem] || baziData.yearPillar.stem;
  }
  if (typeof baziData.yearPillar.branch === 'string' && baziData.yearPillar.branch.length === 1) {
    baziData.yearPillar.branch = branchMap[baziData.yearPillar.branch] || baziData.yearPillar.branch;
  }
  if (typeof baziData.yearPillar.element === 'string' && baziData.yearPillar.element.length === 1) {
    baziData.yearPillar.element = elementMap[baziData.yearPillar.element] || baziData.yearPillar.element;
  }
  
  // 标准化月柱
  if (typeof baziData.monthPillar.stem === 'string' && baziData.monthPillar.stem.length === 1) {
    baziData.monthPillar.stem = stemMap[baziData.monthPillar.stem] || baziData.monthPillar.stem;
  }
  if (typeof baziData.monthPillar.branch === 'string' && baziData.monthPillar.branch.length === 1) {
    baziData.monthPillar.branch = branchMap[baziData.monthPillar.branch] || baziData.monthPillar.branch;
  }
  if (typeof baziData.monthPillar.element === 'string' && baziData.monthPillar.element.length === 1) {
    baziData.monthPillar.element = elementMap[baziData.monthPillar.element] || baziData.monthPillar.element;
  }
  
  // 标准化日柱
  if (typeof baziData.dayPillar.stem === 'string' && baziData.dayPillar.stem.length === 1) {
    baziData.dayPillar.stem = stemMap[baziData.dayPillar.stem] || baziData.dayPillar.stem;
  }
  if (typeof baziData.dayPillar.branch === 'string' && baziData.dayPillar.branch.length === 1) {
    baziData.dayPillar.branch = branchMap[baziData.dayPillar.branch] || baziData.dayPillar.branch;
  }
  if (typeof baziData.dayPillar.element === 'string' && baziData.dayPillar.element.length === 1) {
    baziData.dayPillar.element = elementMap[baziData.dayPillar.element] || baziData.dayPillar.element;
  }
  
  // 标准化时柱
  if (typeof baziData.hourPillar.stem === 'string' && baziData.hourPillar.stem.length === 1) {
    baziData.hourPillar.stem = stemMap[baziData.hourPillar.stem] || baziData.hourPillar.stem;
  }
  if (typeof baziData.hourPillar.branch === 'string' && baziData.hourPillar.branch.length === 1) {
    baziData.hourPillar.branch = branchMap[baziData.hourPillar.branch] || baziData.hourPillar.branch;
  }
  if (typeof baziData.hourPillar.element === 'string' && baziData.hourPillar.element.length === 1) {
    baziData.hourPillar.element = elementMap[baziData.hourPillar.element] || baziData.hourPillar.element;
  }
  
  // 标准化日主和喜忌五行
  if (typeof baziData.dayMaster === 'string' && baziData.dayMaster.length === 1) {
    baziData.dayMaster = elementMap[baziData.dayMaster] || baziData.dayMaster;
  }
  if (typeof baziData.luckyElement === 'string' && baziData.luckyElement.length === 1) {
    baziData.luckyElement = elementMap[baziData.luckyElement] || baziData.luckyElement;
  }
  if (typeof baziData.unluckyElement === 'string' && baziData.unluckyElement.length === 1) {
    baziData.unluckyElement = elementMap[baziData.unluckyElement] || baziData.unluckyElement;
  }
}

// Mock function to send BaZi to API
export const sendBaziToAPI = async (
  baziChart: BaziChartType,
  userInfo: {
    birthYear: number;
    birthMonth: number;
    birthDay: number;
    birthHour: number;
    birthMinute: number;
    gender: 'male' | 'female';
    location: string;
  }
) => {
  // In a real implementation, this would send data to a backend API
  // For now, we'll return a mock response
  return {
    success: true,
    message: 'BaZi chart processed successfully',
    interpretation: {
      summary: 'Based on your BaZi chart, you have a strong ' + baziChart.dayMaster + ' element.',
      career: 'Your career path may benefit from ' + baziChart.luckyElement + ' related industries.',
      relationships: 'In relationships, you tend to be compatible with people who have strong ' + baziChart.luckyElement + ' energy.',
      health: 'For health, pay attention to ' + baziChart.unluckyElement + ' related issues.',
      luck: 'Your current luck cycle is influenced by ' + baziChart.yearPillar.element + ' energy.'
    }
  };
};

// 计算五行分布
function calculateFiveElements(
  yearPillar: PillarElement,
  monthPillar: PillarElement,
  dayPillar: PillarElement,
  hourPillar: PillarElement
): { wood: number; fire: number; earth: number; metal: number; water: number } {
  // 初始化各五行的计数
  let wood = 0, fire = 0, earth = 0, metal = 0, water = 0;
  
  // 统计天干五行
  [yearPillar.stem, monthPillar.stem, dayPillar.stem, hourPillar.stem].forEach(stem => {
    switch (STEM_TO_ELEMENT[stem as keyof typeof STEM_TO_ELEMENT]) {
      case 'Wood': wood++; break;
      case 'Fire': fire++; break;
      case 'Earth': earth++; break;
      case 'Metal': metal++; break;
      case 'Water': water++; break;
    }
  });
  
  // 统计地支五行
  [yearPillar.branch, monthPillar.branch, dayPillar.branch, hourPillar.branch].forEach(branch => {
    switch (BRANCH_TO_ELEMENT[branch as keyof typeof BRANCH_TO_ELEMENT]) {
      case 'Wood': wood++; break;
      case 'Fire': fire++; break;
      case 'Earth': earth++; break;
      case 'Metal': metal++; break;
      case 'Water': water++; break;
    }
  });
  
  return { wood, fire, earth, metal, water };
}

// 计算年柱
function calculateYearPillar(year: number, month: number, day: number): PillarElement {
  // 使用农历年计算年柱
  const lunarDate = calculateLunarDate(year, month, day);
  const lunarYear = lunarDate.year;
  
  // 计算天干索引：(年份 - 4) % 10
  const stemIndex = (lunarYear - 4) % 10;
  // 计算地支索引：(年份 - 4) % 12
  const branchIndex = (lunarYear - 4) % 12;
  
  const stem = HEAVENLY_STEMS[stemIndex >= 0 ? stemIndex : stemIndex + 10];
  const branch = EARTHLY_BRANCHES[branchIndex >= 0 ? branchIndex : branchIndex + 12];
  const element = STEM_TO_ELEMENT[stem as keyof typeof STEM_TO_ELEMENT];
  
  return {
    stem,
    branch,
    element,
    stemChinese: HEAVENLY_STEMS_CHINESE[stemIndex >= 0 ? stemIndex : stemIndex + 10],
    branchChinese: EARTHLY_BRANCHES_CHINESE[branchIndex >= 0 ? branchIndex : branchIndex + 12],
    elementChinese: getChineseName(element, 'element')
  };
}

// 计算月柱
function calculateMonthPillar(year: number, month: number): PillarElement {
  // 使用农历年计算月柱的天干
  const lunarDate = calculateLunarDate(year, month, 1);
  const lunarYear = lunarDate.year;
  const lunarMonth = lunarDate.month;
  
  // 计算月干的索引：(年干 × 2 + 月数 - 2) % 10
  const yearStemIndex = (lunarYear - 4) % 10;
  const monthStemIndex = (yearStemIndex * 2 + lunarMonth - 1) % 10;
  
  // 月支映射：正月(农历1月)对应寅(2)，二月对应卯(3)，以此类推
  const monthBranchIndex = (lunarMonth + 1) % 12; // 确保在0-11范围内
  
  const stem = HEAVENLY_STEMS[monthStemIndex >= 0 ? monthStemIndex : monthStemIndex + 10];
  const branch = EARTHLY_BRANCHES[monthBranchIndex >= 0 ? monthBranchIndex : monthBranchIndex + 12];
  const element = STEM_TO_ELEMENT[stem as keyof typeof STEM_TO_ELEMENT];
  
  return {
    stem,
    branch,
    element,
    stemChinese: HEAVENLY_STEMS_CHINESE[monthStemIndex >= 0 ? monthStemIndex : monthStemIndex + 10],
    branchChinese: EARTHLY_BRANCHES_CHINESE[monthBranchIndex >= 0 ? monthBranchIndex : monthBranchIndex + 12],
    elementChinese: getChineseName(element, 'element')
  };
}

// 计算日柱
function calculateDayPillar(year: number, month: number, day: number): PillarElement {
  // 使用1900年1月31日作为甲子日的基准日期
  const baseDate = new Date(Date.UTC(1900, 0, 31)); // 使用UTC时间避免时区影响
  const targetDate = new Date(Date.UTC(year, month - 1, day));
  
  // 计算相差的天数
  const diffDays = Math.floor((targetDate.getTime() - baseDate.getTime()) / (24 * 60 * 60 * 1000));
  
  // 计算天干和地支的索引
  const stemIndex = (diffDays % 10 + 10) % 10;
  const branchIndex = (diffDays % 12 + 12) % 12;
  
  const stem = HEAVENLY_STEMS[stemIndex];
  const branch = EARTHLY_BRANCHES[branchIndex];
  const element = STEM_TO_ELEMENT[stem as keyof typeof STEM_TO_ELEMENT];
  
  return {
    stem,
    branch,
    element,
    stemChinese: HEAVENLY_STEMS_CHINESE[stemIndex],
    branchChinese: EARTHLY_BRANCHES_CHINESE[branchIndex],
    elementChinese: getChineseName(element, 'element')
  };
}

// 计算时柱
function calculateHourPillar(hour: number, dayStem: string): PillarElement {
  // 时辰对应地支：子时(23:00-1:00)为0，丑时(1:00-3:00)为1，以此类推
  const branchIndex = Math.floor((hour + 1) % 24 / 2);
  
  // 计算时干：(日干索引 * 2 + 时辰) % 10
  const dayStemIndex = HEAVENLY_STEMS.indexOf(dayStem);
  const stemIndex = ((dayStemIndex % 5) * 2 + branchIndex) % 10;
  
  const stem = HEAVENLY_STEMS[stemIndex];
  const branch = EARTHLY_BRANCHES[branchIndex];
  const element = STEM_TO_ELEMENT[stem as keyof typeof STEM_TO_ELEMENT];
  
  return {
    stem,
    branch,
    element,
    stemChinese: HEAVENLY_STEMS_CHINESE[stemIndex],
    branchChinese: EARTHLY_BRANCHES_CHINESE[branchIndex],
    elementChinese: getChineseName(element, 'element')
  };
}

// 计算八字图表，如果提供了经度和纬度，则使用DeepSeek API
export async function calculateBaziChart(
  birthYear: number,
  birthMonth: number,
  birthDay: number,
  birthHour: number,
  birthMinute: number,
  gender: 'male' | 'female',
  location?: string,
  longitude?: number | string,
  latitude?: number | string
): Promise<BaziChartType> {
  try {
    // 如果提供了位置信息，尝试使用DeepSeek API
    if (location && longitude !== undefined && latitude !== undefined) {
      try {
        const deepSeekResult = await getDeepSeekBazi(
          birthYear,
          birthMonth,
          birthDay,
          birthHour,
          birthMinute,
          gender,
          location,
          typeof longitude === 'string' ? parseFloat(longitude) : (longitude || 0),
          typeof latitude === 'string' ? parseFloat(latitude) : latitude
        );
        
        // 构造返回结果
        return {
          yearPillar: {
            stem: deepSeekResult.yearPillar.stem,
            branch: deepSeekResult.yearPillar.branch,
            stemChinese: deepSeekResult.yearPillar.stemChinese,
            branchChinese: deepSeekResult.yearPillar.branchChinese,
            element: deepSeekResult.yearPillar.element,
            elementChinese: getChineseName(deepSeekResult.yearPillar.element, 'element')
          },
          monthPillar: {
            stem: deepSeekResult.monthPillar.stem,
            branch: deepSeekResult.monthPillar.branch,
            stemChinese: deepSeekResult.monthPillar.stemChinese,
            branchChinese: deepSeekResult.monthPillar.branchChinese,
            element: deepSeekResult.monthPillar.element,
            elementChinese: getChineseName(deepSeekResult.monthPillar.element, 'element')
          },
          dayPillar: {
            stem: deepSeekResult.dayPillar.stem,
            branch: deepSeekResult.dayPillar.branch,
            stemChinese: deepSeekResult.dayPillar.stemChinese,
            branchChinese: deepSeekResult.dayPillar.branchChinese,
            element: deepSeekResult.dayPillar.element,
            elementChinese: getChineseName(deepSeekResult.dayPillar.element, 'element')
          },
          hourPillar: {
            stem: deepSeekResult.hourPillar.stem,
            branch: deepSeekResult.hourPillar.branch,
            stemChinese: deepSeekResult.hourPillar.stemChinese,
            branchChinese: deepSeekResult.hourPillar.branchChinese,
            element: deepSeekResult.hourPillar.element,
            elementChinese: getChineseName(deepSeekResult.hourPillar.element, 'element')
          },
          solarTime: deepSeekResult.solarTime,
          lunarDate: deepSeekResult.lunarDate,
          dayMaster: deepSeekResult.dayMaster,
          dayMasterChinese: getChineseName(deepSeekResult.dayMaster, 'element'),
          luckyElement: deepSeekResult.luckyElement,
          luckyElementChinese: getChineseName(deepSeekResult.luckyElement, 'element'),
          unluckyElement: deepSeekResult.unluckyElement,
          unluckyElementChinese: getChineseName(deepSeekResult.unluckyElement, 'element'),
          yearHiddenStems: getHiddenStemsInternal(deepSeekResult.yearPillar.branch),
          monthHiddenStems: getHiddenStemsInternal(deepSeekResult.monthPillar.branch),
          dayHiddenStems: getHiddenStemsInternal(deepSeekResult.dayPillar.branch),
          hourHiddenStems: getHiddenStemsInternal(deepSeekResult.hourPillar.branch),
          yearGods: getGods(deepSeekResult.yearPillar.branch, 'year'),
          monthGods: getGods(deepSeekResult.monthPillar.branch, 'year'),
          dayGods: getGods(deepSeekResult.dayPillar.branch, 'day'),
          hourGods: getGods(deepSeekResult.hourPillar.branch, 'day'),
          fiveElements: calculateFiveElements({
            stem: deepSeekResult.yearPillar.stem,
            branch: deepSeekResult.yearPillar.branch,
            element: deepSeekResult.yearPillar.element,
            stemChinese: deepSeekResult.yearPillar.stemChinese,
            branchChinese: deepSeekResult.yearPillar.branchChinese,
            elementChinese: getChineseName(deepSeekResult.yearPillar.element, 'element')
          }, {
            stem: deepSeekResult.monthPillar.stem,
            branch: deepSeekResult.monthPillar.branch,
            element: deepSeekResult.monthPillar.element,
            stemChinese: deepSeekResult.monthPillar.stemChinese,
            branchChinese: deepSeekResult.monthPillar.branchChinese,
            elementChinese: getChineseName(deepSeekResult.monthPillar.element, 'element')
          }, {
            stem: deepSeekResult.dayPillar.stem,
            branch: deepSeekResult.dayPillar.branch,
            element: deepSeekResult.dayPillar.element,
            stemChinese: deepSeekResult.dayPillar.stemChinese,
            branchChinese: deepSeekResult.dayPillar.branchChinese,
            elementChinese: getChineseName(deepSeekResult.dayPillar.element, 'element')
          }, {
            stem: deepSeekResult.hourPillar.stem,
            branch: deepSeekResult.hourPillar.branch,
            element: deepSeekResult.hourPillar.element,
            stemChinese: deepSeekResult.hourPillar.stemChinese,
            branchChinese: deepSeekResult.hourPillar.branchChinese,
            elementChinese: getChineseName(deepSeekResult.hourPillar.element, 'element')
          }),
          yearNayin: getNayinInternal(deepSeekResult.yearPillar.stem, deepSeekResult.yearPillar.branch),
          monthNayin: getNayinInternal(deepSeekResult.monthPillar.stem, deepSeekResult.monthPillar.branch),
          dayNayin: getNayinInternal(deepSeekResult.dayPillar.stem, deepSeekResult.dayPillar.branch),
          hourNayin: getNayinInternal(deepSeekResult.hourPillar.stem, deepSeekResult.hourPillar.branch),
          voids: '',
          voidsChinese: '',
          tianganCombinations: '',
          dizhiCombinations: ''
        };
      } catch (error) {
        console.warn('DeepSeek API调用失败，回退到传统计算方法', error);
        // 使用传统方法继续计算
      }
    }
    
    // 创建出生日期的Date对象
    const birthDate = new Date(birthYear, birthMonth - 1, birthDay, birthHour, birthMinute);
    
    // 使用SunCalc计算真太阳时
    const solarTimeResult = await convertToSolarTime(
      birthYear,
      birthMonth,
      birthDay,
      birthHour,
      birthMinute,
      typeof longitude === 'string' ? parseFloat(longitude) : (longitude || 0)
    );
    
    // 计算农历日期
    const lunarDate = calculateLunarDate(birthYear, birthMonth, birthDay);
    
    // 计算年柱
    const yearPillar = calculateYearPillar(birthYear, birthMonth, birthDay);
    
    // 计算月柱
    const monthPillar = calculateMonthPillar(birthYear, birthMonth);
    
    // 计算日柱
    const dayPillar = calculateDayPillar(birthYear, birthMonth, birthDay);
    
    // 计算时柱 - 使用真太阳时的小时
    const hourPillar = calculateHourPillar(solarTimeResult.hour, dayPillar.stem);
    
    // 获取藏干
    const yearHiddenStems = getHiddenStemsInternal(yearPillar.branch);
    const monthHiddenStems = getHiddenStemsInternal(monthPillar.branch);
    const dayHiddenStems = getHiddenStemsInternal(dayPillar.branch);
    const hourHiddenStems = getHiddenStemsInternal(hourPillar.branch);
    
    // 计算纳音
    const yearNayin = getNayinInternal(yearPillar.stem, yearPillar.branch);
    const monthNayin = getNayinInternal(monthPillar.stem, monthPillar.branch);
    const dayNayin = getNayinInternal(dayPillar.stem, dayPillar.branch);
    const hourNayin = getNayinInternal(hourPillar.stem, hourPillar.branch);
    
    // 获取日主五行
    const dayMaster = getDayMaster(dayPillar.stem);
    
    // 构造完整结果
    return {
      yearPillar,
      monthPillar,
      dayPillar,
      hourPillar,
      solarTime: solarTimeResult,
      lunarDate,
      dayMaster,
      dayMasterChinese: getChineseName(dayMaster, 'element'),
      luckyElement: getLuckyElement(dayPillar.stem),
      luckyElementChinese: getChineseName(getLuckyElement(dayPillar.stem), 'element'),
      unluckyElement: getUnluckyElement(dayPillar.stem),
      unluckyElementChinese: getChineseName(getUnluckyElement(dayPillar.stem), 'element'),
      yearHiddenStems,
      monthHiddenStems,
      dayHiddenStems,
      hourHiddenStems,
      yearGods: getGods(yearPillar.branch, 'year'),
      monthGods: getGods(monthPillar.branch, 'year'),
      dayGods: getGods(dayPillar.branch, 'day'),
      hourGods: getGods(hourPillar.branch, 'day'),
      fiveElements: calculateFiveElements(yearPillar, monthPillar, dayPillar, hourPillar),
      yearNayin,
      monthNayin,
      dayNayin,
      hourNayin,
      voids: '',
      voidsChinese: '',
      tianganCombinations: '',
      dizhiCombinations: ''
    };
  } catch (error) {
    console.error('八字计算错误:', error);
    throw error;
  }
} 