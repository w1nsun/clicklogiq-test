### Как запустить

- Клонируем репозиторий
- Собираем контейнер `docker build -t clicklogiq --no-cache .`
- Проверяем что у нас на localhost не занят порт 3000
- Запускаем конейнер, подставив актуальный API_KEY `docker run -e NEWS_API_KEY=<API_KEY> -p 3000:3000 -it clicklogiq`
- Открываем в браузере `http://localhost:3000/?limit=5&from=1611210277&query=bitcoin`

