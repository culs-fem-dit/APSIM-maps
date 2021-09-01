export const fetchData = async url => {
  const call = await fetch(url);
  const jsoned = await call.json();
  return jsoned.data;
};

export const apiEndpoint = `//ls40.pef.czu.cz/maps/api/www`;
