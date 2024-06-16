<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <!-- <p>
      For a guide and recipes on how to configure / customize this project,<br>
      check out the
      <a href="https://cli.vuejs.org" target="_blank" rel="noopener">vue-cli documentation</a>.
    </p>
    <h3>Installed CLI Plugins</h3>
    <ul>
      <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-babel" target="_blank" rel="noopener">babel</a></li>
      <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-eslint" target="_blank" rel="noopener">eslint</a></li>
    </ul>
    <h3>Essential Links</h3>
    <ul>
      <li><a href="https://vuejs.org" target="_blank" rel="noopener">Core Docs</a></li>
      <li><a href="https://forum.vuejs.org" target="_blank" rel="noopener">Forum</a></li>
      <li><a href="https://chat.vuejs.org" target="_blank" rel="noopener">Community Chat</a></li>
      <li><a href="https://twitter.com/vuejs" target="_blank" rel="noopener">Twitter</a></li>
      <li><a href="https://news.vuejs.org" target="_blank" rel="noopener">News</a></li>
    </ul>
    <h3>Ecosystem</h3>
    <ul>
      <li><a href="https://router.vuejs.org" target="_blank" rel="noopener">vue-router</a></li>
      <li><a href="https://vuex.vuejs.org" target="_blank" rel="noopener">vuex</a></li>
      <li><a href="https://github.com/vuejs/vue-devtools#vue-devtools" target="_blank" rel="noopener">vue-devtools</a></li>
      <li><a href="https://vue-loader.vuejs.org" target="_blank" rel="noopener">vue-loader</a></li>
      <li><a href="https://github.com/vuejs/awesome-vue" target="_blank" rel="noopener">awesome-vue</a></li>
    </ul> -->
  </div>
  <br />
  <div v-html="htmlContent"></div>
</template>

<script>
import { marked } from "marked";
import axios from "axios"; // 或者使用 fetch API

export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  data() {
    return {
      htmlContent: "",
    };
  },
  async created() {
    try {
      // 假设你的 Markdown 文件在 public 目录下，并且构建后可以直接通过 /a.md 访问
      const response = await axios.get("/git教程.md");
      console.log("response" + response);
      const markdownContent = response.data;
      // console.log("markdownContent"+markdownContent);
      this.htmlContent = marked(markdownContent);
      // console.log("this.htmlContent" + this.htmlContent);

      // 将html转出json
      // 使用DOMParser将HTML字符串转换为DOM对象
      const parser = new DOMParser();
      const doc = parser.parseFromString(this.htmlContent, "text/html");

      // 初始化一个空数组来存储发版说明
      const releaseNotes = [];

      // 遍历所有的h1元素（假设它们是发版日期的标题）
      const headings = doc.querySelectorAll("h1");
      headings.forEach((heading, index) => {
        // 获取下一个<p>元素作为内容（假设它紧跟在h1之后）
        const content = doc.querySelectorAll("h1 + p")[index].textContent;

        // 转换日期格式为ISO 8601（可选）
        const dateStr =
          heading.textContent
            .replace(/年/g, "-")
            .replace(/月/g, "-")
            .replace(/日/g, "T")
            .replace(/:/g, ":") + "Z";

        // 将发版说明添加到数组中
        releaseNotes.push({
          date: dateStr,
          content: content.trim(), // 去除内容两侧的空白字符
        });
      });

      // 将数组转换为JSON字符串
      const jsonString = JSON.stringify(releaseNotes, null, 2); // 2表示缩进空格数，使JSON更易读
      console.log("jsonString==========="+jsonString);
    } catch (error) {
      console.error("Error loading Markdown:", error);
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
