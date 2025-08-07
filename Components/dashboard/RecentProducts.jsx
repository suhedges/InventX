import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MapPin, Package, Eye, AlertTriangle } from "lucide-react";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { motion } from "framer-motion";

export default function RecentProducts({ products, isLoading }) {
  const getStockBadge = (product) => {
    if (product.current_quantity < product.min_quantity) {
      return <Badge className="bg-red-100 text-red-700 border-red-200">Low Stock</Badge>;
    }
    if (product.current_quantity > product.max_quantity) {
      return <Badge className="bg-orange-100 text-orange-700 border-orange-200">Overstock</Badge>;
    }
    return <Badge className="bg-green-100 text-green-700 border-green-200">Optimal</Badge>;
  };

  const recentProducts = products.slice(0, 8);

  return (
    <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
      <CardHeader className="flex flex-row items-center justify-between bg-gradient-to-r from-slate-50 to-slate-100 border-b border-slate-200">
        <CardTitle className="text-xl font-bold flex items-center gap-2">
          <Package className="w-5 h-5 text-emerald-600" />
          Recent Products
        </CardTitle>
        <Link to={createPageUrl("Products")}>
          <Button variant="outline" size="sm" className="hover:bg-emerald-50 hover:border-emerald-300">
            View All
          </Button>
        </Link>
      </CardHeader>
      
      <CardContent className="p-0">
        {isLoading ? (
          <div className="p-6 space-y-4">
            {Array(6).fill(0).map((_, i) => (
              <div key={i} className="animate-pulse flex items-center space-x-4 py-3">
                <div className="w-10 h-10 bg-slate-200 rounded-lg"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                  <div className="h-3 bg-slate-200 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50">
                  <TableHead className="font-semibold">Product</TableHead>
                  <TableHead className="font-semibold">Location</TableHead>
                  <TableHead className="font-semibold">Stock Status</TableHead>
                  <TableHead className="font-semibold">Quantity</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentProducts.map((product, index) => (
                  <motion.tr
                    key={product.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="hover:bg-slate-50 transition-colors duration-200 group"
                  >
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
                          <Package className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="font-semibold text-slate-900">{product.internal_name}</p>
                          <p className="text-sm text-slate-500">{product.customer_name}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-slate-600">
                        <MapPin className="w-4 h-4" />
                        <span className="font-mono text-sm">{product.bin_location}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {getStockBadge(product)}
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <span className="font-semibold">{product.current_quantity || 0}</span>
                        <span className="text-slate-500 ml-2">
                          ({product.min_quantity}-{product.max_quantity})
                        </span>
                      </div>
                    </TableCell>
                  </motion.tr>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}