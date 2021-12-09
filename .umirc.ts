import { defineConfig } from 'dumi';

export default defineConfig({
  title: 'PENGUIN',
  outputPath: 'docs-dist',
  mode: 'site',
  navs: [
    {
      title: 'HTML',
    },
    {
      title: 'CSS',
    },
    {
      title: 'JavaScript',
      path: '/js',
    },
    {
      title: 'TypeScript',
    },
    {
      title: 'Node',
    },
    {
      title: 'MongoDB',
    },
    {
      title: '笔记',
      path: '/essay',
    },
    {
      title: 'GitHub',
      path: 'https://github.com/kangchangyuan',
    },
  ],
});
