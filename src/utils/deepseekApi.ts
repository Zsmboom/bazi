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
}

// 分析类型
export type AnalysisType = 'overall' | 'age25' | 'career' | 'marriage' | 'wealth' | 'health';

// 用户数据类型
interface UserData {
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
    const response = await fetch('/api/deepseek', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: 'calculate',
        data: userData
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`API请求错误：${response.status} - ${errorData.error || JSON.stringify(errorData)}`);
    }

    const data = await response.json();
    
    if (!data.chart) {
      throw new Error('获取八字排盘结果失败');
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