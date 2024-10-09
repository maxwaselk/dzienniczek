document.addEventListener('DOMContentLoaded', () => {
    const meetingForm = document.getElementById('meetingForm');
    const meetingList = document.getElementById('meetingList');

    // Funkcja do wczytania spotkań z LocalStorage
    const loadMeetings = () => {
        const meetings = JSON.parse(localStorage.getItem('meetings')) || [];
        meetings.forEach(meeting => addMeetingToList(meeting));
    };

    // Funkcja do zapisywania spotkań w LocalStorage
    const saveMeetings = (meetings) => {
        localStorage.setItem('meetings', JSON.stringify(meetings));
    };

    // Funkcja dodająca spotkanie do listy w UI
    const addMeetingToList = (meeting) => {
        const li = document.createElement('li');
        li.setAttribute('data-id', meeting.id);

        const detailsDiv = document.createElement('div');
        detailsDiv.innerHTML = `
            <p><span>Imię i Nazwisko:</span> ${meeting.name}</p>
            <p><span>Data:</span> ${formatDate(meeting.date)}</p>
            <p><span>Godzina:</span> ${meeting.time}</p>
            <p><span>Cel Spotkania:</span> ${meeting.purpose}</p>
        `;

        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('delete-btn');
        deleteBtn.innerHTML = '<i class="fas fa-trash-alt"></i>';
        deleteBtn.addEventListener('click', () => {
            li.classList.add('fade-out');
            setTimeout(() => {
                li.remove();
                removeMeeting(meeting.id);
            }, 300);
        });

        li.appendChild(detailsDiv);
        li.appendChild(deleteBtn);
        meetingList.prepend(li); // Dodaje nowe spotkania na górę listy
    };

    // Funkcja usuwająca spotkanie z LocalStorage
    const removeMeeting = (id) => {
        let meetings = JSON.parse(localStorage.getItem('meetings')) || [];
        meetings = meetings.filter(m => m.id !== id);
        saveMeetings(meetings);
    };

    // Obsługa dodawania nowego spotkania
    meetingForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value.trim();
        const date = document.getElementById('date').value;
        const time = document.getElementById('time').value;
        const purpose = document.getElementById('purpose').value.trim();

        if (name && date && time && purpose) {
            const meeting = {
                id: Date.now(),
                name,
                date,
                time,
                purpose
            };

            addMeetingToList(meeting);
            let meetings = JSON.parse(localStorage.getItem('meetings')) || [];
            meetings.push(meeting);
            saveMeetings(meetings);

            // Resetowanie formularza
            meetingForm.reset();
        }
    });

    // Funkcja formatowania daty
    const formatDate = (dateStr) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const date = new Date(dateStr);
        return date.toLocaleDateString('pl-PL', options);
    };

    // Wczytanie spotkań przy uruchomieniu
    loadMeetings();
});