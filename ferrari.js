var ferrari = [
    {
        "id": 1,
        "nom": "Ferrari 458",
        "any": 2009,
        "velocitatMaxima": 325,
        "CV": 570,
        "preu": 245924
    },
    {
        "id": 2,
        "nom": "Ferrari Portofino",
        "any": 2018,
        "velocitatMaxima": 320,
        "CV": 600,
        "preu": 215602
    },
    {
        "id": 3,
        "nom": "Ferrari 812 GTS",
        "any": 2020,
        "velocitatMaxima": 340,
        "CV": 800,
        "preu": 339000
    },
    {
        "id": 4,
        "nom": "Ferrari 812 Superfast",
        "any": 2020,
        "velocitatMaxima": 340,
        "CV": 800,
        "preu": 339000
    },
    {
        "id": 5,
        "nom": "Ferrari Roma",
        "any": 2020,
        "velocitatMaxima": 320,
        "CV": 620,
        "preu": 238077
    },
    {
        "id": 6,
        "nom": "Ferrari F8 Spider",
        "any": 2020,
        "velocitatMaxima": 315,
        "CV": 590,
        "preu": 210000
    }
];


//Genera la taula
generateFerrariTable();

function generateFerrariTable() {
    var d = '<tr>' +
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
            '<a id="eliminarBtnTable"><img src="https://img.icons8.com/cute-clipart/24/000000/delete-forever.png"></a>'
        '</td>' +
            '</tr>';
    }
    $("#tableFerrari").append(d);
}


function formatThousands(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

$("#tableFerrari").on('click', '#modificarBtnTable', function () {
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


        let errors = [];
        errors = validate(idCotxeModificar, id, nom, any, velMax, cv, preu);
        errors = errors.join("");


        if(!errors){
            obj.id = id;
            obj.nom = nom;
            obj.any = any;
            obj.velocitatMaxima = velMax;
            obj.CV = cv;
            obj.preu = preu;
    
    
            $("#tableFerrari tr").remove();
            generateFerrariTable();
            $("#modificarModal").modal('hide');
        }else{
            $("#errorModelDiv").text("");
            $("#errorModelDiv").append(errors.toString());
            $("#errorModelDiv").show();
        }
    });
});



$("#tableFerrari").on('click', '#eliminarBtnTable', function () {

    $("#eliminarModal").modal("show");
    var trId;
    trId = $(this).closest('tr').attr('id');       
    $("#eliminarModalBtn").click(function (e) {
        for (var i = 0; i < ferrari.length; i++) {            
            var obj = ferrari[i];           
            if (obj.id == trId) {
                ferrari.splice(i, 1);
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


$("#añadirBtn").click(function() {
    $("#errorModelDiv").hide();
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

        let errors = [];
        errors = validate(idCotxeModificar, id, nom, any, velMax, cv, preu);
        errors = errors.join("");
        
        
        if(!errors){
            obj = {
                "id": id,
                "nom": nom,
                "any": any,
                "velocitatMaxima": velMax,
                "CV": cv,
                "preu": preu
            };
            ferrari.push(obj);
    
            $("#tableFerrari tr").remove();
            generateFerrariTable();
            $("#añadirModal").modal('hide');
        }else{
            $("#errorModelDivAfegir").text("");
            $("#errorModelDivAfegir").append(errors.toString());
            $("#errorModelDivAfegir").show();
        }
    });
});

$("#filterInput").on("keyup", function () {
    var value = $(this).val().toLowerCase();
    $("#tableFerrari tr").filter(function () {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
    });
});