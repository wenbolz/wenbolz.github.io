# 主页维护教程

这份教程面向后续日常维护，适合修改简介、增删论文、增删生活照片，以及发布到你自己的 GitHub 账号。

## 一、项目结构

- `index.html`
  页面入口
- `styles.css`
  页面样式
- `script.js`
  页面交互与内容渲染
- `data/site-content.json`
  个人简介、研究方向、页脚文案、访问量配置
- `data/publications.json`
  论文列表
- `data/gallery.json`
  生活照片列表
- `assets/images/profile`
  头像
- `assets/images/gallery`
  相册图片
- `.github/workflows/deploy-pages.yml`
  GitHub Pages 自动发布工作流

## 二、如何修改简介

编辑 `data/site-content.json`。

常用字段：

- `person.name`
- `person.role`
- `person.affiliation`
- `person.heroIntro`
- `person.about`
- `person.researchAreas`
- `person.stats`

如果你只想改英文版，改 `en` 的内容即可。  
如果你也想保留中文版，同时修改 `zh`。

## 三、如何添加论文

编辑 `data/publications.json`，在 `papers` 数组后面继续添加一个对象：

```json
{
  "title": "Your Paper Title",
  "year": 2026,
  "url": "https://example.com",
  "source": "ResearchGate"
}
```

建议：

- `title` 写完整论文题目
- `year` 写发表年份
- `url` 放论文链接、DOI、ResearchGate 或期刊页
- `source` 写来源平台，例如 `ResearchGate`、`DOI`、`Journal`

## 四、如何删除论文

还是编辑 `data/publications.json`，把对应那一整条对象删除即可。

注意：

- 删除时保留 JSON 逗号格式正确
- 最后一条后面不要多写逗号

## 五、如何添加生活照片

1. 把图片放到 `assets/images/gallery/`
2. 在 `data/gallery.json` 里新增一条：

```json
{
  "src": "assets/images/gallery/your-photo.jpg",
  "caption": {
    "zh": "生活照片 11",
    "en": "Life Photo 11"
  }
}
```

建议：

- 文件名尽量简单，例如 `campus-01.jpg`
- 图片宽度控制在 1600 到 2200 像素之间更合适
- `caption` 可以写更具体，例如 `Conference in Nanjing`

## 六、如何删除生活照片

分两步：

1. 从 `data/gallery.json` 删除对应条目
2. 如果以后也不再使用，再把对应图片文件从 `assets/images/gallery/` 删除

比如删除：

```json
{
  "src": "assets/images/gallery/old-photo.jpg",
  "caption": {
    "zh": "旧照片",
    "en": "Old Photo"
  }
}
```

## 七、如何修改访问量

访问量配置在 `data/site-content.json`：

- `visitorCounter.badgeUrl`
- `visitorCounter.historyUrl`

如果你以后把主页发布到新的 GitHub Pages 地址，需要把这两个 URL 里的旧地址改成你的新主页地址。

## 八、如何本地预览

不要直接双击 `index.html`。

请在项目目录执行：

```bash
cd /Users/wenbo/Devworkspace/wenboself
python3 -m http.server 8000
```

然后浏览器打开：

```text
http://127.0.0.1:8000/
```

## 九、如何发布到你自己的 GitHub 账号

### 方案 A：发布成你的个人主页主地址

如果你希望网址是：

```text
https://你的用户名.github.io/
```

那么仓库名必须是：

```text
你的用户名.github.io
```

例如你的 GitHub 用户名是 `wenbolz`，仓库名就必须是：

```text
wenbolz.github.io
```

### 方案 B：发布成项目主页

如果你的仓库名不是 `你的用户名.github.io`，那地址通常会是：

```text
https://你的用户名.github.io/仓库名/
```

例如：

```text
https://wenbolz.github.io/my-homepage/
```

如果你想要最干净的个人主页地址，建议使用方案 A。

## 十、第一次发布的完整步骤

### 1. 在 GitHub 新建仓库

建议仓库名：

- 想用主地址：`你的用户名.github.io`
- 想用项目地址：任意仓库名

### 2. 把本地项目推送到 GitHub

如果这是第一次上传，在项目目录执行：

```bash
cd /Users/wenbo/Devworkspace/wenboself
git init
git add .
git commit -m "Initial homepage"
git branch -M main
git remote add origin https://github.com/你的用户名/你的仓库名.git
git push -u origin main
```

如果仓库已经存在，只需要：

```bash
git add .
git commit -m "Update homepage"
git push
```

### 3. 在 GitHub 启用 Pages

打开你的 GitHub 仓库页面，然后：

1. 进入 `Settings`
2. 打开左侧 `Pages`
3. 在 `Build and deployment` 里把发布来源设为 `GitHub Actions`

这个项目已经带了：

```text
.github/workflows/deploy-pages.yml
```

所以推送到 `main` 分支后，会自动发布。

### 4. 等待 Actions 跑完

推送后去仓库的：

```text
Actions
```

看到 `Deploy GitHub Pages` 成功即可。

### 5. 打开你的站点

如果你用的是个人主页仓库：

```text
https://你的用户名.github.io/
```

如果你用的是项目仓库：

```text
https://你的用户名.github.io/你的仓库名/
```

## 十一、后续更新主页的方法

以后每次改完内容，只要：

```bash
git add .
git commit -m "Update homepage"
git push
```

GitHub Pages 会自动重新发布。

## 十二、发布前建议检查

- 简介是否是最新版本
- 论文链接是否可打开
- 新照片是否已加入 `data/gallery.json`
- 访问量地址是否已经改成你的最终主页地址
- 仓库名是否和你想要的网址一致

## 十三、如果你要我继续帮你做

我可以继续直接帮你：

- 改成你的 GitHub 用户名对应的发布结构
- 帮你把访问量地址改成最终线上地址
- 帮你补一个 `CNAME` 自定义域名配置
- 帮你继续精修视觉风格
