import articleController from './articles';

export default (app)=>{
  app.use('/v1/api/articles', articleController);
}