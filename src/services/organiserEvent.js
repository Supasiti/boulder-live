// create new organiser - event pairing
const create = ({eventId, organiserId}) => {
  return {
    eventId: eventId,
    organiserId: organiserId,
  };
};


module.exports = {
  create
}
