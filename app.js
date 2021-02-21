const express = require('express');
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI(process.env.NEWS_API_KEY);
const DateConverter = require('./src/DateConverter');
const ArticleProcessor = require('./src/ArticleProcessor');
const app = express();
const port = 3000;

app.get('/', (req, res) => {

    const ONE_YEAR_SEC = 31556952;
    const fromTimestamp = req.query.from || (Date.now() / 1000 - ONE_YEAR_SEC);
    const fromDate = DateConverter.unixTimestampToYmd(fromTimestamp);

    const limit = req.query.limit || 5;

    newsapi.v2.everything({
        q: req.query.query,
        from: fromDate,
        language: 'en',
        sortBy: 'relevancy',
        page: 1,
        pageSize: limit,
    })
    .then(apiResponse => {
        if (apiResponse.status !== 'ok' || apiResponse.totalResults < 1) {
            throw new Error('No Results');
        }

        return apiResponse.articles;
    })
    .then(articles => {
        let processedArticles = [];

        articles.forEach(article => {
            let processedArticle = ArticleProcessor.process(article);
            const createdTimestamp = processedArticle.createdTimestamp;

            delete processedArticle.createdTimestamp;

            processedArticles.push({
                content: processedArticle,
                timestamp: createdTimestamp,
            });
        })

        res.send(processedArticles);
    })
    .catch(error => {
        console.log(error);
        res.send([]);
    });
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});