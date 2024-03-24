import localforage from "localforage";
import bcrypt from "bcryptjs";

type FakeCache = {
  [key: string]: boolean;
};

type User = {
  id: string;
  username: string;
  passwordHash: string;
};

export async function registerUser(username: string, password: string) {
  await fakeNetwork("");
  let existingUser = await getUserByName(username);
  if (existingUser) throw new Error("User with this name already exists");

  let id = Math.random().toString(36).substring(2, 9);
  let passwordHash = await bcrypt.hash(password, 8);
  let user: User = { id, username, passwordHash };

  let users = await getUsers();
  users.push(user);
  await set(users);

  return user;
}

export async function loginUser(username: string, password: string) {
  await fakeNetwork(`user:${username}`);
  let existingUser = await getUserByName(username);
  if (!existingUser) throw new Error("Invalid username or password");

  let result = await bcrypt.compare(password, existingUser.passwordHash);
  if (!result) throw new Error("Invalid username or password");
  return true;
}

async function getUsers() {
  await fakeNetwork("");
  let users = await localforage.getItem<User[]>("users");
  if (!users) users = [];
  return users;
}

async function getUserByName(username: string) {
  await fakeNetwork(`user:${username}`);
  let users = await getUsers();
  let user = users?.find((user) => user.username === username);
  return user;
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
