// DeepSeek API TypeScript声明

export interface DeepSeekMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface DeepSeekChoice {
  message: {
    content: string;
    role: string;
  };
  index: number;
  finish_reason: string;
}

export interface DeepSeekResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: DeepSeekChoice[];
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

// BaZi 数据接口
export interface DeepSeekPillar {
  stem: string;
  branch: string;
  stemChinese: string;
  branchChinese: string;
  element: string;
}

export interface DeepSeekBaziData {
  yearPillar: DeepSeekPillar;
  monthPillar: DeepSeekPillar;
  dayPillar: DeepSeekPillar;
  hourPillar: DeepSeekPillar;
  solarTime: {
    hour: number;
    minute: number;
  };
  lunarDate: {
    year: number;
    month: number;
    day: number;
  };
  dayMaster: string;
  luckyElement: string;
  unluckyElement: string;
} 