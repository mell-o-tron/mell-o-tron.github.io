document.addEventListener('DOMContentLoaded', function() {
    fetch('seminars.csv')
        .then(response => response.text())
        .then(csv => processCSV(csv))
        .catch(error => console.error('Error loading CSV file:', error));
});

function processCSV(csv) {
    const lines = csv.split('\n').map(line => line.trim()).filter(line => line.length);
    const seminars = lines.slice(1).map(line => {
        const [date, name, description] = line.split(',');
        return { date: new Date(date.trim()), name: name.trim(), description: description.trim() };
    });

    const now = new Date();
    const pastSeminars = seminars.filter(seminar => seminar.date < now);
    const upcomingSeminars = seminars.filter(seminar => seminar.date >= now);

    displaySeminars('past-seminar-list', pastSeminars);
    displaySeminars('upcoming-seminar-list', upcomingSeminars);
}

function displaySeminars(elementId, seminars) {
    const container = document.getElementById(elementId);
    container.innerHTML = '';

    if (seminars.length === 0) {
        container.innerHTML = '<p>No seminars available</p>';
    } else {
        seminars.forEach(seminar => {
            const seminarElement = document.createElement('div');
            seminarElement.classList.add('seminar');
            seminarElement.innerHTML = `
                <strong>${seminar.name}</strong><br>
                <em>${seminar.date.toDateString()}</em><br>
                <p>${seminar.description}</p>
            `;
            container.appendChild(seminarElement);
        });
    }
}
