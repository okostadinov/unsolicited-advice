import localforage from "localforage";

type FakeCache = {
  [key: string]: boolean;
};

type User = {
  id: string;
  username: string;
  passwordHash: string;
};

export async function getUsers() {
  await fakeNetwork("");
  let users = await localforage.getItem<User[]>("users");
  if (!users) users = [];
  return users;
}

export async function createUser(username: string, password: string) {
  await fakeNetwork("");

  let id = Math.random().toString(36).substring(2, 9);
  let passwordHash = "test";
  let user = { id, username, passwordHash } as User;
  let users = await getUsers();
  users.push(user);
  await set(users);
  return user;
}

export async function getUser(id: string) {
  await fakeNetwork(`user:${id}`);
  let users = await localforage.getItem<User[]>("users");
  let user = users?.find((user) => user.id === id);
  return user ?? null;
}

function set(users: User[]) {
  return localforage.setItem("users", users);
}

let fakeCache: FakeCache = {};

async function fakeNetwork(key: string) {
  if (!key) {
    fakeCache = {};
  }

  if (fakeCache[key]) {
    return;
  }

  fakeCache[key] = true;
  return new Promise((res) => {
    setTimeout(res, Math.random() * 800);
  });
}
