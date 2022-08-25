document.addEventListener("DOMContentLoaded", function() {
    let eachLike
    let addLike
    function displayBooks(){
        fetch('http://localhost:3000/books')
        .then(resp =>resp.json())
        .then(data => data.forEach(element => renderBooks(element)))
    }
    displayBooks()
    function renderBooks(book){
        let list =  document.createElement('li')
        list.textContent = book.title
        document.querySelector('#list').appendChild(list)
        list.addEventListener('click',()=>{
            let display = document.getElementById('show-panel')
            display.innerHTML = ''
            let img = document.createElement('img')
            img.src = book.img_url
            let title = document.createElement('h4')
            title.textContent = book.title
            let subtitle = document.createElement('h5')
            subtitle.textContent = book.subtitle
            let author = document.createElement('h5')
            author.textContent = book.author
            let description = document.createElement('p')
            description.textContent = book.description
            let userLikes = document.createElement('ul')
            Array.from(book.users).forEach(user=>{
                eachLike = document.createElement('li')
                eachLike.textContent = user.username
                userLikes.appendChild(eachLike)
                })
            let likeButton = document.createElement('button')
            likeButton.textContent = 'LIKE'
            likeButton.addEventListener('click', ()=>{
                if (likeButton.textContent = 'LIKE'){
                    fetch(' http://localhost:3000/users')
                    .then(res=>res.json())
                    .then(data=>{
                        console.log(data);
                        let newLike = data[Math.floor(Math.random()*data.length)]
                        console.log(newLike);
                        addLike = newLike.username
                        console.log(addLike);
                        let li = document.createElement('li')
                        li.textContent+=addLike
                        eachLike.appendChild(li) 
                        book.users = [...book.users, newLike] 
                        addUser(book) 
                    })
                    likeButton.textContent = 'UNLIKE'
                }
            })
            display.append(img, title, subtitle, author, description, userLikes, likeButton)
        })
    }
    const addUser = (user)=>{
        fetch(`http://localhost:3000/books/${user.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Accept: "application/json"
            },
            body:JSON.stringify(user)
        })
        .then (data=>data.json())
        .then(data=>console.log(data))
    }
});