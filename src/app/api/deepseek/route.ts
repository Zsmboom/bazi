import { NextRequest, NextResponse } from 'next/server';

// 允许的分析类型
const ALLOWED_TYPES = ['overall', 'age25', 'career', 'marriage', 'wealth', 'health'];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, data } = body;

    // 获取环境变量
    const apiUrl = process.env.NEXT_PUBLIC_DEEPSEEK_API_URL || 'https://api.siliconflow.cn/v1/chat/completions';
    const apiKey = process.env.DEEPSEEK_API_KEY;
    const model = process.env.DEEPSEEK_MODEL || 'deepseek-ai/DeepSeek-V3';

    if (!apiKey) {
      return NextResponse.json({ error: 'API密钥未配置' }, { status: 500 });
    }

    let messages: any[] = [];

    // 根据不同的操作类型生成不同的消息
    if (action === 'calculate') {
      const { calendarType, birthYear, birthMonth, birthDay, birthHour, birthMinute, gender, location, longitude } = data;
      
      // 验证必要的数据
      if (!birthYear || !birthMonth || !birthDay || !gender || !location) {
        return NextResponse.json({ error: '数据不完整' }, { status: 400 });
      }

      const calendarTypeText = calendarType === 'solar' ? '阳历/公历' : '阴历/农历';
      const genderText = gender === 'male' ? '男' : '女';

      const prompt = `请根据以下出生信息进行八字排盘：
- 历法：${calendarTypeText}
- 出生日期：${birthYear}年${birthMonth}月${birthDay}日
- 出生时间：${birthHour}时${birthMinute}分
- 性别：${genderText}
- 出生地点：${location}，经度：${longitude}度

请提供完整的八字排盘结果，包括年柱、月柱、日柱、时柱的天干地支，并给出基础命理分析。
结果请使用以下JSON格式返回（不要有其他内容，只返回JSON）：
{
  "yearPillar": "年柱天干地支，如：甲子",
  "monthPillar": "月柱天干地支，如：乙丑",
  "dayPillar": "日柱天干地支，如：丙寅",
  "hourPillar": "时柱天干地支，如：丁卯",
  "analysis": "基础命理分析"
}`;
      
      messages = [
        { role: 'system', content: '你是一位精通中国传统命理学的资深专家，尤其擅长八字排盘和命理分析。请按照用户要求提供准确的命理解读。' },
        { role: 'user', content: prompt }
      ];
    } 
    else if (action === 'analyze') {
      const { baziChart, analysisType } = data;
      
      // 验证必要的数据
      if (!baziChart || !baziChart.yearPillar || !baziChart.monthPillar || !baziChart.dayPillar || !baziChart.hourPillar) {
        return NextResponse.json({ error: '八字信息不完整' }, { status: 400 });
      }

      if (!analysisType || !ALLOWED_TYPES.includes(analysisType)) {
        return NextResponse.json({ error: '分析类型无效' }, { status: 400 });
      }

      const bazi = `${baziChart.yearPillar} ${baziChart.monthPillar} ${baziChart.dayPillar} ${baziChart.hourPillar}`;
      
      let prompt = `基于以下八字命盘：${bazi}\n\n`;
      
      switch (analysisType) {
        case 'overall':
          prompt += '请提供详细的命理整体分析，包括性格特点、人生起伏、吉凶运势等，不少于1500字。';
          break;
        case 'age25':
          prompt += '请专门针对25岁这一年的运势进行详细分析，包括事业、健康、感情等各方面运势，不少于1200字。';
          break;
        case 'career':
          prompt += '请详细分析事业运势，包括适合的职业方向、事业发展机遇与挑战、升迁机会、创业建议等，不少于1200字。';
          break;
        case 'marriage':
          prompt += '请详细分析婚姻与感情运势，包括感情特点、桃花运、婚姻质量、适合的伴侣类型等，不少于1200字。';
          break;
        case 'wealth':
          prompt += '请详细分析财运情况，包括财富来源、理财建议、投资机会、破财风险等，不少于1200字。';
          break;
        case 'health':
          prompt += '请详细分析健康状况，包括体质特点、易患疾病、养生建议等，不少于1200字。';
          break;
      }
      
      messages = [
        { role: 'system', content: '你是一位精通中国传统命理学的资深专家，尤其擅长八字命理分析。请按照用户要求提供专业、详细、准确的命理解读。' },
        { role: 'user', content: prompt }
      ];
    } 
    else {
      return NextResponse.json({ error: '不支持的操作类型' }, { status: 400 });
    }

    // 调用 DeepSeek API
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: model,
        messages: messages,
        temperature: 0.7,
        max_tokens: 4000
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { error: `DeepSeek API 错误：${response.status}`, details: errorData }, 
        { status: response.status }
      );
    }

    const result = await response.json();
    
    // 如果是排盘操作，尝试从返回内容中提取 JSON
    if (action === 'calculate') {
      const content = result.choices[0].message.content;
      try {
        const jsonMatch = content.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          const chart = JSON.parse(jsonMatch[0]);
          return NextResponse.json({ chart });
        } else {
          return NextResponse.json({ error: '无法从响应中提取八字数据' }, { status: 500 });
        }
      } catch (parseError) {
        return NextResponse.json({ error: '解析八字数据失败', details: parseError }, { status: 500 });
      }
    } else {
      // 分析操作直接返回内容
      return NextResponse.json({ analysis: result.choices[0].message.content });
    }
  } catch (error) {
    console.error('处理请求错误:', error);
    return NextResponse.json(
      { error: '服务器处理请求出错', details: error instanceof Error ? error.message : String(error) }, 
      { status: 500 }
    );
  }
} 