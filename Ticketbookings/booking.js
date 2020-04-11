window.onload = layout()
let tickets = []
let movieData = JSON.parse(localStorage.getItem('info'))
let theatreData = JSON.parse(localStorage.getItem('Theatre'))

// Seating Layout display Logic

function layout() {
    let layoutdiv = document.getElementById("bookingslot")
    layoutdiv.innerHTML = ''
    let screen = document.createElement('div')
    screen.innerHTML = 'screen'
    screen.setAttribute('class', 'screen container mb-3 col-6')
    layoutdiv.appendChild(screen)
    let arra = "ABCDEFGHIJ"
    for (let i = 0; i < arra.length; i++) {
        let rowdiv = document.createElement('div')
        rowdiv.setAttribute('class', 'row d-flex justify-content-center')
        if (i < arra.length - 3) {
            for (let j = 0; j < 12; j++) {
                let divEle = document.createElement('div')
                if (j == 6) {
                    let divEle2 = document.createElement('div')
                    divEle2.setAttribute('style', 'width:100px')
                    rowdiv.appendChild(divEle2)
                }
                let btnEle = document.createElement('button')
                btnEle.setAttribute('class', 'btn btn-primary m-1')
                btnEle.setAttribute('id', `seat${arra[i]}${(j + 1)}`)
                btnEle.setAttribute('status', 0)
                let idele = arra[i] + (j + 1)

                btnEle.setAttribute('onclick', "selectseat('" + arra[i] + (j + 1) + "')")
                btnEle.innerHTML = arra[i] + (j + 1)
                divEle.appendChild(btnEle)
                rowdiv.appendChild(divEle)
            }
        }
        else {
            for (let j = 0; j < 15; j++) {
                let divEle = document.createElement('div')
                let btnEle = document.createElement('button')
                btnEle.setAttribute('class', 'btn btn-primary m-1')
                btnEle.setAttribute('id', `seat${arra[i]}${(j + 1)}`)
                btnEle.setAttribute('status', 0)
                btnEle.setAttribute('onclick', "selectseat('" + arra[i] + (j + 1) + "')")
                btnEle.innerHTML = arra[i] + (j + 1)
                divEle.appendChild(btnEle)
                rowdiv.appendChild(divEle)
            }
        }
        layoutdiv.appendChild(rowdiv)
    }
    let bookBtn = document.createElement('button')
    bookBtn.setAttribute('class', 'btn btn-success')
    bookBtn.innerHTML = "Book Now"
    bookBtn.setAttribute("onclick", 'submitTicket()')
    bookBtn.setAttribute("id", "booknow")
    layoutdiv.appendChild(bookBtn)

}

//  Selecting Seats Funtion

function selectseat(layoutid) {
    console.log(layoutid)
    let seat = document.getElementById(`seat${layoutid}`)
    if (seat.getAttribute('status') == 1) {
        seat.setAttribute('status', 0)
        seat.classList.remove('btn-success')
        seat.classList.add('btn-primary')
        tickets = tickets.filter((ele) => ele !== layoutid)
    }
    else {
        seat.setAttribute('status', 1)
        seat.classList.add("btn")
        tickets.push(layoutid)
        seat.classList.add("btn-success")
    }

    console.log(tickets)
}


// Display In Voice

function submitTicket() {
    if (tickets.length == 0) {
        alert("please Select atleast One Seat")
    }
    else {
        let layout = document.getElementById('bookingslot')
        layout.classList.add("hidden")
        let ticket = document.getElementById('ticketholder')
        ticket.classList.remove('hidden')
        let divEle = document.createElement('div')
        let poster = document.createElement('div')
        poster.setAttribute('class', 'col-12')
        divEle.appendChild(poster)
        ticket.appendChild(divEle)
        let imageEle = document.createElement('img')
        poster.appendChild(imageEle)
        imageEle.setAttribute('src', movieData['poster'])
        let h1Ele = document.createElement('h1')
        h1Ele.innerHTML = movieData['movieName']
        ticket.appendChild(h1Ele)
        let pEle = document.createElement('p')
        pEle.innerHTML = "At Theatre <h4>" + theatreData['theatreName'] + "</h4> " + theatreData['timing'] + "  " + theatreData['date'] + " " + theatreData['location']
        ticket.appendChild(pEle)
        let tableEle = document.createElement('table')
        let theadEle = document.createElement('thead')
        theadEle.setAttribute('class', 'thead-dark')
        tableEle.appendChild(theadEle)
        let trEle = document.createElement('tr')
        trEle.innerHTML = "<th>Seat No </th> <th> No of seats X cost</th>"
        let trEle2 = document.createElement('tr')
        trEle2.innerHTML = "<td>" + tickets.reduce((a, b) => a + " " + b) + "</td> <td> " + tickets.length + " X 400</td>"
        let trEle3 = document.createElement("tr")
        trEle3.innerHTML = "<td>Total amount</td><td> " + tickets.length * 400 + "Rs /-</td>"
        theadEle.appendChild(trEle)
        tableEle.appendChild(trEle2)
        tableEle.appendChild(trEle3)
        tableEle.setAttribute('class', 'table')
        ticket.appendChild(tableEle)
        let btnEle = document.createElement('button')
        btnEle.innerHTML = "Cancel Ticket"
        btnEle.setAttribute("onclick", "cancelTicket()")
        btnEle.setAttribute('class','btn btn-danger')
        ticket.appendChild(btnEle)

    }
}

function cancelTicket() {
    if (confirm("You want to cancel")) {
        alert("successfully canceled")
        window.location.replace('index.html')
    }
}

