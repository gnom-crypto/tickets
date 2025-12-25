const loginScreen = document.getElementById('loginScreen');
const pinScreen = document.getElementById('pinScreen');
const dashboard = document.getElementById('dashboard');
const loginForm = document.getElementById('loginForm');
const pinForm = document.getElementById('pinForm');
const logoutBtn = document.getElementById('logoutBtn');
const ticketsList = document.getElementById('ticketsList');
const newTicketBtn = document.getElementById('newTicketBtn');
const ticketModal = document.getElementById('ticketModal');
const closeModal = document.querySelector('.close');
const ticketMessage = document.getElementById('ticketMessage');
const submitTicketBtn = document.getElementById('submitTicketBtn');

let currentUser = null;

// Admin credentials
const ADMIN_NAME = 'Paul';
const ADMIN_DOC = '1375894031';
const PIN = '1355';

// Load tickets from localStorage
function loadTickets() {
    return JSON.parse(localStorage.getItem('tickets')) || [];
}

// Save tickets to localStorage
function saveTickets(tickets) {
    localStorage.setItem('tickets', JSON.stringify(tickets));
}

// Render tickets
function renderTickets() {
    const tickets = loadTickets();
    ticketsList.innerHTML = '';
    
    tickets.forEach(ticket => {
        const ticketDiv = document.createElement('div');
        ticketDiv.className = `ticket ${ticket.status}`;
        
        ticketDiv.innerHTML = `
            <div class="ticket-header">
                <span><strong>From:</strong> ${ticket.firstName} ${ticket.lastName}</span>
                <span><strong>ID:</strong> ${ticket.id}</span>
            </div>
            <div class="ticket-message">${ticket.message}</div>
        `;
        
        if (ticket.response) {
            const responseDiv = document.createElement('div');
            responseDiv.className = 'ticket-response';
            responseDiv.textContent = ticket.response;
            ticketDiv.appendChild(responseDiv);
        }
        
        ticketsList.appendChild(ticketDiv);
    });
}

// Show PIN screen
function showPinScreen() {
    loginScreen.classList.add('hidden');
    pinScreen.classList.remove('hidden');
}

// Show dashboard
function showDashboard() {
    pinScreen.classList.add('hidden');
    dashboard.classList.remove('hidden');
    renderTickets();
}

// Login handler
loginForm.addEventListener('submit', function(e) {
