# https_catch

基于 node 18.14.2 lts

### 对于一个成功的请求 下面的事件 event 会依序执行

- socket
- response
  - data
  - end
- close

### 对于连接错误的连接

- socket
- error
- close

### 对于 一个 premature 的连接关闭 (在 response 到来之前)

- socket
- error ( `an error with message 'Error: socket hang up' and code 'ECONNRESET'`)
- close

### 对于 一个 premature 的连接关闭 (在 response 到来之后)

- socket
- response
  - data
- (链接关闭)
- aborted
- error (`on the res object with an error with message 'Error: aborted' and code 'ECONNRESET'`)
- close
- close(on the res object)

### 对于一个 在 socket 建立前 调用了 `req.destroy()` 的连接

- error (`with an error with message 'Error: socket hang up' and code 'ECONNRESET'`)
- close

### 对于一个 在 连接建立 前 调用了 `req.destroy()` 的连接

- socket
- (res.destroy)
- error (`with an error with message 'Error: socket hang up' and code 'ECONNRESET'`)
- close

### 对于一个 在 收到响应后 调用了 `req.destroy()` 的连接

- 'socket'
- 'response'
  - 'data' any number of times, on the res object
- (req.destroy() called here)
- 'aborted' on the res object
- 'error' (`on the res object with an error with message 'Error: aborted' and code 'ECONNRESET'.`)
- 'close'
- 'close' on the res object

### 
