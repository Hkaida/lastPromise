/**
 * 限制重复请求
 * @param {promiseFunction} callback - 返回 Promise 实例的函数
 * @returns {Function} - 新函数
 */
export function lastPromise(callback) {
  const CancelToken = axios.CancelToken
  let source = null
  return function(...args) {
    // 如果已存在实例则取消，并触发新的请求
    if (source) {
      source.cancel()
    }
    source = CancelToken.source()
    return callback(...args, source).then((res) => {
      source = null
      return res
    })
  }
}