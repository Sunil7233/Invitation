const beer = document.getElementById("beer");
const screen0 = document.getElementById("screen0");
const screenDate = document.getElementById("screenDate");
const screen1 = document.getElementById("screen1");
const screen2 = document.getElementById("screen2");
const screen3 = document.getElementById("screen3");
const screen4 = document.getElementById('screen4');
const startButton = document.getElementById("startButton");
const mainCard = document.getElementById("mainCard");

const inputName = document.getElementById("name");
const noBtn = document.getElementById("no");
const yesBtn = document.getElementById("yes");

let noBtnSize = 1;
let yesBtnSize = 1;

let noCount = Math.floor(Math.random() * 4 + 5);
console.log(noCount);

let map;
let marker;
let date = 0;

let RDV = "non";
let prenom;
let numero;
let lieuChoisi;
let dateChoisi;
let avisChoisi = "";




const start = () => {

    // 1. remplir le verre
    beer.style.animation = "fill 3s 1 forwards";
    
    // 2. après animation → switch écran
    setTimeout(() => {

        screen1.style.opacity = "0";
        screen1.style.display = 'none';
        screen1.style.transform = "translateY(-20px)";
        screen1.style.pointerEvents = "none";

        screen2.style.display = "block";

        setTimeout(() => {
            screen2.classList.add("show");
        }, 50);

    }, 3000);

    // Initialize the map only once
    if (!map) {
        map = L.map('map').setView([47.2714, -2.2048], 10); // zoom 13 pour un bon aperçu

        // Add OpenStreetMap tiles
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap contributors'
        }).addTo(map);

        // Add click event to place marker
        map.on('click', (e) => {
            if (marker) {
                map.removeLayer(marker);
            }
            marker = L.marker(e.latlng).addTo(map);

            // Display coordinates
            document.getElementById('selected-coordinates').innerText =
                `Latitude: ${e.latlng.lat.toFixed(5)}, Longitude: ${e.latlng.lng.toFixed(5)}`;
            lieuChoisi =`https://www.google.com/maps?q=${e.latlng.lat},${e.latlng.lng}`;
        });
    }
};

let heartInterval;
let tearInterval;

function createHeart() {
    const heart = document.createElement("div");
    heart.classList.add("heart");
    heart.textContent = "❤️";

    heart.style.left = Math.random() * 100 + "vw";
    heart.style.fontSize = (Math.random() * 50 + 20) + "px";
    heart.style.animationDuration = (Math.random() * 2 + 1) + "s";

    document.body.appendChild(heart);

    setTimeout(() => heart.remove(), 3000);
}

function startNormalHearts() {
    clearInterval(heartInterval);
    heartInterval = setInterval(createHeart, 300);
}

function startHeartStorm() {
    clearInterval(heartInterval);
    heartInterval = setInterval(createHeart, 10);
}

function stopHearts() {
    clearInterval(heartInterval);
}

function createTear() {
    const tear = document.createElement("div");

    tear.classList.add("tear");
    tear.textContent = "😭";

    tear.style.left = Math.random() * 100 + "vw";

    const size = Math.random() * 30 + 20;
    tear.style.fontSize = size + "px";

    const duration = Math.random() * 3 + 2;
    tear.style.animationDuration = duration + "s";

    document.body.appendChild(tear);

    setTimeout(() => {
        tear.remove();
    }, duration * 1000);
}

function startTears() {
    clearInterval(tearInterval);
    tearInterval = setInterval(createTear, 10);
}

function stopTears() {
    clearInterval(tearInterval);
}

noBtn.style.position = "fixed";

document.addEventListener("mousemove", (e) => {

    const rect = noBtn.getBoundingClientRect();

    const btnCenterX = rect.left + rect.width / 2;
    const btnCenterY = rect.top + rect.height / 2;

    const dx = btnCenterX - e.clientX;
    const dy = btnCenterY - e.clientY;

    const distance = Math.sqrt(dx * dx + dy * dy);

    // Quand la souris est proche
    if (distance < 150) {

        // Direction opposée à la souris
        const force = (150 - distance) / 150;

        let newX = rect.left + (dx / distance) * force * 60;
        let newY = rect.top + (dy / distance) * force * 60;

        // Empêcher de sortir de l'écran
        newX = Math.max(
            0,
            Math.min(window.innerWidth - rect.width, newX)
        );

        newY = Math.max(
            0,
            Math.min(window.innerHeight - rect.height, newY)
        );

        noBtn.style.left = newX + "px";
        noBtn.style.top = newY + "px";
    }
});

