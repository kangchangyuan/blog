import { defineConfig } from 'dumi';

export default defineConfig({
  title: 'PENGUIN',
  outputPath: 'docs-dist',
  mode: 'site',
  navs: [
    {
      title: '文档',
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
      path: 'https://github.com/kangchangyuan',
    },
  ],
});
