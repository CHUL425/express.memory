'use strict';

let users = [
  {
    id       : '1000001',
    username : 'bob',
    password : '$2a$12$oeOE3C763cGmdsuMU9djwOVorYz.3OHbVkeF3rydQUfpMDXd7Wa0e',   // abcd
    name     : 'Bob',
    email    : 'bob@gmail.com',
    photo    : 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1160&q=80',
    createdAt: new Date().toString(),
  },
  {
    id       : '2000002',
    username : 'ellie',
    password : '$2a$12$3HhENtM8B/c.F1SxUIc0VeDLAsSjU9lqLeKc09AGzp22H2QBVV166',  // 12345
    name     : 'Ellie',
    email    : 'ellie@gmail.com',
    photo    : 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=922&q=80',
    createdAt: new Date().toString(),
  },
  {
    id       : '3000003',
    username : 'anna',
    password : '$2a$12$b0zDBjhxFXpwnIml/fE98uGxY9Z7a/nVo.xRM/uoD2/FblIfYIdJW',   // qwer
    name     : 'Anna',
    email    : 'anna@gmail.com',
    photo    : 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=922&q=80',
    createdAt: new Date().toString(),
  },
];

/**
 * username로 User 정보 조회
 */
export async function getByUsername(username) {
  console.log(`getByUsername-username:[${username}]`);
  return users.find((user) => user.username === username);
}

/**
 * id로 User 정보 조회
 */
export async function getById(id) {
  console.log(`getById-id:[${id}]`);
  return users.find((user) => user.id === id);
}

/**
 * User 등록
 */
export async function createUser(username, hashed, name, email, photo) {
  const user = {
    id       : Date.now().toString(),
    username : username             ,
    password : hashed               ,
    name     : name                 ,
    email    : email                ,
    photo    : photo                ,
    createdAt: new Date().toString(),
  };
  console.log(`user:[${user}]`);

  users.push(user);  // 뒤에 추가
  console.log(`users:[${users}]`);

  return user.id;
}
