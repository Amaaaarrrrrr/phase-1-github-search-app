document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("#github-form");

    form.addEventListener("submit", (e) => {
        e.preventDefault()
        let search = e.target.search.value
        handleSearch(search)

    function handleSearch(){
        fetch("https://api.github.com/search/users?q=octocat" +search, {
            method: "GET",
            headers: {
                "Content-Type" : "application/json",
                Accept: "application/vnd.github.v3+json"
            },
            body: JSON.stringify()
            .then (res=> res.json())
            .then(data => {console.log (data)
                document.querySelector('#user-list').innerHTML =''
                document.querySelector('#repos-list').innerHTML =''

                data.items.forEach(user => {
                    let userCard =document.createElement('li')
                    userCard.className ="all-users"
                    userCard.innerHTML =`
                    <div class = "content" >
                    <h3> User: ${user.login}</h3>
                    <p> URL: ${user.html_url}</p>
                    <div>
                    <button class = "repo-button">
                    Repositories
                    </button>
                    </div>
                    <img src=${user.avatar_url} />
                    </div>
                    `
                    document.querySelector('#user_list').append(userCard)


                    const repoButton = document.querySelector('.repo-button')
                    repoButton.addEventListener('click', () => {
                        fetch (user.repos_url, {
                            headers: {
                                "Content-Type" : "application/json",
                                Accept: "application/vnd.github.v3+json"
                            },  
                        })
                        .then (res => res.json())
                        .then(data => {
                            data.forEach(repo => {
                                let repoCard = document.createElement('li')
                                repoCard.innerHTML =`
                                <h4> ${repo.name}</h4>
                                <p> ${repo.html_url}</p>
                                `
                                document.querySelector('#repos-list').appendChild(repoCard)
                            })
                        })
                    })
                })
            })
        })
    }
    })
})