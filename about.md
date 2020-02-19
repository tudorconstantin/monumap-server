
## Descriere generala
Proiectul ofera posibilitatea vizualizarii informatiilor legate de monumente (locatie, stare, imagini, descrieri) intr-un mod cat mai intuitiv si usor de inteles. 

Avand in vedere numarul ridicat de monumente inventariate si volumul datelor acumulate, am identificat **nevoia unei modalitati de prezentare a informatiilor** intr-un mod rapid, usor de inteles si usor de navigat. 

Alternativa fiind citirea informatiilor de catre partile interesate dintr-un fisier .csv si corelarea lor cu imaginile dintr-o structura complexa de directoare (e vorba de mii de imagini si directoare), **proiectul de fata propune si ofera o experienta imbunatatita considerabil**, ajutand la:
* Posibilitatea verificarii rapide a corectitudinii informatiilor adunate din teren
* O **imagine de ansamblu** rapida a volumului efectiv de informatii stranse
* **Accesibilitatea publicului larg** la datele si informatiile captate in cadrul proiectului (nu doar a expertilor care stiu lucra cu fisiere .csv si structuri de directoare), **printr-o experienta placuta**, intalnita destul de rar la solutiile oferite de institutiile oficiale.

  
## Obiectivele proiectului (faza initiala)
Prezentarea monumentelor din Bucuresti intr-un **usor de inteles si usor de navigat**.


## Obiective si functionalitati
Realizarea unei pagini web care:
- [x] Afiseaza o **harta a municipiului Bucuresti** (implementat 100%)
- [x] Pentru fiecare monument inventariat, afiseaza un **marker pe harta**, la locatia geografica a monumentului respectiv - (implementat 100%)
- [x] Afiseaza o **lista cu denumirea monumentelor**, astfel incat utilizatorii sa poata naviga printre ele folosindu-se de numele lor (implementat 100%)
- [X] Expune un **camp de cautare** pentru ca utilizatorii sa poata cauta rapid un monument sau un set de monumente (implementat 80%)
- [x] O zona care sa ofere **detaliile monumentului** (descriere, starea monumentului, foto monument) in momentul in care utilizatorul il selecteaza (prin click pe marker, sau selectie din lista) (implementat 80%)

## Obiective si directii non-functionale (tehnice)
Obiectivele non-functionale sunt acelea care nu "se observa" ca functionalitati, dar au un** impact major in implementarea, extensibilitatea, livrabilitatea, imbunatatirea si mentenanta proiectului**. 
Pentru a oferi o solutie software cat mai buna, ne-am orientat catre tehnologii care sa intruneasca urmatoarele conditii:
- [x] Sa ne permita o **dezvoltare cat mai rapida** a solutiei
- [x] Sa fie tehnologii moderne, pentru a incuraja contributii la proiect din partea comunitatii de IT
- [x] Sa fie **[cloud ready](https://blog.luminanetworks.com/what-does-cloud-ready-mean)** si usor de scalat pe orizontala
- [x] Sa fie **open source**, pentru ca codul proiectului sa poata fi el insusi facut public si pentru a nu implica costuri de licentiere
- [x] Sa permita costuri de hosting rezonabile
- [x] Sa permita instalarea softului pe o plaja cat mai larga de hosting provideri, cu eforturi minime.

## Solutiile tehnice implementate si procesul de R&D
Solutia curenta se bazeaza pe experienta de peste 15 ani in enterprise software development ai echipei, precum si pe concluziile trase in urma sesiunilor de **research & development (R&D)** pentru a vedea daca o tehnologie este potrivita sau nu.

### Operational
Solutia se bazeaza pe [Docker](https://www.docker.com/) ca tehnologie de **[containerizare a aplicatiilor](https://www.parkmycloud.com/blog/application-containerization/)** pentru ca este o tehnologie matura, larg raspandita si folosita in industria IT.
Ca solutie pentru hosting si orchestrare a containerelor am ales sa folosim **[docker swarm](https://docs.docker.com/engine/swarm/)**, deasemenea hostuit de noi. Alternativa era [Kubernetes](https://kubernetes.io/), dar variantele gestionate de cloud provideri ofera hardware la un pret de cateva ori mai ridicat decat cel self hosted. Desi kubernetes este deasemenea open source, instalarea si mentenanta clusterelor de kubernetes [cresc considerabil complexitatea operationala a hostingului](https://gist.github.com/jonathan-kosgei/dac620fed9d9aeec35050bcc0a146647).

Instanta self hosted de **GitLab**: am ales sa folosim git si gitlab ca unealta de VCS (versioning control system), pentru ca acesta ofera posibilitatea configurarii [pipelinurilor de continuous integration/continuous delivery (CI/CD)](https://semaphoreci.com/blog/cicd-pipeline) [direct in gitlab](https://docs.gitlab.com/ee/ci/).

### Tehnologii backend

[NodeJS](https://nodejs.org/en/)(javascript) ca limbaj de programare si [NestJS](https://nestjs.com/) ca framework de dezvoltare a aplicatiei. Motivele pentru care am ales acest stack sunt:
- NodeJS/Javascript - tehnologie moderna cu un ecosistem de module extrem de bogat, salvand timp de dezvoltare. Un alt avantaj major e faptul ca javascript e deasemenea limbajul de programare folosit in partea de frontend.
- NestJS pentru ca e un framework care ofera o gama larga de functionalitate out of the box, precum si un set de conventii larg acceptate in industrie, deasemenea ajutand la reducerea timpului de dezvoltare

### Tehnologii frontend
- [VueJS](https://vuejs.org/): este cel mai popular proiect open source de frontend din punct de vedere al numarului de adaugari la favorit. Deasemenea este cunoscut de toti membrii echipei de dezvoltare.
- [Quasar](https://quasar.dev/). Initial am pornit proiectul folosind [Vuetify](https://vuetifyjs.com/en/) pentru ca e mai popular, dar dupa cateva zile, din cauza ca dezvoltarea era greoaie si neintuitiva, am schimbat la Quasar.
- [MapBox](https://www.mapbox.com/) (cel putin deocamdata). Am incercat sa folosim leaflet.js si 

### Procesul de dezvoltare si suportul operational

## Roadmap si propuneri