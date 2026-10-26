# Pilly's Space

白色首页包含可拖动、点击翻面的证件挂绳，以及 Undergraduate、Postgraduate、Summer Program 和 Contact me 四个文件夹入口。点击入口可打开详情卡，按 Escape、点击关闭按钮或卡片外侧可关闭。窄屏使用两列布局。

挂绳使用用户提供的 ReactBits Lanyard 组件源码，正面为证件照片，背面为猫咪图片。已开始的拖动可以覆盖整个视口，文件夹和详情卡可正常点击。所有联系方式均为用户提供。

```powershell
pnpm install
pnpm dev
```

在浏览器打开终端显示的本地地址（默认 `http://127.0.0.1:5173/`）。

## 内容与交互

- 首页文字逐词入场，四个文件夹随下滑收叠、上滑展开。
- 下方四个果冻图标分别打开 Internships、Research、Achievements、Certificate 卡片。
- 详情采用乳白柔光卡片、右下投影和悬停上移效果，支持 Escape 关闭。
- Focusden 项目名称链接至项目网站。
- 尊重系统“减少动态效果”设置。

## 构建

```powershell
pnpm build
```

静态产物位于 `dist/`。本仓库保存源代码和运行所需图片；本地截图、历史样式备份和依赖目录不纳入版本控制。

第三方 React Bits 组件许可见 `src/components/REACT_BITS_LICENSE.md`。
