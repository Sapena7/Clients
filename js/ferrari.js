//Genera la taula
generateFerrariTable();

function generateFerrariTable() {
    var ferrari = "";
    $.get("consulta.php", {"nom" : "ferrari"}, function(data, status){

        ferrari = JSON.parse(data);
    var d = '<tr class="tableFerrari">' +
        '<th>ID</th>' +
        '<th>Nom</th>' +
        '<th>Any</th>' +
        '<th>Velocitat Màxima</th>' +
        '<th>CV</th>' +
        '<th>Preu</th>' +
        '<th>Opcions</th>' +
        '</tr>';

    for (var i = 0; i < ferrari.length; i++) {
        d += '<tr id=' + ferrari[i].id + '>' +
            '<td>' + ferrari[i].id + '</td>' +
            '<td>' + ferrari[i].nom + '</td>' +
            '<td>' + ferrari[i].any + '</td>' +
            '<td>' + ferrari[i].velocitatMaxima + ' km/h</td>' +
            '<td>' + ferrari[i].CV + '</td>' +
            '<td>' + formatThousands(ferrari[i].preu) + ' €</td>' +
            '<td>' +
            '<a id="modificarBtnTable"><img src="https://img.icons8.com/cute-clipart/24/000000/edit.png"></a>' +
            '<a id="eliminarBtnTable"><img src="https://img.icons8.com/cute-clipart/24/000000/delete-forever.png"></a>' +
            '<a id="voreBtnTable"><img src="imatges/eye.png"></a>' +
            '</td>' +
            '</tr>';
    }
    $("#tableFerrari").append(d);
    });
}

$("#tableFerrari").on('click', '#modificarBtnTable', function () {
    $('.modal-content').css('background-color', '#FE2E2E');
    $("#errorModelDiv").hide();
    $("#modificarModal").modal("show");

    var trId = $(this).closest('tr').attr('id');
    var idCotxeModificar = trId;

    var obj;
    for (var i = 0; i < ferrari.length; i++) {
        if (ferrari[i].id == trId) {
            obj = ferrari[i];
        }
    }

    //Posar text en el value del input
    $("#inputId").val(obj.id);
    $("#inputNom").val(obj.nom);
    $("#inputAny").val(obj.any);
    $("#inputVelMax").val(obj.velocitatMaxima);
    $("#inputCV").val(obj.CV);
    $("#inputPreu").val(obj.preu);
    $("#inputImg").val(obj.img);

    $("#modificarModalBtn").click(function () {

        let id = $("#inputId").val();
        id = parseInt(id);
        let nom = $("#inputNom").val();
        let any = $("#inputAny").val();
        any = parseInt(any);
        let velMax = $("#inputVelMax").val();
        velMax = parseInt(velMax);
        let cv = $("#inputCV").val();
        cv = parseInt(cv);
        let preu = $("#inputPreu").val();
        preu = parseInt(preu);
        let imatge = $("#inputImg").val();

        let errors = [];
        errors = validateFerrari(idCotxeModificar, id, nom, any, velMax, cv, preu, imatge);
        errors = errors.join("");


        if (!errors) {
            obj.id = id;
            obj.nom = nom;
            obj.any = any;
            obj.velocitatMaxima = velMax;
            obj.CV = cv;
            obj.preu = preu;
            obj.img = imatge;

            localStorage.setItem('ferrari', JSON.stringify(ferrari));

            $("#tableFerrari tr").remove();
            generateFerrariTable();
            $("#modificarModal").modal('hide');
        } else {
            $("#errorModelDiv").text("");
            $("#errorModelDiv").append("Hi ha errors: <br><br>" + errors.toString());
            $("#errorModelDiv").show();
        }
    });
});



