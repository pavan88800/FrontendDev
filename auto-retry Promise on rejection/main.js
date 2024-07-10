/**
 * @param {() => Promise<any>} fetcher
 * @param {number} maximumRetryCount
 * @return {Promise<any>}
 */
function fetchWithAutoRetry(fetcher, maximumRetryCount) {
  // your code here
  let counter = 0;
  return new Promise((resolve, reject) => {
    function helper() {
      fetcher()
        .then((data) => {
          if (data) {
            resolve(data);
          }
        })
        .catch((err) => {
          if (counter !== maximumRetryCount) {
            counter += 1;
            helper();
          } else {
            reject(err);
          }
        });
    }
    helper();
  });
}
