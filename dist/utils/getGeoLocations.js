import fetch from 'node-fetch';
export async function readTextFile(file) {
    const response = await fetch(file);
    const data = await response.json();
}
