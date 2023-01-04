/**
 * 限制重复请求
 * @param {promiseFunction} callback - 返回 Promise 实例的函数
 * @returns {Function} - 新函数
 */
export function lastPromise(callback) {
  let cancelPromise = null
  let cancelToken = null
  return function(...args) {
    // 如果已存在实例则取消，并触发新的请求
    if (cancelToken) {
      cancelToken('cancelPromise')
    }
    cancelPromise = new Promise((resolve, reject) => {
      cancelToken = reject
    })
    return Promise.race([cancelPromise, callback(...args).finally(() => {
      cancelPromise = null
      cancelToken = null
    })])
  }
}