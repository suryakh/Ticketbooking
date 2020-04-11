
let theatreData = [{
    id: 1,
    theatreName: "Delux",
    location: "Bangalore",
    moviesId: "3,2,9",
    seatNo: 25
},
{
    id: 2,
    theatreName: "Imax",
    location: "Hyderabad",
    moviesId: "5,1,10,3,4",
    seatNo: 30
},
{
    id: 3,
    theatreName: "Sri",
    location: "Hyderbad",
    moviesId: "4,7,6,8",
    seatNo: 32
},
{
    id: 4,
    theatreName: "Navraga",
    location: "Bangalore",
    moviesId: "11",
    seatNo: 40

},
{
    id: 5,
    theatreName: "Inox",
    location: "Bangalore",
    moviesId: "12",
    seatNo: 30
}, {
    id: 6,
    theatreName: "Indian Theatre",
    location: "Hyderabad",
    moviesId: "10,11",
    seatNo: 20
}]

let timings = ["9:15AM", "11:45AM", "3:00PM", "6:00PM", "9:00PM"]
let duptimings = []

// Theatre Data 

window.onload = getData()
function getData() {
    let temp = localStorage.getItem('info')
    let movieData = JSON.parse(temp)
    let id = movieData['id']
    console.log(movieData)
    displayTheater(id)
}
let time = ""

//  For Filtering Theatre Based on Movie Selected

function displayTheater(id) {
    let availableTheatre = []
    for (let i = 0; i < theatreData.length; i++) {

        let temp = theatreData[i]['moviesId'].split(",").map((ele) => ele)
        if (temp.includes(id.toString())) {
            availableTheatre.push(theatreData[i])
        }
    }
    let maindiv = document.getElementById("theatreHolder")
    for (let i = 0; i < availableTheatre.length; i++) {
        let divEle = document.createElement("div")
        let h1Ele = document.createElement('h1')
        divEle.appendChild(h1Ele)
        let inputEle = document.createElement('input')
        inputEle.setAttribute('type', 'date')
        inputEle.setAttribute('id', `inputdate${availableTheatre[i]['id']}`)
        divEle.appendChild(inputEle)
        let timingsDiv = document.createElement('div')
        timingsDiv.setAttribute('class', 'timingsdiv')

        //  Show Timings of Selected Theatre

        for (let j = 0; j < timings.length; j++) {
            let divEle = document.createElement('div')
            divEle.innerHTML = timings[j]
            divEle.setAttribute('id', availableTheatre[i]['id'] + "_" + j)
            divEle.setAttribute('class', 'btn btn-outline-dark m-2')
            divEle.setAttribute('status', 0)
            divEle.setAttribute('onclick', "timeSlot('" + availableTheatre[i]['id'] + "_" + j + "')")
            timingsDiv.appendChild(divEle)
        }
        divEle.appendChild(timingsDiv)
        h1Ele.innerHTML = availableTheatre[i]['theatreName']
        let btn = document.createElement('button')
        btn.setAttribute('class', 'btn btn-success m-4')
        btn.innerHTML = "Select Seats"
        btn.setAttribute("onclick", `showlayout(${availableTheatre[i]['id']},${availableTheatre[i]['seatNo']})`)
        divEle.appendChild(btn)
        let layoutDiv = document.createElement("div")
        layoutDiv.setAttribute("class", "col-12 layoutholder")
        layoutDiv.setAttribute("id", `layout${availableTheatre[i]['id']}`)
        divEle.appendChild(layoutDiv)
        maindiv.appendChild(divEle)

    }
}


//  Toggle Logic for Timimgs 

function timeSlot(data) {
    let k = data.split("_")
    let timeslot = document.getElementById(data)
    let status = timeslot.getAttribute('status')
    if (status == 1) {
        timeslot.setAttribute('status', 0)
        timeslot.classList.remove('btn-outline-success')
        timeslot.classList.add('btn-outline-dark')
    }
    else {
        timeslot.setAttribute('status', 1)
        for (let j = 0; j < timings.length; j++) {
            let timingele = document.getElementById(k[0] + "_" + j)
            if (j != Number(k[1])) {
                timingele.setAttribute('status', 0)
                timingele.classList.remove('btn-outline-success')
                timingele.classList.add('btn-outline-dark')
            }
        }
        timeslot.classList.remove('btn-outline-dark')
        timeslot.classList.add('btn-outline-success')
    }
    time = timings[k[1]]
    console.log(time)
}

//  Navigate to Select Seats

function showlayout(id, seatcount) {
    let temp = theatreData.find((ele) => ele.id == id)
    let date = document.getElementById(`inputdate${id}`).value
    localStorage.setItem("date", date)
    temp['date'] = date
    temp['timing'] = time
    if (date != "" && time != "") {
        localStorage.setItem('Theatre', JSON.stringify(temp))
        window.location.replace('booking.html')
    }
    else {
        alert("please select date and time")
    }
}


function goback() {
    window.history.back()
}