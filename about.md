
## Descriere generala
Proiectul ofera posibilitatea vizualizarii informatiilor legate de monumente (locatie, stare, imagini, descrieri) intr-un mod cat mai intuitiv si usor de inteles. 

Avand in vedere numarul ridicat de monumente inventariate si volumul datelor acumulate, am identificat **nevoia unei modalitati de prezentare a informatiilor** intr-un mod rapid, usor de inteles si usor de navigat. 

Alternativa fiind citirea informatiilor de catre partile interesate dintr-un fisier .csv si corelarea lor cu imaginile dintr-o structura complexa de directoare (e vorba de mii de imagini si directoare), **proiectul de fata propune si ofera o experienta imbunatatita considerabil**, ajutand la:
* Posibilitatea verificarii rapide a corectitudinii informatiilor adunate din teren
* O **imagine de ansamblu** rapida a volumului efectiv de informatii stranse
* **Accesibilitatea publicului larg** la datele si informatiile captate in cadrul proiectului (nu doar a expertilor care stiu lucra cu fisiere .csv si structuri de directoare), **printr-o experienta placuta**, intalnita destul de rar la solutiile oferite de institutiile oficiale.

  
## Obiectivele proiectului (faza initiala)
Prezentarea monumentelor din Bucuresti intr-un **usor de inteles si usor de navigat**. 
Am dorit deasemenea ca solutia sa fie suficient de flexibila pentru a o putea extinde si la **reprezentarea monumentelor din restul tarii**, cu modificari cat mai putine, lucru pe care consideram ca l-am realizazt.


## Obiective si functionalitati
Realizarea unei pagini web care:
- [x] Afiseaza o **harta a municipiului Bucuresti** (implementat 100%)
- [x] Pentru fiecare monument inventariat, afiseaza un **marker pe harta**, la locatia geografica a monumentului respectiv - (implementat 100%)
- [x] Afiseaza o **lista cu denumirea monumentelor**, astfel incat utilizatorii sa poata naviga printre ele folosindu-se de numele lor (implementat 100%)
- [X] Expune un **camp de cautare** pentru ca utilizatorii sa poata cauta rapid un monument sau un set de monumente (implementat 100%)
- [x] O zona care sa ofere **detaliile monumentului** (descriere, starea monumentului, foto monument) in momentul in care utilizatorul il selecteaza (prin click pe marker, sau selectie din lista) (implementat 100%)

