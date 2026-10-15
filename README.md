# GroupTraslochiSmart360° — sito

Sito statico, una sola pagina: `index.html` + `style.css` + `main.js`. Nessun build, nessuna dipendenza da installare.

## Pubblicare
È una cartella di file statici: su Vercel basta importare il repo (framework "Other", nessun comando di build, output directory `.`).
`vercel.json` rimanda `grouptraslochismart360.it` → `https://www.grouptraslochismart360.it` e mette le intestazioni di sicurezza e cache.

## Modulo di contatto
Usa EmailJS dal browser, con lo stesso servizio e template del sito precedente (vedi `main.js`, in fondo). Non serve un server.

## Animazioni da scroll
Sono in CSS (`animation-timeline`) dentro `@supports`: Chrome ed Edge le mostrano, gli altri browser vedono la pagina ferma ma completa.
Con "riduci animazioni" attivo nel sistema restano solo i reveal.

## Foto
Le originali stanno nel vecchio repo (`smart360`, cartella `public/img`). Qui sono ridotte a 1600 px per il web.
Per rifarle: `magick orig.webp -auto-orient -resize "1600x1600>" -quality 78 img/nome.webp`.
