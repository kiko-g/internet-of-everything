const getStatus = (status) => {
  switch (status) {
    case 0:
      return "offline"
    case 1:
      return "available"
    case 2:
      return "unavailable"
    default:
      return "unknown"
  }
}

const buildSummary = (ps) => {
  return {
    name: ps.name,
    status: ps.status,
    temperature: ps.temperature,
  }
}

module.exports = {
  getStatus: getStatus,
  buildSummary: buildSummary,
}
