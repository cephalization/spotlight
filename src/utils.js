export const saveGeneralAuth = (generalAuth) => {
  localStorage.setItem('generalAuth', JSON.stringify(generalAuth));
};

export const loadGeneralAuth = () => (
  JSON.parse(localStorage.getItem('generalAuth') != null
    ? localStorage.getItem('generalAuth')
    : '{}')
);
