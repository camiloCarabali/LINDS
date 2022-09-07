let oscuro = document.getElementById("oscuro");
let claro = document.getElementById("claro")

oscuro.addEventListener("click", function(){
  $("#oscuro").css("display", "none");
  $("#claro").show();
  $(":root").css("--color-background", "#2F3D4B");
  $(":root").css("--theme-color", "#242e3c");
  $(":root").css("--secundary-color", "#E65051");
  $(":root").css("--text-color", "white");
  $(":root").css("--text-color-inverse", "black");
  $(":root").css("--navbar-shallow-color", "black");
  $(":root").css("--primary-color", "black");
  $(":root").css("--menu-mobile-background-color", "#4f6b95");
  $(":root").css("--color-background-info", "#324258");
  $(":root").css("--texto-color-principal", "white");
});

claro.addEventListener("click", function(){
  $("#claro").css("display", "none");
  $("#oscuro").show();
  $(":root").css("--color-background", "#6787B6");
  $(":root").css("--theme-color", "#9BBCEE");
  $(":root").css("--secundary-color", "#E65051");
  $(":root").css("--text-color", "black");
  $(":root").css("--text-color-inverse", "white");
  $(":root").css("--navbar-shallow-color", "#e5e5e5");
  $(":root").css("--primary-color", "white");
  $(":root").css("--menu-mobile-background-color", "#9BBCEE");
  $(":root").css("--color-background-info", "#white");
  $(":root").css("--texto-color-principal", "white");
});
