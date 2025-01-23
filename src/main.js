import { createApp } from 'vue';
import App from './App.vue';
import router from './router';  // 路由
import 'animate.css';  // 引入animate动画样式
import FormPro from '@/components/FormPro/index.vue';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import 'element-plus/dist/index.css';


// 创建应用实例
const app = createApp(App);

// 使用路由
app.use(router);

// 自动导入并注册 `components` 文件夹下的所有 `.vue` 文件
const components = import.meta.glob('@/components/*.vue', { eager: true });

// 注册全局组件
Object.entries(components).forEach(([path, component]) => {
  const componentName = path.split('/').pop().replace(/\.\w+$/, ''); // 提取文件名作为组件名
  app.component(componentName, component.default);
});

// 注册全局组件
app.component('FormPro', FormPro);

// 注册 ElementPlus 图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

app.mount('#app');
