// 将components中的组件批量全局注册(文件名不能是index.vue 因为name是文件名)

const importFn = require.context("./", true, /\.vue$/);

export default {
  install(app) {
    importFn.keys().forEach((path) => {
      const component = importFn(path).default;
      const name = component.__name ? component.__name : component.name;
      app.component(name, component);
    });
  },
};
