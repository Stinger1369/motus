import React from "react";
import { XAxis as RechartsXAxis, YAxis as RechartsYAxis } from "recharts";

export const XAxis = ({ dataKey = "word", ...props }) => (
  <RechartsXAxis dataKey={dataKey} {...props} />
);

export const YAxis = ({ ...props }) => <RechartsYAxis {...props} />;
