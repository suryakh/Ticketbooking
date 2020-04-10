
let theatreData = [{
    id: 1,
    theatreName: "Delux",
    location: "Bangalore",
    moviesId: "3",
    seatNo: 25
},
{
    id: 2,
    theatreName: "Imax",
    location: "Hyderabad",
    moviesId: "5",
    seatNo: 30
},
{
    id: 3,
    theatreName: "Sri",
    location: "Hyderbad",
    moviesId: "4",
    seatNo: 32
},
{
    id: 4,
    theatreName: "Navrag",
    location: "Bangalore",
    moviesId: "2",
    seatNo: 40

},
{
    id: 5,
    theatreName: "Inox",
    location: "Bangalore",
    moviesId: "3",
    seatNo: 30
}, {
    id: 6,
    theatreName: "Indo",
    location: "Hyderabad",
    moviesId: "5",
    seatNo: 20
}]
let timings = ["9:15AM", "11:45AM", "3:00PM", "6:00PM", "9:00PM"]
let duptimings = []
window.onload = getdata()
function getdata() {
    let temp = localStorage.getItem('info')
    let movieData = JSON.parse(temp)
    let id = movieData['id']
    console.log(movieData)
    displayTheater(id)
}
let time = ""

function displayTheater(id) {
    console.log(id)
    let availableTheatre = theatreData.filter((ele) => ele.moviesId == id)
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
function timeSlot(data) {
    console.log(data)
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


    //     let layoutdiv = document.getElementById("layout" + id)
    //     layoutdiv.innerHTML = ''
    //     let screen = document.createElement('div')
    //     screen.innerHTML = 'screen'
    //     screen.setAttribute('class', 'screen container mb-3 col-6')
    //     layoutdiv.appendChild(screen)
    //     console.log("layout" + id, seatcount)
    //     let arra = "ABCDEFGHIJ"
    //     for (let i = 0; i < arra.length; i++) {
    //         let rowdiv = document.createElement('div')
    //         rowdiv.setAttribute('class', 'row d-flex justify-content-center')
    //         if (i < arra.length - 3) {
    //             for (let j = 0; j < 12; j++) {
    //                 let divEle = document.createElement('div')
    //                 if (j == 6) {
    //                     let divEle2 = document.createElement('div')
    //                     divEle2.setAttribute('style', 'width:100px')
    //                     rowdiv.appendChild(divEle2)
    //                 }
    //                 let btnEle = document.createElement('button')
    //                 btnEle.setAttribute('class', 'btn btn-primary m-1')
    //                 btnEle.setAttribute('id', `layout${id}seat${arra[i]}${(j + 1)}`)
    //                 // data-toggle="modal" data-target="#exampleModal">
    //                 btnEle.setAttribute('status', 0)
    //                 let idele = arra[i] + (j + 1)

    //                 btnEle.setAttribute('onclick', "selectseat('" + arra[i] + (j + 1) + "' ," + id + ")")
    //                 btnEle.innerHTML = arra[i] + (j + 1)
    //                 divEle.appendChild(btnEle)
    //                 rowdiv.appendChild(divEle)
    //             }
    //         }
    //         else {
    //             for (let j = 0; j < 15; j++) {
    //                 let divEle = document.createElement('div')
    //                 let btnEle = document.createElement('button')
    //                 btnEle.setAttribute('class', 'btn btn-primary m-1')
    //                 btnEle.setAttribute('id', `layout${id}seat${arra[i]}${(j + 1)}`)
    //                 btnEle.setAttribute('status', 0)
    //                 btnEle.setAttribute('onclick', "selectseat('" + arra[i] + (j + 1) + "' ," + id + ")")
    //                 btnEle.innerHTML = arra[i] + (j + 1)
    //                 divEle.appendChild(btnEle)
    //                 rowdiv.appendChild(divEle)
    //             }
    //         }
    //         layoutdiv.appendChild(rowdiv)
    //     }
    //     let bookBtn = document.createElement('button')
    //     bookBtn.innerHTML = "Book Now"
    //     bookBtn.setAttribute("id", "booknow")
    //     layoutdiv.appendChild(bookBtn)

}

// function selectseat(layoutid, id) {
//     console.log(layoutid)
//     let seat = document.getElementById(`layout${id}seat${layoutid}`)
//     // console.log(seat.getAttribute('status') == 1)
//     if (seat.getAttribute('status') == 1) {
//         seat.setAttribute('status', 0)
//         seat.classList.remove('btn-success')
//         seat.classList.add('btn-primary')
//     }
//     else {
//         seat.setAttribute('status', 1)
//         seat.classList.add("btn")
//         seat.classList.add("btn-success")
//     }

//     // console.log(seat.getAttribute('status'))
// }
function goback() {
    window.history.back()
}