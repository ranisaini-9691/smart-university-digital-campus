import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, BookOpen, Star, Download, Clock, Bookmark, Sparkles, ArrowUpRight } from 'lucide-react';
import { books, learningRecommendations } from '@/lib/demo-data';
import { useToast } from '@/hooks/use-toast';

export function LibraryPage() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');
  const { toast } = useToast();

  const categories = ['all', ...Array.from(new Set(books.map(b => b.category)))];
  const filtered = books.filter(b =>
    (category === 'all' || b.category === category) &&
    (b.title.toLowerCase().includes(query.toLowerCase()) || b.author.toLowerCase().includes(query.toLowerCase()))
  );
  const borrowed = books.filter(b => !b.available);
  const aiRecommended = books.slice(0, 3);

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold">Digital Library</h1>
        <p className="text-muted-foreground text-sm mt-1">Search, borrow, and discover books with AI recommendations.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4"><p className="text-xs text-muted-foreground">Total Books</p><p className="text-2xl font-bold mt-1">15,000+</p></Card>
        <Card className="p-4"><p className="text-xs text-muted-foreground">Available</p><p className="text-2xl font-bold text-success mt-1">{books.filter(b => b.available).length}</p></Card>
        <Card className="p-4"><p className="text-xs text-muted-foreground">Borrowed</p><p className="text-2xl font-bold text-warning mt-1">{borrowed.length}</p></Card>
        <Card className="p-4"><p className="text-xs text-muted-foreground">Digital Resources</p><p className="text-2xl font-bold mt-1">3,200+</p></Card>
      </div>

      <Tabs defaultValue="search">
        <TabsList><TabsTrigger value="search">Search & Browse</TabsTrigger><TabsTrigger value="borrowed">My Borrowed</TabsTrigger><TabsTrigger value="recommended">AI Recommended</TabsTrigger></TabsList>

        <TabsContent value="search" className="space-y-4">
          <div className="flex gap-2 flex-wrap">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search by title or author..." className="pl-9" />
            </div>
            <div className="flex gap-2 flex-wrap">
              {categories.map(c => (
                <button key={c} onClick={() => setCategory(c)} className={`text-xs px-3 py-1.5 rounded-full transition-colors capitalize ${category === c ? 'bg-primary text-primary-foreground' : 'bg-muted hover:bg-muted/70'}`}>
                  {c === 'all' ? 'All Categories' : c}
                </button>
              ))}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map(book => (
              <Card key={book.id} className="p-4 hover:shadow-lg transition-shadow">
                <div className="flex gap-4">
                  <div className={`h-24 w-16 rounded-lg ${book.coverColor} flex items-center justify-center shrink-0 shadow-md`}>
                    <BookOpen className="h-8 w-8 text-white/80" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm line-clamp-2">{book.title}</p>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-1">{book.author}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <Star className="h-3 w-3 fill-warning text-warning" />
                      <span className="text-xs text-muted-foreground">{book.rating}</span>
                    </div>
                    <Badge variant={book.available ? 'default' : 'secondary'} className="mt-2 text-xs">{book.available ? 'Available' : `Due: ${book.dueDate}`}</Badge>
                    <Button size="sm" variant={book.available ? 'outline' : 'ghost'} className="w-full mt-2"
                      onClick={() => toast({ title: book.available ? 'Book Reserved' : 'Already Borrowed', description: book.available ? `${book.title} has been reserved.` : `Return by ${book.dueDate}` })}>
                      {book.available ? <><Bookmark className="h-3 w-3 mr-1" /> Reserve</> : <><Clock className="h-3 w-3 mr-1" /> Return Due</>}
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="borrowed" className="space-y-3">
          {borrowed.length === 0 ? (
            <Card className="p-8 text-center text-muted-foreground">No books currently borrowed.</Card>
          ) : (
            borrowed.map(book => (
              <Card key={book.id} className="p-4">
                <div className="flex items-center gap-4">
                  <div className={`h-20 w-14 rounded-lg ${book.coverColor} flex items-center justify-center shrink-0`}><BookOpen className="h-6 w-6 text-white/80" /></div>
                  <div className="flex-1">
                    <p className="font-semibold text-sm">{book.title}</p>
                    <p className="text-xs text-muted-foreground">{book.author}</p>
                    <div className="flex items-center gap-2 mt-1 text-xs text-warning"><Clock className="h-3 w-3" /> Due: {book.dueDate}</div>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => toast({ title: 'Book Returned', description: `${book.title} has been returned.` })}>Return</Button>
                </div>
              </Card>
            ))
          )}
        </TabsContent>

        <TabsContent value="recommended" className="space-y-4">
          <Card className="p-4 bg-primary/5 border-primary/20">
            <div className="flex items-center gap-2"><Sparkles className="h-4 w-4 text-primary" /><p className="text-sm font-medium">AI Recommendations</p></div>
            <p className="text-xs text-muted-foreground mt-1">Based on your subjects (CS301-CS305) and performance in Computer Networks.</p>
          </Card>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[books[3], books[6], books[5]].map(book => (
              <Card key={book.id} className="p-4 border-primary/20">
                <div className="flex gap-4">
                  <div className={`h-24 w-16 rounded-lg ${book.coverColor} flex items-center justify-center shrink-0 shadow-md`}><BookOpen className="h-8 w-8 text-white/80" /></div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm line-clamp-2">{book.title}</p>
                    <p className="text-xs text-muted-foreground mt-1">{book.author}</p>
                    <div className="flex items-center gap-1 mt-1"><Star className="h-3 w-3 fill-warning text-warning" /><span className="text-xs">{book.rating}</span></div>
                    <Button size="sm" className="w-full mt-2" onClick={() => toast({ title: 'Book Reserved', description: `${book.title} has been reserved.` })}>
                      <Bookmark className="h-3 w-3 mr-1" /> Reserve
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
