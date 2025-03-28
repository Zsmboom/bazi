from http.server import BaseHTTPRequestHandler
import json
import datetime
import os
import sys

# 添加当前目录到Python路径
current_dir = os.path.dirname(os.path.abspath(__file__))
sys.path.append(current_dir)

from bazi_with_sxtwl import calculate_bazi

class handler(BaseHTTPRequestHandler):
    def do_POST(self):
        try:
            # 获取请求体长度
            content_length = int(self.headers.get('Content-Length', 0))
            # 读取请求体
            body = self.rfile.read(content_length)
            # 解析JSON
            data = json.loads(body.decode('utf-8'))
            user_data = data.get('userData', {})
            
            # 验证必要的数据
            required_fields = ['birthYear', 'birthMonth', 'birthDay', 'birthHour', 'birthMinute', 'longitude']
            for field in required_fields:
                if field not in user_data:
                    self._send_response(400, {
                        'error': f'缺少必要字段: {field}'
                    })
                    return
            
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
            self._send_response(200, {
                'chart': {
                    **result,
                    'source': 'sxtwl'
                }
            })
            
        except Exception as e:
            self._send_response(500, {
                'error': '八字计算失败',
                'details': str(e)
            })
    
    def do_OPTIONS(self):
        self._send_cors_headers()
        self.send_response(200)
        self.end_headers()
    
    def _send_cors_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.send_header('Access-Control-Max-Age', '86400')
    
    def _send_response(self, status_code, data):
        self.send_response(status_code)
        self.send_header('Content-type', 'application/json')
        self._send_cors_headers()
        self.end_headers()
        response = json.dumps(data, ensure_ascii=False).encode('utf-8')
        self.wfile.write(response) 