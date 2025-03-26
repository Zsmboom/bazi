// BaZi Calculator Utility
// This utility provides functions for converting civil time to solar time
// and calculating the BaZi chart (Four Pillars of Destiny)

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
  tianganCombinations: string; // 天干合化
  dizhiCombinations: string;   // 地支合化冲害
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

// 十二地支藏干 (Hidden Stems in the Branches)
const HIDDEN_STEMS = {
  'Zi': [{ stem: 'Gui', primary: true }],
  'Chou': [{ stem: 'Ji', primary: true }, { stem: 'Gui', primary: false }, { stem: 'Xin', primary: false }],
  'Yin': [{ stem: 'Jia', primary: true }, { stem: 'Bing', primary: false }, { stem: 'Wu', primary: false }],
  'Mao': [{ stem: 'Yi', primary: true }],
  'Chen': [{ stem: 'Wu', primary: true }, { stem: 'Yi', primary: false }, { stem: 'Gui', primary: false }],
  'Si': [{ stem: 'Bing', primary: true }, { stem: 'Wu', primary: false }, { stem: 'Geng', primary: false }],
  'Wu': [{ stem: 'Ding', primary: true }, { stem: 'Ji', primary: false }],
  'Wei': [{ stem: 'Ji', primary: true }, { stem: 'Ding', primary: false }, { stem: 'Yi', primary: false }],
  'Shen': [{ stem: 'Geng', primary: true }, { stem: 'Ren', primary: false }, { stem: 'Wu', primary: false }],
  'You': [{ stem: 'Xin', primary: true }],
  'Xu': [{ stem: 'Wu', primary: true }, { stem: 'Xin', primary: false }, { stem: 'Ding', primary: false }],
  'Hai': [{ stem: 'Ren', primary: true }, { stem: 'Jia', primary: false }]
};

