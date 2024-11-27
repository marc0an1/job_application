console.log("Background script loaded!");

// Listen for messages from content scripts or popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "storeAuthToken") {
        const token = message.token;
        console.log("Storing auth token:", token);

        // Store the token in Chrome storage
        chrome.storage.local.set({ authToken: token }, () => {
            console.log("Auth token stored successfully in Chrome storage:", token);
            sendResponse({ success: true });
        });

        // Required to keep the message channel open for async response
        return true;
    }
});
