let state = {
    events: []
};

// Get all events from API to display on the website
async function fetchEvents() {
    const api = "https://fsa-crud-2aa9294fe819.herokuapp.com/api/2412-ftb-mt-web-pt/events";
    try {
        const response = await fetch(api);
        const events = await response.json();
        state.events = events.data; // Update the state with the fetched events
        displayEvents(); // Re-render the events list from the state
    } catch (error) {
        console.log('Failed to fetch events:', error);
    }
}

// Format date to a readable format
function formatDate(dateString) {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', options);
}

// Display events in the event-table id
function displayEvents() {
    const eventsList = document.getElementById('events-list');
    eventsList.innerHTML = ''; // Clears current events

    state.events.forEach(event => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${event.name}</td>
            <td>${formatDate(event.date)}</td>
            <td>${event.date.slice(11, 16)}</td> <!-- Extract time from the date string -->
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

        if (response.status === 204) {
            console.log('Event deleted successfully');
            state.events = state.events.filter(event => event.id !== eventId);
            displayEvents(); // Re-render the events list from the updated state
        } else {
            const responseBody = await response.json();
            console.log('Response Body:', responseBody);
            console.error('Error deleting event:', responseBody);
        }
    } catch (error) {
        console.error('Error deleting event:', error);
    }
}

// Form submission to add new event and update the state
const form = document.querySelector('.form-container');
form.addEventListener('submit', async (e) => {
    e.preventDefault(); // Prevents the form from submitting the traditional way
    const newEvent = {
        name: document.getElementById('event-name').value,
        date: document.getElementById('event-date').value + 'T' + document.getElementById('event-time').value + ':00.000Z', // Append time to date
        location: document.getElementById('event-location').value,
        description: document.getElementById('event-description').value,
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
            if (eventData.data) {
                state.events.push(eventData.data);
            } else {
                state.events.push(eventData);
            }
            displayEvents(); // Re-renders the events list from the updated state

            displaySuccessMessage('Success! Your event has been added.');
            
            // Clear the form fields after submission
            form.reset(); // This clears all form fields
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