// 纳音五行 (Nayin Five Elements)
const NAYIN = {
  'Jia Zi': 'Water',  'Yi Chou': 'Water',  // 海中水
  'Bing Yin': 'Wood',  'Ding Mao': 'Wood',  // 炉中火
  'Wu Chen': 'Earth',  'Ji Si': 'Earth',    // 大林木
  'Geng Wu': 'Metal',  'Xin Wei': 'Metal',  // 路旁土
  'Ren Shen': 'Water', 'Gui You': 'Water',  // 剑锋金
  'Jia Xu': 'Wood',   'Yi Hai': 'Wood',     // 山头火
  'Bing Zi': 'Fire',   'Ding Chou': 'Fire', // 涧下水
  'Wu Yin': 'Earth',   'Ji Mao': 'Earth',   // 城墙土
  'Geng Chen': 'Metal', 'Xin Si': 'Metal',  // 白蜡金
  'Ren Wu': 'Water',   'Gui Wei': 'Water',  // 杨柳木
  'Jia Shen': 'Wood',  'Yi You': 'Wood',    // 泉中水
  'Bing Xu': 'Fire',   'Ding Hai': 'Fire',  // 屋上土
  'Wu Zi': 'Earth',    'Ji Chou': 'Earth',  // 霹雳火
  'Geng Yin': 'Metal',  'Xin Mao': 'Metal', // 松柏木
  'Ren Chen': 'Water',  'Gui Si': 'Water',  // 长流水
  'Jia Wu': 'Wood',     'Yi Wei': 'Wood',   // 砂石金
  'Bing Shen': 'Fire',  'Ding You': 'Fire', // 山下火
  'Wu Xu': 'Earth',     'Ji Hai': 'Earth',  // 平地木
  'Geng Zi': 'Metal',   'Xin Chou': 'Metal',// 壁上土
  'Ren Yin': 'Water',   'Gui Mao': 'Water', // 金箔金
  'Jia Chen': 'Wood',   'Yi Si': 'Wood',    // 覆灯火
  'Bing Wu': 'Fire',    'Ding Wei': 'Fire', // 天河水
  'Wu Shen': 'Earth',   'Ji You': 'Earth',  // 大驿土
  'Geng Xu': 'Metal',   'Xin Hai': 'Metal', // 钗环金
  'Ren Zi': 'Water',    'Gui Chou': 'Water',// 桑松木
  'Jia Yin': 'Wood',    'Yi Mao': 'Wood',   // 大溪水
  'Bing Chen': 'Fire',  'Ding Si': 'Fire',  // 沙中土
  'Wu Wu': 'Earth',     'Ji Wei': 'Earth',  // 天上火
  'Geng Shen': 'Metal', 'Xin You': 'Metal', // 石榴木
  'Ren Xu': 'Water',    'Gui Hai': 'Water'  // 大海水
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

// Modified function to convert civil time to solar time with lunar date info
export const convertToSolarTime = (
  year: number,
  month: number,
  day: number,
  hour: number,
  minute: number,
  longitude: number
): SolarTimeResult => {
  // Step 1: Convert to solar time using longitude
  // The Earth rotates 15 degrees per hour, so we adjust by 4 minutes per degree
  const utcOffsetHours = longitude / 15;
  
  // Create date object in local time
  const date = new Date(year, month - 1, day, hour, minute);
  
  // Adjust for longitude to get solar time
  // This is a simplified calculation, a more accurate one would use the equation of time
  const solarMinutes = minute + (utcOffsetHours * 60 % 60);
  let solarHour = hour + Math.floor(utcOffsetHours) + Math.floor((minute + (utcOffsetHours * 60 % 60)) / 60);
  let adjustedSolarMinute = solarMinutes % 60;
  
  if (adjustedSolarMinute < 0) {
    adjustedSolarMinute += 60;
    solarHour -= 1;
  }
  
  if (solarHour < 0) {
    solarHour += 24;
  }
  
  if (solarHour >= 24) {
    solarHour -= 24;
  }
  
  // Step 2: Calculate lunar calendar date
  // Note: In a production app, we would use a proper lunar calendar library
  // This is a placeholder for demonstration purposes
  const lunarDate = calculateLunarDate(year, month, day);
  
  return {
    hour: solarHour,
    minute: Math.round(adjustedSolarMinute),
    lunarYear: lunarDate.year,
    lunarMonth: lunarDate.month,
    lunarDay: lunarDate.day,
    lunarHour: Math.floor(solarHour / 2),
  };
};

// Placeholder function for lunar date calculation
// In a production app, this would use a lunar calendar library
const calculateLunarDate = (year: number, month: number, day: number) => {
  // Placeholder calculation - in real implementation, use a proper lunar calendar library
  return {
    year: year,
    month: month,
    day: day
  };
};

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
const getHiddenStems = (branch: string): HiddenStem[] => {
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

// Get Nayin (五行纳音) for a stem-branch combination
const getNayin = (stem: string, branch: string): string => {
  const key = `${stem} ${branch}` as keyof typeof NAYIN;
  return NAYIN[key] || '';
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

// Updated function to calculate BaZi chart with improved logic
export const calculateBaziChart = (
  birthYear: number,
  birthMonth: number,
  birthDay: number,
  solarHour: number,
  solarMinute: number,
  gender: 'male' | 'female'
): BaziChartType => {
  // Step 1: Calculate the lunar date (should be provided by convertToSolarTime)
  // For this example, we're using solar date
  
  // Step 2: Calculate the year pillar
  const stemIndex = (birthYear - 4) % 10;
  const branchIndex = (birthYear - 4) % 12;
  
  const yearStem = HEAVENLY_STEMS[stemIndex];
  const yearBranch = EARTHLY_BRANCHES[branchIndex];
  
  const yearPillar: PillarElement = {
    stem: yearStem,
    branch: yearBranch,
    element: STEM_TO_ELEMENT[yearStem as keyof typeof STEM_TO_ELEMENT],
    stemChinese: getChineseName(yearStem, 'stem'),
    branchChinese: getChineseName(yearBranch, 'branch'),
    elementChinese: getChineseName(STEM_TO_ELEMENT[yearStem as keyof typeof STEM_TO_ELEMENT], 'element')
  };
  
  // Step 3: Calculate the month pillar (uses solar term logic)
  // In a full implementation, this would use actual solar terms
  const monthStemIndex = (stemIndex * 2 + birthMonth) % 10;
  const monthBranchIndex = (birthMonth + 1) % 12;
  
  const monthStem = HEAVENLY_STEMS[monthStemIndex];
  const monthBranch = EARTHLY_BRANCHES[monthBranchIndex];
  
  const monthPillar: PillarElement = {
    stem: monthStem,
    branch: monthBranch,
    element: STEM_TO_ELEMENT[monthStem as keyof typeof STEM_TO_ELEMENT],
    stemChinese: getChineseName(monthStem, 'stem'),
    branchChinese: getChineseName(monthBranch, 'branch'),
    elementChinese: getChineseName(STEM_TO_ELEMENT[monthStem as keyof typeof STEM_TO_ELEMENT], 'element')
  };
  
  // Step 4: Calculate the day pillar using JiaZi cycle
  const baseDate = new Date(1900, 0, 1); // Known JiaZi date (甲子日)
  const birthDate = new Date(birthYear, birthMonth - 1, birthDay);
  const daysDiff = Math.floor((birthDate.getTime() - baseDate.getTime()) / (1000 * 60 * 60 * 24));
  const dayStemIndex = daysDiff % 10;
  const dayBranchIndex = daysDiff % 12;
  
  const dayStem = HEAVENLY_STEMS[dayStemIndex];
  const dayBranch = EARTHLY_BRANCHES[dayBranchIndex];
  
  const dayPillar: PillarElement = {
    stem: dayStem,
    branch: dayBranch,
    element: STEM_TO_ELEMENT[dayStem as keyof typeof STEM_TO_ELEMENT],
    stemChinese: getChineseName(dayStem, 'stem'),
    branchChinese: getChineseName(dayBranch, 'branch'),
    elementChinese: getChineseName(STEM_TO_ELEMENT[dayStem as keyof typeof STEM_TO_ELEMENT], 'element')
  };
  
  // Step 5: Calculate the hour pillar (using Chinese two-hour period)
  // Traditional Chinese hours are divided into 12 two-hour periods (时辰)
  const hourBranchIndex = Math.floor(solarHour / 2) % 12;
  // The hour stem is determined by the day stem
  const hourStemIndex = (dayStemIndex * 2 + Math.floor(solarHour / 2)) % 10;
  
  const hourStem = HEAVENLY_STEMS[hourStemIndex];
  const hourBranch = EARTHLY_BRANCHES[hourBranchIndex];
  
  const hourPillar: PillarElement = {
    stem: hourStem,
    branch: hourBranch,
    element: STEM_TO_ELEMENT[hourStem as keyof typeof STEM_TO_ELEMENT],
    stemChinese: getChineseName(hourStem, 'stem'),
    branchChinese: getChineseName(hourBranch, 'branch'),
    elementChinese: getChineseName(STEM_TO_ELEMENT[hourStem as keyof typeof STEM_TO_ELEMENT], 'element')
  };
  
  // Get hidden stems for each pillar
  const yearHiddenStems = getHiddenStems(yearBranch);
  const monthHiddenStems = getHiddenStems(monthBranch);
  const dayHiddenStems = getHiddenStems(dayBranch);
  const hourHiddenStems = getHiddenStems(hourBranch);
  
  // Get Nayin for each pillar
  const yearNayin = getNayin(yearStem, yearBranch);
  const monthNayin = getNayin(monthStem, monthBranch);
  const dayNayin = getNayin(dayStem, dayBranch);
  const hourNayin = getNayin(hourStem, hourBranch);
  
  // Get Gods/Spirits for year and day pillars
  const yearGods = getGods(yearBranch, 'year');
  const dayGods = getGods(dayBranch, 'day');
  
  // Get empty (void) branches
  // 简化计算空亡，实际上应根据日柱甲子序号计算
  const voidIndex = (dayStemIndex + 1) % 6;
  const voidBranches = [
    EARTHLY_BRANCHES[(voidIndex * 2) % 12],
    EARTHLY_BRANCHES[(voidIndex * 2 + 1) % 12]
  ];
  const voidBranchesChinese = voidBranches.map(branch => getChineseName(branch, 'branch')).join('');
  
  // Calculate tianganCombinations and dizhiCombinations
  const tianganCombinations = `${yearPillar.stemChinese}${monthPillar.stemChinese}合化${yearPillar.elementChinese}`;
  const dizhiCombinations = `${yearPillar.branchChinese}${monthPillar.branchChinese}半合${monthPillar.branchChinese}刑${yearPillar.branchChinese}`;
  
  // Calculate five elements strength (simplified)
  const fiveElements = calculateFiveElements(yearPillar, monthPillar, dayPillar, hourPillar);
  
  // Determine lucky and unlucky elements
  const dayMaster = dayPillar.element;
  const dayMasterChinese = dayPillar.elementChinese;
  
  const { luckyElement, unluckyElement } = determineLuckyElements(dayMaster, fiveElements, gender);
  const luckyElementChinese = getChineseName(luckyElement, 'element');
  const unluckyElementChinese = getChineseName(unluckyElement, 'element');
  
  return {
    yearPillar,
    monthPillar,
    dayPillar,
    hourPillar,
    
    yearHiddenStems,
    monthHiddenStems,
    dayHiddenStems,
    hourHiddenStems,
    
    yearGods,
    monthGods: [],  // 简化，未实现月柱神煞
    dayGods,
    hourGods: [],   // 简化，未实现时柱神煞
    
    fiveElements,
    
    dayMaster,
    dayMasterChinese,
    
    luckyElement,
    unluckyElement,
    luckyElementChinese,
    unluckyElementChinese,
    
    yearNayin,
    monthNayin,
    dayNayin,
    hourNayin,
    
    voids: voidBranches.join(' '),
    voidsChinese: voidBranchesChinese,
    
    tianganCombinations,
    dizhiCombinations
  };
};

// Calculate the strength of each five element in the chart
const calculateFiveElements = (
  yearPillar: PillarElement,
  monthPillar: PillarElement,
  dayPillar: PillarElement,
  hourPillar: PillarElement
): { wood: number; fire: number; earth: number; metal: number; water: number } => {
  // Initialize elements count
  const elements = {
    wood: 0,
    fire: 0,
    earth: 0,
    metal: 0,
    water: 0
  };
  
  // Count elements from stems
  for (const pillar of [yearPillar, monthPillar, dayPillar, hourPillar]) {
    // Add stem element
    elements[pillar.element.toLowerCase() as keyof typeof elements] += 1;
    
    // Add branch element
    const branchElement = BRANCH_TO_ELEMENT[pillar.branch as keyof typeof BRANCH_TO_ELEMENT];
    elements[branchElement.toLowerCase() as keyof typeof elements] += 0.5;
  }
  
  return elements;
};

// Determine lucky and unlucky elements based on day master and gender
const determineLuckyElements = (
  dayMaster: string,
  fiveElements: { wood: number; fire: number; earth: number; metal: number; water: number },
  gender: 'male' | 'female'
): { luckyElement: string; unluckyElement: string } => {
  // This is a simplified implementation
  // In real BaZi analysis, this depends on the balance of five elements
  // and follows complex rules of producing, controlling, and clashing cycles
  
  // For this demo, we'll use a simple approach based on the day master
  let luckyElement = '';
  let unluckyElement = '';
  
  // Find the weakest element (simplistic approach)
  const elements = Object.entries(fiveElements).sort((a, b) => a[1] - b[1]);
  const weakestElement = elements[0][0];
  
  // Find the strongest element
  const strongestElement = elements[elements.length - 1][0];
  
  // Simple rule: day master determines what is beneficial
  // This is just a demonstration and not actual BaZi theory
  switch (dayMaster) {
    case 'Wood':
      luckyElement = gender === 'male' ? 'Water' : 'Fire';
      unluckyElement = gender === 'male' ? 'Metal' : 'Earth';
      break;
    case 'Fire':
      luckyElement = gender === 'male' ? 'Wood' : 'Earth';
      unluckyElement = gender === 'male' ? 'Water' : 'Metal';
      break;
    case 'Earth':
      luckyElement = gender === 'male' ? 'Fire' : 'Metal';
      unluckyElement = gender === 'male' ? 'Wood' : 'Water';
      break;
    case 'Metal':
      luckyElement = gender === 'male' ? 'Earth' : 'Water';
      unluckyElement = gender === 'male' ? 'Fire' : 'Wood';
      break;
    case 'Water':
      luckyElement = gender === 'male' ? 'Metal' : 'Wood';
      unluckyElement = gender === 'male' ? 'Earth' : 'Fire';
      break;
    default:
      // Fallback to weakest/strongest if day master is unknown
      luckyElement = weakestElement.charAt(0).toUpperCase() + weakestElement.slice(1);
      unluckyElement = strongestElement.charAt(0).toUpperCase() + strongestElement.slice(1);
  }
  
  return { luckyElement, unluckyElement };
};

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