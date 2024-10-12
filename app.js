document.addEventListener('DOMContentLoaded', function () {
    let spotkania = JSON.parse(localStorage.getItem('spotkania')) || [];
    const form = document.getElementById('form-spotkanie');
    const spotkaniaContainer = document.getElementById('spotkania');
    const idInput = document.getElementById('id');
    const imieNazwiskoInput = document.getElementById('imie_nazwisko');
    const dataInput = document.getElementById('data');
    const godzinaInput = document.getElementById('godzina');
    const sprawaInput = document.getElementById('sprawa');
    const submitButton = document.getElementById('submit-btn');
    const powiadomieniaContainer = document.getElementById('powiadomienia');

    // Funkcja wyświetlająca spotkania
    function wyswietlSpotkania() {
        spotkaniaContainer.innerHTML = spotkania.map(spotkanie => `
            <div class="spotkanie-item">
                <h3>${spotkanie.imieNazwisko}</h3>
                <p>Data: ${spotkanie.data}, Godzina: ${spotkanie.godzina}</p>
                <p>Sprawa: ${spotkanie.sprawa}</p>
                <button class="edit-btn" onclick="edytujSpotkanie('${spotkanie.id}')">Edytuj</button>
                <button class="delete-btn" onclick="usunSpotkanie('${spotkanie.id}')">Usuń</button>
            </div>
        `).join('');
    }

    // Funkcja dodająca powiadomienie
    function dodajPowiadomienie(message, type) {
        const powiadomienie = document.createElement('div');
        powiadomienie.classList.add('notification', type);
        powiadomienie.innerHTML = `
            <span>${message}</span>
            <button onclick="this.parentElement.remove()">×</button>
        `;

        powiadomieniaContainer.appendChild(powiadomienie);
        setTimeout(() => powiadomienie.classList.add('show'), 10);

        // Usunięcie powiadomienia po 3 sekundach
        setTimeout(() => {
            powiadomienie.classList.remove('show');
            setTimeout(() => powiadomienie.remove(), 500);
        }, 3000);
    }

    // Funkcja edytująca spotkanie
    window.edytujSpotkanie = function(id) {
        const spotkanie = spotkania.find(s => s.id === id);
        if (spotkanie) {
            idInput.value = spotkanie.id;
            imieNazwiskoInput.value = spotkanie.imieNazwisko;
            dataInput.value = spotkanie.data;
            godzinaInput.value = spotkanie.godzina;
            sprawaInput.value = spotkanie.sprawa;
            submitButton.textContent = 'Zaktualizuj spotkanie';
        }
    }

    // Funkcja usuwająca spotkanie
    window.usunSpotkanie = function(id) {
        if (confirm('Czy na pewno chcesz usunąć to spotkanie?')) {
            spotkania = spotkania.filter(spotkanie => spotkanie.id !== id);
            localStorage.setItem('spotkania', JSON.stringify(spotkania));
            wyswietlSpotkania();
            dodajPowiadomienie('Spotkanie zostało usunięte', 'error');
        }
    }

    // Dodawanie lub aktualizacja spotkania
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        const id = idInput.value;
        const imieNazwisko = imieNazwiskoInput.value;
        const data = dataInput.value;
        const godzina = godzinaInput.value;
        const sprawa = sprawaInput.value;

        if (id) {
            // Aktualizacja istniejącego spotkania
            const spotkanieIndex = spotkania.findIndex(s => s.id === id);
            spotkania[spotkanieIndex] = { id, imieNazwisko, data, godzina, sprawa };
            dodajPowiadomienie('Spotkanie zostało zaktualizowane', 'success');
        } else {
            // Dodanie nowego spotkania
            const noweSpotkanie = { id: Date.now().toString(), imieNazwisko, data, godzina, sprawa };
            spotkania.push(noweSpotkanie);
            dodajPowiadomienie('Spotkanie zostało dodane', 'success');
        }

        localStorage.setItem('spotkania', JSON.stringify(spotkania));
        form.reset();
        idInput.value = '';
        submitButton.textContent = 'Dodaj spotkanie';
        wyswietlSpotkania();
    });

// Rejestracja Service Workera z właściwą ścieżką
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/dzienniczek/service-worker.js')
        .then(registration => console.log('Service Worker zarejestrowany', registration))
        .catch(error => console.log('Błąd rejestracji Service Workera:', error));
}
});
