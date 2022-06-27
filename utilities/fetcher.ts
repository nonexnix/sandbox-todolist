const fetcher = async (key: string) => {
  const response = await fetch(key, {
    method: "GET",
    headers: {
      contentype: "application/json",
    },
  });
  return await response.json();
};

export default fetcher;
