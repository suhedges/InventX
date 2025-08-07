import React from "react";
import { Progress } from "@/components/ui/progress";

export default function AssignmentProgress({ current, total }) {
  const percentage = total > 0 ? (current / total) * 100 : 0;

  return (
    <div className="mb-6 p-4 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border">
      <div className="flex justify-between items-center mb-2">
        <p className="text-sm font-medium text-slate-700">Assignment Progress</p>
        <p className="text-sm font-semibold text-slate-900">
          <span className="font-mono">{current}</span> / <span className="font-mono">{total}</span> Products
        </p>
      </div>
      <Progress value={percentage} className="w-full [&>*]:bg-gradient-to-r [&>*]:from-amber-500 [&>*]:to-orange-500" />
    </div>
  );
}