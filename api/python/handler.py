from http.server import BaseHTTPRequestHandler
import json
import datetime
from bazi_with_sxtwl import calculate_bazi

class handler(BaseHTTPRequestHandler):
    def do_POST(self):
        content_length = int(self.headers['Content-Length'])
        post_data = self.rfile.read(content_length)
        data = json.loads(post_data.decode('utf-8'))
        
        try:
            user_data = data.get('userData', {})
            
            # 验证必要的数据
            required_fields = ['birthYear', 'birthMonth', 'birthDay', 'birthHour', 'birthMinute', 'longitude']
            for field in required_fields:
                if field not in user_data:
                    raise ValueError(f'缺少必要字段: {field}')
            
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
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            
            response_data = {
                'chart': {
                    **result,
                    'source': 'sxtwl'
                }
            }
            
            self.wfile.write(json.dumps(response_data, ensure_ascii=False).encode('utf-8'))
            
        except Exception as e:
            self.send_response(500)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            
            error_response = {
                'error': '八字计算失败',
                'details': str(e)
            }
            
            self.wfile.write(json.dumps(error_response, ensure_ascii=False).encode('utf-8')) 