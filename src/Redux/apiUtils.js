export const getBaseUrl = async () => {
  return 'https://www.nseindia.com/api/';
};

export const getyahoofinanceBaseUrl = async () => {
  return 'https://query1.finance.yahoo.com/v8/finance/chart/';
};

export const generateChartUrl = async index => {
  const baseUrl = await getBaseUrl();
  return `${baseUrl}chart-databyindex?index=${index}&indices=true&preopen=true`;
};
