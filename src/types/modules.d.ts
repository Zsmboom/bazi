// 为缺少类型声明的库添加声明

declare module 'suncalc' {
  export interface Times {
    solarNoon: Date;
    nadir: Date;
    sunrise: Date;
    sunset: Date;
    // 其他属性...
  }
  
  export function getTimes(date: Date, latitude: number, longitude: number): Times;
  // 其他函数...
}

declare module 'chinese-lunar-calendar' {
  export interface LunarDate {
    lunarYear: number;
    lunarMonth: number;
    lunarDay: number;
    // 其他可能的属性
  }
  
  export function solarToLunar(year: number, month: number, day: number): LunarDate;
  // 其他可能的函数
} 