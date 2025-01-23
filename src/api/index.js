// 同步导入所有模块
const importModules = import.meta.glob('./modules/*.js', { eager: true });

// 模块集合
const modules = {};

for (const path in importModules) {
  const module = importModules[path];

  const moduleName = path.split('/').pop().replace('.js', '');

  modules[moduleName] = module.default;
}

export default modules;