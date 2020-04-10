let moviesData = [{
    id: 1,
    movieName: "Blade Runner 2049",
    genre: "Mystery,Drama,Action",
    language: "English,Hindi",
    poster: "https://upload.wikimedia.org/wikipedia/en/0/00/Iron_Man_poster.jpg",
    releaseDate: "2017",
    ratings: "4.9",
},
{
    id: 2,
    movieName: "Blade Runner 2049",
    genre: "Mystery,Drama,Action",
    language: "English,Hindi",
    poster: "https://via.placeholder.com/150",
    releaseDate: "2017",
    ratings: "4.9",
},
{
    id: 3,
    movieName: "Blade Runner 2049",
    genre: "Mystery,Drama,Action",
    language: "English,Hindi",
    poster: "https://via.placeholder.com/150",
    releaseDate: "2017",
    ratings: "4.9",
},
{
    id: 4,
    movieName: "Blade Runner 2049",
    genre: "Mystery,Drama,Action",
    language: "English,Hindi",
    poster: "https://via.placeholder.com/150x150",
    releaseDate: "2017",
    ratings: "4.9",
},
{
    id: 5,
    movieName: "Blade Runner 2049",
    genre: "Mystery,Drama,Action",
    language: "English,Hindi",
    poster: "https://via.placeholder.com/150x150",
    releaseDate: "2017",
    ratings: "4.9",
},
{
    id: 6,
    movieName: "Blade Runner 2049",
    genre: "Mystery,Drama,Action",
    language: "English,Hindi",
    poster: "https://via.placeholder.com/150x150",
    releaseDate: "2017",
    ratings: "4.9",
},
{
    id: 7,
    movieName: "Blade Runner 2049",
    genre: "Mystery,Drama,Action",
    language: "English,Hindi",
    poster: "https://via.placeholder.com/150x150",
    releaseDate: "2017",
    ratings: "4.9",
},
{
    id: 8,
    movieName: "Blade Runner 2049",
    genre: "Mystery,Drama,Action",
    language: "English,Hindi",
    poster: "https://via.placeholder.com/150x150",
    releaseDate: "2017",
    ratings: "4.9",
},
{
    id: 9,
    movieName: "Blade Runner 2049",
    genre: "Mystery,Drama,Action",
    language: "English,Hindi",
    poster: "https://via.placeholder.com/150x150",
    releaseDate: "2017",
    ratings: "4.9",
},
{
    id: 10,
    movieName: "Blade Runner 2049",
    genre: "Mystery,Drama,Action",
    language: "English,Hindi",
    poster: "https://via.placeholder.com/150x150",
    releaseDate: "2017",
    ratings: "4.9",
},
{
    id: 11,
    movieName: "Blade Runner 2049",
    genre: "Mystery,Drama,Action",
    language: "English,Hindi",
    poster: "https://via.placeholder.com/150x150",
    releaseDate: "2017",
    ratings: "4.9",
},
{
    id: 12,
    movieName: "Blade Runner 2049",
    genre: "Mystery,Drama,Action",
    language: "English,Hindi",
    poster: "https://via.placeholder.com/150X150",
    releaseDate: "2017",
    ratings: "4.9",
}]

window.onload = fetchData(moviesData)

function fetchData(Data) {
    let mainBox = document.getElementById("moviesContainer")
    let rowbox = document.createElement('div')
    rowbox.setAttribute("class", "row")
    for (let i = 0; i < moviesData.length; i++) {
        let card = document.createElement("div")
        card.setAttribute('class', 'col-3 cardholder m-2')


        let poster = document.createElement('div')
        poster.setAttribute('class', 'col-12 cardholder')

        let image = document.createElement('img')
        image.setAttribute('src', Data[i]['poster'])
        image.setAttribute("alt", "poster2")
        image.setAttribute("class", "cardholder")


        poster.appendChild(image)

        card.appendChild(poster)
        let h1Ele = document.createElement('h1')
        h1Ele.innerHTML = Data[i]['movieName']
        card.appendChild(h1Ele)
        let pEle = document.createElement('p')
        pEle.innerHTML = Data[i]['genre']
        card.appendChild(pEle)
        let btnEle = document.createElement('button')
        btnEle.setAttribute('onclick', `bookSeat(${Data[i]['id']})`)
        btnEle.innerHTML = "Book"
        card.appendChild(btnEle)
        rowbox.appendChild(card)
    }
    mainBox.appendChild(rowbox)
}

function bookSeat(id) {
    let temp = moviesData.find((ele) => ele.id == id)
    console.log(temp)
    localStorage.setItem('info', JSON.stringify(temp))
    alert("yess", id)
    location.replace("layout.html")
}



