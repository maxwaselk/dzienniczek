# Monitorowanie Poziomu Glukozy

Aplikacja webowa do monitorowania poziomu glukozy we krwi. Umożliwia dodawanie, edycję, usuwanie wyników pomiarów, wizualizację danych na wykresie, eksport danych do CSV, synchronizację z Firebase oraz otrzymywanie powiadomień push.

## Funkcjonalności

- Dodawanie wyników pomiarów glukozy z datą, godziną, poziomem glukozy, momentem badania oraz notatkami.
- Walidacja formularza w czasie rzeczywistym.
- Wizualizacja danych na interaktywnym wykresie liniowym za pomocą Chart.js.
- Przechowywanie danych w LocalStorage oraz synchronizacja z Firebase Firestore.
- Eksport danych do pliku CSV.
- Personalizacja interfejsu: zmiana czcionki oraz koloru motywu.
- Tryb ciemny z możliwością ręcznego przełączania.
- Powiadomienia push za pomocą Firebase Cloud Messaging.
- Działanie jako Progressive Web App (PWA) z możliwością instalacji na urządzeniach mobilnych.

## Instalacja

1. **Klonowanie Repozytorium:**
    ```bash
    git clone https://github.com/twoja-nazwa-uzytkownika/glucose-monitor.git
    ```
2. **Przejdź do katalogu projektu:**
    ```bash
    cd glucose-monitor
    ```
3. **Dodaj ikony do folderu `icons/`.**
4. **Konfiguracja Firebase:**
    - Utwórz projekt w [Firebase Console](https://console.firebase.google.com/).
    - Dodaj aplikację webową do projektu i skopiuj konfigurację Firebase.
    - Zastąp wartości w `script.js` swoimi danymi z Firebase.
    - Skonfiguruj Firebase Firestore i Cloud Messaging.
5. **Uruchom serwer lokalny:**
    - Możesz użyć np. [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) w Visual Studio Code lub innych narzędzi do hostowania statycznych stron.

## Użycie

- Otwórz aplikację w przeglądarce.
- Dodawaj wyniki pomiarów glukozy za pomocą formularza.
- Wizualizuj trendy na wykresie.
- Eksportuj dane do CSV lub synchronizuj z Firebase.
- Skonfiguruj personalizację interfejsu w sekcji Ustawienia.
- Otrzymuj powiadomienia push zgodnie z konfiguracją.

## Technologie

- HTML5, CSS3, JavaScript
- Firebase (Firestore, Authentication, Cloud Messaging)
- Chart.js
- CryptoJS
- Progressive Web App (PWA) standardy

## Licencja

MIT License
