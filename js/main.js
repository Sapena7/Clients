$(function () {
    $("#myTab li").tab("show");
});

$('#filterInput').hide();
$('#ocultar').hide();

$('#mostrar').click(function () {
    $('#filterInput').show(300);
    $('#mostrar').hide();
    $('#ocultar').show();
});
$('#ocultar').click(function () {
    $('#filterInput').hide();
    $('#ocultar').hide();
    $('#mostrar').show();
});

let validExtensions = ".png, .gif, .jpeg, .jpg";
function fileExtValidate(img) {

    let extension = img.substring(img.lastIndexOf('.') + 1).toLowerCase();
    let pos = validExtensions.indexOf(extension);
    if (pos < 0) {
        return false;
    } else {
        return true;
    }
}


