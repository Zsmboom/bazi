/**
 * DeepSeek API 工具函数
 * 用于调用 DeepSeek API 进行八字排盘和命理分析
 */

// 八字排盘结果类型
export interface BaziChart {
  yearPillar: string;
  monthPillar: string;
  dayPillar: string;
  hourPillar: string;
  analysis: string;
  ganShen: {
    year: string;
    month: string;
    day: string;
    hour: string;
  };
  tianGan: {
    year: string;
    month: string;
    day: string;
    hour: string;
  };
  diZhi: {
    year: string;
    month: string;
    day: string;
    hour: string;
  };
  cangGan: {
    year: string[];
    month: string[];
    day: string[];
    hour: string[];
  };
  zhiShen: {
    year: string[];
    month: string[];
    day: string[];
    hour: string[];
  };
  naYin: {
    year: string;
    month: string;
    day: string;
    hour: string;
  };
  shenSha: {
    year: string[];
    month: string[];
    day: string[];
    hour: string[];
  };
  relations: {
    tianGan: string;
    diZhi: string;
  };
  lunarDate: {
    year: number;
    month: number;
    day: number;
    leap: boolean;
  };
  zodiac: string;
  recommendedNames: {
    name: string;
    pinyin: string;
    meaning: string;
  }[];
}

// 分析类型
export type AnalysisType = 'overall' | 'age25' | 'career' | 'marriage' | 'wealth' | 'health';

// 用户数据类型
export interface UserData {
  calendarType: string;
  birthYear: number;
  birthMonth: number;
  birthDay: number;
  birthHour: number;
  birthMinute: number;
  gender: string;
  location: string;
  longitude: number;
}

/**
 * 执行八字排盘
 * @param userData 用户数据
 * @returns 八字排盘结果
 */
export async function doBaziCalculation(userData: UserData): Promise<BaziChart> {
  try {
    console.log('开始八字排盘计算，用户数据:', {
      ...userData,
      // 排除敏感信息
      birthYear: undefined,
      birthMonth: undefined,
      birthDay: undefined
    });

    const response = await fetch('/api/deepseek', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        action: 'calculate',
        data: userData
      })
    });

    console.log('API 响应状态:', {
      status: response.status,
      statusText: response.statusText,
      headers: Object.fromEntries(response.headers.entries())
    });

    if (!response.ok) {
      let errorData;
      try {
        const errorText = await response.text();
        console.error('API 错误响应原始内容:', errorText);
        
        try {
          errorData = JSON.parse(errorText);
        } catch (parseError) {
          console.error('解析错误响应失败:', parseError);
          throw new Error(`API请求失败: ${response.status} - ${errorText}`);
        }
      } catch (error) {
        console.error('读取错误响应失败:', error);
        throw new Error(`API请求失败: ${response.status}`);
      }
      
      console.error('API 请求失败:', {
        status: response.status,
        statusText: response.statusText,
        errorData
      });
      
      throw new Error(`API请求错误：${response.status} - ${errorData.error || ''} ${errorData.details || ''}`);
    }

    let data;
    try {
      const rawText = await response.text();
      console.log('API 响应原始内容:', rawText);
      
      try {
        data = JSON.parse(rawText);
      } catch (parseError) {
        console.error('JSON 解析失败，原始响应:', rawText);
        throw new Error(`解析响应数据失败: ${parseError instanceof Error ? parseError.message : String(parseError)}`);
      }
    } catch (error) {
      console.error('读取响应内容失败:', error);
      throw new Error(`读取响应内容失败: ${error instanceof Error ? error.message : String(error)}`);
    }
    
    if (!data.chart) {
      console.error('响应数据中缺少 chart:', data);
      throw new Error('获取八字排盘结果失败: 响应数据中缺少 chart 字段');
    }

    return data.chart as BaziChart;
  } catch (error) {
    console.error('八字排盘失败:', error);
    throw new Error(`八字排盘失败: ${error instanceof Error ? error.message : String(error)}`);
  }
}

/**
 * 执行命理分析
 * @param baziChart 八字排盘结果
 * @param analysisType 分析类型
 * @returns 分析内容
 */
export async function doBaziAnalysis(baziChart: BaziChart, analysisType: AnalysisType): Promise<string> {
  try {
    const response = await fetch('/api/deepseek', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: 'analyze',
        data: {
          baziChart,
          analysisType
        }
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`API请求错误：${response.status} - ${errorData.error || JSON.stringify(errorData)}`);
    }

    const data = await response.json();
    
    if (!data.analysis) {
      throw new Error('获取分析结果失败');
    }

    return data.analysis;
  } catch (error) {
    console.error('命理分析失败:', error);
    throw new Error(`命理分析失败: ${error instanceof Error ? error.message : String(error)}`);
  }
} 