const koa = require('koa')
const path = require('path');
const staticfile = require('koa-static')
const Router=require('koa-router')
const bodyParser = require('koa-body')
const Sequelize = require('sequelize')
const { prompt } = require('message-box');
const { success, info } = require('message');

const router= new Router()
const app = new koa()
// const sequelize = new Sequelize('library', 'root', 'qwe987', {
//     host: 'localhost',
//     dialect: 'mysql',
//     pool: {
//         max: 5,
//         min: 0,
//         idle: 30000
//     }
// });

router.post('/submit_score', async (ctx) => {
    const { value } = prompt('0-5分打分', '评分', {
        confirmButtonText: '提交',
        cancelButtonText: '取消',
    });
    if (value) {
        // success('提交成功');
        console.log("try it");
    } else {
        info('评价失败');
        ctx.body = '评价失败';
    }
});

app.use(bodyParser())
app.use(router.routes())
app.use(staticfile(path.join(__dirname, 'static')));
app.listen(3400)
// console.log('success')