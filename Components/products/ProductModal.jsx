import React, { useState } from "react";
import { Product } from "@/entities/Product";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Package, 
  MapPin, 
  QrCode, 
  Save, 
  AlertTriangle,
  TrendingDown,
  TrendingUp,
  CheckCircle,
  Edit
} from "lucide-react";
import { motion } from "framer-motion";

export default function ProductModal({ product, isOpen, onClose, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [editedProduct, setEditedProduct] = useState(product);

  const handleSave = async () => {
    setIsLoading(true);
    try {
      await Product.update(product.id, editedProduct);
      onUpdate();
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating product:", error);
    }
    setIsLoading(false);
  };

  const handleInputChange = (field, value) => {
    setEditedProduct(prev => ({ ...prev, [field]: value }));
  };

  const getStockStatus = () => {
    const current = editedProduct.current_quantity || 0;
    const min = editedProduct.min_quantity || 0;
    const max = editedProduct.max_quantity || 0;
    
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
  const StatusIcon = stockStatus.icon;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="flex flex-row items-center justify-between pb-4 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
              <Package className="w-6 h-6 text-white" />
            </div>
            <div>
              <DialogTitle className="text-xl font-bold text-slate-900">
                Product Details
              </DialogTitle>
              <p className="text-slate-600 text-sm">{product.internal_name}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge className={`${stockStatus.color} flex items-center gap-1`}>
              <StatusIcon className={`w-4 h-4 ${stockStatus.iconColor}`} />
              {stockStatus.label}
            </Badge>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsEditing(!isEditing)}
              className="flex items-center gap-2"
            >
              <Edit className="w-4 h-4" />
              {isEditing ? 'Cancel' : 'Edit'}
            </Button>
          </div>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-semibold text-slate-700">Internal Name</Label>
                {isEditing ? (
                  <Input
                    value={editedProduct.internal_name || ''}
                    onChange={(e) => handleInputChange('internal_name', e.target.value)}
                    className="mt-1"
                  />
                ) : (
                  <p className="text-slate-900 font-medium mt-1">{product.internal_name}</p>
                )}
              </div>

              <div>
                <Label className="text-sm font-semibold text-slate-700">Customer Name</Label>
                {isEditing ? (
                  <Input
                    value={editedProduct.customer_name || ''}
                    onChange={(e) => handleInputChange('customer_name', e.target.value)}
                    className="mt-1"
                  />
                ) : (
                  <p className="text-slate-900 font-medium mt-1">{product.customer_name || 'Not specified'}</p>
                )}
              </div>

              <div>
                <Label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Bin Location
                </Label>
                {isEditing ? (
                  <Input
                    value={editedProduct.bin_location || ''}
                    onChange={(e) => handleInputChange('bin_location', e.target.value)}
                    className="mt-1 font-mono"
                  />
                ) : (
                  <p className="text-slate-900 font-mono font-medium mt-1">{product.bin_location}</p>
                )}
              </div>

              <div>
                <Label className="text-sm font-semibold text-slate-700">Category</Label>
                {isEditing ? (
                  <Select 
                    value={editedProduct.category || 'other'} 
                    onValueChange={(value) => handleInputChange('category', value)}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="electronics">Electronics</SelectItem>
                      <SelectItem value="apparel">Apparel</SelectItem>
                      <SelectItem value="home">Home & Garden</SelectItem>
                      <SelectItem value="beauty">Beauty & Personal Care</SelectItem>
                      <SelectItem value="sports">Sports & Outdoors</SelectItem>
                      <SelectItem value="automotive">Automotive</SelectItem>
                      <SelectItem value="books">Books</SelectItem>
                      <SelectItem value="toys">Toys & Games</SelectItem>
                      <SelectItem value="food">Food & Beverages</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                ) : (
                  <p className="text-slate-900 font-medium mt-1 capitalize">
                    {product.category?.replace('_', ' ') || 'Other'}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <Label className="text-sm font-semibold text-slate-700">Minimum</Label>
                  {isEditing ? (
                    <Input
                      type="number"
                      value={editedProduct.min_quantity || ''}
                      onChange={(e) => handleInputChange('min_quantity', parseInt(e.target.value) || 0)}
                      className="mt-1"
                    />
                  ) : (
                    <p className="text-slate-900 font-medium mt-1">{product.min_quantity || 0}</p>
                  )}
                </div>

                <div>
                  <Label className="text-sm font-semibold text-slate-700">Current</Label>
                  {isEditing ? (
                    <Input
                      type="number"
                      value={editedProduct.current_quantity || ''}
                      onChange={(e) => handleInputChange('current_quantity', parseInt(e.target.value) || 0)}
                      className="mt-1"
                    />
                  ) : (
                    <p className="text-slate-900 font-bold text-lg mt-1">{product.current_quantity || 0}</p>
                  )}
                </div>

                <div>
                  <Label className="text-sm font-semibold text-slate-700">Maximum</Label>
                  {isEditing ? (
                    <Input
                      type="number"
                      value={editedProduct.max_quantity || ''}
                      onChange={(e) => handleInputChange('max_quantity', parseInt(e.target.value) || 0)}
                      className="mt-1"
                    />
                  ) : (
                    <p className="text-slate-900 font-medium mt-1">{product.max_quantity || 0}</p>
                  )}
                </div>
              </div>

              <div>
                <Label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                  <QrCode className="w-4 h-4" />
                  UPC Code
                </Label>
                {isEditing ? (
                  <Input
                    value={editedProduct.upc_code || ''}
                    onChange={(e) => handleInputChange('upc_code', e.target.value)}
                    className="mt-1 font-mono"
                    placeholder="Scan or enter UPC"
                  />
                ) : product.upc_code ? (
                  <p className="text-slate-900 font-mono font-medium mt-1">{product.upc_code}</p>
                ) : (
                  <div className="flex items-center gap-2 mt-1 text-amber-600">
                    <AlertTriangle className="w-4 h-4" />
                    <span className="text-sm">No UPC assigned</span>
                  </div>
                )}
              </div>

              <div>
                <Label className="text-sm font-semibold text-slate-700">Status</Label>
                {isEditing ? (
                  <Select 
                    value={editedProduct.status || 'active'} 
                    onValueChange={(value) => handleInputChange('status', value)}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="discontinued">Discontinued</SelectItem>
                    </SelectContent>
                  </Select>
                ) : (
                  <Badge className={`mt-1 ${
                    product.status === 'active' ? 'bg-green-100 text-green-700 border-green-200' :
                    product.status === 'inactive' ? 'bg-slate-100 text-slate-700 border-slate-200' :
                    'bg-red-100 text-red-700 border-red-200'
                  }`}>
                    {product.status || 'Active'}
                  </Badge>
                )}
              </div>
            </div>
          </div>

          {isEditing && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-end gap-3 pt-4 border-t border-slate-200"
            >
              <Button
                variant="outline"
                onClick={() => setIsEditing(false)}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                disabled={isLoading}
                className="bg-emerald-600 hover:bg-emerald-700 flex items-center gap-2"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    Save Changes
                  </>
                )}
              </Button>
            </motion.div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}