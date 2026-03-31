export const createNote = (title = '', content = '') => ({
    id: crypto.randomUUID(),
    title, 
    content,
    tags: [],
    imageUrl: null,
    category: 'all',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
})

export const formatDate = (isoString) => {
    const date = new Date(isoString);
    const now = new Date();
    const diffMs = now - date;
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if(diffHours < 1) return 'Just now'
    if(diffHours < 24) return `${diffHours}h ago`
    if(diffDays === 1) return 'Yesterday'

    return date.toLocaleDateString('en-US', {month: 'short', day: 'numeric' });
}


export const filterNotes = (notes, searchQuery, activeTag) => {
  return notes.filter(note => {
    const matchesSearch = note.title.toLowerCase().includes(searchQuery.toLowerCase()) || note.content.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesTag = activeTag === 'all' || note.tags.includes(activeTag);

    return matchesSearch && matchesTag;
  })
};

