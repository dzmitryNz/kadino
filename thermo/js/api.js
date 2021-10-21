export default async function api(url) {
    const req = await fetch(url);
    const res = await req.json();
    // console.log(res)
    if (!res) throw new Error();
    return res;
};