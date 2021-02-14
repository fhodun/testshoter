# Testshoter Discord Bot

[![GitHub stars](https://img.shields.io/github/stars/fhodun/testshoter)](https://github.com/fhodun/testshoter/stargazers)
[![GitHub license](https://img.shields.io/github/license/fhodun/testshoter)](https://github.com/fhodun/testshoter/blob/main/LICENSE)
[![Twitter](https://img.shields.io/twitter/url?url=https%3A%2F%2Fgithub.com%2Ffhodun%2Ftestshoter)](https://twitter.com/intent/tweet?text=Wow:&url=https%3A%2F%2Fgithub.com%2Ffhodun%2Ftestshoter)  
[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/Q5Q83N219)

## Przegląd

Discord bot wysyłający treść pytań i odpowiedzi do testów na testportal'u

- [Testshoter Discord Bot](#testshoter-discord-bot)
- [Ważne](#ważne)
- [Komendy](#komendy)
- [Wymagania wstępne](#wymagania-wstępne)
- [Pobieranie Testshoter'a](#pobieranie-testshoter'a)
  - [Klonowanie repozytorium](#klonowanie-repozytorium)
  - [Pobieranie repozytorium](#pobieranie-repozytorium)
- [Tworzenie i dodawanie tokena Discord](#tworzenie-i-dodawanie-tokena-discord)
- [Zapraszanie bota](#zapraszanie-bota)
- [Instalowanie wymaganych pakietów](#instalowanie-wymaganych-pakietów)
- [Uruchamianie bota](#uruchamianie-bota)
- [Pozdrowienia](#pozdrowienia)
- [Licencja i wyłączenie odpowiedzialności](#licencja-i-wyłączenie-odpowiedzialności)

## Ważne

Najważniejsze informacje:

- bot nie wysyła poprawnych odpowiedzi do testów, a jedynie treść pytań i odpowiedzi
- bot nie jest niewidoczny, nauczyciel widzi go jako puste pole w wynikach, ale jeśli nie jest zaznajomiony z technologią, nie zrozumie tego, przykład <https://i.imgur.com/B9fE0gP.png>
- jeśli w teście jest otwarte pytanie, na które odpowiedź jest wymagana, bot się zatrzyma

## Komendy

- `>test (testportal_test_link)` rozpoczęcie programu
- `>version` sprawdza czy wersja bota jest aktualna
- `>help` pokazuje pomoc
- `>important` wyświetla najważniejsze informacje po Angielsku
- `>wazne` wyświetla najważniejsze informacje

## Instalacja i uruchamianie

Instrukcja w języku angielskim na [stronie wiki](https://github.com/fhodun/testshoter/wiki/Installation-and-starting-up)

### Wymagania wstępne

Upewnij się, że zainstalowałeś wszystkie wymagania wstępne:

- [Node.js](https://nodejs.org/en/download/).

### Pobieranie Testshoter'a

Istnieje kilka sposobów na pobranie Testshotera:

#### Klonowanie repozytorium

Zalecanym sposobem uzyskania Testshoter jest użycie Git'a do bezpośredniego sklonowania repozytorium:

```sh
git clone https://github.com/fhodun/testshoter
```

Spowoduje to sklonowanie najnowszej wersji repozytorium Testshoter do folderu **testshoter**.

#### Pobieranie repozytorium

Innym sposobem na pobranie Testshotera jest [pobranie kopii zip](https://github.com/fhodun/testshoter/archive/main.zip) z GitHub'a

### Tworzenie i dodawanie tokena Discord

Utwórz nową [aplikację](https://discord.com/developers/applications) Discorda i w menu wybierz bota używając [tego](https://i.imgur.com/WKQgdyH.png) przycisku.
Skopiuj [Token](https://i.imgur.com/r322GcU.png), otwórz plik `.env.example` i wklej token w miejsce ` <your-token-here> `, następnie zmień nazwę tego pliku na` .env ` i zapisz.

### Zapraszanie bota

Aby dodać bota do serwera, przejdź [tutaj](https://discord.com/developers/applications) i wybierz swoją aplikację.
W menu wybierz [OAuth2](https://i.imgur.com/TtXF7U2.png), wybierz [bot](https://i.imgur.com/TtXF7U2.png), w tabeli poniżej wybierz `Wyślij wiadomości, Menage Messages, Embed links, Attach Files`,
następnie otwórz wygenerowany linku w przeglądarce i wybierz serwer.

### Instalowanie wymaganych pakietów

Zainstaluj wymagane pakiety przy użyciu npm w terminalu:

```sh
npm install
```

### Uruchamianie bota

Uruchom bota używając npm w terminalu:

```sh
npm start
```

## Pozdrowienia

Podziękowania dla [gbaransky](https://github.com/gbaranski) za jego wkład w projekt.  
Inspiracja i pomysł zaczerpnięte z [arekminajj/testportal-discord-bot](https://github.com/arekminajj/testportal-discord-bot).

## Licencja i wyłączenie odpowiedzialności

Wydany na licencji [MIT](LICENSE).  
Stworzone w celach edukacyjnych.  
Autor nie ponosi żadnej odpowiedzialności za jakiekolwiek szkody, które mogą wyniknąć z korzystania z tego oprogramowania.
