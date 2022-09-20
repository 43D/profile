var jsonLanguage = {};

$(async function () {
    // Events clicks
    $("#dark_light").click(function () { toggleDarkLight() });
    $(".language-change").click(function () { changeLanguage($(this).attr("data-language")) });
    fbButtom();

    //Language check
    jsonLanguage = await getJs("public/json/language.json");
    let language = getLanguage();
    changeLanguage(language.language);

    //Theme check
    $(".tema").removeClass("dark-mode").removeClass("light-mode").addClass(getTheme());
    $("body").removeClass("dark-mode").removeClass("light-mode").addClass(getTheme());
});

async function getJs(json) {
    return await getJsonPromise(json).then(result => {
        return result;
    });
}

function getJsonPromise(js) {
    return new Promise((resolve, reject) => {
        const res = $.getJSON(js);
        resolve(res);
    });
}

function changeLanguage(language) {
    if (jsonLanguage[language] != undefined) {
        languageCurrent = jsonLanguage[language];
        $(".myname").html(languageCurrent.nome + " - " + languageCurrent.sobrenome);
        $("#localizacao").attr("href", languageCurrent.localizacao.coordenada)
        $("#local").html(languageCurrent.localizacao.cidade + " - " + languageCurrent.localizacao.estado + "/" + languageCurrent.localizacao.pais);
        $("#apresentacao").html(languageCurrent.apresentacao.p);
        $("#hub1").html(languageCurrent.apresentacao.hub[0]);
        $("#hub2").html(languageCurrent.apresentacao.hub[1]);
        $("#skills-name").html(languageCurrent.hard_skills.name);
        makeil("#hard-skills", languageCurrent.hard_skills.list);
        $("#estudando-name").html(languageCurrent.estudando.name);
        makeil("#estudando", languageCurrent.estudando.list);
        $("#formacao-name").html(languageCurrent.formacao.name);
        makeil2("#formacao", languageCurrent.formacao.list);
        $("#dev-tool-name").html(languageCurrent.devtool.name);
        makeil("#dev-tool", languageCurrent.devtool.list);
        setLanguage({ "language": language });
        setButtomLanguage(language);
    }
}

function makeil(ulid, data) {
    let ul = $(ulid);
    ul.empty();
    $.each(data, function (index, value) {
        var li = $('<li/>').html(value);
        ul.append(li);
    });
}

function makeil2(ulid, data) {
    let ul = $(ulid);
    ul.empty();
    $.each(data, function (index, value) {
        var span1 = $('<span/>').html(value["1"] + " ");
        var span2 = $('<a/>').html(value["2"]).attr("href", value["4"]).attr("target", "_blank");
        var span3 = $('<span/>').html(" " + value["3"]);
        var li = $('<li/>').html([span1, span2, span3]);
        ul.append(li);
    });
}

function getLanguage() {
    if (localStorage.language == undefined)
        setLanguage({ "language": "pt" });
    return JSON.parse(localStorage.language);
}

function setLanguage(data) {
    localStorage.setItem("language", JSON.stringify(data));
}

function setButtomLanguage(language) {
    let a = $(".language-change");
    a.prop("disabled", false);
    $.each(a, function (index, value) {
        if (value.attributes[1].nodeValue == language)
            value.disabled = true;
    });
}

function toggleDarkLight() {
    var tema = $(".tema");
    var currentClass = tema[0].classList[2];
    var newClass = currentClass == "dark-mode" ? "light-mode" : "dark-mode";
    tema.removeClass(currentClass).addClass(newClass);
    $("body").removeClass(currentClass).addClass(newClass);
    setTheme(newClass);
}

function getTheme() {
    if (localStorage.theme == undefined)
        setTheme({ "theme": "light-mode" });
    return JSON.parse(localStorage.theme);
}

function setTheme(data) {
    localStorage.setItem("theme", JSON.stringify(data));
}

function fbButtom() {
    let details = navigator.userAgent;
    let regexp = /android|iphone|kindle|ipad/i;
    let isMobileDevice = regexp.test(details);

    if (isMobileDevice)
        $("#facebook-mobile").removeClass("d-none");
    else
        $("#facebook-desktop").removeClass("d-none");
}