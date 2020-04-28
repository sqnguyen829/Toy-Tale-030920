let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const toyForm = document.querySelector('.add-toy-form')

  toyForm.addEventListener('submit', (e) => {
    e.preventDefault()
    fetch('http://localhost:3000/toys', {
      method:"POST",
      headers:{
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body:JSON.stringify({
        name: e.target[0].value,
        image: e.target[1].value,
        likes: 0
      })
    })
    .then(res => res.json())
    .then(toy => {
      addToCollection(toy)
      e.target.reset()
    })
  })
  
  fetch(`http://localhost:3000/toys`)
  .then(res => res.json())
  .then(toys => {
    toys.forEach(toy => addToCollection(toy))
  })

  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  const addToCollection = (toy) => {
    const collectionDiv = document.getElementById('toy-collection')
    const toyCard = document.createElement('div')
    toyCard.className = 'card'

    const h2 = document.createElement('h2')
    h2.innerText = toy.name

    const img = document.createElement('img')
    img.className = 'toy-avatar'
    img.src = toy.image

    const p = document.createElement('p')
    p.innerText = `${toy.likes} likes`

    const likeBtn = document.createElement('button')
    likeBtn.className = 'like-btn'
    likeBtn.innerText = 'Like <3'

    likeBtn.addEventListener('click', () => {
      toy.likes++
      fetch(`http://localhost:3000/toys/${toy.id}`, {
        method:"PATCH",
        headers:{
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body:JSON.stringify({
          likes:toy.likes
        })
      })
      .then(res => res.json())
      .then(toy => { p.innerText = `${toy.likes} likes` })
    })

    toyCard.append(h2, img, p, likeBtn)
    collectionDiv.append(toyCard)
  }
});
