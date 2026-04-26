---
title: Docker Desktop 安装教程（Windows 10）
date: 2026-01-12
category: 技术
coverUrl: "https://i-blog.csdnimg.cn/direct/2b33977bf98749748479a8dfdf0b072b.png"
summary: Windows 10 环境下 Docker Desktop 下载、安装选项说明与安装验证步骤。
tags:
  - 技术
  - Docker
  - Windows
---

Docker 官网：[https://www.docker.com/](https://www.docker.com/)

示例环境：`Windows 10`

## 第一步：下载安装包
打开 Docker 官网，点击下载。

推荐选择：`Download for Windows - AMD64`

### AMD64 与 ARM64 的区别
- `Download for Windows - AMD64`：适配 x86-64 架构 CPU（如 Intel 酷睿、AMD 锐龙），适用于绝大多数常见电脑。
- `Download for Windows - ARM64`：适配 ARM 架构 CPU（如部分 Surface 设备等），仅少数设备使用。

![Docker 下载页面示例](https://i-blog.csdnimg.cn/direct/2b33977bf98749748479a8dfdf0b072b.png)

## 第二步：运行安装程序

![Docker 安装程序示例](https://i-blog.csdnimg.cn/direct/cb701b10a4bd4b2f98890e737610fee8.png)

## 第三步：选择安装选项
勾选推荐选项后点击 `OK`。

对应含义如下：
- 使用 `WSL 2`（Windows Subsystem for Linux）作为 Docker 后端（官方推荐）。
- 同时安装 Windows 容器支持。
- 在桌面创建 Docker 快捷方式。

![Docker 安装程序示例](https://i-blog.csdnimg.cn/direct/49797f82cb59471ca9fd56ec32a4d8fd.png)

## 第四步：开始安装并完成

![Docker 安装程序示例](https://i-blog.csdnimg.cn/direct/9b4c62cb959b4057971d6c3302ef2309.png)

等待安装完成后，点击 `Close` 结束安装。

![Docker 安装程序示例](https://i-blog.csdnimg.cn/direct/adf4dbfc42fe4f12acdd33a65e422f22.png)

## 第五步：验证安装结果
打开 `CMD` 或 `PowerShell`，执行：

```bash
docker --version
```
![Docker 安装结果示例](https://i-blog.csdnimg.cn/direct/26439394b00a4d6ab6b149c6cabc0884.png)
如果能正常显示版本号，说明 Docker 安装成功。
