window.onload = getData()

function getData() {
    fetch('./maindata.json')
        .then(function (res) {
            return res.json()
        })
        .then(function (res) {
            let temp = res
            localStorage.setItem('maindata', JSON.stringify(temp))
        })
}
let moviesData = JSON.parse(localStorage.getItem('maindata'))
let requiredData = []
window.onload = fetchData(moviesData)




// displaying Movies Cards 

function fetchData(Data) {
    let mainBox = document.getElementById("moviesContainer")
    mainBox.innerHTML = ""
    let rowBox = document.createElement('div')
    rowBox.setAttribute("class", "row justify-content-center")
    for (let i = 0; i < Data.length; i++) {
        let card = document.createElement("div")
        card.setAttribute('class', 'col-3 cardholder m-4 p-2')
        let poster = document.createElement('div')
        poster.setAttribute('class', 'col-12  text-center poster')
        let imageEle = document.createElement('img')
        imageEle.setAttribute('src', Data[i]['poster'])
        imageEle.setAttribute("alt", "poster2")
        poster.appendChild(imageEle)
        card.appendChild(poster)
        let textHolder = document.createElement('div')
        textHolder.setAttribute('class', 'textholder')
        card.appendChild(textHolder)
        let h3Ele = document.createElement('h3')
        h3Ele.innerHTML = Data[i]['movieName']
        textHolder.appendChild(h3Ele)
        let pEle = document.createElement('p')
        pEle.innerHTML = Data[i]['genre']
        textHolder.appendChild(pEle)
        let pEle2 = document.createElement('p')
        pEle2.innerHTML = Data[i]['language']
        textHolder.appendChild(pEle2)
        let btnEle = document.createElement('button')
        btnEle.setAttribute('class', 'btn btn-primary col-12')
        btnEle.setAttribute('onclick', `bookSeat(${Data[i]['id']})`)
        btnEle.innerHTML = "Book"
        card.appendChild(btnEle)
        rowBox.appendChild(card)
    }
    mainBox.appendChild(rowBox)
}

// Navingate to Theatre selection
function bookSeat(id) {
    let temp = moviesData.find((ele) => ele.id == id)
    console.log(temp)
    localStorage.setItem('info', JSON.stringify(temp))
    location.replace("layout.html")
}

// Features to Filter

function filterbyGenre(selectedInput) {
    let temp = []
    if (selectedInput == 'All') {
        temp = moviesData
        return temp
    }
    else {
        for (let i = 0; i < moviesData.length; i++) {
            let temp2 = moviesData[i]['genre'].split(",").map((ele) => ele)
            if (temp2.includes(selectedInput)) {
                temp.push(moviesData[i])
            }
        }
        return temp
    }
}
// filter available movies by lanuguage
function filterbyLanguage(data, selectedlan) {
    let temp = []
    if (selectedlan == 'All') {
        temp = data
        return temp
    }
    else {
        for (let i = 0; i < data.length; i++) {
            let temp2 = data[i]['language'].split(",").map((ele) => ele)
            if (temp2.includes(selectedlan)) {
                temp.push(data[i])
            }
        }
        return temp
    }
}

//function to get filtered movies onclicking search button

function submitFilter() {
    let selectedInput = document.getElementById("selectGenre").value
    let outputData = filterbyGenre(selectedInput)
    console.log(outputData)
    let selectedlan = document.getElementById('selectLaunguage').value
    let out = filterbyLanguage(outputData, selectedlan)
    fetchData(out)

}