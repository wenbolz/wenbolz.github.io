# Wenbo Home

这是一个适合直接发布到 GitHub Pages 的静态个人主页。

详细维护说明见：

- [MAINTENANCE.md](./MAINTENANCE.md)

## 目录说明

- `index.html`: 页面入口
- `styles.css`: 页面样式
- `script.js`: 页面交互与内容渲染
- `data/site-content.json`: 简介、标题、研究方向、页脚说明
- `data/publications.json`: 论文列表
- `data/gallery.json`: 生活照片列表
- `assets/images/profile`: 头像
- `assets/images/gallery`: 相册图片

## 如何修改简介

编辑 `data/site-content.json`：

- `person.heroIntro`
- `person.about`
- `person.researchAreas`
- `person.stats`

## 如何添加论文

编辑 `data/publications.json`，按现有格式继续添加：

```json
{
  "title": "论文标题",
  "year": 2026,
  "url": "https://example.com",
  "source": "ResearchGate"
}
```

## 如何添加生活照片

1. 把照片放到 `assets/images/gallery/`
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

## 如何本地预览

不要直接双击 `index.html` 用 `file://` 打开。  
请在项目目录启动本地 HTTP 服务，例如：

```bash
cd /Users/wenbo/Devworkspace/wenboself
python3 -m http.server 8000
```

然后访问：

`http://localhost:8000/`

## 如何发布到 GitHub Pages

仓库里已经带了 `.github/workflows/deploy-pages.yml`。

发布方式：

1. 推送到 GitHub 仓库 `main` 分支
2. 在 GitHub 仓库设置里启用 Pages
3. 选择 `GitHub Actions` 作为部署来源

## 访问量

页脚访问量使用 `hitscounter.dev` 生成。  
如果以后主页地址变了，请修改 `data/site-content.json` 里的：

- `visitorCounter.badgeUrl`
- `visitorCounter.historyUrl`
