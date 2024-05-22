// These functions all take in a body and return an options object
// with the provided body and the remaining options
import { fetchHandler, getPostOptions, getPatchOptions } from "../utils";

const baseUrl = '/api/users';

export const createUser = async ({ username, password, bio, pfp, first_name, last_name }) => (
  fetchHandler(baseUrl, getPostOptions({ username, password, bio,pfp, first_name, last_name}))
);

export const getAllUsers = async () => {
  const [users] = await fetchHandler(baseUrl);
  return users || [];
};

export const getUser = async (id) => fetchHandler(`${baseUrl}/${id}`);

export const updateUser = async ({ id, username, bio, pfp, first_name, last_name }) => (
  fetchHandler(`${baseUrl}/${id}`, getPatchOptions({ id, username, bio, pfp, first_name, last_name }))
);
