# 📋 Requirements

🔗 API: http://www.omdbapi.com/

> "Wyszukanie filmów i przeglądanie szczegółów wybranego tytułu"

## 💻 Funkcjonalności

1.  Strona główna
    - formularz wyszukiwania filmów

        >
                Q: 1 input czy więcej?
                    A: kilka

                Q: debouncer czy enter/przycisk?
                    A: enter - limit API

                TIP: API wyszukuje po `title`, `type`, `year`

    - możliwość filtrowania po:
        - roku premiery
        - typie

            >
                Q: gdzie umieścić filtrowanie?
                    A: nad listą

                TIP: `type: movie | series | episode`

    - lista wyników wyszukiwania
        >
                Q: czy wyświetlić domyślnie jakieś filmy?
                    A: raczej niemożliwe, `title` jest wymaganym parametrem
    - paginacja:
        - może być klasyczna
        - lub infinite scroll
            >
                    Q: czy API zwraca wszystkie wyniki i paginacja po stronie klienta, żeby nie renderować wszystkiego?
                        A: zwraca maks. 10 wyników, liczbę wszystkich rekordów i aktualną stronę, endpoint ma parametr `page`

2.  Widok szczegółów filmu
    - wyświetlenie informacji o filmie (np. tytuł, opis, gatunek, rok, ocena, poster itp.)
        >
                Q: wyświetlić jako modal, side panel, osobna strona?
                    A: osobna strona

                Q: jeżeli nie da się pobrać grafiki (płatne API) to co wstawić w zamian?
                    A: API zwraca link do małych grafik

3.  Ulubione
    - możliwość dodawania i usuwania filmów z listy „ulubionych”
    - ulubione powinny być trwałe po odświeżeniu strony
        >
                Q: gdzie przechowywać dane? local storage?
                    A: indexed db

                Q: wyświetlić jako modal, side panel, osobna strona, widget?
                    A: osobna strona, taka jak strona główna

                Q: przechowywać tylko ID czy wszystkie dane o filmie i wysyłać request żeby zaktualizować oceny?
                    A: przechowywanie całych elementów, ale bez ocen

                Q: co robić przy usuwaniu z ulubionych?
                    A: usuwanie z indexed db

## 💻 Wymagania techniczne

- aplikacja może być zbudowana jako SPA lub jako aplikacja SSR (np. Next.js)
    >
            React, SPA
- aplikacja powinna:
    - obsługiwać błędy z API
        >
                Q: jakie błędy? jakie kody błędów?
                    A: wyłapanie błędów + `res.Response = "False"

                Q: strona z błędem
                    A: komponent ze szczegółami
    - być responsywna

        >
                Q: wybrać `@media (min-width)` dla mobilnych
                    A: tailwind to obsługuje

                I: mobile-first

    - spełniać podstawowe wymogi WCAG
        >
                Q: która wersja?
                    A: React Axe - WCAG 2.0 i 2.1, A & AA

                Q: w jaki sposób zweryfikować?
                    A: React Axe dla developmentu

    - być zoptymalizowana pod kątem SEO
        >
                Q: poczytać o web vitals i w jaki sposób można poprawić SEO
                    A: podstawowe meta tagi
                Q: robots.txt?
                    A: dodane

- mile widziane testy jednostkowe
    >
            Q: tylko Vitest czy RTL również?
                A: oba
