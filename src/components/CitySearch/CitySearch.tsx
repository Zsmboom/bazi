'use client';

import { useState, useEffect } from 'react';
import citiesData from 'cities.json' with { type: 'json' };

// 城市数据类型
export interface City {
  name: string;
  lat: string;
  lng: string;
  country: string;
  admin1: string;
  admin2: string;
}

interface CitySearchProps {
  onCitySelect: (city: City) => void;
  selectedCity: City | null;
  className?: string;
  placeholder?: string;
}

export default function CitySearch({ 
  onCitySelect, 
  selectedCity, 
  className = '', 
  placeholder = '搜索城市...' 
}: CitySearchProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCities, setFilteredCities] = useState<City[]>([]);

  // 初始默认城市：北京
  useEffect(() => {
    if (!selectedCity) {
      const defaultCity = (citiesData as City[]).find(city => 
        city.name === 'Beijing' && city.country === 'CN'
      );
      if (defaultCity) {
        onCitySelect(defaultCity);
      }
    }
  }, [selectedCity, onCitySelect]);

  // 处理城市搜索
  useEffect(() => {
    if (searchTerm.length < 2) {
      setFilteredCities([]);
      return;
    }

    const term = searchTerm.toLowerCase();
    const cities = (citiesData as City[])
      .filter(city => 
        city.name.toLowerCase().includes(term) || 
        city.country.toLowerCase().includes(term)
      )
      .slice(0, 100); // 限制结果数量，避免渲染过多
    
    setFilteredCities(cities);
  }, [searchTerm]);

  const handleCitySelect = (city: City) => {
    onCitySelect(city);
    setSearchTerm('');
    setFilteredCities([]);
  };

  return (
    <div className={`relative ${className}`}>
      <input
        type="text"
        placeholder={placeholder}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
      />
      
      {selectedCity && !searchTerm && (
        <div className="mt-2 p-2 border border-amber-200 dark:border-amber-800 rounded-md bg-amber-50 dark:bg-amber-900/20">
          <div className="text-sm font-medium">{selectedCity.name}, {selectedCity.country}</div>
        </div>
      )}
      
      {filteredCities.length > 0 && (
        <ul className="absolute z-10 mt-1 w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-lg max-h-60 overflow-auto">
          {filteredCities.map((city, index) => (
            <li 
              key={`${city.name}-${city.country}-${index}`}
              onClick={() => handleCitySelect(city)}
              className="px-3 py-2 hover:bg-amber-50 dark:hover:bg-amber-900/20 cursor-pointer"
            >
              <div className="text-sm font-medium">{city.name}, {city.country}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
