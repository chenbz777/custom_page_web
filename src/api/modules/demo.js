import request from '@/utils/request';


const list = (data) => {
  return request.get('/list', data);
};



export default {
  list
};