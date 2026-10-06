import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, Download, Award, Receipt, ScrollText, ClipboardCheck, IdCard, Eye, ShieldCheck } from 'lucide-react';
import { documents } from '@/lib/demo-data';
import { useToast } from '@/hooks/use-toast';

const iconMap: Record<string, any> = { IdCard, FileText, Receipt, Award, ScrollText, ClipboardCheck };

export function DocumentsPage() {
  const { toast } = useToast();

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold">Digital Document Vault</h1>
        <p className="text-muted-foreground text-sm mt-1">Access and download your digital documents securely.</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {documents.map(doc => {
          const Icon = iconMap[doc.icon] || FileText;
          return (
            <Card key={doc.id} className="p-5 hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm">{doc.type}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {doc.issueDate ? `Issued: ${doc.issueDate}` : 'Not yet issued'}
                  </p>
                  <div className="mt-2">
                    <Badge variant={doc.status === 'available' ? 'default' : doc.status === 'pending' ? 'secondary' : 'outline'} className="capitalize">
                      {doc.status}
                    </Badge>
                  </div>
                  <div className="flex gap-2 mt-4">
                    {doc.status === 'available' && (
                      <>
                        <Button variant="outline" size="sm" className="flex-1" onClick={() => toast({ title: 'Downloading', description: `${doc.type} downloaded.` })}>
                          <Download className="h-3.5 w-3.5 mr-1" /> Download
                        </Button>
                        <Button variant="ghost" size="sm" className="flex-1" onClick={() => toast({ title: 'Preview', description: `Previewing ${doc.type}.` })}>
                          <Eye className="h-3.5 w-3.5 mr-1" /> View
                        </Button>
                      </>
                    )}
                    {doc.status === 'requested' && (
                      <p className="text-xs text-muted-foreground w-full text-center py-2">Request is being processed</p>
                    )}
                    {doc.status === 'pending' && (
                      <Button variant="outline" size="sm" className="flex-1" disabled>Awaiting Issue</Button>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <Card className="p-5 bg-primary/5 border-primary/20">
        <div className="flex items-start gap-3">
          <ShieldCheck className="h-5 w-5 text-primary shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-sm">Secure Document Vault</p>
            <p className="text-sm text-muted-foreground mt-1">All documents are digitally signed and verifiable. Each document carries a unique verification ID for authenticity checks.</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
