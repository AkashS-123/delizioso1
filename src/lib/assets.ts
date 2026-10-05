export const files = import.meta.glob("../assets/home/*", { eager: true, query: "?url", import: "default" }) as Record<string, string>;
export const img = (n: string) => files[`../assets/home/${n}`];
