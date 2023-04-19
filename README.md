# 简介
- 一个非主流md格式日记app

# docker版本
- docker >= 20.10.23
- docker-compose >= 2.15.1
# 使用方法
1. 设定mongodb用户名和密码的环境变量(设定任意的用户名密码)
```bash
export DB_USERNAME=root
export DB_PASSWORD=pass
```

2. 用docker build指令生成app用docker镜像
```bash
docker build -t diary-app .
```

3. 用docker-compose启动app，db，web版db控制台的docker容器
```bash
docker-compose up -d
```

4. 在浏览器上通过以下URL打开app
```
http://localhost:8080
```

# 数据保存路径
- 数据保存在`./mongodb_data/`下，db设定保存在`./configdb/`下。可通过修改`docker-compose.yml`文件内相关volumes设定来更改。