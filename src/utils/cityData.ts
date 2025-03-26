export interface City {
  name: string;
  englishName: string;
  longitude: number;
  latitude: number;
  country: string;
  countryCode: string;
  timezone: string;
}

export interface CountryGroup {
  name: string;
  englishName: string;
  code: string;
  cities: City[];
}

// 定义主要国家和城市数据
export const countryGroups: CountryGroup[] = [
  {
    name: '中国',
    englishName: 'China',
    code: 'CN',
    cities: [
      { name: '北京', englishName: 'Beijing', longitude: 116.4074, latitude: 39.9042, country: '中国', countryCode: 'CN', timezone: 'Asia/Shanghai' },
      { name: '上海', englishName: 'Shanghai', longitude: 121.4737, latitude: 31.2304, country: '中国', countryCode: 'CN', timezone: 'Asia/Shanghai' },
      { name: '广州', englishName: 'Guangzhou', longitude: 113.2644, latitude: 23.1291, country: '中国', countryCode: 'CN', timezone: 'Asia/Shanghai' },
      { name: '深圳', englishName: 'Shenzhen', longitude: 114.0579, latitude: 22.5431, country: '中国', countryCode: 'CN', timezone: 'Asia/Shanghai' },
      { name: '成都', englishName: 'Chengdu', longitude: 104.0665, latitude: 30.5723, country: '中国', countryCode: 'CN', timezone: 'Asia/Shanghai' },
      { name: '重庆', englishName: 'Chongqing', longitude: 106.5504, latitude: 29.5633, country: '中国', countryCode: 'CN', timezone: 'Asia/Shanghai' },
      { name: '杭州', englishName: 'Hangzhou', longitude: 120.1699, latitude: 30.2741, country: '中国', countryCode: 'CN', timezone: 'Asia/Shanghai' },
      { name: '武汉', englishName: 'Wuhan', longitude: 114.3055, latitude: 30.5928, country: '中国', countryCode: 'CN', timezone: 'Asia/Shanghai' },
      { name: '西安', englishName: 'Xi\'an', longitude: 108.9402, latitude: 34.3416, country: '中国', countryCode: 'CN', timezone: 'Asia/Shanghai' },
      { name: '南京', englishName: 'Nanjing', longitude: 118.7969, latitude: 32.0603, country: '中国', countryCode: 'CN', timezone: 'Asia/Shanghai' },
      { name: '天津', englishName: 'Tianjin', longitude: 117.1993, latitude: 39.0851, country: '中国', countryCode: 'CN', timezone: 'Asia/Shanghai' },
      { name: '苏州', englishName: 'Suzhou', longitude: 120.5853, latitude: 31.2989, country: '中国', countryCode: 'CN', timezone: 'Asia/Shanghai' },
    ]
  },
  {
    name: '美国',
    englishName: 'United States',
    code: 'US',
    cities: [
      { name: '纽约', englishName: 'New York', longitude: -74.0060, latitude: 40.7128, country: '美国', countryCode: 'US', timezone: 'America/New_York' },
      { name: '洛杉矶', englishName: 'Los Angeles', longitude: -118.2437, latitude: 34.0522, country: '美国', countryCode: 'US', timezone: 'America/Los_Angeles' },
      { name: '芝加哥', englishName: 'Chicago', longitude: -87.6298, latitude: 41.8781, country: '美国', countryCode: 'US', timezone: 'America/Chicago' },
      { name: '休斯顿', englishName: 'Houston', longitude: -95.3698, latitude: 29.7604, country: '美国', countryCode: 'US', timezone: 'America/Chicago' },
      { name: '旧金山', englishName: 'San Francisco', longitude: -122.4194, latitude: 37.7749, country: '美国', countryCode: 'US', timezone: 'America/Los_Angeles' },
      { name: '波士顿', englishName: 'Boston', longitude: -71.0589, latitude: 42.3601, country: '美国', countryCode: 'US', timezone: 'America/New_York' },
      { name: '华盛顿', englishName: 'Washington DC', longitude: -77.0369, latitude: 38.9072, country: '美国', countryCode: 'US', timezone: 'America/New_York' },
      { name: '迈阿密', englishName: 'Miami', longitude: -80.1918, latitude: 25.7617, country: '美国', countryCode: 'US', timezone: 'America/New_York' },
      { name: '西雅图', englishName: 'Seattle', longitude: -122.3321, latitude: 47.6062, country: '美国', countryCode: 'US', timezone: 'America/Los_Angeles' },
    ]
  },
  {
    name: '日本',
    englishName: 'Japan',
    code: 'JP',
    cities: [
      { name: '东京', englishName: 'Tokyo', longitude: 139.6917, latitude: 35.6895, country: '日本', countryCode: 'JP', timezone: 'Asia/Tokyo' },
      { name: '大阪', englishName: 'Osaka', longitude: 135.5023, latitude: 34.6937, country: '日本', countryCode: 'JP', timezone: 'Asia/Tokyo' },
      { name: '京都', englishName: 'Kyoto', longitude: 135.7681, latitude: 35.0116, country: '日本', countryCode: 'JP', timezone: 'Asia/Tokyo' },
      { name: '福冈', englishName: 'Fukuoka', longitude: 130.4017, latitude: 33.5902, country: '日本', countryCode: 'JP', timezone: 'Asia/Tokyo' },
      { name: '神户', englishName: 'Kobe', longitude: 135.1943, latitude: 34.6901, country: '日本', countryCode: 'JP', timezone: 'Asia/Tokyo' },
      { name: '名古屋', englishName: 'Nagoya', longitude: 136.9066, latitude: 35.1815, country: '日本', countryCode: 'JP', timezone: 'Asia/Tokyo' },
    ]
  },
  {
    name: '英国',
    englishName: 'United Kingdom',
    code: 'GB',
    cities: [
      { name: '伦敦', englishName: 'London', longitude: -0.1278, latitude: 51.5074, country: '英国', countryCode: 'GB', timezone: 'Europe/London' },
      { name: '曼彻斯特', englishName: 'Manchester', longitude: -2.2426, latitude: 53.4808, country: '英国', countryCode: 'GB', timezone: 'Europe/London' },
      { name: '利物浦', englishName: 'Liverpool', longitude: -2.9916, latitude: 53.4084, country: '英国', countryCode: 'GB', timezone: 'Europe/London' },
      { name: '爱丁堡', englishName: 'Edinburgh', longitude: -3.1883, latitude: 55.9533, country: '英国', countryCode: 'GB', timezone: 'Europe/London' },
      { name: '格拉斯哥', englishName: 'Glasgow', longitude: -4.2518, latitude: 55.8642, country: '英国', countryCode: 'GB', timezone: 'Europe/London' },
    ]
  },
  {
    name: '法国',
    englishName: 'France',
    code: 'FR',
    cities: [
      { name: '巴黎', englishName: 'Paris', longitude: 2.3522, latitude: 48.8566, country: '法国', countryCode: 'FR', timezone: 'Europe/Paris' },
      { name: '里昂', englishName: 'Lyon', longitude: 4.8357, latitude: 45.7640, country: '法国', countryCode: 'FR', timezone: 'Europe/Paris' },
      { name: '马赛', englishName: 'Marseille', longitude: 5.3698, latitude: 43.2965, country: '法国', countryCode: 'FR', timezone: 'Europe/Paris' },
      { name: '尼斯', englishName: 'Nice', longitude: 7.2620, latitude: 43.7102, country: '法国', countryCode: 'FR', timezone: 'Europe/Paris' },
    ]
  },
  {
    name: '德国',
    englishName: 'Germany',
    code: 'DE',
    cities: [
      { name: '柏林', englishName: 'Berlin', longitude: 13.4050, latitude: 52.5200, country: '德国', countryCode: 'DE', timezone: 'Europe/Berlin' },
      { name: '慕尼黑', englishName: 'Munich', longitude: 11.5820, latitude: 48.1351, country: '德国', countryCode: 'DE', timezone: 'Europe/Berlin' },
      { name: '汉堡', englishName: 'Hamburg', longitude: 9.9937, latitude: 53.5511, country: '德国', countryCode: 'DE', timezone: 'Europe/Berlin' },
      { name: '法兰克福', englishName: 'Frankfurt', longitude: 8.6821, latitude: 50.1109, country: '德国', countryCode: 'DE', timezone: 'Europe/Berlin' },
      { name: '科隆', englishName: 'Cologne', longitude: 6.9603, latitude: 50.9375, country: '德国', countryCode: 'DE', timezone: 'Europe/Berlin' },
    ]
  },
  {
    name: '澳大利亚',
    englishName: 'Australia',
    code: 'AU',
    cities: [
      { name: '悉尼', englishName: 'Sydney', longitude: 151.2093, latitude: -33.8688, country: '澳大利亚', countryCode: 'AU', timezone: 'Australia/Sydney' },
      { name: '墨尔本', englishName: 'Melbourne', longitude: 144.9631, latitude: -37.8136, country: '澳大利亚', countryCode: 'AU', timezone: 'Australia/Melbourne' },
      { name: '布里斯班', englishName: 'Brisbane', longitude: 153.0251, latitude: -27.4698, country: '澳大利亚', countryCode: 'AU', timezone: 'Australia/Brisbane' },
      { name: '珀斯', englishName: 'Perth', longitude: 115.8575, latitude: -31.9505, country: '澳大利亚', countryCode: 'AU', timezone: 'Australia/Perth' },
      { name: '阿德莱德', englishName: 'Adelaide', longitude: 138.6007, latitude: -34.9285, country: '澳大利亚', countryCode: 'AU', timezone: 'Australia/Adelaide' },
    ]
  },
  {
    name: '加拿大',
    englishName: 'Canada',
    code: 'CA',
    cities: [
      { name: '多伦多', englishName: 'Toronto', longitude: -79.3832, latitude: 43.6532, country: '加拿大', countryCode: 'CA', timezone: 'America/Toronto' },
      { name: '温哥华', englishName: 'Vancouver', longitude: -123.1207, latitude: 49.2827, country: '加拿大', countryCode: 'CA', timezone: 'America/Vancouver' },
      { name: '蒙特利尔', englishName: 'Montreal', longitude: -73.5674, latitude: 45.5017, country: '加拿大', countryCode: 'CA', timezone: 'America/Montreal' },
      { name: '卡尔加里', englishName: 'Calgary', longitude: -114.0719, latitude: 51.0447, country: '加拿大', countryCode: 'CA', timezone: 'America/Edmonton' },
      { name: '渥太华', englishName: 'Ottawa', longitude: -75.6972, latitude: 45.4215, country: '加拿大', countryCode: 'CA', timezone: 'America/Toronto' },
    ]
  },
  {
    name: '其他国家',
    englishName: 'Other Countries',
    code: 'OT',
    cities: [
      { name: '新加坡', englishName: 'Singapore', longitude: 103.8198, latitude: 1.3521, country: '新加坡', countryCode: 'SG', timezone: 'Asia/Singapore' },
      { name: '香港', englishName: 'Hong Kong', longitude: 114.1694, latitude: 22.3193, country: '中国香港', countryCode: 'HK', timezone: 'Asia/Hong_Kong' },
      { name: '台北', englishName: 'Taipei', longitude: 121.5654, latitude: 25.0330, country: '中国台湾', countryCode: 'TW', timezone: 'Asia/Taipei' },
      { name: '曼谷', englishName: 'Bangkok', longitude: 100.5018, latitude: 13.7563, country: '泰国', countryCode: 'TH', timezone: 'Asia/Bangkok' },
      { name: '首尔', englishName: 'Seoul', longitude: 126.9780, latitude: 37.5665, country: '韩国', countryCode: 'KR', timezone: 'Asia/Seoul' },
      { name: '迪拜', englishName: 'Dubai', longitude: 55.2708, latitude: 25.2048, country: '阿联酋', countryCode: 'AE', timezone: 'Asia/Dubai' },
      { name: '莫斯科', englishName: 'Moscow', longitude: 37.6173, latitude: 55.7558, country: '俄罗斯', countryCode: 'RU', timezone: 'Europe/Moscow' },
      { name: '阿姆斯特丹', englishName: 'Amsterdam', longitude: 4.9041, latitude: 52.3676, country: '荷兰', countryCode: 'NL', timezone: 'Europe/Amsterdam' },
      { name: '罗马', englishName: 'Rome', longitude: 12.4964, latitude: 41.9028, country: '意大利', countryCode: 'IT', timezone: 'Europe/Rome' },
      { name: '马德里', englishName: 'Madrid', longitude: -3.7038, latitude: 40.4168, country: '西班牙', countryCode: 'ES', timezone: 'Europe/Madrid' },
      { name: '开罗', englishName: 'Cairo', longitude: 31.2357, latitude: 30.0444, country: '埃及', countryCode: 'EG', timezone: 'Africa/Cairo' },
      { name: '约翰内斯堡', englishName: 'Johannesburg', longitude: 28.0473, latitude: -26.2041, country: '南非', countryCode: 'ZA', timezone: 'Africa/Johannesburg' },
      { name: '里约热内卢', englishName: 'Rio de Janeiro', longitude: -43.1729, latitude: -22.9068, country: '巴西', countryCode: 'BR', timezone: 'America/Sao_Paulo' },
      { name: '墨西哥城', englishName: 'Mexico City', longitude: -99.1332, latitude: 19.4326, country: '墨西哥', countryCode: 'MX', timezone: 'America/Mexico_City' },
    ]
  }
];

// 扁平化所有城市列表，方便搜索
export const allCities: City[] = countryGroups.reduce((acc, group) => {
  return [...acc, ...group.cities];
}, [] as City[]);

// 搜索城市函数
export const searchCities = (query: string): City[] => {
  if (!query || query.trim() === '') {
    return [];
  }
  
  const lowerQuery = query.toLowerCase().trim();
  
  return allCities.filter(city => 
    city.name.toLowerCase().includes(lowerQuery) || 
    city.englishName.toLowerCase().includes(lowerQuery) ||
    city.country.toLowerCase().includes(lowerQuery) ||
    city.countryCode.toLowerCase() === lowerQuery
  );
}; 