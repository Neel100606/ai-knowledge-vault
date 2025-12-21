export const isAuthenticated = async () => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/documents`, {
    credentials: "include",
  });

  return res.ok;
};

export const logout = async () => {
  await fetch(`${import.meta.env.VITE_API_URL}/auth/logout`, {
    method: "POST",
    credentials: "include",
  });
};
