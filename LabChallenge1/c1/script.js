// Wait for the DOM to be fully loaded before running the script
document.addEventListener('DOMContentLoaded', () => {

    // --- DOM Element References ---
    const eventForm = document.getElementById('event-form');
    const eventList = document.getElementById('event-list');
    const countdownTimer = document.getElementById('countdown-timer');

    // --- State Management ---
    // An array to store event objects. We'll get this from localStorage or start empty.
    let events = JSON.parse(localStorage.getItem('events')) || [];
    let countdownInterval; // To hold the setInterval ID

    // --- Functions ---

    /**
     * Renders all events in the `events` array to the DOM.
     */
    const renderEvents = () => {
        // Clear the current list
        eventList.innerHTML = '';

        if (events.length === 0) {
            eventList.innerHTML = '<p>No events added yet. Use the form to add one!</p>';
            updateCountdown(); // Stop any running countdown
            return;
        }

        // Sort events by date, soonest first.
        events.sort((a, b) => new Date(a.dateTime) - new Date(b.dateTime));
        
        // Create and append a card for each event
        events.forEach((event, index) => {
            const eventCard = document.createElement('div');
            eventCard.classList.add('event-card');

            // The first event in the sorted array is the 'next' one
            if (index === 0) {
                eventCard.classList.add('next-event');
            }

            const eventDate = new Date(event.dateTime);
            const formattedDate = eventDate.toLocaleDateString('en-US', {
                weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
            });
            const formattedTime = eventDate.toLocaleTimeString('en-US', {
                hour: '2-digit', minute: '2-digit'
            });

            eventCard.innerHTML = `
                <h3>${event.name}</h3>
                <p class="date-time">${formattedDate} at ${formattedTime}</p>
                <p>${event.description}</p>
            `;

            eventList.appendChild(eventCard);
        });
        
        // After rendering, update the countdown to the next event
        updateCountdown();
    };

    /**
     * Starts or updates the countdown timer for the next upcoming event.
     */
    const updateCountdown = () => {
        // Clear any existing timer to prevent multiple intervals running
        clearInterval(countdownInterval);

        if (events.length === 0) {
            countdownTimer.textContent = 'No Upcoming Events';
            return;
        }

        const nextEventDate = new Date(events[0].dateTime);
        const now = new Date();

        if(nextEventDate < now) {
            countdownTimer.textContent = 'Event has passed!';
            // Optional: remove the passed event
            // events.shift();
            // localStorage.setItem('events', JSON.stringify(events));
            // renderEvents();
            return;
        }
        
        countdownInterval = setInterval(() => {
            const now = new Date().getTime();
            const distance = nextEventDate - now;

            // Time calculations
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            // Add leading zeros if needed
            const fHours = String(hours).padStart(2, '0');
            const fMinutes = String(minutes).padStart(2, '0');
            const fSeconds = String(seconds).padStart(2, '0');

            // Display the result
            if (distance < 0) {
                clearInterval(countdownInterval);
                countdownTimer.textContent = "Event is happening now!";
                // Automatically remove the event after it's passed and re-render
                events.shift(); // removes the first event
                localStorage.setItem('events', JSON.stringify(events));
                renderEvents();
            } else {
                countdownTimer.textContent = `${days}d ${fHours}h ${fMinutes}m ${fSeconds}s`;
            }
        }, 1000);
    };


    // --- Event Listeners ---

    /**
     * Handles the form submission for adding a new event.
     */
    eventForm.addEventListener('submit', (e) => {
        // Prevent the default form submission (which reloads the page)
        e.preventDefault();

        // Get values from form inputs
        const name = document.getElementById('event-name').value;
        const date = document.getElementById('event-date').value;
        const time = document.getElementById('event-time').value;
        const description = document.getElementById('event-description').value;

        // --- Form Validation ---
        if (!name || !date || !time) {
            alert('Please fill out all required fields (Name, Date, and Time).');
            return;
        }

        const eventDateTime = new Date(`${date}T${time}`);
        if (eventDateTime < new Date()) {
            alert('Please select a future date and time.');
            return;
        }

        // Create the new event object
        const newEvent = {
            name,
            dateTime: eventDateTime.toISOString(), // Store as ISO string for consistency
            description
        };

        // Add the new event to our array
        events.push(newEvent);

        // Save the updated events array to localStorage
        localStorage.setItem('events', JSON.stringify(events));

        // Re-render the events on the page
        renderEvents();

        // Reset the form for the next entry
        eventForm.reset();
    });


    // --- Initial Load ---
    // Render any events that were loaded from localStorage
    renderEvents();
});