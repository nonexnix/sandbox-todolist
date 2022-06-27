const serializer = (data: any) => {
  return JSON.parse(JSON.stringify(data));
};

export default serializer;
