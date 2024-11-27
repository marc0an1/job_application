document.getElementById("save-job").addEventListener("click", () => {
    // Retrieve the auth token from Chrome storage
    chrome.storage.local.get(["authToken"], (result) => {
        const token = result.authToken;

        console.log("Auth token retrieved in popup:", token);

        if (!token) {
            alert("Please log in to the dashboard first.");
            return;
        }

        // Trigger the content script to scrape job data
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (!tabs[0] || !tabs[0].id) {
                console.error("No active tab found.");
                return;
            }

            chrome.tabs.sendMessage(tabs[0].id, { action: "scrape" }, async (scrapedData) => {
                console.log("Scraped Data Response:", scrapedData);

                if (!scrapedData) {
                    console.error("Failed to scrape job data.");
                    return;
                }

                console.log("Scraped Data:", scrapedData);
                console.log(JSON.stringify({
                    url: tabs[0].url,
                    ...scrapedData,
                }))

                // Send data to the Flask backend
                try {
                    const response = await fetch("http://127.0.0.1:5000/scrape", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                        // Only include fields that the Spring backend expects
                        body: JSON.stringify({
                            companyName: scrapedData.companyName,
                            jobDescription: scrapedData.jobTitle,
                            dateApplied: scrapedData.dateApplied,
                            status: scrapedData.status,
                            notes: scrapedData.notes,
                        }),
                    });
                
                    // Check if the response is valid JSON
                    let result;
                    try {
                        result = await response.json();
                    } catch (jsonError) {
                        console.error("Failed to parse JSON response:", jsonError);
                        alert("Failed to save job application: Invalid response from backend.");
                        return;
                    }

                    console.log("Backend Response:", result);

                    if (response.ok) {
                        alert("Job application saved successfully!");
                    } else {
                        alert(`Error: ${result.error || "Unknown error"}`);
                    }
                } catch (error) {
                    console.error("Error sending data to Flask backend:", error);
                    alert("Failed to save job application.");
                }
                
            });
        });
    });
});
