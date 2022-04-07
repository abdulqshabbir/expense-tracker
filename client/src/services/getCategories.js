export default function getCategories() {
    return fetch("/api/categories")
    .then(res => {
        if (res.status === 200) {
            return res.json()
        } else {
            return null
        }
    })
    .catch(e => console.log(e))
}