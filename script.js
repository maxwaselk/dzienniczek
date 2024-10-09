document.addEventListener('DOMContentLoaded', function() {
    const meetingForm = document.getElementById('meetingForm');
    const meetingList = document.getElementById('meetingList');

    // Funkcja do wczytania spotkań z LocalStorage
    function loadMeetings() {
        const meetings = JSON.parse(localStorage.getItem('meetings')) || [];
        meetings.forEach(meeting => addMeetingToList(meeting));
    }

    // Funkcja do zapisywania spotkań w LocalStorage
    function saveMeetings(meetings) {
        localStorage.setItem('meetings', JSON.stringify(meetings));
    }

    // Funkcja dodająca spotkanie do listy w UI
    function addMeetingToList(meeting) {
        const li = document.createElement('li');
        const detailsDiv = document.createElement('div');
        detailsDiv.innerHTML = `
            <span>Imię i Nazwisko: </span>${meeting.name}<br>
            <span>Data: </span>${meeting.date}<br>
            <span>Godzina: </span>${meeting.time}<br>
            <span>Cel Spotkania: </span>${meeting.purpose}
        `;

        // Tworzenie przycisku usuwania
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Usuń';
        deleteBtn.addEventListener('click', function() {
            li.remove();
            removeMeeting(meeting);
        });

        li.appendChild(detailsDiv);
        li.appendChild(deleteBtn);
        meetingList.appendChild(li);
    }

    // Funkcja usuwająca spotkanie z LocalStorage
    function removeMeeting(meeting) {
        let meetings = JSON.parse(localStorage.getItem('meetings')) || [];
        meetings = meetings.filter(m => m.name !== meeting.name || m.date !== meeting.date || m.time !== meeting.time || m.purpose !== meeting.purpose);
        saveMeetings(meetings);
    }

    // Obsługa dodawania nowego spotkania
    meetingForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const date = document.getElementById('date').value;
        const time = document.getElementById('time').value;
        const purpose = document.getElementById('purpose').value;

        if (name && date && time && purpose) {
            const meeting = { name, date, time, purpose };
            addMeetingToList(meeting);
            let meetings = JSON.parse(localStorage.getItem('meetings')) || [];
            meetings.push(meeting);
            saveMeetings(meetings);

            // Resetowanie formularza
            meetingForm.reset();
        }
    });

    // Wczytanie spotkań przy uruchomieniu
    loadMeetings();
});