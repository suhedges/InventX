import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Package, 
  MapPin, 
  QrCode, 
  CheckCircle, 
  AlertTriangle, 
  X,
  TrendingDown,
  TrendingUp
} from "lucide-react";
import { format } from "date-fns";
import { motion } from "framer-motion";

export default function ProductResult({ result, onClear }) {
  const { code, timestamp, product } = result;

  const getStockStatus = () => {
    if (!product) return null;
    
    const current = product.current_quantity || 0;
    const min = product.min_quantity || 0;
    const max = product.max_quantity || 0;
    
    if (current < min) {
      return { 
        status: "low", 
        label: "Low Stock", 
        color: "bg-red-100 text-red-700 border-red-200",
        icon: TrendingDown,
        iconColor: "text-red-600"
      };
    }
    if (current > max) {
      return { 
        status: "high", 
        label: "Overstock", 
        color: "bg-orange-100 text-orange-700 border-orange-200",
        icon: TrendingUp,
        iconColor: "text-orange-600"
      };
    }
    return { 
      status: "optimal", 
      label: "Optimal", 
      color: "bg-green-100 text-green-700 border-green-200",
      icon: CheckCircle,
      iconColor: "text-green-600"
    };
  };

  const stockStatus = getStockStatus();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-slate-50 to-slate-100 border-b border-slate-200">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-lg">
              <QrCode className="w-5 h-5 text-emerald-600" />
              Scan Result
            </CardTitle>
            <Button variant="ghost" size="icon" onClick={onClear}>
              <X className="w-4 h-4" />
            </Button>
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <span>Scanned at {format(timestamp, "HH:mm:ss")}</span>
            <span>•</span>
            <span className="font-mono">{code}</span>
          </div>
        </CardHeader>
        
        <CardContent className="p-6">
          {product ? (
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Package className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-slate-900 mb-1">
                    {product.internal_name}
                  </h3>
                  {product.customer_name && (
                    <p className="text-slate-600 mb-2">{product.customer_name}</p>
                  )}
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1 text-slate-600">
                      <MapPin className="w-4 h-4" />
                      <span className="font-mono text-sm">{product.bin_location}</span>
                    </div>
                    {stockStatus && (
                      <Badge className={`${stockStatus.color} flex items-center gap-1`}>
                        <stockStatus.icon className={`w-3 h-3 ${stockStatus.iconColor}`} />
                        {stockStatus.label}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 p-4 bg-slate-50 rounded-xl">
                <div className="text-center">
                  <p className="text-sm text-slate-600 mb-1">Minimum</p>
                  <p className="text-lg font-semibold text-slate-900">
                    {product.min_quantity || 0}
                  </p>
                </div>
                <div className="text-center border-x border-slate-200">
                  <p className="text-sm text-slate-600 mb-1">Current</p>
                  <p className="text-2xl font-bold text-slate-900">
                    {product.current_quantity || 0}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-slate-600 mb-1">Maximum</p>
                  <p className="text-lg font-semibold text-slate-900">
                    {product.max_quantity || 0}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-emerald-50 rounded-xl border border-emerald-200">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-emerald-600" />
                  <span className="font-medium text-emerald-800">Product Found</span>
                </div>
                <span className="text-sm text-emerald-600 capitalize">
                  {product.category?.replace('_', ' ') || 'Uncategorized'}
                </span>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertTriangle className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                Product Not Found
              </h3>
              <p className="text-slate-600 mb-4">
                No product found with UPC code: <span className="font-mono font-semibold">{code}</span>
              </p>
              <div className="p-4 bg-amber-50 rounded-xl border border-amber-200">
                <p className="text-sm text-amber-800">
                  This UPC code is not assigned to any product in your inventory. 
                  You may need to add this product or assign this UPC to an existing product.
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}