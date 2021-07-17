export function anonUser(name: string) {
    if (name.includes(" ")) {
        const nameParts  = name.split(" ");
        const initial = nameParts[nameParts.length-1].charAt(0);
        name = nameParts[0].concat(" ", initial, ".");
    }
    return name;
}