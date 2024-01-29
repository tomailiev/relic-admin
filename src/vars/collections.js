const collections = {
    videos: process.env.NODE_ENV === 'development' ? 'mock-videos' : 'videos',
    events: process.env.NODE_ENV === 'development' ? 'mock-events' : 'events',
    musicians: process.env.NODE_ENV === 'development' ? 'mock-musicians' : 'musicians',
    texts: process.env.NODE_ENV === 'development' ? 'mock-textContent' : 'textContent',
    donors: 'donors',
    grants: 'grants',
    // csv: process.env.NODE_ENV === 'development' ? 'mock-emails' : 'CSVs',
    csv: 'CSVs',
    subscribers: process.env.NODE_ENV === 'development' ? 'mock-subscribers' : 'subscribers',
    images: process.env.NODE_ENV === 'development' ? 'mock-images' : 'images',
    campaigns: 'campaigns',
    tags: process.env.NODE_ENV === 'development' ? 'mock-tags' : 'tags',
};

export default collections;
