const comments = [
    {
        name: "Marina",
        date: "Yesterday",
        stars: 5,
        text: "Moj pas obožava parizer,  ovo je najbolji!! 🐶!!",
        
    },
    {
        name: "Zoran",
        date: "6 days ago",
        stars: 5,
        text: "Mrvica jako voli juneću salamu. S obzirom da je elergična na piletinu ova poslastica u obliku salamice je najbolja.",
        
    },
    {
        name: "Sonja",
        date: "3 weeks ago",
        stars: 5,
        text: "Isprobali smo sva tri receptića. Ne morate biti master kuvar da bi ih spremili.",
        
    },
    // Add more comments as needed
];

let commentsToShow = 5;

function renderComments() {
    const container = document.getElementById('comments-container');
    container.innerHTML = '';
    for (let i = 0; i < commentsToShow && i < comments.length; i++) {
        const comment = comments[i];
        container.innerHTML += `
            <div class="comment">
                <div class="name">${comment.name}</div>
                <div class="date">${comment.date}</div>
                <div class="stars">${'★'.repeat(comment.stars)}</div>
                <div class="text">${comment.text}</div>
                
            </div>
        `;
    }
}

document.getElementById('see-more-btn').addEventListener('click', () => {
    commentsToShow += 5;
    renderComments();
});

renderComments();
