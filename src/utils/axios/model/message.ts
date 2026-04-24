import service from "../request";

export function getMessageList() {
  return service.request({
    url: '/api/message/list',
    method: 'get'
  })
}