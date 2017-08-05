import articleController from './articles';
import tagController from './tags';

export default (app) => {
  app.use('/v1/api/articles', articleController);
  app.use('/v1/api/tags', tagController);
  app.use('/v1/api/categories', tagController);
}