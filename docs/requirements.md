# 📋 Requirements

🔗 API: http://www.omdbapi.com/

> "Wyszukanie filmów i przeglądanie szczegółów wybranego tytułu"

## 💻 Funkcjonalności
1. Strona główna
    - formularz wyszukiwania filmów
        > 
            Q: 1 input czy więcej?
            Q: debouncer czy enter/przycisk?
            
            TIP: API wyszukuje po `title`, `type`, `year`
    - możliwość filtrowania po:
        - roku premiery
        - typie
        >
            Q: gdzie umieścić filtrowanie?

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

2. Widok szczegółów filmu
    - wyświetlenie informacji o filmie (np. tytuł, opis, gatunek, rok, ocena, poster itp.)
        >
            Q: wyświetlić jako modal, side panel, osobna strona?
            Q: jeżeli nie da się pobrać grafiki (płatne API) to co wstawić w zamian?

3. Ulubione
    - możliwość dodawania i usuwania filmów z listy „ulubionych”
    - ulubione powinny być trwałe po odświeżeniu strony
        >
            Q: gdzie przechowywać dane? local storage?
            Q: wyświetlić jako modal, side panel, osobna strona, widget?
                A: osobna strona, taka jak strona główna
            Q: przechowywać tylko ID czy wszystkie dane o filmie i wysyłać request żeby zaktualizować oceny?
            Q: co robić przy usuwaniu z ulubionych?

## 💻 Wymagania techniczne
- aplikacja może być zbudowana jako SPA lub jako aplikacja SSR (np. Next.js)
    >
        React, SPA
- aplikacja powinna:
    - obsługiwać błędy z API
        >
            Q: jakie błędy? jakie kody błędów?
            Q: strona z błędem
    - być responsywna
        >
            Q: wybrać `@media (min-width)` dla mobilnych

            I: mobile-first
    - spełniać podstawowe wymogi WCAG
        >
            Q: która wersja?
            Q: w jaki sposób zweryfikować?
    - być zoptymalizowana pod kątem SEO
        >
            - Q: poczytać o web vitals i w jaki sposób można poprawić SEO
            - Q: robots.txt?
- mile widziane testy jednostkowe
    >
        Q: tylko Vitest czy RTL również?
