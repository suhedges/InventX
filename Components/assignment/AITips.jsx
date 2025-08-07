import React, { useState, useEffect } from "react";
import { InvokeLLM } from "@/integrations/Core";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const tipsCache = {};

export default function AITips() {
  const [tip, setTip] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchTip();
  }, []);

  const fetchTip = async () => {
    const cacheKey = "barcode_tip";
    if (tipsCache[cacheKey]) {
      setTip(tipsCache[cacheKey]);
      return;
    }

    setIsLoading(true);
    try {
      const response = await InvokeLLM({
        prompt: "Provide a single, concise, and helpful tip for a warehouse worker who is mass-assigning barcodes to products. The tip should focus on efficiency, accuracy, or best practices. For example: 'Keep your scanner clean for accurate reads' or 'Organize products by location before starting to minimize movement.'",
      });
      const generatedTip = response.trim();
      tipsCache[cacheKey] = generatedTip;
      setTip(generatedTip);
    } catch (error) {
      console.error("Error fetching AI tip:", error);
      setTip("Ensure good lighting on the barcode to improve scanner accuracy.");
    }
    setIsLoading(false);
  };

  return (
    <Card className="mt-6 border-0 shadow-lg bg-amber-50/50 border-amber-200">
      <CardHeader className="flex flex-row items-center gap-3 pb-2">
        <Lightbulb className="w-5 h-5 text-amber-600" />
        <CardTitle className="text-lg font-semibold text-amber-800">AI-Powered Tip</CardTitle>
      </CardHeader>
      <CardContent>
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2 text-slate-500"
            >
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Generating a helpful tip...</span>
            </motion.div>
          ) : (
            <motion.p
              key="tip"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-amber-900"
            >
              {tip}
            </motion.p>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}