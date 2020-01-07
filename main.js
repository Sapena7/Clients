$(function () {
    $("#myTab li").tab("show");
});

function validate(idCotxeModificar, id, nom, any, velMax, cv, preu) {
    let errors = [];

    for (var i = 0; i < audi.length; i++) {
        if (audi[i].id == id) {
            if (id != idCotxeModificar) {
                errors.push("-> El id " + id + " ya existix. </br>");
            }
        }
    }

    if(isNaN(id)){
        errors.push("-> El id no pot ser buit. </br>");
    }
    if (!nom.length > 0) {
        errors.push("-> El camp nom no pot estar buit. </br>");
    }
    if (isNaN(any)) {
        errors.push("-> El camp any ha de ser un numero. </br>");
    }
    if (isNaN(velMax)) {
        errors.push("-> El camp velocitat màxima ha de ser un numero. </br>");
    }
    if (isNaN(cv)) {
        errors.push("-> El camp CV ha de ser un numero. </br>");
    }
    if (isNaN(preu)) {
        errors.push("-> El camp preu ha de ser un numero. </br>");
    }

    return errors;
}
