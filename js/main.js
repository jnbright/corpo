// Obtiene el año actual
var currentYear = new Date().getFullYear();

// Inserta el año actual en el elemento con id 'current-year'
document.getElementById("current-year").textContent = currentYear;

/* Set the width of the side navigation to 250px and the left margin of the page content to 250px and add a black background color to body */
window.openNav = function() {
    document.getElementById("mySidenav").style.width = "150px";
    document.getElementById("main").style.marginLeft = "150px";
    document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
}

/* Set the width of the side navigation to 0 and the left margin of the page content to 0, and the background color of body to white */
window.closeNav = function() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
    document.body.style.backgroundColor = "white";
}



window.dataLayer = window.dataLayer || [];
function gtag() {
  dataLayer.push(arguments);
}
gtag("js", new Date());

gtag("config", "G-J3JWVEPYQC");


document.addEventListener("DOMContentLoaded", function() {
    const cookieBanner = document.getElementById('cookieConsentBanner');
    const savePreferencesButton = document.getElementById('savePreferences');
    const rejectAllButton = document.getElementById('rejectAll');
    const checkboxes = document.querySelectorAll('.cookie-options input[type="checkbox"]');

    savePreferencesButton.addEventListener('click', function() {
        let preferences = {};
        checkboxes.forEach(function(checkbox) {
            preferences[checkbox.name] = checkbox.checked;
        });
        saveCookiePreferences(preferences);
        cookieBanner.style.display = 'none';
        loadGoogleAnalytics(preferences);
    });

    rejectAllButton.addEventListener('click', function() {
        let preferences = {
            essential: true,
            performance: false,
            marketing: false
        };
        saveCookiePreferences(preferences);
        cookieBanner.style.display = 'none';
    });

    function saveCookiePreferences(preferences) {
        // Convertir las preferencias a un string JSON
        const preferencesString = JSON.stringify(preferences);

        // Crear una fecha de vencimiento de 24 horas a partir de ahora
        const date = new Date();
        date.setTime(date.getTime() + (24 * 60 * 60 * 1000)); // 24 horas

        // Crear una cookie con las preferencias
        document.cookie = `cookie_preferences=${preferencesString}; expires=${date.toUTCString()}; path=/`;
    }

    function loadCookiePreferences() {
        const preferencesString = getCookie('cookie_preferences');
        if (preferencesString) {
            const preferences = JSON.parse(preferencesString);
            checkboxes.forEach(function(checkbox) {
                checkbox.checked = preferences[checkbox.name];
            });
            loadGoogleAnalytics(preferences);
        }
    }

    function getCookie(name) {
        const nameEQ = name + "=";
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            let cookie = cookies[i];
            while (cookie.charAt(0) === ' ') {
                cookie = cookie.substring(1, cookie.length);
            }
            if (cookie.indexOf(nameEQ) === 0) {
                return cookie.substring(nameEQ.length, cookie.length);
            }
        }
        return null;
    }

    function loadGoogleAnalytics(preferences) {
        if (preferences.performance) {
            // Cargar Google Analytics
            const script = document.getElementById('googleAnalyticsScript');
            if (script) {
                script.src = script.src; // Recargar el script
                const config = document.getElementById('googleAnalyticsConfig');
                if (config) {
                    config.type = 'text/javascript'; // Asegurarse que se ejecute el script de configuración
                }
            }

            // Verificar si Google Analytics está cargado
            setTimeout(() => {
                if (isGoogleAnalyticsLoaded() && isGtagLoaded()) {
                    console.log('Google Analytics está cargado correctamente.');
                } else {
                    console.log('Google Analytics no se cargó correctamente.');
                }
            }, 1000); // Dar tiempo para cargar el script
        }
    }

    function isGoogleAnalyticsLoaded() {
        const script = document.querySelector('script[src*="googletagmanager.com/gtag/js"]');
        return !!script;
    }

    function isGtagLoaded() {
        return typeof gtag === 'function';
    }

    // Mostrar el banner solo si no se han guardado preferencias previamente
    if (!getCookie('cookie_preferences')) {
        cookieBanner.style.display = 'block';
    } else {
        loadCookiePreferences();
    }
});




