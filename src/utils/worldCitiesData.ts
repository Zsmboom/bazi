import { parse } from 'csv-parse/sync';
import { Country } from './countriesData';
import countriesList from './countriesData';

// 定义城市信息接口
export interface WorldCity {
  id: string;
  country: string;
  city: string;
  latitude: number;
  longitude: number;
  altitude: number;
  countryCode?: string;  // 可选，使用ISO国家代码
  chineseName?: string;  // 城市中文名（可选）
}

// 默认城市数据（主要城市），以防CSV加载失败
const defaultCities: WorldCity[] = [
  { id: "1", country: "China", city: "Beijing", latitude: 39.9042, longitude: 116.4074, altitude: 44, countryCode: "CN", chineseName: "北京" },
  { id: "2", country: "China", city: "Shanghai", latitude: 31.2304, longitude: 121.4737, altitude: 4, countryCode: "CN", chineseName: "上海" },
  { id: "3", country: "China", city: "Guangzhou", latitude: 23.1291, longitude: 113.2644, altitude: 21, countryCode: "CN", chineseName: "广州" },
  { id: "4", country: "United States", city: "New York", latitude: 40.7128, longitude: -74.0060, altitude: 10, countryCode: "US", chineseName: "纽约" },
  { id: "5", country: "United States", city: "Los Angeles", latitude: 34.0522, longitude: -118.2437, altitude: 93, countryCode: "US", chineseName: "洛杉矶" },
  { id: "6", country: "United Kingdom", city: "London", latitude: 51.5074, longitude: -0.1278, altitude: 11, countryCode: "GB", chineseName: "伦敦" },
  { id: "7", country: "Japan", city: "Tokyo", latitude: 35.6762, longitude: 139.6503, altitude: 40, countryCode: "JP", chineseName: "东京" },
  { id: "8", country: "France", city: "Paris", latitude: 48.8566, longitude: 2.3522, altitude: 35, countryCode: "FR", chineseName: "巴黎" },
  { id: "9", country: "Australia", city: "Sydney", latitude: -33.8688, longitude: 151.2093, altitude: 3, countryCode: "AU", chineseName: "悉尼" },
  { id: "10", country: "Canada", city: "Toronto", latitude: 43.6532, longitude: -79.3832, altitude: 76, countryCode: "CA", chineseName: "多伦多" },
];

// 城市数据缓存
let cityCache: WorldCity[] | null = null;

// 国家代码映射 (例如: "Afghanistan" => "AF")
const countryNameToCode: Record<string, string> = {};
const countryNameToChinese: Record<string, string> = {};

// 初始化国家代码映射
function initCountryMappings() {
  countriesList.forEach(country => {
    countryNameToCode[country.name.toLowerCase()] = country.code;
    countryNameToChinese[country.name.toLowerCase()] = country.chineseName;
  });
}

// 加载世界城市数据
export async function loadWorldCities(): Promise<WorldCity[]> {
  if (cityCache) {
    return cityCache;
  }

  try {
    // 初始化国家代码映射
    initCountryMappings();

    // 从公共目录获取CSV数据
    const response = await fetch('/data/worldCities.csv');
    if (!response.ok) {
      console.warn(`使用默认城市数据: ${response.status} ${response.statusText}`);
      cityCache = defaultCities;
      return defaultCities;
    }
    
    const csvContent = await response.text();
    
    // 解析CSV
    const records = parse(csvContent, {
      columns: false, 
      delimiter: ';',
      skip_empty_lines: true
    });

    // 转换为城市对象
    const cities: WorldCity[] = records.map((record: string[]) => {
      // 去除记录中每个值两端的引号
      const cleanRecord = record.map(item => item.replace(/^"|"$/g, ''));
      
      // 提取各个字段
      const [id, country, city, latitude, longitude, altitude] = cleanRecord;
      
      // 查找国家代码
      const countryLower = country.toLowerCase();
      const countryCode = countryNameToCode[countryLower] || '';
      const chineseName = countryNameToChinese[countryLower] || '';
      
      return {
        id,
        country,
        city,
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
        altitude: parseFloat(altitude),
        countryCode,
        chineseName
      };
    });

    // 缓存并返回
    cityCache = cities;
    return cities;
  } catch (error) {
    console.error('Error loading world cities data:', error);
    console.warn('使用默认城市数据');
    cityCache = defaultCities;
    return defaultCities;
  }
}

