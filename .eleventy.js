module.exports = function(eleventyConfig) {
  // 将 'css' 文件夹复制到输出目录
  eleventyConfig.addPassthroughCopy("css");
  // 将 'js' 文件夹复制到输出目录
  eleventyConfig.addPassthroughCopy("js");

  return {
    dir: {
      input: ".",       // 输入目录
      includes: "_includes", // 布局文件目录
      output: "_site"   // 输出目录
    }
  };
}; 