## Obiective si directii non-functionale (tehnice)
Obiectivele non-functionale sunt acelea care nu "se observa" ca functionalitati, dar au un **impact major in implementarea, extensibilitatea, livrabilitatea, imbunatatirea si mentenanta proiectului**. 
Pentru a oferi o solutie software cat mai buna, ne-am orientat catre tehnologii care sa intruneasca urmatoarele conditii:
- [x] Sa ne permita o **dezvoltare cat mai rapida** a solutiei
- [x] Sa fie tehnologii moderne, pentru a incuraja contributii la proiect din partea comunitatii de IT
- [x] Sa fie **[cloud ready](https://blog.luminanetworks.com/what-does-cloud-ready-mean)** si usor de [scalat pe orizontala](https://github.com/vaquarkhan/vaquarkhan/wiki/Difference-between-scaling-horizontally-and-vertically)
- [x] Sa fie **open source**, pentru ca codul proiectului sa poata fi el insusi facut public si pentru a nu implica costuri de licentiere
- [x] Sa permita costuri de hosting rezonabile
- [x] Sa permita instalarea softului pe o plaja cat mai larga de hosting provideri, cu eforturi minime.

## Solutiile tehnice adoptate si procesul de R&D
Solutia curenta se bazeaza pe experienta de peste 15 ani in enterprise software development ai echipei, precum si pe concluziile trase in urma sesiunilor de **research & development (R&D)** pentru a decide daca o tehnologie este potrivita sau nu.

### Operational
Solutia se bazeaza pe [Docker](https://www.docker.com/) ca tehnologie de **[containerizare a aplicatiilor](https://www.parkmycloud.com/blog/application-containerization/)** pentru ca este o tehnologie matura, larg raspandita si folosita in industria IT.

Pentru a mentine dimensiunea imaginilor de docker in parametri rezonabili, am decis ca acestea sa fie construite folosind [docker multi-stage builds](https://medium.com/capital-one-tech/multi-stage-builds-and-dockerfile-b5866d9e2f84).

Pentru ca procesul de setup initial si dezvoltare a aplicatiei sa fie cat mai rapid pentru dezvoltatorii care vor sa intre pe proiect, am folosit [docker-compose](https://gabrieltanner.org/blog/docker-compose).

Ca solutie pentru hosting si orchestrare a containerelor am ales sa folosim **[docker swarm](https://docs.docker.com/engine/swarm/)**, deasemenea hostuit de noi, pentru ca este rapid de instalat si configurat si pentru ca stie lucra cu docker-compose cu modificari minime, ceea ce asigura ca **aplicatia se comporta identic in development mode, in staging si in productie**. Alternativa era [Kubernetes](https://kubernetes.io/), dar variantele gestionate de cloud provideri ofera hardware la un pret de cateva ori mai ridicat decat cel self hosted. Desi kubernetes este deasemenea open source, instalarea si mentenanta clusterelor de kubernetes [cresc considerabil complexitatea operationala a hostingului](https://gist.github.com/jonathan-kosgei/dac620fed9d9aeec35050bcc0a146647).

Instanta self hosted de **GitLab**: am ales sa folosim git si gitlab ca unealta de VCS (versioning control system), pentru ca acesta ofera posibilitatea configurarii [pipelinurilor de continuous integration/continuous delivery (CI/CD)](https://semaphoreci.com/blog/cicd-pipeline) [direct in gitlab](https://docs.gitlab.com/ee/ci/).

### Tehnologii backend

[NodeJS](https://nodejs.org/en/)(javascript) ca limbaj de programare si [NestJS](https://nestjs.com/) ca framework de dezvoltare a aplicatiei. Motivele pentru care am ales acest stack sunt:
- NodeJS/Javascript - tehnologie moderna cu un ecosistem de module extrem de bogat, salvand timp de dezvoltare. Un alt avantaj major e faptul ca javascript e deasemenea limbajul de programare folosit in partea de frontend.
- NestJS pentru ca e un framework care ofera o gama larga de functionalitate out of the box, precum si un set de conventii larg acceptate in industrie, deasemenea ajutand la reducerea timpului de dezvoltare

### Tehnologii frontend
- [VueJS](https://vuejs.org/): este cel mai popular proiect open source de frontend din punct de vedere al numarului de adaugari la favorit. Deasemenea este cunoscut de toti membrii echipei de dezvoltare.
- [Quasar](https://quasar.dev/). Initial am pornit proiectul folosind [Vuetify](https://vuetifyjs.com/en/) pentru ca e mai popular, dar dupa cateva zile, din cauza ca dezvoltarea era greoaie si neintuitiva, am schimbat la Quasar.
- [MapBox](https://www.mapbox.com/) (cel putin deocamdata). Am avut de ales intre [openlayers](https://openlayers.org/), [leaflet.js](https://leafletjs.com/) (care foloseste [openstreetmap](https://www.openstreetmap.org/) ca provider de harti), [google maps](https://developers.google.com/maps/documentation), mapbox sau o solutie open source self-hosted (ex: [geoserver](http://geoserver.org/)). 

In urma unui proces de R&D in care am cercetat functionalitatile, costurile si tradeoffurile variantelor, am ajuns la concluzia ca, in momentul de fata, MapBox este cea mai potrivita solutie:
- Google Maps: am eliminat-o ca varianta pentru ca in iulie 2018 si-au [crescut considerabil preturile](https://geoawesomeness.com/developers-up-in-arms-over-google-maps-api-insane-price-hike/), restrangand destul de drastic volumul utilizarii gratuite.
- OpenLayers si Leaflet: le-am eliminat, pentru ca nu ofera posibilitatea de a desena markerele peste harta cu poze din satelit
- Varianta self-hosted: e necesar hardware puternic (recomandat 64GB RAM ) pentru a putea genera si servi harti. Chiar daca pe viitor aceasta varianta s-ar putea dovedi o solutie viabila, am considerat ca **in momentul de fata ar necesita costuri nejustificate**.

### Tehnologii de persistenta a datelor
In faza prezenta a proiectului, nu e necesara folosirea unei baze de date: informatiile legate de monumente (locatie, descriere, stare, samd) sunt stocate intr-un fisier .csv care este updatat de arhitectii care inventariaza documentele. Pozele sunt stocate intr-o structura de directoare pe server si servite de o instanta de nginx.

### Procesul de dezvoltare si suportul operational
Din momentul in care mediul de dezvoltare este configurat pe calculatorul programatorului, implementarea unei functionalitati decurge astfel:
1. `git pull master` - pentru a aduce din repository-ul central ultimele modificari facute de alti dezvoltatori
2. `git checkout -b nume_functionalitate` - cream un branch pentru a ne asigura ca nu stricam ceea ce deja functioneaza
3. programatorul implementeaza functionalitatea
4. `git push` - pentru a trimite codul nou pe server
5. pipeline-ul de CI/CD face un build cu noile modificari, ruleaza testele (nu am implementat deocamdata teste, dar cand/daca vor fi, **pipeline-ul le va rula automat**) si mai executa niste verificari de baza pentru asigurarea calitatii codului.
6. Daca buildul, testele si verificarile au succes, programatorul are posibilitatea sa includa functionalitatea in branchul principal (master), moment in care:
7. pipeline-ul de CI/CD construieste imaginile de docker pentru stage-ul de productie si **face deploy automat in mediul de staging**.
8. Dupa ce testam in staging si vedem ca totul merge cum trebuie, putem face deploy (din nou, in mod automat), in productie, prin simpla apasare a unui buton (deployul il face tot pipeline-ul de CI/CD).

## Functionalitati si taskuri implementate pana acum si durata lor
Nu am trackuit dezvoltarea in mod individual, asa ca duratele de jos sunt estimative:
<!---
Tabela creata cu https://www.tablesgenerator.com/markdown_tables
-->

| Nume task/functionalitate                                                                                                                                                                                                                                                   | Procent implementat        | Durata aproximativa a implementarii |
|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------------------------|-------------------------------------|
| Setarea initiala proiectului<br>Cod:<br> - setup client <br> - setup server<br>Operational:<br> - Dockerizat client si server<br> - Configurat docker-compose<br> - Configurat docker swarm<br> - Configurat gitlab CI/CD pipeline<br> - Configurat serverul de productie si staging | 100% pentru stadiul actual | 7 zile                              |
| R&D pentru deciziile legate de:<br>- furnizorul de harta<br>- libraria de componente pe UI<br>- frameworkul pentru backend                                                                                                                                                  | 100%                       | 2 zile                              |
| Implementarea functionalitatilor                                                                                                                                                                                                                                            | 100%                       | 8 zile                              |
| Transformarea si adaptarea datelor culese din teren pentru a putea fi folosite in aplicatie:<br>- normalizare nume campuri <br>- completat date lipsa <br>- incadrarea monumentelor in una dintre cele patru categorii de monumente<br>- post-procesare poze (copiat in folderele potrivite, setat orientarea pe verticala la fiecare, etc) | 100% | 2 zile |
| Total (la data de 20/02/2020)                                                                                                                                                                                                                                               |                            | 19 zile                             |


## Roadmap si propuneri
Proiectul de fata este doar inceputul a ceea ce ar putea deveni o solutie inovativa, **o solutie deschisa**, care sa reprezinte [sursa de adevar](https://en.wikipedia.org/wiki/Single_source_of_truth) in stocarea si reprezentarea datelor publice cu componente de geolocatie. 
O solutie care sa ofere **acces facil** tuturor cetatenilor la informatii care ar trebui sa fie publice.
O solutie care sa ofere posibilitatea oricarui cetatean sa contribuie el insusi cu informatii, din 2-3 clickuri.

Pentru a duce proiectul in aceasta directie, propunem cateva functionalitati pe care le putem implementa in perioada urmatoare:

### Extinderea solutiei si pentru PATCJ
**Importanta**: ridicata<br/>
**Estimare implementare**: 2-3 zile<br/>
Pe langa adaptatul datelor de pe Cluj si incarcatul lor pe server, e nevoie de adaptat interfata web (logo, branding, sectiuni, etc).

### Posibilitate export date
**Importanta**: ridicata<br/>
**Estimare implementare**: 1-5+ zile<br/>
In functie de cat de departe mergem cu implementarea acestei functionalitati, durata poate fi mai mare sau mai mica. <br/>
Ex 1 (implementare rapida 1-2 zile): Utilizatorul face o cautare text si da export la lista cu rezultatele cautarii. Impunem **o limita maxima a numarului** de monumente care pot fi exportate odata, pentru ca exportul sa poata fi relativ instant.<br/>
Ex 2 (implementare medie 2-4 zile): Utilizatorul face o cautare text si da export la lista cu rezultatele cautarii. Nu impunem nicio limita a numarului de monumente care pot fi exportate, dar exportul se genereaza asincron, iar utilizatorul va primi un email cu un url catre fisierul generat.<br/>
Ex 3 (implementare lunga 3+ zile): Utilizatorul deseneaza pe harta un perimetru si exporta toate monumentele din interiorul perimetrului.

### Adaugare DB la solutie (SQL, sau NoSQL)
**Importanta**: ridicata<br/>
**Estimare implementare**: 2-4 zile<br/>
Pentru a putea persista si interoga datele intr-un mod dinamic si flexibil, e nevoie de un storage engine (baza de date). 
Daca dorim ca pe viitor solutia prezenta sa fie folosita pentru un **volum mai mare de informatii**, acestea vor trebui stocate intr-o baza de date.
Observatie: cu cat adaugam mai tarziu DB-ul la solutie, cu atat s-ar putea sa avem de adaptat mai multa functionalitate

### Gestiune de conturi de utilizatori
**Importanta**: medie <br/>
**Estimare implementare**: 3-5+ zile<br/>
**Depinde de**: [Adaugare DB](#adaugare-db-la-solutie-sql-sau-nosql)<br/>

Pentru ca informatiile afisate pe site sa poata fi gestionate dintr-o interfata web, e nevoie de **useri**, **roluri** (admin, contributor, etc) si un sistem de moderare a activitatii.
Pentru a avea utilizatori pe site, e nevoie cel putin de urmatoarele ecrane si functionalitati:
- signup<br/>
- email confirmation<br/>
- login<br/>
- password reset<br/>
- user profile page<br/>
- optional: login cu facebook, google, etc<br/>

### Solutie self-hosted de furnizor de harti
**Importanta**: scazuta (deocamdata)<br/>
**Estimare implementare**: 2-4+ zile<br/>

Pentru cazul in care solutia prezenta devine populara, iar numarul vizualizarilor creste la peste 50 000 lunar, s-ar putea sa fie justificat instalarea si configurarea unui server care sa serveasca hartile. Ca preturi, in momentul de fata mapbox ofera primele 50 000 de incarcari de harta lunare gratis, iar [urmatoarele pornesc de la $5 / 1 000 de incarcari](https://www.mapbox.com/pricing/). 
Pentru a avea propriul nostru server de harti, geoserver recomanda minimum 64GB RAM si +1 TB SSD storage, ceea ce duce costurile de hosting undeva la +100 EUR/luna pentru serverul de harti.
