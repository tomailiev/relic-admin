import { schematify } from "./schemaFunctions";

export default function schematifySubscriber(item) {
    const withTags = schematify(item, 'tags');
    const tags = withTags.tags.map(({ tag }) => tag);
    return { ...withTags, tags };
};