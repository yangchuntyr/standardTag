// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
// import router from './router'


Vue.config.productionTip = true;



Vue.prototype.$getPx = function (design, designWidth = 750) { // 750为设计稿宽度
    // 获取窗口尺寸
    let width = document.documentElement.getBoundingClientRect().width;
    // 计算缩放比例
    let scale = width / designWidth;
    // 获取实时尺寸
    return design * scale;
};
 

Vue.config.errorHandler = function (err, vm, info) {
    // handle error
    // `info` 是 Vue 特定的错误信息，比如错误所在的生命周期钩子
    // 只在 2.2.0+ 可用
    console.log(err,vm,info);
};

/* eslint-disable no-new */
new Vue({
    el: '#app',
    data:  {

    },
    //router,
    components: { App },
    template: '<App/>',

  
});
