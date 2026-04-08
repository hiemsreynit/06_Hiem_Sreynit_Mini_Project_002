export async function getAllProducts () {
    const res = await fetch(`${process.env.API_BASE_URL}`);
    const user = await res.json();
}