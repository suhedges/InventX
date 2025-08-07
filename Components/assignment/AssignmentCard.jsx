import React, { useState, useEffect } from "react";
import { Product } from "@/entities/Product";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { QrCode, Save, MapPin, Package, AlertCircle, Loader2 } from "lucide-react";

export default function AssignmentCard({ product, onSave }) {
  const [upc, setUpc] = useState("");
  const [error, setError] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  
  const handleSave = async () => {
    setError(null);
    if (!upc.trim()) {
      setError("UPC code cannot be empty.");
      return;
    }
    
    setIsSaving(true);
    
    // Check for duplicates
    const existing = await Product.filter({ upc_code: upc.trim() });
    if (existing.length > 0) {
      setError("This UPC is already assigned to another product.");
      setIsSaving(false);
      return;
    }
    
    try {
      await Product.update(product.id, { upc_code: upc.trim() });
      onSave();
    } catch (err) {
      setError("Failed to save UPC. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  useEffect(() => {
    setUpc("");
    setError(null);
  }, [product]);

  return (
    <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-slate-50 to-slate-100 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl flex items-center justify-center shadow-lg">
            <Package className="w-6 h-6 text-white" />
          </div>
          <div>
            <CardTitle className="text-xl font-bold text-slate-900">{product.internal_name}</CardTitle>
            <div className="flex items-center gap-2 text-slate-600 text-sm">
              <MapPin className="w-4 h-4" />
              Bin Location: <span className="font-mono font-semibold">{product.bin_location}</span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6 space-y-4">
        <div>
          <label htmlFor="upc-input" className="text-sm font-medium text-slate-700">
            Scan or Enter UPC Code
          </label>
          <div className="relative mt-1">
            <QrCode className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <Input
              id="upc-input"
              placeholder="Scan barcode..."
              value={upc}
              onChange={(e) => setUpc(e.target.value)}
              className="pl-10 h-14 text-lg border-slate-200 focus:border-amber-500 focus:ring-amber-500"
              autoFocus
            />
          </div>
        </div>
        
        {error && (
          <div className="p-3 bg-red-50 text-red-700 rounded-lg flex items-center gap-2 text-sm border border-red-200">
            <AlertCircle className="w-4 h-4" />
            {error}
          </div>
        )}
        
        <Button 
          size="lg" 
          className="w-full bg-emerald-600 hover:bg-emerald-700 h-12"
          onClick={handleSave}
          disabled={isSaving}
        >
          {isSaving ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="w-5 h-5 mr-2" />
              Save & Next
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}