export const getBaseUrl = async () => {
  return 'https://www.nseindia.com/api/';
};

export const generateChartUrl = async index => {
  const baseUrl = await getBaseUrl();
  return `${baseUrl}chart-databyindex?index=${index}&indices=true&preopen=true`;
};
