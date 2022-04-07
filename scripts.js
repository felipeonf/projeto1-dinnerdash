// seting the users

let users = [
    {id:1, first_name:"Lauren",last_name:"Shaxby",email:"lshaxby0@php.net",created_at:"16/10/2021"},
    {id:2, first_name:"Ardenia",last_name:"Paddingdon",email:"apaddingdon1@nsw.gov.au",created_at:"27/07/2021"},
    {id:3,first_name:"Renaldo",last_name:"Alenichev",email:"ralenichev2@ftc.gov",created_at:"10/06/2021"},
    {id:4,first_name:"Nichole",last_name:"OHeneghan",email:"noheneghan3@flavors.me",created_at:"28/06/2021"},
    {id:5,first_name:"Haywood",last_name:"Daintry",email:"hdaintry4@nhs.uk",created_at:"18/03/2021"},
    {id:6,first_name:"Leslie",last_name:"Daile",email:"ldaile5@vimeo.com",created_at:"23/05/2021"},
    {id:7,first_name:"Byrann",last_name:"Slorance",email:"bslorance6@kickstarter.com",created_at:"15/05/2021"},
    {id:8,first_name:"My",last_name:"Swendell",email:"mswendell7@moonfruit.com",created_at:"15/12/2021"},
    {id:9,first_name:"Brier",last_name:"Esson",email:"besson8@usa.gov",created_at:"14/03/2021"},
    {id:10,first_name:"Seth",last_name:"Piddle",email:"spiddle9@nationalgeographic.com",created_at:"20/10/2021"},
    {id:11,first_name:"Fer",last_name:"Piddle",email:"ferspiddle9@nationalgeographic.com",created_at:"20/10/2022"},
  ]

// number of users who appears in the table.

const numberOfUsers = 5

// function who take the id of users and pages and remove a specific user.
// @param Number id - the id of user.
// @param Number page - the number of pages.

function eraseUser(id, page){
    users = users.filter(user => user.id !== id)
    document.getElementById(`${id}`).remove()
    setPagination(page)
  }

  
// function who take the users and add table rows into the html document.
// @param Number page - the number of pages.

function addUsers(page=0) {
    const start = page * numberOfUsers
    const end = start + numberOfUsers
    return users.slice(start, end).map(user => {
        let row = document.createElement('tr') // creating the rows
        row.setAttribute('id', user.id)

        // creating the cells

        let userName = document.createElement('td')
        userName.appendChild(document.createTextNode(`${user.first_name} ${user.last_name}`))

        let userEmail = document.createElement('td')
        userEmail.appendChild(document.createTextNode(user.email))

        let userBegin = document.createElement('td')
        userBegin.appendChild(document.createTextNode(user.created_at))

        // creating the action cells

        let actions = document.createElement('td')
        actions.classList.add('action-buttons') // creating a class to the action buttons, for css.

        let edit = document.createElement('button')
        edit.classList.add('text-button', 'edit-button') // creating a class for edit button
        edit.appendChild(document.createTextNode('editar'))

        let erase = document.createElement('button')
        erase.classList.add('text-button', 'delete-button') // creating a class for delete button
        erase.appendChild(document.createTextNode('excluir')) 
        erase.setAttribute('type', 'button')
        erase.addEventListener('click', () => eraseUser(user.id, page)) // seting a click event for delete the user selected

        // appending to actions and inherit class action-buttons]

        actions.appendChild(edit)
        actions.appendChild(erase)

        // appending to the row the itens of the cells
        row.appendChild(userName)
        row.appendChild(userEmail)
        row.appendChild(userBegin)
        row.appendChild(actions)

        return row
    })   
}

// selecting the tbody of the table
const tableBody = document.querySelector('tbody')

// function who refresh the table with the new elements of user
// @param Number page - number of pages.

function refreshNewPage(page=0) {
    while (tableBody.hasChildNodes()) {
        tableBody.removeChild(tableBody.lastChild)
    }
    addUsers(page).forEach(userElement => tableBody.appendChild(userElement))
    setPagination(page)
}

// calculate the modulo of n%m

function mod(n, m){
    return ((n % m) + m) % m;
}

// set the pagination of elements, the behavior of the return button and foward button
// @param Number actualPage - the number of the actual page.

function setPagination(actualPage=0) {
    const pagination = document.querySelector('.pagination-selectors')
    while (pagination.hasChildNodes()) {
        pagination.removeChild(pagination.lastChild)
    }

    let numberOfPages = Math.ceil(users.length / numberOfUsers)

    let returnButtonPagination = document.createElement('button')

    returnButtonPagination.appendChild(document.createTextNode('<<'))                   
    returnButtonPagination.setAttribute('type', 'button')
    returnButtonPagination.addEventListener('click', () => refreshNewPage(mod(actualPage - 1, numberOfPages))) // behavior of return button

    pagination.appendChild(returnButtonPagination)

    for (let page = 0; page < numberOfPages; page++) {
        let paginationButton = document.createElement('button')
        paginationButton.appendChild(document.createTextNode(`${page + 1}`))
        paginationButton.setAttribute('type', 'button')

        if (page == actualPage) {
            paginationButton.classList.add('active')
        }
        
        paginationButton.addEventListener('click', () => refreshNewPage(page))
        pagination.appendChild(paginationButton)
        }

        let fowardButtonPagination = document.createElement('button')
        fowardButtonPagination.appendChild(document.createTextNode('>>'))
        fowardButtonPagination.setAttribute('type', 'button')
        fowardButtonPagination.addEventListener('click', () => refreshNewPage(mod(actualPage + 1, numberOfPages))) // behavior of foward button
        pagination.appendChild(fowardButtonPagination)
}

// main program
addUsers(0).forEach(userElement => tableBody.appendChild(userElement))
setPagination(0)
