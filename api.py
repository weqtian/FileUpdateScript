# -*- coding:utf-8 _*_
"""
@Project    : FileUpdateScript
@File       : api.py 
@Author     : 晴天 
@CreateTime : 2024-04-12 下午11:48 
"""
from fastapi import FastAPI
from main import generate_project_version_info

app = FastAPI()


@app.get("/api/getProjectVersion", summary='获取项目版本信息')
async def get_project_version():
    """ 获取项目版本信息 """
    version_list = await generate_project_version_info()
    data = {"code": 200, "message": "OK", "data": version_list}
    return data


if __name__ == '__main__':
    import uvicorn
    uvicorn.run('api:app', host='0.0.0.0', port=8000, reload=True)
