
export const ESSENTIALS_TABS = ["All", "Moisturizer", "Serum", "Cleanser", "Toner"];

export function filterProductsByEssentialsTab(list, tab) {
    if (!list || !Array.isArray(list) || tab === "All") return list || [];
    const key = tab.toLowerCase();
    return list.filter((p) => p.essentialsTag === key);
}