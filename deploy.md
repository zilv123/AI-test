# 部署指南

## 🚀 快速部署到 caixuji.edu.deal

### 方法一：使用 Vercel CLI

1. **安装 Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **登录 Vercel**
   ```bash
   vercel login
   ```

3. **部署项目**
   ```bash
   vercel --prod
   ```

4. **配置自定义域名**
   - 在 Vercel 控制台中添加域名 `caixuji.edu.deal`
   - 配置 DNS 记录指向 Vercel

### 方法二：GitHub + Vercel 自动部署

1. **推送代码到 GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

2. **连接 Vercel**
   - 访问 [vercel.com](https://vercel.com)
   - 导入 GitHub 仓库
   - 配置域名 `caixuji.edu.deal`

### 方法三：其他平台部署

#### Netlify
1. 拖拽文件夹到 [netlify.com](https://netlify.com)
2. 配置自定义域名

#### GitHub Pages
1. 推送到 GitHub 仓库
2. 启用 GitHub Pages
3. 配置 CNAME 文件

## 🔧 部署前检查清单

- [ ] 所有文件路径正确
- [ ] 域名配置已更新
- [ ] Service Worker 路径正确
- [ ] Manifest 文件配置完整
- [ ] 所有外部资源可访问

## 📋 DNS 配置

如果您控制 `caixuji.edu.deal` 域名，需要配置以下 DNS 记录：

### Vercel
```
Type: CNAME
Name: @
Value: cname.vercel-dns.com
```

### Netlify
```
Type: CNAME
Name: @
Value: <your-site-name>.netlify.app
```

## 🔍 部署后验证

1. **访问网站**
   - 打开 https://caixuji.edu.deal/
   - 检查所有功能正常

2. **PWA 功能测试**
   - 检查是否可以安装到设备
   - 测试离线访问
   - 验证 Service Worker 工作

3. **性能测试**
   - 使用 Google PageSpeed Insights
   - 检查 Lighthouse 评分
   - 验证加载速度

## 🛠️ 故障排除

### 常见问题

1. **Service Worker 不工作**
   - 检查 HTTPS 是否启用
   - 验证 sw.js 路径正确

2. **PWA 安装提示不显示**
   - 确认 manifest.json 配置正确
   - 检查 HTTPS 连接

3. **样式或脚本加载失败**
   - 验证文件路径
   - 检查 CORS 设置

### 调试工具

- Chrome DevTools
- Lighthouse
- PWA Builder
- Vercel Analytics

## 📈 监控和分析

建议添加以下服务：

1. **Google Analytics**
   ```html
   <!-- Google tag (gtag.js) -->
   <script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
   ```

2. **Vercel Analytics**
   ```html
   <script defer src="/_vercel/insights/script.js"></script>
   ```

3. **Web Vitals 监控**
   ```javascript
   import {getCLS, getFID, getFCP, getLCP, getTTFB} from 'web-vitals';
   ```

## 🔄 持续集成

设置自动部署流程：

1. **GitHub Actions**
   ```yaml
   name: Deploy to Vercel
   on: [push]
   jobs:
     deploy:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v2
         - uses: amondnet/vercel-action@v20
   ```

2. **自动测试**
   - 添加单元测试
   - 配置 E2E 测试
   - 性能回归测试

---

**部署成功后，您的网站将在 https://caixuji.edu.deal/ 上线！** 🎉
