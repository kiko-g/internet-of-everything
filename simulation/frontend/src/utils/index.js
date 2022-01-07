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
  "#FB923C",
  "#FBBF24",
  "#A3E635",
  "#4ADE80",
  "#34D399",
  "#2DD4BF",
  "#22D3EE",
  "#38BDF8",
  "#60A5FA",
  "#818CF8",
  "#A78BFA",
  "#C084FC",
  "#E879F9",
  "#F472B6",
  "#FB7185",
]

export const jsonStyle = {
  overflowY: "auto",
  overflowX: "hidden",
  padding: "1em",
  width: "100%",
  height: "60vh",
  borderRadius: "0.5rem",
  fontSize: "small",
  lineHeight: 1,
  fontFamily: "JetBrains Mono, Consolas, sans-serif",
  backgroundColor: "#3c4553",
}