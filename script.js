 document.body.style.backgroundColor = "grey";
 document.querySelector("table").style.border = "5px dotted black";
 document.querySelector("table").style.color = "white";
 document.querySelectorAll("th", "td").forEach(cell => {
    cell.style.border = "3px dotted black";
 });

//state - based on result data type (array, string, object)
let state = {
    allEvents: [],
    singleEventDetails: {}
}

//1. Get all events from API to list on the website
const fetchEvents = async () => {
    try {
        const response = await fetch ('https://fsa-crud-2aa9294fe819.herokuapp.com/api/COHORT_CODE/events');
        const data = await response.json();
        state.allEvents = data.results;
        //console.log(allEvents);
        //displayAllEvents(allEvents);
    } catch (error) {
        alert('Failed to fetch parties! Please try again later.');
        //console.error(error);
    }
}

const fetchSingleEventDetails = async () => {
    try {
        const response = await fetch(`https://fsa-crud-2aa9294fe819.herokuapp.com/api/COHORT_CODE/events${window.location.hash.slice(1)}`);
        const data = await response.json();
        state.singleEventDetails = data;
    } catch (error) {
        alert('Failed to fetch a single party! Please try again later.');
        console.error(error)
    }
}

//Render on the page
const renderSingleEvent = () => {
    ulElement.innerHTML = `<li>Name: ${state.singleEventDetails.name}</li>
    <li>ID: ${state.singlePokemonDetails.id}</li>
    <li>Height: ${state.singlePokemonDetails.height}</li>`
}

const renderEvents = () => {
    state.allEvents.forEach((event) => {
        const liElement = document.createElement('li');
        liElement.innerHTML = `<a>${event.name}</a>`;
        ulElement.append(liElement);
    })
}

fetchEvents()
renderEvents()

/*function to display all events + add delete button
const displayAllEvents = () => {
    const eventsList = document.querySelector('#events-list');
    eventsList.forEach(eventListed => {
        const listItem = document.createElement('li');
        listItem.textContent = event.name; //confirm the .name is correct from the API

        const button = document.createElement('button');
        button.textContent = 'Delete';
        button.addEventListener('click', () => {
            //handle button click action, i.e. delete event
            console.log('Delete button clicked for event: ${event.name}');
        });
        
        listItem.appendChild(button);
        eventsList.appendChild(listItem);
    });
}

//fetch single event
const fetchSingleEventDetails = async () => {
    const response = await fetch ('https://fsa-crud-2aa9294fe819.herokuapp.com/api/COHORT_CODE/events')
}

//render all Events
const renderEvents = () => {
    state.example.forEach(event) = () => {
        console.log(event)
        const liElement = document.createElement('li')
        liElement.innerText = event.name
        ulElement.append(liElement)

        liElement.addEventListener("click", async () => {
            state.singleEvent = event.name
            await fetchSingleEventDetails(event.name)
            renderSingleEvents()
        })
    }
}

//render single event
const renderSingleEvent = () => {
    ulElement.innerHTML = '<li>Name: ${https://fsa-crud-2aa9294fe819.herokuapp.com}'
}


//init
const init = async () => {
    await getEvents()
}

init() 
*/

//renderEvents()