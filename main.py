# -*- coding:utf-8 _*_
"""
@Project    : FileUpdateScript
@File       : main.py 
@Author     : 晴天 
@CreateTime : 2024-04-12 下午3:48 
"""
import asyncio
import os
import json
import hashlib

DOMAIN = 'https://cdn.wocute.com'
BASE_DIR = os.path.dirname(os.path.abspath(__file__))  # 基础路径


def generate_file_md5(filename):
    """ 生成文件MD5 """
    hash_md5 = hashlib.md5()
    with open(filename, "rb") as f:
        for chunk in iter(lambda: f.read(4096), b""):
            hash_md5.update(chunk)
    return hash_md5.hexdigest()


def generate_manifest(project: str = None, directory: str = None) -> None:
    """ 生成manifest.json文件 """
    manifest = []
    if os.path.exists(directory):
        directory_name = os.path.basename(directory)
        for root, dirs, files in os.walk(directory):
            for filename in files:
                filepath = os.path.join(root, filename)
                name = os.path.relpath(filepath, directory)
                url = DOMAIN + '/' + directory_name + '/' + name
                file_info = {
                    "name": directory_name + '/' + name,
                    "size": os.path.getsize(filepath),
                    "md5": generate_file_md5(filepath),
                    "url": url,
                    "version": '1'
                }
                manifest.append(file_info)
        with open(f'{project}_new_manifest.json', 'w') as manifest_file:
            json.dump(manifest, manifest_file, indent=4)
    else:
        print(f'{directory}文件夹不存在')


def read_version_file(version_file: str) -> list:
    """ 读取版本json文件 """
    if not os.path.exists(version_file):
        return []
    with open(version_file, "r", encoding="utf-8") as f:
        version_list = json.loads(f.read())
    return version_list


def compare_versions(project_name: str, version: list, new_version: list) -> dict:
    """ 比较版本 """
    compare_result = {'files': []}
    history_version_jsons = {item['name']: item for item in version}
    status = False
    for item in new_version:
        file_name = item['name']
        if file_name in history_version_jsons:
            old_item = history_version_jsons[file_name]
            old_md5 = old_item['md5']
            new_md5 = item['md5']
            if new_md5 != old_md5:
                item['version'] = str(int(old_item['version']) + 1)
                print(f'检查到新文件: {item}')
                status = True

    with open(f'{BASE_DIR}/{project_name}_old_manifest.json', 'w') as manifest_file:
        json.dump(new_version, manifest_file, indent=4)

    # 清除生成的新版本信息json
    os.remove(f'{BASE_DIR}/{project_name}_new_manifest.json')
    if not status:
        print(f'{project_name}项目当前没有变动的文件')
    compare_result['files'] = new_version
    return compare_result


async def generate_project_version_info():
    """ 生成多个项目的版本信息 """
    wocute_insight = '/web-mobile'
    version_task = {  # 项目任务
        'wocute_insight': BASE_DIR + wocute_insight,
    }
    all_project_version = []
    for item in version_task:
        project_name = item
        project_dir = version_task[item]
        project_old_version_file = f'{BASE_DIR}/{project_name}_old_manifest.json'
        project_new_version_file = f'{BASE_DIR}/{project_name}_new_manifest.json'
        generate_manifest(project_name, project_dir)

        old_version_info = read_version_file(project_old_version_file)
        new_version_info = read_version_file(project_new_version_file)
        result = compare_versions(project_name, old_version_info, new_version_info)
        all_project_version.append({
            'project_name': project_name,
            'project_local_dir': project_dir,
            'total_file_count': len(result['files']),
            'version_list': result['files']
        })
    return all_project_version


if __name__ == "__main__":
    # 测试
    version_info_list = asyncio.run(generate_project_version_info())
    print(version_info_list)
