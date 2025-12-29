export const getUserStatus = async (baekjoon_id:string) => {
  const res = await fetch(`/api/user/show?handle=${baekjoon_id}`);

  if (!res.ok) {
    throw new Error("Failed to fetch user data");
  }

  return res.json();
};
