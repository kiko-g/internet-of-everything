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
  padding: "1em",
  width: "100%",
  fontSize: "small",
  lineHeight: 1,
  fontFamily: "JetBrains Mono, Consolas, sans-serif",
  backgroundColor: "#3c4553",
}

export const options = [
  { name: "Machines", color: "bg-blue-400" },
  { name: "Sensors", color: "bg-teal-400" },
]

export const findColor = (type) => {
  const labels = [
    { type: "position", color: "emerald" },
    { type: "velocity", color: "indigo" },
    { type: "vibration", color: "amber" },
    { type: "temperature", color: "rose" },
  ]

  for (let i = 0; i < labels.length; i++) {
    console.log(type, labels[i].type)
    if (type.toLowerCase() === labels[i].type.toLowerCase()) return labels[i].color
  }

  return "slate"
}
