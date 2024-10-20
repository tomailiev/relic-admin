
export default function schematifySubscriber(item) {
    const subAddition = {
        imported: 'admin',
        id: item.email.toLowerCase(),
        email: item.email.toLowerCase()
    }
    const tags = item.tags.map(({ tag }) => tag);
    const status = item.status === 'Subscribed' ? 1 : 0;
    return { ...item, tags, status, ...subAddition };
};