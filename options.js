browser.storage.local.get('cfsbe_requestblocking_enabled')
    .then((result) => {
        document.getElementById("request-blocking-switch").checked = result.cfsbe_requestblocking_enabled
    })
    .catch((error) => {
        console.error(error);
    });

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("request-blocking-switch").addEventListener("click", function() {
        if (this.checked) {
            browser.storage.local.set({cfsbe_requestblocking_enabled: true})
            browser.runtime.sendMessage({ command: "enableBlock" });
        } else {
            browser.storage.local.set({cfsbe_requestblocking_enabled: false})
            browser.runtime.sendMessage({ command: "disableBlock" });
        }
    });
});