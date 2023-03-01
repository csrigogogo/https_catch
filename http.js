const http = require('node:http');
const { Buffer }= require('node:buffer');
const postData = JSON.stringify({
  msg: 'Hello World!',
});
const options = {
  hostname: 'www.baidu.com',
  port: 80,
  path: '/upload',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(postData),
  },
};

// http.request 返回 http.clientRequest 类 的实例

// http.clientRequest 实例 是一个 可写的 stream
// 可以对其进行读写修改
// 实例上有getHeader  setHeader 等等方法
// 真实的 header 会在 req.end() 调用前 随第一个 data chunk 一起发送, 在此之前可以修改
// The actual header will be sent along with the first data chunk or when calling request.end().
const req = http.request(options, (res) => {
  console.log(`STATUS: ${res.statusCode}`);
  console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
  res.setEncoding('utf8');
  res.on('data', (chunk) => {
    console.log(`BODY: ${chunk}`);
  });
  res.on('end', () => {
    console.log('No more data in response.');
  });
});

// http.clientRequest 上 可以监听相应事件
//
req.on('error', (e) => {
  console.error(`problem with request: ${e.message}`);
});

// Write data to request body
req.write(postData);

// 调用 http.request 必须要要调用 req.end 来标志请求的结束
req.end();
