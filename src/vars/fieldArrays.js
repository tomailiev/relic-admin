const videoFA = [
    { label: 'Featured priority', id: 'featured', type: 'number' },
    { label: 'Title', id: 'title' },
    { label: 'YouTube Id', id: 'youtubeId' },
    { label: 'Thumbail Url', id: 'thumbnail' },
];

const textFA = [
    { label: 'Title', id: 'key' },
    { label: 'Value', id: 'value' }
];

const musicianFA = [
    { label: 'Bio', id: 'bio', },
    { label: 'Name', id: 'name' },
    { label: 'Featured in season', id: 'featured', type: 'number' },
    { label: 'Title/Instrument', id: 'newTitle' },
    { label: 'Avatar', id: 'pic', type: 'file', path: 'mock-images/musicians' }
];

const eventFA = [
    { label: 'Date done', id: 'dateDone', type: 'date' },
    { label: 'Description', id: 'description' },
    { label: 'Image Url', id: 'imageUrl', type: 'file', path: 'mock-images/events' },
    { label: 'Title', id: 'title' },
];

const performaneFA = [
    { label: 'Date', id: 'date', type: 'date' },
    { label: 'Time', id: 'time', type: 'time' },
    { label: 'Order #', id: 'id', },
    { label: 'Location (Portland, OR)', id: 'location' },
    { label: 'Url', id: 'url' },
    { label: 'Venue', id: 'venue' },
    { label: 'Latitude', id: 'lat', },
    { label: 'Longitude', id: 'lng', },
];

const userLoginFA = [
    { label: 'Email', id: 'email' },
    { label: 'Password', id: 'password', type: 'password' }
];

export {
    videoFA, musicianFA, eventFA, performaneFA, textFA, userLoginFA
}