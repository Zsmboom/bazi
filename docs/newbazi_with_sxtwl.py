import datetime
import sys
import json
from typing import Dict
import sxtwl  # 直接导入整个sxtwl模块

TIANGAN = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"]
DIZHI = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"]

def ganzhi_by_index(i):
    return TIANGAN[i % 10] + DIZHI[i % 12]

def get_shichen(hour, minute):
    total = hour * 60 + minute
    for i, zhi in enumerate(DIZHI):
        start = (i * 2 % 24) * 60
        end = ((i * 2 + 2) % 24) * 60
        if start < end:
            if start <= total < end:
                return zhi
        else:
            if total >= start or total < end:
                return zhi
    return "子"

def get_hour_ganzhi(day_gan, hour_zhi):
    base = {
        '甲': 0, '己': 0, '乙': 2, '庚': 2, '丙': 4, '辛': 4,
        '丁': 6, '壬': 6, '戊': 8, '癸': 8
    }
    index = DIZHI.index(hour_zhi)
    return TIANGAN[(base[day_gan] + index) % 10] + DIZHI[index]

def get_solar_terms(year):
    lunar = sxtwl.Lunar()  # 使用正确的模块引用方式
    terms = {}
    for i in range(24):
        jd = lunar.getJieQiJD(year, i)
        dt = lunar.JD2DD(jd)
        name = lunar.getJieQiName(i)
        terms[name] = dt
    return terms

def determine_lunar_month(dt, solar_terms):
    ranges = [
        ("立春", "惊蛰", 1), ("惊蛰", "清明", 2), ("清明", "立夏", 3),
        ("立夏", "芒种", 4), ("芒种", "小暑", 5), ("小暑", "立秋", 6),
        ("立秋", "白露", 7), ("白露", "寒露", 8), ("寒露", "立冬", 9),
        ("立冬", "大雪", 10), ("大雪", "小寒", 11), ("小寒", "立春", 12)
    ]
    for start, end, month_number in ranges:
        if solar_terms[start] <= dt < solar_terms[end]:
            return month_number
    return 12

def get_month_ganzhi_named(year_gan, month_number):
    named_start_gan_map = {
        '甲': '丙', '己': '丙',
        '乙': '戊', '庚': '戊',
        '丙': '庚', '辛': '庚',
        '丁': '壬', '壬': '壬',
        '戊': '甲', '癸': '甲'
    }
    start_gan = named_start_gan_map[year_gan]
    gan_index = (TIANGAN.index(start_gan) + month_number - 1) % 10
    zhi_index = (2 + month_number - 1) % 12
    return TIANGAN[gan_index] + DIZHI[zhi_index]

def calculate_bazi(dt: datetime.datetime, longitude: float) -> Dict[str, str]:
    # 真太阳时校正（简化版本）
    local_minutes = longitude * 4
    delta = datetime.timedelta(minutes=local_minutes - 120 * 4)
    true_dt = dt + delta

    solar_terms = get_solar_terms(dt.year)
    year = dt.year if dt >= solar_terms["立春"] else dt.year - 1
    year_gz = ganzhi_by_index((year - 1864) % 60)

    lunar_month = determine_lunar_month(dt, solar_terms)
    month_gz = get_month_ganzhi_named(year_gz[0], lunar_month)

    base_date = datetime.datetime(1900, 1, 1)
    day_index = (dt - base_date).days + 10
    day_gz = ganzhi_by_index(day_index % 60)

    shichen = get_shichen(true_dt.hour, true_dt.minute)
    hour_gz = get_hour_ganzhi(day_gz[0], shichen)

    return {
        "年柱": year_gz,
        "月柱": month_gz,
        "日柱": day_gz,
        "时柱": hour_gz,
        "真太阳时": true_dt.strftime("%Y-%m-%d %H:%M"),
        "时支": shichen
    }

