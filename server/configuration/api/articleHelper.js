export const getCollectionConfig = () => {
  return Promise.resolve({
    pageSize: 10,
    currentPage: 1
  });
};

export const DEFAULT_THUMBNAIL = `https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/480px-Unofficial_JavaScript_logo_2.svg.png`;
