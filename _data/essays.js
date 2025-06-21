const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const markdownIt = require('markdown-it');

const md = new markdownIt({
    html: true,
    linkify: true,
    typographer: true
});

module.exports = function() {
    const postsDir = './posts';
    const essays = {};
    
    try {
        // 读取 posts 目录下的所有 .md 文件
        const files = fs.readdirSync(postsDir)
            .filter(file => file.endsWith('.md'))
            .sort(); // 按文件名排序
        
        files.forEach((file, index) => {
            const filePath = path.join(postsDir, file);
            const fileContent = fs.readFileSync(filePath, 'utf8');
            
            // 解析 front matter 和内容
            const { data, content } = matter(fileContent);
            
            // 将 Markdown 转换为 HTML
            const htmlContent = md.render(content);
            
            // 使用 essay1, essay2, essay3... 的格式
            const key = `essay${index + 1}`;
            essays[key] = {
                title: data.title || '无标题',
                content: htmlContent
            };
        });
        
        return essays;
    } catch (error) {
        console.error('读取文章时出错:', error);
        return {};
    }
}; 