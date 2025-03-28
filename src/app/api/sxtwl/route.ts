import { NextRequest, NextResponse } from 'next/server';
import { exec } from 'child_process';
import { promisify } from 'util';
import * as path from 'path';

const execAsync = promisify(exec);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userData } = body;
    
    // 验证必要的数据
    if (!userData || !userData.birthYear || !userData.birthMonth || !userData.birthDay) {
      return NextResponse.json({ error: '数据不完整' }, { status: 400 });
    }
    
    console.log('收到八字计算请求:', {
      ...userData,
      birthYear: undefined, // 敏感信息不记录
      birthMonth: undefined,
      birthDay: undefined
    });
    
    // 在Vercel环境中，Python文件位于api/python目录下
    const scriptContent = `
import datetime
import json
import sys
sys.path.append('${path.join(process.cwd(), 'src', 'app', 'api', 'python')}')
from bazi_with_sxtwl import calculate_bazi

# 用户输入数据
birth_time = datetime.datetime(
    year=${userData.birthYear}, 
    month=${userData.birthMonth}, 
    day=${userData.birthDay}, 
    hour=${userData.birthHour}, 
    minute=${userData.birthMinute}
)

# 经度
longitude = ${userData.longitude}

# 计算八字
result = calculate_bazi(birth_time, longitude)

# 转换为JSON并输出
print(json.dumps(result, ensure_ascii=False))
`;
    
    // 执行Python脚本
    const { stdout, stderr } = await execAsync(`python3 -c "${scriptContent}"`);
    
    if (stderr && stderr.trim()) {
      console.error('Python脚本执行错误:', stderr);
      return NextResponse.json({ error: '八字计算失败' }, { status: 500 });
    }
    
    // 解析Python返回的JSON结果
    try {
      const result = JSON.parse(stdout);
      
      // 直接将Python返回的结果作为八字图表返回
      const baziChart = {
        ...result,
        source: 'sxtwl'
      };
      
      return NextResponse.json({ chart: baziChart });
    } catch (error) {
      console.error('结果解析失败:', error, '原始输出:', stdout);
      return NextResponse.json({ error: '结果解析失败' }, { status: 500 });
    }
  } catch (error) {
    console.error('八字计算失败:', error);
    return NextResponse.json({ 
      error: '八字计算服务出错', 
      details: error instanceof Error ? error.message : String(error) 
    }, { status: 500 });
  }
} 