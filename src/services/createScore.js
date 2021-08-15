



// to avoid registering a competitor to a wrong category (in a different event)
const validateInput = async (values) => {
  const {competitorId, problemId} = values;

  
  if (!problemToCompeteIds.include(problemId)) {
    throw new Error('This competitor did not register in the same category as the problem')
  }
  return true;
}