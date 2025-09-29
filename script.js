

    document.getElementById("contactForm").addEventListener("submit", function(event) {
        event.preventDefault(); // Zabrání klasickému odeslání

    const form = event.target;
    const formData = new FormData(form);

    fetch(form.action, {
        method: form.method,
    body: formData,
    headers: {
        'Accept': 'application/json'
        }
    }).then(response => {
        if (response.ok) {
        document.getElementById("formMsg").innerHTML = "<p style='color:green;'>Děkujeme! Zpráva byla odeslána.</p>";
    form.reset();
        } else {
        response.json().then(data => {
            if (data.errors) {
                document.getElementById("formMsg").innerHTML = "<p style='color:red;'>Chyba: " + data.errors.map(error => error.message).join(", ") + "</p>";
            } else {
                document.getElementById("formMsg").innerHTML = "<p style='color:red;'>Nastala chyba při odesílání formuláře.</p>";
            }
        });
        }
    }).catch(error => {
        document.getElementById("formMsg").innerHTML = "<p style='color:red;'>Nelze odeslat: " + error.message + "</p>";
    });
});

