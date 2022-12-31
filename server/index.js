const Koa = require('koa');
const Router = require('koa-router');
const app = new Koa();
const router = new Router();
const cors = require('koa2-cors');

app.use(cors()); // 解决跨域

router.get('/content', async (ctx) => {
  const { type } = ctx.query
  console.log(ctx.query);
  let data = '无数据'
  let timeout = 0
  
  if (type) {
    switch (type) {
      case '全部':
        timeout = 1000
        break;
      case '类型1':
        timeout = 500
        break;
      case '类型2':
        timeout = 0
        break;
    }
    data = type + '的内容'
  }

  await delay(timeout);
  ctx.body = JSON.stringify(data);
});

app.use(router.routes());

app.listen(9090, ()=>{
  console.log('============\n服务启动成功\n============');
})

function delay(time) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
}