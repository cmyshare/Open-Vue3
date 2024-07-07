//引入的不再是Vue构造函数了，引入的是一个名为createApp的工厂函数
import { createApp } from 'vue'
import App from './App.vue'

//创建应用实例对象——app(类似于之前Vue2中的vm，但app比vm更“轻”，属性会少很多)
const app = createApp(App)

//输出app属性
console.log("输出app属性",app)

//挂载
app.mount('#app')

// //新特性卸载，实现1秒钟后卸载
// setTimeout(()=>{
//     app.unmount('#app')
// },1000)


// 在vue3中不支持这种vue2写法了

// // vue2写法1 创建Vue实例对象
// const vm=new Vue({
//     render:h=>h(App)
// })
// vm.$mount('#app')

// //vue2写法2 创建Vue实例对象
// new Vue({
// 	el:'#app',
// 	render: h => h(App)
// })
