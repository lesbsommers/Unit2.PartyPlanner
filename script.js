// State holds the event data
let state = {
    events: []
};

// Get all events from API to display on the website
async function fetchEvents() {
    const api = "https://fsa-crud-2aa9294fe819.herokuapp.com/api/2412-ftb-mt-web-pt/events";
    try {
        const response = await fetch(api);
        const events = await response.json();
        state.events = events; // Update the state with the fetched events
        displayEvents(); // Re-render the events list from the state
    } catch (error) {
        console.log('Failed to fetch events:', error);
    }
}

// Display events in the event-table id
function displayEvents() {
    const eventsList = document.getElementById('events-list');
    eventsList.innerHTML = ''; // Clears current events

    state.events.forEach(event => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${event.name}</td>
            <td>${event.date}</td>
            <td>${event.time}</td>
            <td>${event.location}</td>
            <td>${event.description}</td>
            <td><button class="delete-button" data-id="${event.id}">Delete Event</button></td>
        `;
        eventsList.appendChild(row);
    });

    // Add delete button eventListener after the list is rendered
    const deleteButtons = document.querySelectorAll('.delete-button');
    deleteButtons.forEach(button => {
        button.addEventListener('click', () => {
            const eventId = button.getAttribute('data-id');
            deleteEvent(eventId);
        });
    });
}

// Delete an event from the API and update the state
async function deleteEvent(eventId) {
    try {
        const response = await fetch(`https://fsa-crud-2aa9294fe819.herokuapp.com/api/2412-ftb-mt-web-pt/events/${eventId}`, {
            method: 'DELETE',
        });
        if (response.ok) {
            // Updates the state to remove the deleted event
            state.events = state.events.filter(event => event.id !== eventId);
            displayEvents(); // Re-renders the events list from the updated state
        } else {
            console.error('Issue deleting the event');
        }
    } catch (error) {
        console.error('Issue deleting the event:', error);
    }
}

// Form submission to add new event and update the state
const form = document.querySelector('.form-container');
form.addEventListener('submit', async (e) => {
    e.preventDefault(); // Prevents the form from submitting the traditional way
    const newEvent = {
        name: document.getElementById('event-name').value,
        date: document.getElementById('event-date').value,
        time: document.getElementById('event-time').value,
        location: document.getElementById('event-location').value,
        description: document.getElementById('event-description').value,
        additionalInfo: document.getElementById('additional-info').value,
    };
    
    try {
        const response = await fetch('https://fsa-crud-2aa9294fe819.herokuapp.com/api/2412-ftb-mt-web-pt/events', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newEvent),
        });

        if (response.ok) {
            const eventData = await response.json();
            // Add the new event to the state
            state.events.push(eventData);
            displayEvents(); // Re-renders the events list from the updated state

            // Show the success message
            displaySuccessMessage('Success! Your event has been added to the Events List.');
            setTimeout(() => {
                window.location.reload(); // The page redirects to the main events list after 10 seconds
            }, 10000); 
        } else {
            console.error('Issue adding the event:', error);
        }
    } catch (error) {
        console.error('Issue submitting the new event:', error);
    }
});

// Display the success message
function displaySuccessMessage(message) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('success-message');
    messageDiv.innerText = message;
    document.body.appendChild(messageDiv);

    setTimeout(() => {
        messageDiv.remove(); // Removes the message after 10 seconds
    }, 10000);
}

// Initial loading of events
fetchEvents();