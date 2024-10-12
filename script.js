// Inicjalizacja Notyf
const notyf = new Notyf({
    duration: 3000,
    position: { x: 'right', y: 'top' },
    types: [
        {
            type: 'success',
            background: 'green',
            icon: {
                className: 'notyf__icon lucide lucide-check-circle',
                tagName: 'svg',
                text: ''
            }
        },
        {
            type: 'error',
            background: 'red',
            icon: {
                className: 'notyf__icon lucide lucide-x-circle',
                tagName: 'svg',
                text: ''
            }
        },
        {
            type: 'info',
            background: 'blue',
            icon: {
                className: 'notyf__icon lucide lucide-info',
                tagName: 'svg',
                text: ''
            }
        }
    ]
});

// Funkcja do przechowywania historii powiadomień
function saveNotificationHistory(message, type) {
    const history = JSON.parse(localStorage.getItem('notificationHistory')) || [];
    history.push({ message, type, timestamp: new Date().toLocaleString() });
    localStorage.setItem('notificationHistory', JSON.stringify(history));
    renderNotificationHistory();
}

// Funkcja do renderowania historii powiadomień
function renderNotificationHistory() {
    const historyContainer = document.getElementById('notificationHistory');
    historyContainer.innerHTML = ''; // Wyczyść historię przed renderowaniem

    const history = JSON.parse(localStorage.getItem('notificationHistory')) || [];

    history.forEach(notification => {
        const div = document.createElement('div');
        div.className = `notification-card ${getNotificationTypeClass(notification.type)} notification-card-enter`;
        div.innerHTML = `
            <div class="notification-icon ${getNotificationColor(notification.type)}">
                ${getNotificationIcon(notification.type)}
            </div>
            <div class="notification-content">
                <p class="notification-title capitalize">${notification.type}</p>
                <p class="notification-message">${notification.message}</p>
                <p class="notification-timestamp">${notification.timestamp}</p>
            </div>
        `;
        historyContainer.appendChild(div);
        // Trigger animation
        requestAnimationFrame(() => {
            div.classList.remove('notification-card-enter');
            div.classList.add('notification-card-enter-active');
        });
    });
}

// Funkcja do filtrowania powiadomień
function filterNotifications(type) {
    const history = JSON.parse(localStorage.getItem('notificationHistory')) || [];
    let filteredHistory;

    if (type === 'all') {
        filteredHistory = history;
    } else {
        filteredHistory = history.filter(notification => notification.type === type);
    }

    const historyContainer = document.getElementById('notificationHistory');
    historyContainer.innerHTML = ''; // Wyczyść historię przed renderowaniem

    filteredHistory.forEach(notification => {
        const div = document.createElement('div');
        div.className = `notification-card ${getNotificationTypeClass(notification.type)} notification-card-enter`;
        div.innerHTML = `
            <div class="notification-icon ${getNotificationColor(notification.type)}">
                ${getNotificationIcon(notification.type)}
            </div>
            <div class="notification-content">
                <p class="notification-title capitalize">${notification.type}</p>
                <p class="notification-message">${notification.message}</p>
                <p class="notification-timestamp">${notification.timestamp}</p>
            </div>
        `;
        historyContainer.appendChild(div);
        // Trigger animation
        requestAnimationFrame(() => {
            div.classList.remove('notification-card-enter');
            div.classList.add('notification-card-enter-active');
        });
    });
}

// Funkcja do określania klasy koloru powiadomienia
function getNotificationColor(type) {
    switch(type) {
        case 'success':
            return 'bg-green-500';
        case 'error':
            return 'bg-red-500';
        case 'info':
            return 'bg-blue-500';
        default:
            return 'bg-gray-500';
    }
}

