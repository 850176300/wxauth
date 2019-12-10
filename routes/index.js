var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var token ='1234qwer';
  //获取微信服务器发来的参数
  var signature = req.query.signature;
  var timestamp = req.query.timestamp;
  var echostr = req.query.echostr;
  var nonce = req.query.nonce;

  //按字典进行排序
  var oriArray = [nonce,timestamp,token];
  oriArray.sort();
  //sha1加密
  var original = oriArray.join('');
  var jsSHA = require('jssha');//加密模块，自己添加
  var shaObj = new jsSHA("SHA-1",'TEXT');
  shaObj.update(original);
  var scyptoString = shaObj.getHash('HEX');
  console.log(signature);
  console.log(scyptoString);
  //判断签名是否相同
  if(signature == scyptoString){
      console.log('true');
      //验证成功
      res.status(200).send(echostr);
  }else{
      console.log('false');
      res.send('error');
      return false;
  }
  next();

});

module.exports = router;
