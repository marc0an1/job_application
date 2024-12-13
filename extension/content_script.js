console.log("Content script loaded!");

// Listen for the authTokenAvailable event from the Angular app
window.addEventListener("authTokenAvailable", (event) => {
    const token = event.detail.token;
    console.log("Auth token captured in content script:", token);

    // Send the token to the background script
    chrome.runtime.sendMessage({ action: "storeAuthToken", token: token }, (response) => {
        console.log("Response from background script:", response);
    });
});

// Scrape job posting data from the job website
function scrapeJobPosting() {
    let jobDescription = "Unknown Job Title";
    let companyName = "Unknown Company";
    let notes = "Scraped from Indeed";

    if(window.location.href.includes("linkedin.com")) {
        jobDescription = document.querySelector("h3.base-search-card__title")?.innerText.trim() || "Unknown Job Title";
        companyName = document.querySelector("a.hidden-nested-link")?.innerText.trim() || "Unknown Company";
        notes = "Scraped from LinkedIn";
    } else if (window.location.href.includes("indeed.com")) {
        console.log("Scraping Indeed job posting...");
        rawJobTitle = document.querySelector(".jobsearch-JobInfoHeader-title-container")?.innerText || "Unknown Job Title";
        jobDescription = rawJobTitle.split("\n")[0].trim(); // Keep only the first part and trim whitespace
        companyNameElement = document.querySelector("[data-company-name='true'] a");
        rawCompanyName = companyNameElement ? companyNameElement.innerText : "No company found";
        companyName = rawCompanyName.split("\n")[0].trim(); // Keep only the first part and trim whitespace
    }


    // const companyNameElement = document.querySelector("[data-company-name='true'] a");
    // const rawCompanyName = companyNameElement ? companyNameElement.innerText : "No company found";
    // const companyName = rawCompanyName.split("\n")[0].trim(); // Keep only the first part and trim whitespace
    // const companyNameElement = document.querySelector("[data-company-name='true'] a");
    // const companyName = companyNameElement ? companyNameElement.innerText : "No company found";

    const scrapedData = {
        companyName,
        jobDescription,
        dateApplied: new Date().toISOString().split("T")[0], // Add current date
        status: "Applied", // Default status
        notes,
    };

    console.log("Scraped Job Data:", scrapedData); // Log the scraped data to the console
    return scrapedData;
}

// Listener for messages from the popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "scrape") {
        console.log("Scraping job data...");
        const scrapedData = scrapeJobPosting();
        console.log("Scraped Data:", scrapedData);
        sendResponse(scrapedData);
    }
});
