import fetch from './../utils/request';
// import Socket from './../utils/socket';


export function GET_userList(payload = {}, token) {
  return fetch('GET', '/api/userList', payload, {
    headers: {
      // eslint-disable-next-line no-useless-escape
      Authorization: token.replace(/\"/g, '')
    }
  });
}
