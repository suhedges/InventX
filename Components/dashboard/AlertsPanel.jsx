import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, TrendingDown, TrendingUp, Package } from "lucide-react";
import { motion } from "framer-motion";

export default function AlertsPanel({ products }) {
  const lowStockProducts = products.filter(p => p.current_quantity < p.min_quantity).slice(0, 5);
  const overstockProducts = products.filter(p => p.current_quantity > p.max_quantity).slice(0, 5);
  const missingUPC = products.filter(p => !p.upc_code).slice(0, 3);

  const alerts = [
    ...lowStockProducts.map(p => ({ type: 'low', product: p })),
    ...overstockProducts.map(p => ({ type: 'over', product: p })),
    ...missingUPC.map(p => ({ type: 'upc', product: p }))
  ].slice(0, 8);

  const getAlertConfig = (type) => {
    switch (type) {
      case 'low':
        return { 
          icon: TrendingDown, 
          color: 'text-red-600', 
          bg: 'bg-red-50', 
          border: 'border-red-200',
          label: 'Low Stock' 
        };
      case 'over':
        return { 
          icon: TrendingUp, 
          color: 'text-orange-600', 
          bg: 'bg-orange-50', 
          border: 'border-orange-200',
          label: 'Overstock' 
        };
      case 'upc':
        return { 
          icon: Package, 
          color: 'text-amber-600', 
          bg: 'bg-amber-50', 
          border: 'border-amber-200',
          label: 'Missing UPC' 
        };
      default:
        return { 
          icon: AlertTriangle, 
          color: 'text-slate-600', 
          bg: 'bg-slate-50', 
          border: 'border-slate-200',
          label: 'Alert' 
        };
    }
  };

  return (
    <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
      <CardHeader className="bg-gradient-to-r from-slate-50 to-slate-100 border-b border-slate-200">
        <CardTitle className="text-lg font-bold flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-amber-600" />
          Inventory Alerts
        </CardTitle>
      </CardHeader>
      
      <CardContent className="p-4">
        {alerts.length === 0 ? (
          <div className="text-center py-8 text-slate-500">
            <AlertTriangle className="w-12 h-12 mx-auto mb-3 text-slate-300" />
            <p className="font-medium">All good!</p>
            <p className="text-sm">No inventory alerts</p>
          </div>
        ) : (
          <div className="space-y-3">
            {alerts.map((alert, index) => {
              const config = getAlertConfig(alert.type);
              const Icon = config.icon;
              
              return (
                <motion.div
                  key={`${alert.product.id}-${alert.type}`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-3 rounded-lg border ${config.bg} ${config.border} hover:shadow-md transition-shadow duration-200`}
                >
                  <div className="flex items-start gap-3">
                    <Icon className={`w-4 h-4 mt-0.5 ${config.color}`} />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-slate-900 text-sm truncate">
                        {alert.product.internal_name}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="text-xs">
                          {config.label}
                        </Badge>
                        <span className="text-xs text-slate-500 font-mono">
                          {alert.product.bin_location}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}