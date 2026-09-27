export type Restaurant = {
  name: string;
  x: number;
  y: number;
  type: "surplus" | "shortage";
  pct: number;
};

export const restaurants: Restaurant[] = [
  { name: "Bếp Nhà Hàng Sơn Trà", x: 30, y: 25, type: "surplus", pct: 68 },
  { name: "Quán Ăn Hải Châu", x: 55, y: 18, type: "shortage", pct: 22 },
  { name: "Nhà Hàng Mỹ Khê", x: 70, y: 45, type: "surplus", pct: 82 },
  { name: "Bếp Thanh Khê", x: 20, y: 60, type: "shortage", pct: 18 },
  { name: "Quán Cơm Ngũ Hành Sơn", x: 45, y: 70, type: "surplus", pct: 40 },
  { name: "Bếp Liên Chiểu", x: 80, y: 75, type: "shortage", pct: 15 },
];

export const forecastRanges = {
  "7D": [
    { label: "Mon", Historical: 40, Predicted: 42 },
    { label: "Tue", Historical: 46, Predicted: 44 },
    { label: "Wed", Historical: 42, Predicted: 47 },
    { label: "Thu", Historical: 50, Predicted: 49 },
    { label: "Fri", Historical: 55, Predicted: 58 },
    { label: "Sat", Historical: 61, Predicted: 64 },
    { label: "Sun", Historical: 58, Predicted: 60 },
  ],
  "30D": [
    { label: "W1", Historical: 44, Predicted: 46 },
    { label: "W2", Historical: 48, Predicted: 50 },
    { label: "W3", Historical: 51, Predicted: 53 },
    { label: "W4", Historical: 55, Predicted: 59 },
  ],
  "90D": [
    { label: "Jan", Historical: 40, Predicted: 43 },
    { label: "Feb", Historical: 44, Predicted: 46 },
    { label: "Mar", Historical: 49, Predicted: 52 },
  ],
} as const;

export const roiData = [
  { month: "Apr", ROI: 14, "CO2 Reduced": 0.9 },
  { month: "May", ROI: 18, "CO2 Reduced": 1.3 },
  { month: "Jun", ROI: 21, "CO2 Reduced": 1.6 },
  { month: "Jul", ROI: 19, "CO2 Reduced": 1.8 },
  { month: "Aug", ROI: 25, "CO2 Reduced": 2.2 },
  { month: "Sep", ROI: 28, "CO2 Reduced": 2.6 },
];
