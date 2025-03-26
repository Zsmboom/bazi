import { City } from './cityData';
import countriesList from './countriesData';

// 这个接口扩展了City接口，添加了一些额外的字段
export interface ExtendedCity extends City {
  id?: string;           // 城市ID
  population?: number;  // 人口数量
  region?: string;      // 地区/省份
  altitude?: number;    // 海拔高度
}

// 创建一个加载城市数据的函数，支持懒加载以提高性能
let cachedCityData: ExtendedCity[] | null = null;

// 根据提供的城市名称和可选的国家代码查找城市
export async function findCityByName(
  cityName: string, 
  countryCode?: string
): Promise<ExtendedCity | null> {
  // 返回与提供的城市名称和可选国家代码匹配的第一个城市
  // 这个实现使用本地缓存的城市数据，但也可以改为API调用
  const cities = await searchCities(cityName, countryCode);
  return cities.length > 0 ? cities[0] : null;
}

// 搜索城市函数，支持模糊搜索
export async function searchCities(
  query: string, 
  countryCode?: string, 
  limit: number = 10
): Promise<ExtendedCity[]> {
  if (!query || query.trim() === '') {
    return [];
  }

  // 获取城市数据
  const cityData = await getOrLoadCityData();
  
  const lowerQuery = query.toLowerCase().trim();
  
  // 过滤城市数据
  let filteredCities = cityData.filter(city => 
    (city.name.toLowerCase().includes(lowerQuery) || 
     city.englishName.toLowerCase().includes(lowerQuery) ||
     city.country.toLowerCase().includes(lowerQuery)) &&
    (!countryCode || city.countryCode === countryCode)
  );
  
  // 返回限制数量的城市
  return filteredCities.slice(0, limit);
}

// 根据经纬度查找最近的城市
export async function findNearestCity(
  latitude: number, 
  longitude: number
): Promise<ExtendedCity | null> {
  const cityData = await getOrLoadCityData();
  
  let nearestCity: ExtendedCity | null = null;
  let minDistance = Number.MAX_VALUE;
  
  for (const city of cityData) {
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

// 获取或加载城市数据
async function getOrLoadCityData(): Promise<ExtendedCity[]> {
  // 如果城市数据已缓存，则直接返回
  if (cachedCityData) {
    return cachedCityData;
  }

  // 否则加载数据
  // 这里我们使用来自cityData.ts的预定义数据
  // 但在真实场景中，可能会从API或文件加载
  // 为了简化，我们在这里返回预定义的数据
  try {
    const { allCities } = await import('./cityData');
    cachedCityData = allCities as ExtendedCity[];
    return cachedCityData;
  } catch (error) {
    console.error("Error loading city data:", error);
    return [];
  }
}

// 根据国家代码获取该国所有城市
export async function getCitiesByCountry(countryCode: string): Promise<ExtendedCity[]> {
  const cityData = await getOrLoadCityData();
  return cityData.filter(city => city.countryCode === countryCode);
}

// 根据地区/省份获取城市
export async function getCitiesByRegion(
  countryCode: string, 
  region: string
): Promise<ExtendedCity[]> {
  const cityData = await getOrLoadCityData();
  return cityData.filter(
    city => city.countryCode === countryCode && 
            city.region && 
            city.region.toLowerCase().includes(region.toLowerCase())
  );
}

// 获取所有可用的国家
export async function getAllCountries(): Promise<{code: string, name: string}[]> {
  return countriesList;
}

// 获取特定国家最受欢迎的城市
export async function getPopularCities(
  countryCode?: string, 
  limit: number = 5
): Promise<ExtendedCity[]> {
  const cityData = await getOrLoadCityData();
  
  // 根据人口数量排序（如果有），否则按字母顺序排序
  let sortedCities = [...cityData]
    .filter(city => !countryCode || city.countryCode === countryCode)
    .sort((a, b) => {
      // 如果有人口数据，则按人口数量降序排序
      if (a.population && b.population) {
        return b.population - a.population;
      }
      // 否则按城市名称的字母顺序排序
      return a.englishName.localeCompare(b.englishName);
    });
  
  return sortedCities.slice(0, limit);
}

// 导出默认函数以实现更简洁的导入语法
export default {
  searchCities,
  findCityByName,
  findNearestCity,
  getCitiesByCountry,
  getCitiesByRegion,
  getAllCountries,
  getPopularCities
}; 