document.addEventListener('DOMContentLoaded', function() {
    fetch('seminars.csv')
        .then(response => response.text())
        .then(csv => processCSV(csv))
        .catch(error => console.error('Error loading CSV file:', error));
});

function processCSV(csv) {
    const lines = csv.split('\n').map(line => line.trim()).filter(line => line.length);
    const seminars = lines.slice(1).map(line => {
        const [date, name, description, image] = line.split(';');
        return { date: new Date(date.trim()), name: name.trim(), description: description.trim(), image: image.trim()};
    });

    const now = new Date();
    const past_seminars = seminars.filter(seminar => seminar.date < now).sort( (a, b) => b.date - a.date );
    const upcoming_seminars = seminars.filter(seminar => seminar.date >= now);
    
    displaySeminars('past-seminar-list', past_seminars);
    displaySeminars('upcoming-seminar-list', upcoming_seminars);
}

function displaySeminars(elementId, seminars) {
    const container = document.getElementById(elementId);
    container.innerHTML = '';

    if (seminars.length === 0) {
        container.innerHTML = '<p>No seminars available</p>';
    } else {
        seminars.forEach(seminar => {
            const seminar_element = document.createElement('div');
            seminar_element.classList.add('seminar');
            
            const seminar_date = document.createElement('div');
            seminar_date.classList.add('seminar-date');
            seminar_date.innerHTML = `
                <h3><em>${seminar.date.toDateString()}</em></h3>`;
                
            const seminar_title = document.createElement('div');
            seminar_title.classList.add('seminar-title');
            seminar_title.innerHTML = `<h3>${seminar.name}</h3>`
            container.appendChild(seminar_element);
            
            const seminar_row = document.createElement('div');
            seminar_row.classList.add("seminar-row");
            
            const seminar_content = document.createElement('div');
            seminar_content.classList.add('seminar-content');
            seminar_content.innerHTML = `${seminar.description}`;
            
            const image_container = document.createElement('div');
            image_container.classList.add('image-container');
            
            if (seminar.image != "none"){
                const img = document.createElement("img");
                img.src = `seminar_images/${seminar.image}`;
                img.width = 300;
                img.height = 408;
            
                image_container.appendChild(img);
            }
            
            seminar_element.appendChild(seminar_date);
            seminar_element.appendChild(seminar_title);
            seminar_element.appendChild(seminar_row);
            seminar_row.appendChild(image_container);
            seminar_row.appendChild(seminar_content);
            
        });
    }
}
