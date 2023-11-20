import { schematify } from "./schemaFunctions";

export default function schematifySubscriber(item) {
    const withTags = schematify(item, 'tags');
    const tags = withTags.tags.map(({ tag }) => tag);
    const status = Number(item.status);
    return { ...withTags, tags, status };
};