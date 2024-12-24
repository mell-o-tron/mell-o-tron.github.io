async function getPage(nameTo) {
    const url = "https://en.wikipedia.org/w/api.php";

    const params = new URLSearchParams({
        action: "query",
        prop: "revisions",
        titles: nameTo,
        rvprop: "content",
        rvslots: "*",
        formatversion: "2",
        format: "json",
        origin: "*"
    });

    try {
        const response = await fetch(`${url}?${params}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const jsonData = await response.json();

        const pages = jsonData.query.pages;
        if (!pages[0].hasOwnProperty('pageid')) {
            console.log("Nothing found");
        } else {
            const content = pages[0].revisions[0].slots.main.content;
            const data = content.split('\n| ');

            if(!wasEverAlive(data)) {
                console.log('Was never alive');
            }else if (isDead(data)) {
                console.log('He is dead and gone');

                let thing = document.getElementById("isdead")
                thing.textContent = "IS DEAD"

            } else {
                console.log('Still alive and kicking');
                let thing = document.getElementById("isdead")
                thing.textContent = "IS ALIVE"
            }
        }
    } catch (error) {
        console.error("An error occurred:", error);
    }
}

function wasEverAlive(data) {
    return data.some(line => line.toLowerCase().includes("birth_date"));
}

function isDead(data) {
    return data.some(line => line.toLowerCase().includes("death_date"));
}

// Example usage
getPage("Noam Chomsky");
