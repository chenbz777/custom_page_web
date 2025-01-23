
import { reactive, h } from 'vue';
import router from '@/router';


const getRoutesData = () => {

  const routesTree = JSON.parse(JSON.stringify(router.options.routes));

  const routesMap = new Map();

  const tempFn = (arr = [], parentName = '') => {
    arr.forEach(item => {
      delete item.component;

      item.parentList = [];

      if (parentName) {
        const parentData = JSON.parse(JSON.stringify(routesMap.get(parentName)));

        delete parentData.children;

        item.parentList = [...parentData.parentList, parentData];

        // 处理子路由的 path
        let parentPath = parentData.path;

        if (!parentPath.includes('/')) {
          parentPath = `/${parentPath}`;
        }

        item.path = `${parentPath}/${item.path}`;
      }

      routesMap.set(item.name, item);

      if (item.children) {
        tempFn(item.children, item.name);
      }
    });
  };

  tempFn(routesTree);

  return {
    routesTree,
    routesMap
  };
};

const adminKeepAliveList = reactive([]);

const mobileKeepAliveList = reactive([]);

// 用来存已经创建的组件
const componentMap = new Map();

// 将router传个我们的组件重新换一个新的组件，原组件包里面
const formatComponentInstance = (component, route) => {
  let componentData;

  if (component) {
    const componentName = route.fullPath;

    if (componentMap.has(componentName)) {
      componentData = componentMap.get(componentName);
    } else {
      componentData = {
        name: componentName,
        render() {
          return h(component);
        }
      };

      componentMap.set(componentName, componentData);
    }

    return h(componentData);
  }
};

export default function useRouterPlus() {
  return {
    getRoutesData,
    adminKeepAliveList,
    mobileKeepAliveList,
    componentMap,
    formatComponentInstance
  };
}