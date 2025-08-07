import React from "react";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Filter, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ProductFilters({ filters, onFiltersChange }) {
  const categories = [
    { value: "all", label: "All Categories" },
    { value: "electronics", label: "Electronics" },
    { value: "apparel", label: "Apparel" },
    { value: "home", label: "Home & Garden" },
    { value: "beauty", label: "Beauty & Personal Care" },
    { value: "sports", label: "Sports & Outdoors" },
    { value: "automotive", label: "Automotive" },
    { value: "books", label: "Books" },
    { value: "toys", label: "Toys & Games" },
    { value: "food", label: "Food & Beverages" },
    { value: "other", label: "Other" }
  ];

  const statuses = [
    { value: "all", label: "All Status" },
    { value: "active", label: "Active" },
    { value: "inactive", label: "Inactive" },
    { value: "discontinued", label: "Discontinued" }
  ];

  const stockLevels = [
    { value: "all", label: "All Stock Levels" },
    { value: "under_min", label: "Under Minimum" },
    { value: "optimal", label: "Optimal Range" },
    { value: "over_max", label: "Over Maximum" }
  ];

  const handleFilterChange = (key, value) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const clearFilters = () => {
    onFiltersChange({ category: "all", status: "all", stockLevel: "all" });
  };

  const getActiveFiltersCount = () => {
    return Object.values(filters).filter(value => value !== "all").length;
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4 items-center">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-500" />
          <span className="text-sm font-medium text-slate-600">Filters:</span>
        </div>
        
        <Select value={filters.category} onValueChange={(value) => handleFilterChange("category", value)}>
          <SelectTrigger className="w-48 bg-white border-slate-200">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category.value} value={category.value}>
                {category.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={filters.status} onValueChange={(value) => handleFilterChange("status", value)}>
          <SelectTrigger className="w-40 bg-white border-slate-200">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            {statuses.map((status) => (
              <SelectItem key={status.value} value={status.value}>
                {status.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={filters.stockLevel} onValueChange={(value) => handleFilterChange("stockLevel", value)}>
          <SelectTrigger className="w-48 bg-white border-slate-200">
            <SelectValue placeholder="Stock Level" />
          </SelectTrigger>
          <SelectContent>
            {stockLevels.map((level) => (
              <SelectItem key={level.value} value={level.value}>
                {level.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {getActiveFiltersCount() > 0 && (
          <Button
            variant="outline"
            size="sm"
            onClick={clearFilters}
            className="flex items-center gap-2"
          >
            <X className="w-4 h-4" />
            Clear ({getActiveFiltersCount()})
          </Button>
        )}
      </div>

      {getActiveFiltersCount() > 0 && (
        <div className="flex flex-wrap gap-2">
          {filters.category !== "all" && (
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
              {categories.find(c => c.value === filters.category)?.label}
            </Badge>
          )}
          {filters.status !== "all" && (
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              {statuses.find(s => s.value === filters.status)?.label}
            </Badge>
          )}
          {filters.stockLevel !== "all" && (
            <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
              {stockLevels.find(l => l.value === filters.stockLevel)?.label}
            </Badge>
          )}
        </div>
      )}
    </div>
  );
}