// 按城市名称搜索
export async function searchCitiesByName(
  query: string, 
  limit: number = 10
): Promise<WorldCity[]> {
  if (!query || query.trim() === '') {
    return [];
  }

  const cities = await loadWorldCities();
  const lowerQuery = query.toLowerCase().trim();
  
  // 过滤城市
  const filteredCities = cities.filter(city => 
    city.city.toLowerCase().includes(lowerQuery) ||
    (city.chineseName && city.chineseName.includes(lowerQuery))
  );
  
  return filteredCities.slice(0, limit);
}

// 按国家代码获取城市
export async function getCitiesByCountry(
  countryCode: string,
  limit: number = 100
): Promise<WorldCity[]> {
  const cities = await loadWorldCities();
  
  // 当国家代码为空或无效时，返回空数组
  if (!countryCode) {
    return [];
  }
  
  // 过滤出指定国家的城市
  const countryCities = cities.filter(city => city.countryCode === countryCode);
  
  // 如果没有找到该国家的城市，返回默认城市中该国家的城市（如果有）
  if (countryCities.length === 0) {
    const defaultCountryCities = defaultCities.filter(city => city.countryCode === countryCode);
    return defaultCountryCities.slice(0, limit);
  }
  
  return countryCities.slice(0, limit);
}

// 获取所有可用的国家
export async function getAvailableCountries(): Promise<Country[]> {
  try {
    const cities = await loadWorldCities();
    const countryCodes = new Set<string>();
    
    // 收集所有城市中的国家代码
    cities.forEach(city => {
      if (city.countryCode) {
        countryCodes.add(city.countryCode);
      }
    });
    
    // 从国家列表中过滤出有城市数据的国家
    const availableCountries = countriesList.filter(country => countryCodes.has(country.code));
    
    // 如果没有可用国家（CSV加载失败），则返回默认城市中的国家
    if (availableCountries.length === 0) {
      const defaultCountryCodes = new Set<string>();
      defaultCities.forEach(city => {
        if (city.countryCode) {
          defaultCountryCodes.add(city.countryCode);
        }
      });
      return countriesList.filter(country => defaultCountryCodes.has(country.code));
    }
    
    return availableCountries;
  } catch (error) {
    console.error('Error getting available countries:', error);
    
    // 返回默认城市中的国家
    const defaultCountryCodes = new Set<string>();
    defaultCities.forEach(city => {
      if (city.countryCode) {
        defaultCountryCodes.add(city.countryCode);
      }
    });
    return countriesList.filter(country => defaultCountryCodes.has(country.code));
  }
}

// 根据经纬度查找最近的城市
export async function findNearestCity(
  latitude: number, 
  longitude: number
): Promise<WorldCity | null> {
  const cities = await loadWorldCities();
  
  if (cities.length === 0) {
    return null;
  }
  
  let nearestCity: WorldCity | null = null;
  let minDistance = Number.MAX_VALUE;
  
  for (const city of cities) {
    const distance = calculateDistance(
      latitude, 
      longitude, 
      city.latitude, 
      city.longitude
    );
    
    if (distance < minDistance) {
      minDistance = distance;
      nearestCity = city;
    }
  }
  
  return nearestCity;
}

// 计算两点之间的距离（使用Haversine公式）
function calculateDistance(
  lat1: number, 
  lon1: number, 
  lat2: number, 
  lon2: number
): number {
  const R = 6371; // 地球半径（公里）
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);
  
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) * 
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  
  return distance;
}

// 角度转弧度
function toRadians(degrees: number): number {
  return degrees * (Math.PI / 180);
}

// 导出默认函数以实现更简洁的导入语法
export default {
  loadWorldCities,
  searchCitiesByName,
  getCitiesByCountry,
  getAvailableCountries,
  findNearestCity
}; 