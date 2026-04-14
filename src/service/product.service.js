
import { cookies } from "next/headers";

export default async function getAllProducts() {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("next-auth.session-token")?.value;

        const res = await fetch(`${process.env.API_BASE_URL}/products`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            cache: 'no-store'
        });

        if (!res.ok) return [];
        const result = await res.json();
        return result.payload || result.data || [];
    } catch (error) {
        return [];
    }
}

