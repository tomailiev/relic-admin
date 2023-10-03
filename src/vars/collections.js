const collections = {
    videos: process.env.NODE_ENV === 'development' ? 'mock-videos' : 'videos',
    events: process.env.NODE_ENV === 'development' ? 'mock-events' : 'events',
    musicians: process.env.NODE_ENV === 'development' ? 'mock-musicians' : 'musicians',
    texts: process.env.NODE_ENV === 'development' ? 'mock-textContent' : 'textContent',
    donors: 'donors',
    grants: 'grants',
};

export default collections;
