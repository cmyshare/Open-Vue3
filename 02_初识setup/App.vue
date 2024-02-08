<template>
	<title>02_初识setup</title>
	<h1>一个人的信息</h1>
	<h2>姓名：{{name}}</h2>
	<h2>年龄：{{age}}</h2>
	<h2>性别：{{sex}}</h2>
	<h2>a的值是：{{a1}}</h2>
	<button @click="sayHello">说话(Vue3所配置的——sayHello)</button>
	<br>
	<br>
	<button @click="sayWelcome">说话(Vue2所配置的——sayWelcome)</button>
	<br>
	<br>
	<button @click="test1">测试一下在Vue2的配置中去读取Vue3中的数据、方法</button>
	<br>
	<br>
	<button @click="test2">测试一下在Vue3的setup配置中去读取Vue2中的数据、方法</button>
</template>

<script>
	// 使用渲染函数需要引入h
	// import {h} from 'vue'
	export default {
		name: 'App',

		// 注意：在vue3项目中可以同时存在vue2定义数据和方法，vue3定义数据和方法。

		// vue2的数据定义，方法定义
		data() {
			return {
				sex:'男',
				a1:100
			}
		},
		methods: {
			sayWelcome(){
				alert('欢迎来到Vue3学习')
			},
			// 在vue2中读取vue3的数据和方法
			test1(){
				console.log("vue2定义数据和方法")
				console.log(this.sex)
				console.log(this.name)
				console.log(this.age)
				console.log(this.sayHello)
			}
		},

		//此处只是测试一下setup，暂时不考虑响应式的问题。
		// setup不能使用async-await组合，会导致template模板全部不能使用
		setup(){
			//定义数据
			let name = '张三'
			let age = 18
			let a2 = 200

			//定义方法
			function sayHello(){
				alert(`我叫${name}，我${age}岁了，你好啊！`)
			}

			// 测试从vue3中读取vue2数据和方法
			function test2(){
				console.log("vue3定义数据和方法")
				console.log(name)
				console.log(age)
				console.log(a2)
				console.log(sayHello)
				// 读取vue2时，输出undefined
				console.log(this.sex)
				console.log(this.sayWelcome)
			}

			//返回一个对象（常用）,vue3 setup定义的数据和方法都要进行返回，不然无法使用
			return {
				name,
				age,
				a2,
				sayHello,
				test2
			}

			// // 返回一个函数（渲染函数）
			// return ()=> h('h1','Vue3')
		}
	}
</script>

