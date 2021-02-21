const crypto = require('crypto');
const fs = require('fs');

class ArticleProcessor {
    static process(article) {
        const articleHashData = `${article.title}${article.author}${article.url}${article.publishedAt}`
        const articleHashId = crypto.createHash('md5').update(articleHashData).digest('hex');

        const file = `./news/${articleHashId}.json`;

        let processedArticle = article;

        if (fs.existsSync(file)) {
            const rawData = fs.readFileSync(file);
            processedArticle = JSON.parse(rawData.toString());
        } else {
            processedArticle.createdTimestamp = parseInt(Date.now() / 1000);
            fs.writeFileSync(file, JSON.stringify(processedArticle));
        }

        return processedArticle;
    }
}

module.exports = ArticleProcessor;