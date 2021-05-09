export function fetchPosts (page = 1){
    const endpoint = `http://localhost:5000/posts/${page}`

    return fetch(endpoint)
        .then(res=>res.json())
        .then(res=>{
            if(!res.success){
                throw new Error(res)
            }
            return res.data
        }).catch(e=>{
            throw new Error(e);
        })
}

