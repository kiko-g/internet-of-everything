export const resolveStatus = (status) => {
  switch (status) {
    case 0:
      return "offline"
    case 1:
      return "online"
    default:
      return "unknown"
  }
}

export const colors = [
  "#F87171",
  "#FBBF24",
  "#2DD4BF",
  "#60A5FA",
  "#A78BFA",
  "#E11D48",
  "#34D399",
  "#38BDF8",
  "#0EA5E9",
  "#818CF8",
  "#C084FC",
  "#A3E635",
  "#4ADE80",
  "#FB7185",
  "#FB923C",
]

export const jsonStyle = {
  overflowY: "auto",
  overflowX: "hidden",
  padding: "1rem",
  width: "100%",
  fontSize: "small",
  lineHeight: 1,
  fontFamily: "JetBrains Mono, Consolas, sans-serif",
  backgroundColor: "inherit",
  borderRadius: "0.75rem",
}

export const options = [
  { name: "Machines", color: "bg-blue-400" },
  { name: "Sensors", color: "bg-teal-400" },
]

export const productionOptions = [
  { name: "Production", color: "bg-purple-400" },
  { name: "State", color: "bg-orange-400" },
]

const labels = [
  { type: "energy", color: "orange" },
  { type: "position", color: "teal" },
  { type: "velocity", color: "indigo" },
  { type: "temperature", color: "red" },
  { type: "vibration", color: "purple" },
  { type: "orientation", color: "lime" },
  { type: "speed ", color: "sky" },
]

export const findColor = (type) => {
  for (let i = 0; i < labels.length; i++) {
    let condition = type.toLowerCase().trim() === labels[i].type.toLowerCase().trim()
    if (condition) return labels[i].color
  }

  return "slate"
}

// should be replaced later
export const productionMockArray = [
  { productionRate: 1.2469087055009456 },
  {
    machineID: "machine1",
    nDefects: 0,
    defectRate: 0.0,
    nProducts: 5,
    meanProductionTime: 1616.6,
    productionRate: 0.5825,
  },
  {
    machineID: "machine2",
    nDefects: 1,
    defectRate: 1.0,
    nProducts: 1,
    meanProductionTime: 1476.6,
    productionRate: 0.0,
  },
  {
    machineID: "machine1",
    nDefects: 0,
    defectRate: 0.0,
    nProducts: 5,
    meanProductionTime: 1616.6,
    productionRate: 0.5825,
  },
  {
    machineID: "machine2",
    nDefects: 1,
    defectRate: 1.0,
    nProducts: 1,
    meanProductionTime: 1476.6,
    productionRate: 0.0,
  },
  {
    machineID: "machine1",
    nDefects: 0,
    defectRate: 0.0,
    nProducts: 5,
    meanProductionTime: 1616.6,
    productionRate: 0.5825,
  },
  {
    machineID: "machine2",
    nDefects: 1,
    defectRate: 1.0,
    nProducts: 1,
    meanProductionTime: 1476.6,
    productionRate: 0.0,
  },
  {
    machineID: "machine1",
    nDefects: 0,
    defectRate: 0.0,
    nProducts: 5,
    meanProductionTime: 1616.6,
    productionRate: 0.5825,
  },
  {
    machineID: "machine2",
    nDefects: 1,
    defectRate: 1.0,
    nProducts: 1,
    meanProductionTime: 1476.6,
    productionRate: 0.0,
  },
  {
    machineID: "machine1",
    nDefects: 0,
    defectRate: 0.0,
    nProducts: 5,
    meanProductionTime: 1616.6,
    productionRate: 0.5825,
  },
  {
    machineID: "machine2",
    nDefects: 1,
    defectRate: 1.0,
    nProducts: 1,
    meanProductionTime: 1476.6,
    productionRate: 0.0,
  },
]

// should be replaced later
export const productionStateMockArray = [
  {
    date: { $date: 1642809222629 },
    defect: false,
    machineID: "machine1",
    productID: "1",
    action: "IN",
    readTime: "21-01-2022 23:53:42.573",
    _id: { $oid: "61eb4786c766e425edb72241" },
  },
  {
    date: { $date: 1642809223663 },
    defect: false,
    machineID: "machine1",
    productID: "2",
    action: "OUT",
    readTime: "21-01-2022 23:53:43.603",
    _id: { $oid: "61eb4787c766e425edb72242" },
  },
  {
    date: { $date: 1642809224865 },
    defect: false,
    machineID: "machine2",
    productID: "3",
    action: "IN",
    readTime: "21-01-2022 23:53:44.637",
    _id: { $oid: "61eb4788c766e425edb72243" },
  },
  {
    date: { $date: 1642809226117 },
    defect: false,
    machineID: "machine2",
    productID: "4",
    action: "OUT",
    readTime: "21-01-2022 23:53:45.865",
    _id: { $oid: "61eb478ac766e425edb72245" },
  },
]
