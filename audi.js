var audi = [
    {
        "id": 1,
        "nom": "Audi A1",
        "any": 2018,
        "velocitatMaxima": 177,
        "CV": 95,
        "preu": 21102,
        "img" : "https://quadis.s3.amazonaws.com/GestorQuadis/Novedades/Audi_A1_15302/Audi-a1-1.jpg"
    },
    {
        "id": 2,
        "nom": "Audi A3",
        "any": 2018,
        "velocitatMaxima": 188,
        "CV": 116,
        "preu": 27365,
        "img": "https://cochesnuevos.autofacil.es/img/AUDI_A3_SPORTBACK.jpg"
    },
    {
        "id": 3,
        "nom": "Audi A5",
        "any": 2018,
        "velocitatMaxima": 241,
        "CV": 190,
        "preu": 40400,
        "img": "https://quadis.s3.amazonaws.com/GestorQuadis/Novedades/Audi_A5_212407/Audi-A5-Sportback-1.jpg"
    },
    {
        "id": 4,
        "nom": "Audi A5",
        "any": 2018,
        "velocitatMaxima": 207,
        "CV": 150,
        "preu": 36333,
        "img": "https://www.cars-data.com/pictures/audi/audi-a5-sportback_3725_17.jpg"
    },
    {
        "id": 5,
        "nom": "Audi A4 Avant",
        "any": 2019,
        "velocitatMaxima": 211,
        "CV": 163,
        "preu": 49843,
        "img": "https://i.auto-bild.de/ir_img/2/1/3/4/7/8/9/Audi-A4-Facelift-2019-Bilder-1200x800-90465b4d340b62d8.jpg"
    },
    {
        "id": 6,
        "nom": "Audi e-Tron",
        "any": 2020,
        "velocitatMaxima": 190,
        "CV": 313,
        "preu": 82400,
        "img": "https://quadis.s3.amazonaws.com/GestorQuadis/Novedades/Audi_e-tron_212303/audi-etronsportback-1.jpg"
    }
];


//Genera la taula
generateAudiTable();

function generateAudiTable() {
    var d = '<tr>' +
        '<th>ID</th>' +
        '<th>Nom</th>' +
        '<th>Any</th>' +
        '<th>Velocitat Màxima</th>' +
        '<th>CV</th>' +
        '<th>Preu</th>' +
        '<th>Opcions</th>' +
        '</tr>';

    for (var i = 0; i < audi.length; i++) {
        d += '<tr id=' + audi[i].id + '>' +
            '<td>' + audi[i].id + '</td>' +
            '<td>' + audi[i].nom + '</td>' +
            '<td>' + audi[i].any + '</td>' +
            '<td>' + audi[i].velocitatMaxima + ' km/h</td>' +
            '<td>' + audi[i].CV + '</td>' +
            '<td>' + formatThousands(audi[i].preu) + ' €</td>' +
            '<td>' +
            '<a id="modificarBtnTable"><img src="https://img.icons8.com/cute-clipart/24/000000/edit.png"></a>' +
            '<a id="eliminarBtnTable"><img src="https://img.icons8.com/cute-clipart/24/000000/delete-forever.png"></a>' + 
            '<a id="voreBtnTable"><img src="eye.png"></a>' +
            '</td>' +
            '</tr>';
    }
    $("#tableAudi").append(d);
}


