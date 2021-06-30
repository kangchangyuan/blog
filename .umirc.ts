import { defineConfig } from 'dumi';

export default defineConfig({
  title: 'Holiday',
  favicon: 'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
  logo: 'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
  outputPath: 'docs-dist',
  mode: 'site',
  navs:[
    {
      title: '修行',
      path: '/practice',
    },
    {
      title: '工具类',
      path: '/utils',
    },
    {
      title: '随笔',
      path: '/rich',
    },
    {
      title: 'GitHub',
      path: 'https://github.com/kangchangyuan/kangchangyuan.github.io',
    },
  ]
});
