require('dotenv').config(); // require('dotenv').config(); - это строка кода на JavaScript, которая используется для загрузки переменных окружения из файла .env. После загрузки переменных окружения вы можете обращаться к ним в своем коде, используя process.env
const express = require('express');
const chalk = require('chalk'); // это библиотека, которая используется для добавления цветов и стилей к тексту, который выводится в консоль Node.js
const cors = require('cors');
// cors - это библиотека (или модуль) для Node.js, которая предназначена для управления политикой Cross-Origin Resource Sharing (CORS).
// CORS - это механизм, который позволяет веб-страницам запросить ресурсы с другого домена (или другой источник), чем домен, с которого была загружена страница.
// Когда вы создаете веб-приложение, которое выполняет AJAX-запросы или запрашивает ресурсы (например, данные API) с других доменов, 
// браузер может применять политику безопасности CORS, которая может блокировать такие запросы. Для разрешения этих запросов и 
// управления этой политикой используется библиотека cors.

const helmet = require('helmet');
// helmet позволяет автоматически внедрить ряд настроек безопасности в ваше Express.js-приложение, чтобы уменьшить риски различных уязвимостей. 
// Эти настройки могут включать в себя установку заголовков HTTP, защиту от атак на секреты сессии, предотвращение атак CSRF (межсайтовая подделка запросов),
// и многое другое.

const keys = require('./config/keys');
const routes = require('./routes');
const socket = require('./socket');
const setupDB = require('./utils/db');

const { port } = keys;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  helmet({
    contentSecurityPolicy: false,
    frameguard: true
  })
);
app.use(cors());

setupDB();
require('./config/passport')(app);
app.use(routes);

const server = app.listen(port, () => {
  console.log(
    `${chalk.green('✓')} ${chalk.blue(
      `Listening on port ${port}. Visit http://localhost:${port}/ in your browser.`
    )}`
  );
});

socket(server);