function formatThousands(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

$("#tableAudi").on('click', '#modificarBtnTable', function () {
    $('.modal-content').css('background-color', '#D8D8D8');
    $("#errorModelDiv").hide();
    $("#modificarModal").modal("show");

    //Agafa l'id que seleccionem
    var trId = $(this).closest('tr').attr('id');

    var idCotxeModificar = parseInt(trId);
    
    var obj;
    for (var i = 0; i < audi.length; i++) {
        if (audi[i].id == trId) {
            obj = audi[i];
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
        id= parseInt(id);
        let nom = $("#inputNom").val();
        let any = $("#inputAny").val();
        any= parseInt(any);
        let velMax = $("#inputVelMax").val();
        velMax= parseInt(velMax);
        let cv = $("#inputCV").val();
        cv= parseInt(cv);
        let preu = $("#inputPreu").val();
        preu= parseInt(preu);
        let imatge = $("#inputImg").val();

        let errors = [];
        errors = validate(idCotxeModificar, id, nom, any, velMax, cv, preu, imatge);
        errors = errors.join("");

        if(!errors){
            obj.id = id;
            obj.nom = nom;
            obj.any = any;
            obj.velocitatMaxima = velMax;
            obj.CV = cv;
            obj.preu = preu;
            obj.img = imatge;
    
    
            $("#tableAudi tr").remove();
            generateAudiTable();
            $("#modificarModal").modal('hide');
        }else{
            $("#errorModelDiv").text("");
            $("#errorModelDiv").append("Hi ha errors: <br><br>" + errors.toString());
            $("#errorModelDiv").show();
        }
    });



});

$("#tableAudi").on('click', '#eliminarBtnTable', function () {
    $('.modal-content').css('background-color', '#D8D8D8');
    $("#eliminarModal").modal("show");
    var trId;
    trId = $(this).closest('tr').attr('id');       
    $("#eliminarModalBtn").click(function (e) {
        for (var i = 0; i < audi.length; i++) {            
            var obj = audi[i];           
            if (obj.id == trId) {
                audi.splice(i, 1);
                $("#tableAudi tr").remove();
                generateAudiTable();
                $("#eliminarModal").modal('hide');        
            }
        }
    });
    $('#eliminarModal').on('hidden.bs.modal', function () {
        trId = null;
      })
});

$("#tableAudi").on('click', '#voreBtnTable', function () {
    var trId;
    let imgUrl;
    let nomCotxe;
    trId = $(this).closest('tr').attr('id');       
        for (var i = 0; i < audi.length; i++) {            
            var obj = audi[i];           
            if (obj.id == trId) {
                imgUrl = obj.img;
                nomCotxe = obj.nom;   
            }
        }
    $('#imageModal #imgCotxe').attr("src", imgUrl);
    $('#imageModal .modal-title').text(nomCotxe);
    $('#imageModal').modal('show');
});


$("#añadirBtnAudi").click(function() {
    $('.modal-content').css('background-color', '#D8D8D8');
    $("#errorModelDivAfegir").hide();
    $("#añadirModal").modal("show");

    //Agafa l'id que seleccionem
    var trId = $(this).closest('tr').attr('id');

    var idCotxeModificar = parseInt(trId);
    
    var obj;

    $("#afegirModalBtn").click(function () {

        let id = $("#inputIdAfegir").val();
        id= parseInt(id);
        $('#inputIdAfegir').val('');
        let nom = $("#inputNomAfegir").val();
        $('#inputNomAfegir').val('');
        let any = $("#inputAnyAfegir").val();
        any= parseInt(any);
        $('#inputAnyAfegir').val('');
        let velMax = $("#inputVelMaxAfegir").val();
        velMax= parseInt(velMax);
        $('#inputVelMaxAfegir').val('');
        let cv = $("#inputCVAfegir").val();
        cv= parseInt(cv);
        $('#inputCVAfegir').val('');
        let preu = $("#inputPreuAfegir").val();
        preu= parseInt(preu);
        $('#inputPreuAfegir').val('');
        let imatge = $("#inputImgAfegir").val();
        $('#inputImgAfegir').val('');

        let errors = [];
        errors = validate(idCotxeModificar, id, nom, any, velMax, cv, preu, imatge);
        errors = errors.join("");
        
        if(!errors){
            obj = {
                "id": id,
                "nom": nom,
                "any": any,
                "velocitatMaxima": velMax,
                "CV": cv,
                "preu": preu,
                "img": imatge
            };
            audi.push(obj);            
    
            $("#tableAudi tr").remove();
            generateAudiTable();
            $("#añadirModal").modal('hide');            
        }else{
            $("#errorModelDivAfegir").text("");
            $("#errorModelDivAfegir").append("Hi ha errors: <br><br>" + errors.toString());
            $("#errorModelDivAfegir").show();
        }
    });
});

$("#filterInput").on("keyup", function () {
    var value = $(this).val().toLowerCase();
    $("#tableAudi tr").filter(function () {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
    });
});
