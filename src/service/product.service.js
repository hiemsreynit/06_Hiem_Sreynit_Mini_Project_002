export async function getAllProducts () {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}`);
    const user = await res.json();
}