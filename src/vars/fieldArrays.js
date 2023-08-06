const videoFA = [
    { label: 'Featured priority', id: 'featured', type: 'number' },
    { label: 'Title', id: 'title' },
    { label: 'YouTube Id', id: 'youtubeId' },
    { label: 'Thumbail Url', id: 'thumbnail' },
];

const initialVideoFA = [
    { label: 'Featured priority', id: 'featured', type: 'number' },
    { label: 'YouTube link', id: 'youtubeLink' },
]

const textFA = [
    { label: 'Title', id: 'key' },
    { label: 'Value', id: 'value', multiline: true }
];

const musicianFA = [
    { label: 'Bio', id: 'bio', multiline: true },
    { label: 'Name', id: 'name' },
    { label: 'Featured in season', id: 'featured', type: 'number' },
    { label: 'Title/Instrument', id: 'newTitle' },
    { label: 'Avatar', id: 'pic', type: 'file', path: 'mock-images/musicians' }
];

const eventFA = [
    { label: 'Date done', id: 'dateDone', type: 'date' },
    { label: 'Description', id: 'description', multiline: true },
    { label: 'Image Url', id: 'imageUrl', type: 'file', path: 'mock-images/events' },
    { label: 'Title', id: 'title' },
];

const performanceFA = [
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

const userRegisterFA = [
    { label: 'Email', id: 'email' },
    { label: 'Password', id: 'password', type: 'password' },
    { label: 'Password Confirmation', id: 'passwordConfirmation', type: 'password' }
]

export {
    videoFA, musicianFA, eventFA, performanceFA, textFA, userLoginFA, initialVideoFA, userRegisterFA
}