def get_wuxing(gan_or_zhi):
    wuxing_map = {
        '甲': '木', '乙': '木',
        '丙': '火', '丁': '火',
        '戊': '土', '己': '土',
        '庚': '金', '辛': '金',
        '壬': '水', '癸': '水',
        '寅': '木', '卯': '木',
        '巳': '火', '午': '火',
        '辰': '土', '丑': '土', '未': '土', '戌': '土',
        '申': '金', '酉': '金',
        '亥': '水', '子': '水'
    }
    return wuxing_map.get(gan_or_zhi, '未知')

def get_relations(day_gan, gan_or_zhi):
    # 简化版本，仅示例
    wuxing_day = get_wuxing(day_gan)
    wuxing_target = get_wuxing(gan_or_zhi)
    
    if wuxing_day == wuxing_target:
        return '比肩'
    
    # 五行相生关系：木生火，火生土，土生金，金生水，水生木
    sheng_relations = {'木': '火', '火': '土', '土': '金', '金': '水', '水': '木'}
    if sheng_relations.get(wuxing_day) == wuxing_target:
        return '食神'
    if sheng_relations.get(wuxing_target) == wuxing_day:
        return '正印'
    
    # 五行相克关系：木克土，土克水，水克火，火克金，金克木
    ke_relations = {'木': '土', '土': '水', '水': '火', '火': '金', '金': '木'}
    if ke_relations.get(wuxing_day) == wuxing_target:
        return '正官'
    if ke_relations.get(wuxing_target) == wuxing_day:
        return '正财'
    
    return '未知'

def format_for_sxtwl_api(bazi_result):
    """格式化八字结果为适合API返回的格式"""
    # 分解四柱
    year_gz = bazi_result["年柱"]
    month_gz = bazi_result["月柱"]
    day_gz = bazi_result["日柱"]
    hour_gz = bazi_result["时柱"]
    
    # 提取天干和地支
    year_gan, year_zhi = year_gz[0], year_gz[1]
    month_gan, month_zhi = month_gz[0], month_gz[1]
    day_gan, day_zhi = day_gz[0], day_gz[1]
    hour_gan, hour_zhi = hour_gz[0], hour_gz[1]
    
    # 计算五行关系
    result = {
        "sxtwl_result": {
            "yearPillar": year_gz,
            "monthPillar": month_gz,
            "dayPillar": day_gz,
            "hourPillar": hour_gz,
            "trueSolarTime": bazi_result["真太阳时"],
            "hourBranch": bazi_result["时支"],
            "tianGan": {
                "year": year_gan,
                "month": month_gan,
                "day": day_gan,
                "hour": hour_gan
            },
            "diZhi": {
                "year": year_zhi,
                "month": month_zhi,
                "day": day_zhi,
                "hour": hour_zhi
            },
            "wuXing": {
                "year": get_wuxing(year_gan),
                "month": get_wuxing(month_gan),
                "day": get_wuxing(day_gan),
                "hour": get_wuxing(hour_gan)
            },
            "relations": {
                "year": get_relations(day_gan, year_gan),
                "month": get_relations(day_gan, month_gan),
                "day": "日主",
                "hour": get_relations(day_gan, hour_gan)
            }
        }
    }
    
    return result

# 处理命令行参数
if __name__ == "__main__":
    if len(sys.argv) < 3:
        print(json.dumps({"error": "缺少必要参数！需要ISO格式的日期时间和经度值"}))
        sys.exit(1)
    
    try:
        # 解析ISO日期时间字符串
        iso_datetime = sys.argv[1]
        dt = datetime.datetime.fromisoformat(iso_datetime.replace('Z', '+00:00'))
        
        # 解析经度
        longitude = float(sys.argv[2])
        
        # 计算八字
        bazi_result = calculate_bazi(dt, longitude)
        
        # 格式化结果
        formatted_result = format_for_sxtwl_api(bazi_result)
        
        # 输出JSON格式结果
        print(json.dumps(formatted_result, ensure_ascii=False))
        
    except Exception as e:
        print(json.dumps({"error": f"计算错误: {str(e)}"}))
        sys.exit(1)