// Funkcja do zwracania ikony powiadomienia
function getNotificationIcon(type) {
    switch(type) {
        case 'success':
            return `
                <svg xmlns="http://www.w3.org/2000/svg" class="lucide lucide-check-circle" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M9 12l2 2l4 -4"></path>
                    <circle cx="12" cy="12" r="10"></circle>
                </svg>
            `;
        case 'error':
            return `
                <svg xmlns="http://www.w3.org/2000/svg" class="lucide lucide-x-circle" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M18 6L6 18"></path>
                    <path d="M6 6L18 18"></path>
                    <circle cx="12" cy="12" r="10"></circle>
                </svg>
            `;
        case 'info':
            return `
                <svg xmlns="http://www.w3.org/2000/svg" class="lucide lucide-info" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="16" x2="12" y2="12"></line>
                    <line x1="12" y1="8" x2="12.01" y2="8"></line>
                </svg>
            `;
        default:
            return '';
    }
}

// Funkcja do określania klasy typu powiadomienia dla karty
function getNotificationTypeClass(type) {
    switch(type) {
        case 'success':
            return 'border-l-4 border-green-500';
        case 'error':
            return 'border-l-4 border-red-500';
        case 'info':
            return 'border-l-4 border-blue-500';
        default:
            return 'border-l-4 border-gray-500';
    }
}

// Funkcja do renderowania historii powiadomień
function renderNotificationHistory() {
    const historyContainer = document.getElementById('notificationHistory');
    historyContainer.innerHTML = ''; // Wyczyść historię przed renderowaniem

    const history = JSON.parse(localStorage.getItem('notificationHistory')) || [];

    history.forEach(notification => {
        const div = document.createElement('div');
        div.className = `notification-card ${getNotificationTypeClass(notification.type)} notification-card-enter`;
        div.innerHTML = `
            <div class="notification-icon ${getNotificationColor(notification.type)}">
                ${getNotificationIcon(notification.type)}
            </div>
            <div class="notification-content">
                <p class="notification-title capitalize">${notification.type}</p>
                <p class="notification-message">${notification.message}</p>
                <p class="notification-timestamp">${notification.timestamp}</p>
            </div>
        `;
        historyContainer.appendChild(div);
        // Trigger animation
        requestAnimationFrame(() => {
            div.classList.remove('notification-card-enter');
            div.classList.add('notification-card-enter-active');
        });
    });
}

// Inicjalizacja historii powiadomień przy załadowaniu strony
document.addEventListener('DOMContentLoaded', renderNotificationHistory);

// Obsługa formularza
document.getElementById('meetingForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Zatrzymaj domyślną akcję formularza

    // Pobierz wartości z formularza
    const name = document.getElementById('name').value.trim();
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;
    const purpose = document.getElementById('purpose').value.trim();

    // Obsługa błędów
    if (!name || !date || !time || !purpose) {
        notyf.error('Wszystkie pola są wymagane!');
        saveNotificationHistory('Wszystkie pola są wymagane!', 'error');
        return;
    }

    // Przechowaj spotkania w localStorage
    const meetings = JSON.parse(localStorage.getItem('meetings')) || [];
    
    // Jeśli edytujemy spotkanie
    if (this.dataset.editingId) {
        const index = meetings.findIndex(meeting => meeting.id === this.dataset.editingId);
        meetings[index] = { id: this.dataset.editingId, name, date, time, purpose };
        this.removeAttribute('data-editingId');
        notyf.success('Spotkanie zaktualizowane pomyślnie!');
        saveNotificationHistory('Spotkanie zaktualizowane pomyślnie!', 'success');
    } else {
        // Stwórz nowe spotkanie
        const newMeeting = { id: Date.now().toString(), name, date, time, purpose };
        meetings.push(newMeeting);
        notyf.success('Spotkanie dodane pomyślnie!');
        saveNotificationHistory('Spotkanie dodane pomyślnie!', 'success');
    }

    // Zaktualizuj localStorage
    localStorage.setItem('meetings', JSON.stringify(meetings));

    // Wyczyść formularz
    this.reset();
    renderMeetings();
});

