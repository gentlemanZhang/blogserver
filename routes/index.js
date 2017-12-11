/**
 * Created by ZJ on 2017/12/11
 */
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

const db = mongoose.connection.openUri('mongodb://localhost/user');
db.on('error', (error) => {
  console.log('数据库连接失败' + error);
});

db.on('open', () => {
  console.log('数据库连接成功！');
});

const MyModel = mongoose.model('user', new Schema({ name: String }), 'user');

router.get('/', function (req, res, next) {
  MyModel.findOne({ name: 'Aimi' }, (err, user) => {
    // console.log(user);
    res.render('index', { title: 'Express', user: user });
  });
});

router.get('/user', function (req, res, next) {
  MyModel.findOne({ name: 'Aimi' }, (err, user) => {
    console.log(user);
    res.json({ user: user });
  });
});

module.exports = router;