$("#tableFerrari").on('click', '#eliminarBtnTable', function () {
    $('.modal-content').css('background-color', '#FE2E2E');
    $("#eliminarModal").modal("show");
    var trId;
    trId = $(this).closest('tr').attr('id');
    $("#eliminarModalBtn").click(function (e) {
        for (var i = 0; i < ferrari.length; i++) {
            var obj = ferrari[i];
            if (obj.id == trId) {
                ferrari.splice(i, 1);
                localStorage.setItem('ferrari', JSON.stringify(ferrari));
                $("#tableFerrari tr").remove();
                generateFerrariTable();
                $("#eliminarModal").modal('hide');
            }
        }
    });
    $('#eliminarModal').on('hidden.bs.modal', function () {
        trId = null;
    })
});


$("#añadirBtnFerrari").click(function () {
    $('.modal-content').css('background-color', '#FE2E2E');
    $("#errorModelDivAfegir").hide();
    $("#añadirModal").modal("show");

    //Agafa l'id que seleccionem
    var trId = $(this).closest('tr').attr('id');

    var idCotxeModificar = parseInt(trId);

    var obj;

    $("#afegirModalBtn").click(function () {

        let id = $("#inputIdAfegir").val();
        id = parseInt(id);
        $('#inputIdAfegir').val('');
        let nom = $("#inputNomAfegir").val();
        $('#inputNomAfegir').val('');
        let any = $("#inputAnyAfegir").val();
        any = parseInt(any);
        $('#inputAnyAfegir').val('');
        let velMax = $("#inputVelMaxAfegir").val();
        velMax = parseInt(velMax);
        $('#inputVelMaxAfegir').val('');
        let cv = $("#inputCVAfegir").val();
        cv = parseInt(cv);
        $('#inputCVAfegir').val('');
        let preu = $("#inputPreuAfegir").val();
        preu = parseInt(preu);
        $('#inputPreuAfegir').val('');
        let imatge = $("#inputImgAfegir").val();
        $('#inputImgAfegir').val('');

        let errors = [];
        errors = validateFerrari(idCotxeModificar, id, nom, any, velMax, cv, preu, imatge);
        errors = errors.join("");


        if (!errors) {
            obj = {
                "id": id,
                "nom": nom,
                "any": any,
                "velocitatMaxima": velMax,
                "CV": cv,
                "preu": preu,
                "img": imatge
            };
            ferrari.push(obj);
            localStorage.setItem('ferrari', JSON.stringify(ferrari));
            $("#tableFerrari tr").remove();
            generateFerrariTable();
            $("#añadirModal").modal('hide');
        } else {
            $("#errorModelDivAfegir").text("");
            $("#errorModelDivAfegir").append("Hi ha errors: <br><br>" + errors.toString());
            $("#errorModelDivAfegir").show();
        }
    });
});

$("#tableFerrari").on('click', '#voreBtnTable', function () {
    var trId;
    let imgUrl;
    trId = $(this).closest('tr').attr('id');
    for (var i = 0; i < ferrari.length; i++) {
        var obj = ferrari[i];
        if (obj.id == trId) {
            imgUrl = obj.img;
        }
    }
    $('#imageModal #imgCotxe').attr("src", imgUrl);
    $('#imageModal').modal('show');
});

$("#filterInput").on("keyup", function () {
    var value = $(this).val().toLowerCase();
    $("#tableFerrari tr").filter(function () {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
    });
});

function validateFerrari(idCotxeModificar, id, nom, any, velMax, cv, preu, imatge) {
    let errors = [];

    for (var i = 0; i < ferrari.length; i++) {
        if (ferrari[i].id == id) {
            if (id != idCotxeModificar) {
                errors.push("-> El id " + id + " ya existix. </br>");
            }
        }
    }

    if (isNaN(id)) {
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
    if (!imatge.length > 0) {
        errors.push("-> El camp imatge no pot estar buit. </br>");
    }
    if (!fileExtValidate(imatge)) {
        errors.push("-> El link de l'imatge no es vàlid, selecciona una imatge amb (png, gif, jpeg, jpg). </br>");
    }

    return errors;
}