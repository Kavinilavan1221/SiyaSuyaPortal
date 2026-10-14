import { useCallback, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Eye, MailCheck, MoreHorizontal, Trash2 } from 'lucide-react';

type ContactMessage = {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: 'New' | 'Replied';
  createdAt: string;
};

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

async function readApiResponse(response: Response): Promise<unknown> {
  const contentType = response.headers.get('content-type') || '';
  const body = await response.text();

  if (!contentType.includes('application/json')) {
    if (body.trimStart().startsWith('<')) {
      throw new Error(
        `The backend at ${API_URL} does not recognize the Messages API route. Restart the backend from the backend folder with "npm start", then try again.`
      );
    }
    throw new Error(`The backend returned an unexpected response (HTTP ${response.status}).`);
  }

  try {
    return JSON.parse(body) as unknown;
  } catch {
    throw new Error(`The backend returned invalid JSON (HTTP ${response.status}).`);
  }
}

function getApiError(data: unknown, fallback: string): string {
  if (typeof data === 'object' && data !== null && 'error' in data && typeof data.error === 'string') {
    return data.error;
  }
  return fallback;
}

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);

  const fetchMessages = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${API_URL}/api/contact/messages`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {}
      });
      const data = await readApiResponse(response);
      if (!response.ok) {
        throw new Error(getApiError(data, 'Unable to load contact messages.'));
      }
      if (!Array.isArray(data)) {
        throw new Error('The backend returned an invalid contact messages response.');
      }
      setMessages(data as ContactMessage[]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to load contact messages.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  const updateStatus = async (message: ContactMessage, status: ContactMessage['status']) => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${API_URL}/api/contact/messages/${message._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        },
        body: JSON.stringify({ status })
      });
      const data = await readApiResponse(response);
      if (!response.ok) {
        throw new Error(getApiError(data, 'Unable to update message status.'));
      }
      if (typeof data !== 'object' || data === null || !('_id' in data)) {
        throw new Error('The backend returned an invalid message response.');
      }
      const updatedMessage = data as ContactMessage;
      setMessages(current => current.map(item => item._id === updatedMessage._id ? updatedMessage : item));
      setSelectedMessage(updatedMessage);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to update message status.');
    }
  };

  const deleteMessage = async (message: ContactMessage) => {
    if (!window.confirm(`Delete the message from ${message.name}? This cannot be undone.`)) return;

    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${API_URL}/api/contact/messages/${message._id}`, {
        method: 'DELETE',
        headers: token ? { Authorization: `Bearer ${token}` } : {}
      });
      const data = await readApiResponse(response);
      if (!response.ok) {
        throw new Error(getApiError(data, 'Unable to delete contact message.'));
      }
      setMessages(current => current.filter(item => item._id !== message._id));
      if (selectedMessage?._id === message._id) setSelectedMessage(null);
      setError('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to delete contact message.');
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="font-headline text-3xl font-bold">Contact Messages</h1>
          <p className="text-muted-foreground">Review and manage messages submitted through the Contact page.</p>
        </div>
        <Button variant="outline" onClick={fetchMessages} disabled={loading}>
          Refresh
        </Button>
      </div>

      {error && (
        <div role="alert" className="flex flex-col gap-3 rounded-lg border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive sm:flex-row sm:items-center sm:justify-between">
          <span>{error}</span>
          <Button variant="outline" size="sm" onClick={fetchMessages} disabled={loading}>Try again</Button>
        </div>
      )}

      <Dialog open={selectedMessage !== null} onOpenChange={(open) => { if (!open) setSelectedMessage(null); }}>
        <DialogContent className="max-w-lg">
          {selectedMessage && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedMessage.subject}</DialogTitle>
                <DialogDescription>
                  From {selectedMessage.name} · {new Date(selectedMessage.createdAt).toLocaleString()}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-2">
                <div>
                  <p className="text-xs font-semibold uppercase text-muted-foreground">Email</p>
                  <a href={`mailto:${selectedMessage.email}`} className="text-sm text-primary hover:underline">
                    {selectedMessage.email}
                  </a>
                </div>
                <div>
                  <p className="mb-1 text-xs font-semibold uppercase text-muted-foreground">Message</p>
                  <p className="whitespace-pre-wrap break-words rounded-md bg-muted p-4 text-sm">{selectedMessage.message}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold uppercase text-muted-foreground">Status</span>
                  <Badge variant={selectedMessage.status === 'Replied' ? 'default' : 'secondary'}>
                    {selectedMessage.status}
                  </Badge>
                </div>
              </div>
              <DialogFooter className="flex-col gap-2 sm:flex-row">
                <Button variant="outline" onClick={() => setSelectedMessage(null)}>
                  Cancel
                </Button>
                {selectedMessage.status !== 'Replied' && (
                  <Button onClick={() => updateStatus(selectedMessage, 'Replied')}>
                    <MailCheck className="mr-2 h-4 w-4" /> Mark as replied
                  </Button>
                )}
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      <Card>
        <CardHeader>
          <CardTitle>Message Inbox</CardTitle>
          <CardDescription>Messages are sorted with the most recent first.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Sender</TableHead>
                <TableHead className="hidden md:table-cell">Subject</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Received</TableHead>
                <TableHead><span className="sr-only">Actions</span></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow><TableCell colSpan={5} className="py-8 text-center">Loading messages...</TableCell></TableRow>
              ) : messages.length === 0 ? (
                <TableRow><TableCell colSpan={5} className="py-8 text-center text-muted-foreground">No contact messages found.</TableCell></TableRow>
              ) : messages.map((message) => (
                <TableRow key={message._id}>
                  <TableCell>
                    <div className="font-medium">{message.name}</div>
                    <a href={`mailto:${message.email}`} className="text-xs text-muted-foreground hover:text-primary">{message.email}</a>
                  </TableCell>
                  <TableCell className="hidden max-w-xs truncate md:table-cell">{message.subject}</TableCell>
                  <TableCell>
                    <Badge variant={message.status === 'Replied' ? 'default' : 'secondary'}>{message.status}</Badge>
                  </TableCell>
                  <TableCell>{new Date(message.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button aria-haspopup="true" size="icon" variant="ghost">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Message actions</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => setSelectedMessage(message)}>
                          <Eye className="mr-2 h-4 w-4" /> View details
                        </DropdownMenuItem>
                        {message.status !== 'Replied' && (
                          <DropdownMenuItem onClick={() => updateStatus(message, 'Replied')}>
                            <MailCheck className="mr-2 h-4 w-4" /> Mark as replied
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem onClick={() => deleteMessage(message)} className="text-destructive">
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
