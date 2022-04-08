export const ajax = function ({url, method, body, success, fail}) {
  let request = new XMLHttpRequest();
  request.open(method, url);
  request.onreadystatechange = () => {
    if (request.readyState === 4) {
      if (request.status >= 200 && request.status < 300) {
        success.call(undefined, JSON.parse(request.responseText))
      } else if (request.status >= 400) {
        fail.call(undefined, request)
      }
    }
  };
  request.send(body)
};
