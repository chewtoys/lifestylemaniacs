import { firebaseFirestore } from './config';

const articlesRef = firebaseFirestore.collection('articles');

export { articlesRef };
