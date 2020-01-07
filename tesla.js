var tesla = [
    {
        "id": 1,
        "nom": "Tesla Model S",
        "any": 2012,
        "velocitatMaxima": 325,
        "CV": 796,
        "preu": 105680,
        "img": "https://soymotor.com/sites/default/files/imagenes/noticia/tesla-model-s-exterior-4-soymotor.jpg"
    },
    {
        "id": 2,
        "nom": "Tesla Model X",
        "any": 2020,
        "velocitatMaxima": 320,
        "CV": 612,
        "preu": 110780,
        "img": "https://soymotor.com/sites/default/files/usuarios/redaccion/portal/redaccion/tesla-model-x-1-f1-soymotor.jpg"                         
    },
    {
        "id": 3,
        "nom": "Tesla Roadster",
        "any": 2020,
        "velocitatMaxima": 400,
        "CV": 2000,
        "preu": 172000,
        "img": "https://evcompare.io/upload/resize_cache/iblock/485/1200_800_2/485e32eb754c49ab58cedb4ad4ce4235.jpg"                       
    },
    {
        "id": 4,
        "nom": "Tesla Cybertruck",
        "any": 2020,
        "velocitatMaxima": 209,
        "CV": 200,
        "preu": 36000,
        "img": "https://www.thestreet.com/.image/t_share/MTY4NjUyNzU1NTM0MTYxODE1/wall-street-is-tepid-on-teslas-new-cybertruck-its-kind-of-aggressive.jpg"                        
    },
    {
        "id": 5,
        "nom": "Tesla Model Y",
        "any": 2021,
        "velocitatMaxima": 209,
        "CV": 351,
        "preu": 97000,
        "img": "https://cdn.autobild.es/sites/navi.axelspringer.es/public/styles/1200/public/media/image/2019/03/nos-subimos-tesla-model_2.jpg?itok=n50u-tsN"                    
    },
    {
        "id": 6,
        "nom": "Tesla Model 3",
        "any": 2018,
        "velocitatMaxima": 210,
        "CV": 306,
        "preu": 48000,
        "img": "https://icdn2.digitaltrends.com/image/digitaltrends_es/tesla-model-3-feat-6.jpg"                     
    }


];

//Genera la taula
generateTeslaTable();

function generateTeslaTable() {
    var d = '<tr class=tableTesla>' +
        '<th>ID</th>' +
        '<th>Nom</th>' +
        '<th>Any</th>' +
        '<th>Velocitat Màxima</th>' +
        '<th>CV</th>' +
        '<th>Preu</th>' +
        '<th>Opcions</th>' +
        '</tr>';

    for (var i = 0; i < tesla.length; i++) {
        d += '<tr id=' + tesla[i].id + '>' +
            '<td>' + tesla[i].id + '</td>' +
            '<td>' + tesla[i].nom + '</td>' +
            '<td>' + tesla[i].any + '</td>' +
            '<td>' + tesla[i].velocitatMaxima + ' km/h</td>' +
            '<td>' + tesla[i].CV + '</td>' +
            '<td>' + formatThousands(tesla[i].preu) + ' €</td>' +
            '<td>' +
            '<a id="modificarBtnTable"><img src="https://img.icons8.com/cute-clipart/24/000000/edit.png"></a>' +
            '<a id="eliminarBtnTable"><img src="https://img.icons8.com/cute-clipart/24/000000/delete-forever.png"></a>' + 
            '<a id="voreBtnTable"><img src="eye.png"></a>' +
        '</td>' +
            '</tr>';
    }
    $("#tableTesla").append(d);
}


function formatThousands(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

$("#tableTesla").on('click', '#modificarBtnTable', function () {
    $('.modal-content').css('background-color', '#cccccc');
    $("#errorModelDiv").hide();
    $("#modificarModal").modal("show");

    var trId = $(this).closest('tr').attr('id');
    var idCotxeModificar = trId;

    var obj;
    for (var i = 0; i < tesla.length; i++) {
        if (tesla[i].id == trId) {
            obj = tesla[i];
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
    
            $("#tableTesla tr").remove();
            generateTeslaTable();
            $("#modificarModal").modal('hide');
        }else{
            $("#errorModelDiv").text("");
            $("#errorModelDiv").append("Hi ha errors: <br><br>" + errors.toString());
            $("#errorModelDiv").show();
        }
    });
});


$("#tableTesla").on('click', '#eliminarBtnTable', function () {
    $('.modal-content').css('background-color', '#999999');
    $("#eliminarModal").modal("show");
    var trId;
    trId = $(this).closest('tr').attr('id');       
    $("#eliminarModalBtn").click(function (e) {
        for (var i = 0; i < tesla.length; i++) {            
            var obj = tesla[i];           
            if (obj.id == trId) {
                tesla.splice(i, 1);
                $("#tableTesla tr").remove();
                generateTeslaTable();
                $("#eliminarModal").modal('hide');        
            }
        }
    });
    $('#eliminarModal').on('hidden.bs.modal', function () {
        trId = null;
      })
});


$("#añadirBtnTesla").click(function() {
    $('.modal-content').css('background-color', '#999999');
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
            tesla.push(obj);
    
            $("#tableTesla tr").remove();
            generateTeslaTable();
            $("#añadirModal").modal('hide');
        }else{
            $("#errorModelDivAfegir").text("");
            $("#errorModelDivAfegir").append("Hi ha errors: <br><br>" + errors.toString());
            $("#errorModelDivAfegir").show();
        }
    });
});

$("#tableTesla").on('click', '#voreBtnTable', function () {
    var trId;
    let imgUrl;
    let nomCotxe;
    trId = $(this).closest('tr').attr('id');       
        for (var i = 0; i < tesla.length; i++) {            
            var obj = tesla[i];           
            if (obj.id == trId) {
                imgUrl = obj.img;
                nomCotxe = obj.nom;   
            }
        }
    $('#imageModal #imgCotxe').attr("src", imgUrl);
    $('#imageModal .modal-title').text(nomCotxe);
    $('#imageModal').modal('show');
});

$("#filterInput").on("keyup", function () {
    var value = $(this).val().toLowerCase();
    $("#tableTesla tr").filter(function () {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
    });
});