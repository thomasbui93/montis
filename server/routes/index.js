import articleController from './articles';
import tagController from './tags';
import categoryController from './categories';
import attributeController from './attributes';
import fileController from './files';

export default (app) => {
  app.use('/v1/api/articles', articleController);
  app.use('/v1/api/tags', tagController);
  app.use('/v1/api/categories', categoryController);
  app.use('/v1/api/attributes', attributeController);
  app.use('/v1/api/files', fileController);
}