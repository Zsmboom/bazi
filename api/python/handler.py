import json
import datetime
import os
import sys

# 添加当前目录到Python路径
current_dir = os.path.dirname(os.path.abspath(__file__))
sys.path.append(current_dir)

from bazi_with_sxtwl import calculate_bazi

def handler(event, context):
    try:
        # 解析请求体
        body = json.loads(event.get('body', '{}'))
        user_data = body.get('userData', {})
        
        # 验证必要的数据
        required_fields = ['birthYear', 'birthMonth', 'birthDay', 'birthHour', 'birthMinute', 'longitude']
        for field in required_fields:
            if field not in user_data:
                return {
                    'statusCode': 400,
                    'body': json.dumps({
                        'error': f'缺少必要字段: {field}'
                    }, ensure_ascii=False)
                }
        
        # 创建日期时间对象
        birth_time = datetime.datetime(
            year=user_data['birthYear'],
            month=user_data['birthMonth'],
            day=user_data['birthDay'],
            hour=user_data['birthHour'],
            minute=user_data['birthMinute']
        )
        
        # 计算八字
        result = calculate_bazi(birth_time, user_data['longitude'])
        
        # 返回结果
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'POST'
            },
            'body': json.dumps({
                'chart': {
                    **result,
                    'source': 'sxtwl'
                }
            }, ensure_ascii=False)
        }
        
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'POST'
            },
            'body': json.dumps({
                'error': '八字计算失败',
                'details': str(e)
            }, ensure_ascii=False)
        } 