document.getElementById("continueBtn0").addEventListener("click", () => {
    const texte = inputName.value.trim();
    prenom = texte;

    if (texte == "")
    {
        alert('Marque ton prénom !!!!')
    } else if (texte == "Rose") {

        // Tempête de cœurs
        startHeartStorm();

        // Flash rose
        document.body.style.transition = "all 1s";
        mainCard.style.display = "none";

        setTimeout(() => {

            startNormalHearts();

            // Nouveau fond
            document.body.className = 'date';

            // Changement d'écran

            screenDate.style.display = "block";

        }, 2500);

        date = 1;
    } else{
        screen0.style.display = 'none';
        screen1.style.display = 'block';
    }
});



const titreDate = document.getElementById("titre");

yesBtn.onclick = () =>{
    RDV = "yes";
}



noBtn.onclick = () =>{

        if (noCount <= 5){
            titreDate.textContent = 'Tu es sûr ??';
        }
        if (noCount <= 4){
            titreDate.textContent = 'Vraiment sûr ???';
        }
        if (noCount <= 3)
        {
            titreDate.textContent = 'Réfléchis bien....';
        }
        if (noCount == 0)
        {
            RDV = "non";

            titreDate.textContent = "😭 Bon... il me reste plus qu'à pleurer alors 😭";
            startTears();
            stopHearts();
            setTimeout(() => {

            document.body.className = "normal";
            screenDate.style.display = 'none';
            screen0.style.display = 'none';
            mainCard.style.display = 'block';
            screen1.style.display = 'block';

            }, 2500);
            document.getElementById("texteIntro").textContent = "Bon Rose tu m'as brisé le coeur mais c'est pas grave je t'offrirai quand même un verre entre pote si l'envie t'en prends, pour ton 18 anniv. Ce site te permettra de faciliter le contacte (dans l'idée...).";

            
        }

        if (noBtnSize >= 0.5){
            noBtnSize -= 0.1;
        }
        if (yesBtnSize <= 1.5){
            yesBtnSize += 0.1;
        }
        noBtn.style.transform =`scale(${noBtnSize})`;
        document.getElementById("yes").style.transform =`scale(${yesBtnSize})`;

        noCount -= 1;
    
}



// Handle continue button
document.getElementById('continueButton').addEventListener('click', () => {
    if (!marker) {
        alert('Veuillez sélectionner un lieu en cliquant sur la carte.');
    } else {

        screen2.style.opacity = "0";
        screen2.style.display = 'none';
        screen2.style.transform = "translateY(-20px)";
        screen2.style.pointerEvents = "none";

        screen3.style.display = "block";
    }
});


startButton.onclick = () => {
    stopTears();
    start();
}

flatpickr("#myDateInput", {
    enableTime: true,
    dateFormat: "d/m/Y H:i",
    time_24hr: true,
    minDate: "today",
    locale: "fr",
    disableMobile: true,
    static:true,

    onOpen() {
        if(window.innerWidth < 768){
            mainCard.style.transform = "translateY(-200px)";

        }
    },

    onClose() {
        mainCard.style.transform = "";
    }

});

let choisiAvi = 0;


document.getElementById("btn3").onclick = () =>{

        dateChoisie = document.getElementById("myDateInput").value;

        screen3.style.display = 'none';
        screen3.style.transform = "translateY(-20px)";
        screen3.style.pointerEvents = "none";

        screen4.style.display = "block";
        choisiAvi = 0;
}



function vote(note){

    const result = document.getElementById("result");
    if  (choisiAvi === 0)
    {
        switch(note){

            case 1:
                document.getElementById("Avi1").style.backgroundColor = "#f59e0b";
                result.innerHTML =
                    "🥳 Merci ! Je savais que ce site était incroyable 😎";
                startHeartStorm(); // si tu veux une pluie de cœurs
                avisChoisi = "incroyable";
                break;
                

            case 2:
                document.getElementById("Avi2").style.backgroundColor = "#f59e0b";
                result.innerHTML =
                    "Je vois pourquoi tu dis ça...🙄 😅";
                startTears(); 
                avisChoisi = "complétement inutile";
                break;
                

            case 3:
                document.getElementById("Avi3").style.backgroundColor = "#f59e0b";
                result.innerHTML =
                    "Je retiens que tu l'a bien aimé 😎😎";
                avisChoisi = "les deux";
                break;
                
        }

        choisiAvi = 1;
    }    
}

document.getElementById("envoyerBtn").addEventListener("click", () => {

    emailjs.send(
        "service_98dxvvq",
        "template_kaf3pjs",
        {
            prenom: prenom,
            numero: document.getElementById("numero").value,
            lieu: lieuChoisi,
            date: dateChoisie,
            avis: avisChoisi,
            rdv : RDV
        }
    )
    .then(() => {
        alert("Réponse envoyée ");
    })
    .catch((error) => {
        console.error(error);
        alert("Erreur d'envoi");
    });
});
