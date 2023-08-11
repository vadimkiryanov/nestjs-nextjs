1. Удалить тесты .spec
2. Создать шаблон CRUD`ов - nest g resource [name_crud]
3. dto - это схема того, какие данные могут получать пользователи
4. entities - описывается структура таблицы (таблица пользователей)
5. npm install --save @nestjs/swagger - установка свагера для документации
6. Добавить конфиг: 

 const config = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  в main.ts

  7. npm i @nestjs/typeorm typeorm pg - установка ORM typeorm и pg - для работы с postgresql
  8. Добавить конфиг: 

    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'test',
      entities: [],
      synchronize: true,
    }),

  в app.module.ts

  9. npm i @nestjs/config 
  10. Создаем .env 
  11. npm i -D @types/multer - для корректной работы с загрузкой файлов
  12. npm i @nestjs/passport passport passport-local

  20^00
