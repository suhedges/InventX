import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { QrCode, Upload, Download, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { motion } from "framer-motion";

export default function QuickActions() {
  const actions = [
    {
      title: "Scan Products",
      description: "Quick barcode scanning",
      icon: QrCode,
      href: createPageUrl("Scanner"),
      gradient: "from-blue-500 to-blue-600"
    },
    {
      title: "Import CSV",
      description: "Upload product data",
      icon: Upload,
      href: createPageUrl("Import"),
      gradient: "from-emerald-500 to-emerald-600"
    },
    {
      title: "Export Data",
      description: "Download inventory reports",
      icon: Download,
      href: createPageUrl("Export"),
      gradient: "from-purple-500 to-purple-600"
    },
    {
      title: "Mass Assignment",
      description: "AI-powered UPC assignment",
      icon: Zap,
      href: createPageUrl("MassAssignment"),
      gradient: "from-amber-500 to-amber-600"
    }
  ];

  return (
    <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
      <CardHeader className="bg-gradient-to-r from-slate-50 to-slate-100 border-b border-slate-200">
        <CardTitle className="text-lg font-bold">Quick Actions</CardTitle>
      </CardHeader>
      
      <CardContent className="p-4">
        <div className="grid grid-cols-2 gap-3">
          {actions.map((action, index) => {
            const Icon = action.icon;
            return (
              <motion.div
                key={action.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link to={action.href}>
                  <Button
                    variant="outline"
                    className="w-full h-auto p-4 flex flex-col items-center gap-2 hover:shadow-lg transition-all duration-200 group border-slate-200 hover:border-slate-300"
                  >
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${action.gradient} flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-200`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="text-center">
                      <p className="font-semibold text-sm text-slate-900">
                        {action.title}
                      </p>
                      <p className="text-xs text-slate-500">
                        {action.description}
                      </p>
                    </div>
                  </Button>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}