// Funkcja do renderowania spotkań
function renderMeetings() {
    const meetingList = document.getElementById('meetingList');
    meetingList.innerHTML = ''; // Wyczyść listę przed renderowaniem

    const meetings = JSON.parse(localStorage.getItem('meetings')) || [];

    meetings.forEach(meeting => {
        const card = document.createElement('div');
        card.className = 'bg-white p-4 rounded-lg shadow-md transition duration-300 transform hover:scale-105';
        card.innerHTML = `
            <div>
                <h3 class="font-bold">${meeting.name}</h3>
                <p>${meeting.date} ${meeting.time}</p>
                <p class="text-gray-600">${meeting.purpose}</p>
            </div>
            <div class="flex space-x-2 mt-2">
                <button class="bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded-lg flex items-center" onclick="editMeeting('${meeting.id}')">
                    <span class="lucide lucide-edit mr-2"></span> Edytuj
                </button>
                <button class="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg flex items-center" onclick="removeMeeting('${meeting.id}')">
                    <span class="lucide lucide-trash mr-2"></span> Usuń
                </button>
            </div>
        `;
        meetingList.appendChild(card);
    });
}

// Funkcja do usuwania spotkania
function removeMeeting(id) {
    const meetings = JSON.parse(localStorage.getItem('meetings')) || [];
    const updatedMeetings = meetings.filter(meeting => meeting.id !== id);
    localStorage.setItem('meetings', JSON.stringify(updatedMeetings));
    renderMeetings();
    notyf.success('Spotkanie usunięte pomyślnie!');
    saveNotificationHistory('Spotkanie usunięte pomyślnie!', 'success');
}

// Funkcja do edytowania spotkania
function editMeeting(id) {
    const meetings = JSON.parse(localStorage.getItem('meetings')) || [];
    const meeting = meetings.find(meeting => meeting.id === id);
    
    // Ustaw wartości formularza na dane spotkania
    document.getElementById('name').value = meeting.name;
    document.getElementById('date').value = meeting.date;
    document.getElementById('time').value = meeting.time;
    document.getElementById('purpose').value = meeting.purpose;
    document.getElementById('meetingForm').dataset.editingId = id; // Ustaw atrybut edycji

    // Powiadomienie informujące o trybie edycji
    notyf.info('Tryb edycji: Zaktualizuj dane spotkania.');
    saveNotificationHistory('Tryb edycji: Zaktualizuj dane spotkania.', 'info');
}

// Funkcja do czyszczenia historii powiadomień
function clearNotificationHistory() {
    localStorage.removeItem('notificationHistory');
    renderNotificationHistory();
    notyf.success('Historia powiadomień została wyczyszczona.');
    saveNotificationHistory('Historia powiadomień została wyczyszczona.', 'success');
}

// Funkcja do filtrowania powiadomień
function filterNotifications(type) {
    const history = JSON.parse(localStorage.getItem('notificationHistory')) || [];
    let filteredHistory;

    if (type === 'all') {
        filteredHistory = history;
    } else {
        filteredHistory = history.filter(notification => notification.type === type);
    }

    const historyContainer = document.getElementById('notificationHistory');
    historyContainer.innerHTML = ''; // Wyczyść historię przed renderowaniem

    filteredHistory.forEach(notification => {
        const div = document.createElement('div');
        div.className = `notification-card ${getNotificationTypeClass(notification.type)} notification-card-enter`;
        div.innerHTML = `
            <div class="notification-icon ${getNotificationColor(notification.type)}">
                ${getNotificationIcon(notification.type)}
            </div>
            <div class="notification-content">
                <p class="notification-title capitalize">${notification.type}</p>
                <p class="notification-message">${notification.message}</p>
                <p class="notification-timestamp">${notification.timestamp}</p>
            </div>
        `;
        historyContainer.appendChild(div);
        // Trigger animation
        requestAnimationFrame(() => {
            div.classList.remove('notification-card-enter');
            div.classList.add('notification-card-enter-active');
        });
    });
}