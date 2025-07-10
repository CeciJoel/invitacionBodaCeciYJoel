$(function() {
    function setDisplayModeAndSize() {
        if (window.innerWidth < 900) {
            $("#flipbook").turn("display", "single");
        } else {
            $("#flipbook").turn("display", "double");
            $("#flipbook").turn("size", 900, 600);
        }
    }

    $("#flipbook").turn({
        width: window.innerWidth < 900 ? $(".page").width() : 900,
        height: window.innerWidth < 900 ? $(".page").height() : 600,
        autoCenter: true,
        display: window.innerWidth < 900 ? 'single' : 'double',
        gradients: true,
        duration: 2000
    });

    setDisplayModeAndSize();

    $(window).on('resize', function() {
        setDisplayModeAndSize();
    });

    // Botones de navegación (solo en escritorio)
    $("#prevBtn").click(function() {
        $("#flipbook").turn("previous");
    });
    $("#nextBtn").click(function() {
        $("#flipbook").turn("next");
    });

    // --- SWIPE PARA CELULAR ---
    let touchStartX = 0;
    let touchEndX = 0;
    let swipeAllowed = true;

    function isInteractiveElement(target) {
        if (!target) return false;
        const tag = target.tagName.toLowerCase();
        return ["button", "a", "input", "textarea", "select", "label"].includes(tag);
    }

    $("#flipbook").on("touchstart", function(e) {
        swipeAllowed = true;
        // Si el toque inicia sobre un elemento interactivo, desactiva swipe
        if (isInteractiveElement(e.target)) {
            swipeAllowed = false;
            return;
        }
        if (e.originalEvent.touches.length === 1) {
            touchStartX = e.originalEvent.touches[0].clientX;
        }
    });

    $("#flipbook").on("touchend", function(e) {
        // Si el toque inició o terminó sobre un elemento interactivo, no hagas swipe
        if (!swipeAllowed || isInteractiveElement(e.target)) return;
        if (e.originalEvent.changedTouches.length === 1) {
            touchEndX = e.originalEvent.changedTouches[0].clientX;
            let diff = touchEndX - touchStartX;
            if (Math.abs(diff) > 50) {
                if (diff < 0) {
                    $("#flipbook").turn("next");
                } else {
                    $("#flipbook").turn("previous");
                }
            }
        }
    });
});

window.addEventListener('DOMContentLoaded', function() {
    setTimeout(function() {
        document.getElementById('container').classList.add('visible');
        var navBtns = document.querySelector('.nav-btns');
        if (navBtns) navBtns.classList.add('visible');
    }, 500);
});

function copiarCuenta() {
    const cuenta = "012680015118736164";
    navigator.clipboard.writeText(cuenta).then(function() {
        const mensaje = document.getElementById('mensajeCopiado');
        const boton = document.querySelector('.btn-copiar-cuenta');
        mensaje.style.display = 'inline-block';
        boton.style.display = 'none';
        setTimeout(() => { mensaje.style.display = 'none'; boton.style.display = 'inline-block';}, 1000);
    });
}