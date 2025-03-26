export default function hasProperty<T extends object>(obj: T, key: string | number | symbol): key is keyof T {
    return key in obj;
}