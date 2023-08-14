// Импортируем функцию diskStorage из пакета 'multer'
import { diskStorage } from 'multer';

// Функция для генерации случайного 18-символьного идентификатора из шестнадцатеричных символов
const generateId = () =>
  Array(18)
    .fill(null)
    .map(() => Math.round(Math.random() * 16).toString(16))
    .join('');

// Функция для нормализации имени файла при загрузке
// req - запрос клиента
// file - информация о файле, полученном от клиента
// callback - функция обратного вызова для установки имени файла
const normalizeFileName = (req, file, callback) => {
  // Получаем расширение файла из оригинального имени файла
  const fileExtName = file.originalname.split('.').pop();

  // Обрабатываем функцию обратного вызова и устанавливаем имя файла
  // используя сгенерированный идентификатор с добавлением расширения файла
  callback(null, `${generateId()}.${fileExtName}`);
};

// Экспортируем конфигурацию хранилища файлов на диске
// diskStorage() принимает объект конфигурации с двумя свойствами:
// - destination: определяет директорию, в которую будут загружаться файлы
// - filename: функция, определяющая, как будет называться сохраненный файл
export const fileStorage = diskStorage({
  destination: './uploads',
  filename: normalizeFileName,
});
