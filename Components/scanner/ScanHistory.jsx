import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  History, 
  Package, 
  AlertTriangle, 
  Eye,
  Clock,
  QrCode
} from "lucide-react";
import { format } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";

export default function ScanHistory({ history, onSelectResult }) {
  return (
    <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
      <CardHeader className="bg-gradient-to-r from-slate-50 to-slate-100 border-b border-slate-200">
        <CardTitle className="flex items-center gap-2 text-lg">
          <History className="w-5 h-5 text-slate-600" />
          Recent Scans
        </CardTitle>
      </CardHeader>
      
      <CardContent className="p-4">
        <div className="space-y-3 max-h-64 overflow-y-auto">
          <AnimatePresence>
            {history.map((result, index) => (
              <motion.div
                key={`${result.code}-${result.timestamp.getTime()}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center justify-between p-3 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors duration-200 group"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    result.product 
                      ? 'bg-green-100 text-green-600' 
                      : 'bg-red-100 text-red-600'
                  }`}>
                    {result.product ? (
                      <Package className="w-5 h-5" />
                    ) : (
                      <AlertTriangle className="w-5 h-5" />
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <QrCode className="w-4 h-4 text-slate-400" />
                      <span className="font-mono text-sm font-medium text-slate-900">
                        {result.code}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <Clock className="w-3 h-3" />
                      <span>{format(result.timestamp, "HH:mm:ss")}</span>
                      {result.product && (
                        <>
                          <span>•</span>
                          <span className="truncate">{result.product.internal_name}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Badge 
                    variant={result.product ? "default" : "destructive"}
                    className="text-xs"
                  >
                    {result.product ? "Found" : "Not Found"}
                  </Badge>
                  
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => onSelectResult(result)}
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {history.length === 0 && (
          <div className="text-center py-8 text-slate-500">
            <History className="w-12 h-12 mx-auto mb-3 text-slate-300" />
            <p className="font-medium">No scan history</p>
            <p className="text-sm">Your recent scans will appear here</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}