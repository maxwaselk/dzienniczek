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
        li.textContent = meeting;

        // Tworzenie przycisku usuwania
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Usuń';
        deleteBtn.addEventListener('click', function() {
            li.remove();
            removeMeeting(meeting);
        });

        li.appendChild(deleteBtn);
        meetingList.appendChild(li);
    }

    // Funkcja usuwająca spotkanie z LocalStorage
    function removeMeeting(meeting) {
        let meetings = JSON.parse(localStorage.getItem('meetings')) || [];
        meetings = meetings.filter(m => m !== meeting);
        saveMeetings(meetings);
    }

    // Obsługa dodawania nowego spotkania
    meetingForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const meetingInput = document.getElementById('meeting');
        const meeting = meetingInput.value;

        if (meeting) {
            addMeetingToList(meeting);
            let meetings = JSON.parse(localStorage.getItem('meetings')) || [];
            meetings.push(meeting);
            saveMeetings(meetings);
            meetingInput.value = '';
        }
    });

    // Wczytanie spotkań przy uruchomieniu
    loadMeetings();
});