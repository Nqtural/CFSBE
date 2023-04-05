browser.storage.local.get('cfsbe_requestblocking_enabled')
.then((result) => {
let blocking = result.cfsbe_requestblocking_enabled;
})
.catch((error) => {
    console.error(error);
});

browser.runtime.onMessage.addListener((message) => {
    if (message.command === "enableBlock") {
        blocking = true;
    } else if (message.command === "disableBlock") {
        blocking = false;
    }
});

browser.webRequest.onBeforeRequest.addListener(
    function(details) {
        if (details.url.includes("https://chat.openai.com/backend-api/moderations") && blocking === true) {
            return { cancel: true };
        }
    },
    { urls: ["<all_urls>"] },
    ["blocking"]
);