<template>  
  <div>  
    <!-- 你可以在这里展示releases数组的内容，或者使用它进行其他操作 -->  
    <h1>发版信息</h1>  
    <ul>  
      <li v-for="(release, index) in releases" :key="index">  
        <h2>{{ release.version }}</h2>  
        <h3>功能</h3>  
        <ul>  
          <li v-for="item in release.features" :key="item">{{ item }}</li>  
        </ul>  
        <h3>优化</h3>  
        <ul>  
          <li v-for="item in release.optimizations" :key="item">{{ item }}</li>  
        </ul>  
        <h3>修复</h3>  
        <ul>  
          <li v-for="item in release.fixes" :key="item">{{ item }}</li>  
        </ul>  
      </li>  
    </ul>  
  </div>  
</template>  
  
<script>  
export default {  
  data() {  
    return {  
      releases: []  
    };  
  },  
  async mounted() {  
    try {  
      // 假设Markdown文件位于public/changeLog.md或通过服务器路由可访问  
      const response = await fetch('/changeLog.md');  
      if (!response.ok) {  
        throw new Error('Failed to fetch the Markdown file');  
      }  
      const markdownContent = await response.text();  
      this.parseReleases(markdownContent);  
    } catch (error) {  
      console.error('Error fetching or parsing the Markdown file:', error);  
    }  
  },  
  methods: {  
    parseReleases(content) {  
      //输出md字符串
      // console.log("输出md字符串"+content)
      // 使用'# 分隔符'分割Markdown内容  
      const sections = content.split('# 分隔符').filter(Boolean);  
      // console.log("使用'# 分隔符'分割Markdown内容"+sections)

      // 处理每个版本信息
      this.releases = sections.map(section => { 
               console.log("处理每个版本信息"+section)
        const lines = section.split('\n').filter(Boolean);  
         let version = null;  
        let currentSection = null;  
        // 一个版本信息结构
        const release = {  
          version: [],  
          features: [],  
          optimizations: [],  
          fixes: []  
        };  
  
        lines.forEach(line => {
          // 提取版本
          // 提取功能
          // 提取优化
          // 提取修复

           // 提取版本信息（注意：这里假设版本行始终在第一部分）  
          if (!version && line.trim().startsWith('# 版本')) {  
            version = line.trim().split('# 版本 ').pop().trim();  
          }  
          // 根据行首的标记来确定当前正在处理的部分  
          if (line.trim().startsWith('# 功能内容:')) {  
            currentSection = 'features';  
          } else if (line.trim().startsWith('# 优化内容:')) {  
            currentSection = 'optimizations';  
          } else if (line.trim().startsWith('# 修复内容:')) {  
            currentSection = 'fixes';  
          }  
          // 处理具体条目（假设条目以'1、'开头）  
          if (currentSection && line.trim().startsWith('1、')) {  
            const item = line.trim().slice(2).trim(); // 去除'1、'  
            release[currentSection].push(item);  
          }  
        });  
  
        return release;  
      });  
  
      // 可选：清理空的或未完整解析的releases（如果没有版本信息）  
      this.releases = this.releases.filter(release => release.version);  
    }  
  }  
};  
</script>