import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FileDown, MoreHorizontal, Eye, Trash2, MailCheck } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedInquiry, setSelectedInquiry] = useState<any>(null);

  const fetchInquiries = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/inquiries');
      const data = await res.json();
      setInquiries(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  const handleOpenView = (inquiry: any) => {
    setSelectedInquiry(inquiry);
    setIsOpen(true);
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      await fetch(`http://localhost:5000/api/inquiries/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      fetchInquiries();
      setIsOpen(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this inquiry?')) return;
    try {
      await fetch(`http://localhost:5000/api/inquiries/${id}`, { method: 'DELETE' });
      fetchInquiries();
    } catch (err) {
      console.error(err);
    }
  };

  const handleExportCSV = () => {
    if (inquiries.length === 0) return alert('No inquiries to export.');
    
    const headers = ['Company', 'Contact Name', 'Email', 'Country', 'Status', 'Date Received', 'Message'];
    const rows = inquiries.map(inquiry => [
      `"${(inquiry.company || '').replace(/"/g, '""')}"`,
      `"${(inquiry.name || '').replace(/"/g, '""')}"`,
      `"${(inquiry.email || '').replace(/"/g, '""')}"`,
      `"${(inquiry.country || '').replace(/"/g, '""')}"`,
      `"${(inquiry.status || '').replace(/"/g, '""')}"`,
      `"${new Date(inquiry.createdAt).toLocaleDateString()}"`,
      `"${(inquiry.message || '').replace(/"/g, '""').replace(/\n/g, ' ')}"`
    ].join(','));
    
    const csvContent = [headers.join(','), ...rows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `inquiries_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold font-headline">Customer Inquiries</h1>
          <p className="text-muted-foreground">
            Review and manage all incoming quote requests from potential clients.
          </p>
        </div>
        <Button onClick={handleExportCSV} disabled={inquiries.length === 0}>
          <FileDown className="mr-2 h-4 w-4" /> Export as CSV
        </Button>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-md">
          {selectedInquiry && (
            <>
              <DialogHeader>
                <DialogTitle>Inquiry Details</DialogTitle>
                <DialogDescription>
                  Received from {selectedInquiry.name} ({selectedInquiry.company})
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-muted-foreground uppercase">Email</label>
                  <p className="text-sm font-medium">{selectedInquiry.email}</p>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-muted-foreground uppercase">Country</label>
                  <p className="text-sm font-medium">{selectedInquiry.country}</p>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-muted-foreground uppercase">Message</label>
                  <p className="text-sm whitespace-pre-wrap bg-slate-50 dark:bg-slate-900 p-3 rounded-md">{selectedInquiry.message || 'No message provided.'}</p>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-muted-foreground uppercase">Status</label>
                  <div>
                    <Badge variant={selectedInquiry.status === 'Replied' ? 'default' : 'secondary'}>{selectedInquiry.status}</Badge>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsOpen(false)}>Close</Button>
                {selectedInquiry.status !== 'Replied' && (
                  <Button onClick={() => handleStatusChange(selectedInquiry._id, 'Replied')}>
                    <MailCheck className="mr-2 h-4 w-4" /> Mark as Replied
                  </Button>
                )}
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      <Card>
        <CardHeader>
          <CardTitle>Inquiry Inbox</CardTitle>
          <CardDescription>
            A log of all submitted inquiries, sorted by the most recent.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Company</TableHead>
                <TableHead className="hidden sm:table-cell">Contact Name</TableHead>
                <TableHead className="hidden md:table-cell">Country</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Received</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow><TableCell colSpan={6} className="text-center py-8">Loading inquiries...</TableCell></TableRow>
              ) : inquiries.length === 0 ? (
                <TableRow><TableCell colSpan={6} className="text-center py-8">No inquiries found.</TableCell></TableRow>
              ) : inquiries.map((inquiry) => (
                <TableRow key={inquiry._id}>
                  <TableCell className="font-medium">{inquiry.company}</TableCell>
                  <TableCell className="hidden sm:table-cell">{inquiry.name}</TableCell>
                  <TableCell className="hidden md:table-cell">{inquiry.country}</TableCell>
                  <TableCell>
                    <Badge variant={inquiry.status === 'Replied' ? 'default' : 'secondary'}>{inquiry.status}</Badge>
                  </TableCell>
                  <TableCell>{new Date(inquiry.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button aria-haspopup="true" size="icon" variant="ghost">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => handleOpenView(inquiry)}>
                          <Eye className="mr-2 h-4 w-4" /> View Details
                        </DropdownMenuItem>
                        {inquiry.status !== 'Replied' && (
                          <DropdownMenuItem onClick={() => handleStatusChange(inquiry._id, 'Replied')}>
                            <MailCheck className="mr-2 h-4 w-4" /> Mark as Replied
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem onClick={() => handleDelete(inquiry._id)} className="text-destructive">
                          <Trash2 className="mr-2 h-4 w-4" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
