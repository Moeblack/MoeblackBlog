module.exports = function(eleventyConfig) {
    return async function() {
        const posts = eleventyConfig.getCollections().post;
        if (!posts) {
            return {};
        }

        const essays = {};
        posts.forEach((post, index) => {
            const key = `essay${index + 1}`;
            essays[key] = {
                title: post.data.title,
                content: post.templateContent
            };
        });

        return essays;
    };
}; 