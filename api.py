# -*- coding:utf-8 _*_
"""
@Project    : FileUpdateScript
@File       : api.py 
@Author     : 晴天 
@CreateTime : 2024-04-12 下午11:48 
"""
import socket
import uvicorn
from fastapi import FastAPI
from main import generate_project_version_info

app = FastAPI()


def get_lan_ip():
    s = None  # 初始化s为None
    try:
        # 创建一个socket对象
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        # 不需要连接到任何特定的目标，仅用于获取IP
        s.connect(('8.8.8.8', 80))
        # 获取本地接口的IP地址
        ip = s.getsockname()[0]
    except Exception as e:
        print(f"Error: {e}")
        ip = '127.0.0.1'
    finally:
        # 确保如果socket创建了，则关闭它
        if s:
            s.close()
    return ip


@app.get("/api/getVersionInfo", summary='获取项目版本信息')
async def get_project_version():
    """ 获取项目版本信息 """
    version_list = await generate_project_version_info()
    data = {"code": 200, "message": "OK", "project_number": len(version_list), "data": version_list}
    return data


if __name__ == '__main__':
    # 启动API
    uvicorn.run('api:app', host='0.0.0.0', port=8080, reload=True)
