import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FileText, Check, X, Loader2, PartyPopper, AlertTriangle } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function ImportPreview({ data, fileName, onConfirm, onCancel, importStatus }) {
  const headers = Object.keys(data[0] || {});
  const isProcessing = importStatus.state === 'loading' || importStatus.state === 'success';

  const getStatusComponent = () => {
    switch (importStatus.state) {
      case 'loading':
        return (
          <div className="flex items-center gap-2">
            <Loader2 className="w-4 h-4 animate-spin" />
            {importStatus.message}
          </div>
        );
      case 'success':
        return (
          <div className="flex items-center gap-2 text-green-700">
            <PartyPopper className="w-4 h-4" />
            {importStatus.message}
          </div>
        );
      case 'error':
        return (
          <div className="flex items-center gap-2 text-red-700">
            <AlertTriangle className="w-4 h-4" />
            {importStatus.message}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
      <CardHeader>
        <div className="flex items-center gap-3">
          <FileText className="w-6 h-6 text-emerald-600" />
          <div>
            <CardTitle>Import Preview</CardTitle>
            <p className="text-sm text-slate-500">
              Found {data.length} products in <span className="font-semibold">{fileName}</span>. Please verify the data.
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-72 w-full rounded-md border">
          <Table>
            <TableHeader className="sticky top-0 bg-slate-50">
              <TableRow>
                {headers.map(header => (
                  <TableHead key={header} className="font-semibold capitalize">
                    {header.replace(/_/g, ' ')}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((row, rowIndex) => (
                <TableRow key={rowIndex}>
                  {headers.map(header => (
                    <TableCell key={header} className="text-sm">
                      {row[header]?.toString() || ''}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <div className="text-sm font-medium text-slate-700">
          {getStatusComponent()}
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={onCancel} disabled={isProcessing}>
            <X className="mr-2 h-4 w-4" />
            Cancel
          </Button>
          <Button 
            className="bg-emerald-600 hover:bg-emerald-700"
            onClick={onConfirm}
            disabled={isProcessing}
          >
            <Check className="mr-2 h-4 w-4" />
            Confirm Import
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}