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

    // --- SWIPE SOLO EN ORILLAS Y SOLO SI NO ES ELEMENTO INTERACTIVO ---
    let touchStartX = 0;
    let touchEndX = 0;
    let swipeAllowed = false;
    const EDGE_PERCENT = 0.10; // 10% de cada orilla

    function isInteractiveElement(target) {
        if (!target) return false;
        const tag = target.tagName.toLowerCase();
        return ["button", "a", "input", "textarea", "select", "label"].includes(tag);
    }

    $("#flipbook").on("touchstart", function(e) {
        swipeAllowed = false;
        if (e.originalEvent.touches.length === 1) {
            const touch = e.originalEvent.touches[0];
            touchStartX = touch.clientX;
            const flipbookOffset = $("#flipbook").offset().left;
            const flipbookWidth = $("#flipbook").width();
            const x = touchStartX - flipbookOffset;
            const edgeLimit = flipbookWidth * EDGE_PERCENT;

            // Solo permite swipe si el toque inicia en la orilla y NO sobre un elemento interactivo
            if (
                (x <= edgeLimit || x >= flipbookWidth - edgeLimit) &&
                !isInteractiveElement(e.target)
            ) {
                swipeAllowed = true;
            }
        }
    });

    $("#flipbook").on("touchend", function(e) {
        if (!swipeAllowed) return;
        if (e.originalEvent.changedTouches.length === 1) {
            touchEndX = e.originalEvent.changedTouches[0].clientX;
            const diff = touchEndX - touchStartX;
            const flipbookOffset = $("#flipbook").offset().left;
            const flipbookWidth = $("#flipbook").width();
            const x = touchStartX - flipbookOffset;
            const edgeLimit = flipbookWidth * EDGE_PERCENT;

            if (x <= edgeLimit) {
                // Orilla izquierda: ir a página anterior si el swipe es hacia la derecha
                if (diff > 50) {
                    $("#flipbook").turn("previous");
                }
            } else if (x >= flipbookWidth - edgeLimit) {
                // Orilla derecha: ir a página siguiente si el swipe es hacia la izquierda
                if (diff < -50) {
                    $("#flipbook").turn("next");
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