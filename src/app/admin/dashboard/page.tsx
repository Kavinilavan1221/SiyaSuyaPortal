import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Package, FileText, DollarSign } from "lucide-react";
import { products, inquiries } from "@/lib/placeholder-data";

export default function AdminDashboardPage() {
    const totalProducts = products.length;
    const totalInquiries = inquiries.length;
    const estimatedValue = (totalInquiries * 12500).toLocaleString(); // Dummy calculation

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold font-headline">Dashboard Overview</h1>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Products</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalProducts}</div>
            <p className="text-xs text-muted-foreground">
              Different seafood products managed
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Inquiries</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalInquiries}</div>
            <p className="text-xs text-muted-foreground">
              Customer quote requests received
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Estimated Pipeline Value</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${estimatedValue}</div>
            <p className="text-xs text-muted-foreground">
              Based on total inquiries
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
            <CardTitle>Recent Inquiries</CardTitle>
        </CardHeader>
        <CardContent>
            <div className="space-y-4">
                {inquiries.slice(0, 3).map(inquiry => (
                    <div key={inquiry.id} className="flex items-center justify-between">
                        <div>
                            <p className="font-semibold">{inquiry.company} <span className="text-sm font-normal text-muted-foreground">({inquiry.name})</span></p>
                            <p className="text-sm text-muted-foreground">{inquiry.message.substring(0, 80)}...</p>
                        </div>
                        <div className="text-right">
                           <p className="text-sm font-medium">{inquiry.country}</p>
                           <p className="text-xs text-muted-foreground">{inquiry.createdAt.toLocaleDateString()}</p>
                        </div>
                    </div>
                ))}
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
