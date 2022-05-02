var pedra = document.getElementById("pedra");
pedra.onclick = function () {
    cssOff();
};
document.getElementById("hentai").onclick = function () {
    hentai();
};
document.getElementById("profile_tw").onclick = function () {
    profile_tw();
};
document.getElementById("dark_light").onclick = function () {
    toggleDarkLight();
};

function hentai() {
    window.open("https://myanimelist.net/manga/25876/Hentai_Ouji_to_Warawanai_Neko", "_blank");
}

function profile_tw() {
    window.open("https://twitter.com/Haidacutlet/status/1114158671464763392", "_blank");
}

function toggleDarkLight() {
    var body = document.getElementById("body");
    var currentClass = body.className;
    body.className = currentClass == "dark-mode" ? "light-mode" : "dark-mode";
}

function cssOff() {
    if (document.styleSheets[0].disabled == false) {
        document.styleSheets[0].disabled = true;
        pedra.innerHTML = "Ativar CSS";
    } else {
        document.styleSheets[0].disabled = false;
        pedra.innerHTML = "Desativar CSS";
    }
}

function MenuOculto() {
    var x = document.getElementById("nav");
    if (x.className === "nav") {
        x.className += " responsive";
    } else {
        x.className = "nav";
    }
}