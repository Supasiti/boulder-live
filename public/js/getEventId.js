// expect .../eventId
const getEventId = () => {
  const path = document.location.href.split('?')[0];
  const routes = path.split('/');
  const result = routes[routes.length - 1];
  return result;
}