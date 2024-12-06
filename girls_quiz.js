<script type="module">
    // Firebase Setup
    import { initializeApp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";
    import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-database.js";

    const firebaseConfig = {
        apiKey: "AIzaSyAvDJaV2DATIJP3N6iovAqlw-YuNWMZGIg",
        authDomain: "girl-s-quiz.firebaseapp.com",
        databaseURL: "https://girl-s-quiz-default-rtdb.firebaseio.com", // Add databaseURL for Firebase Realtime Database
        projectId: "girl-s-quiz",
        storageBucket: "girl-s-quiz.appspot.com",
        messagingSenderId: "271949931973",
        appId: "1:271949931973:web:15336bf7017a2ced8257ac",
        measurementId: "G-6Z8WQHRHE7"
    };

    const app = initializeApp(firebaseConfig);
    const database = getDatabase(app);

    // DOM Elements
    const quizForm = document.getElementById('quiz-form');
    const usernameInput = document.getElementById('username');
    const resultDiv = document.getElementById('result');
    const scoreTableBody = document.querySelector('#scores-table tbody');
    const correctAnswers = ['a', 'c', 'b', 'd', 'b', 'd', 'a', 'a', 'c', 'b'];
    const feedback = [
        {
            correct: "DOĞRU CEVAP. Bilmesi kolay değildi hayatım tebrikler.",
            incorrect: "YANLIŞ CEVAP. Kanka yalan yok hepsi olabilirdi yemeği seviyorum genel olarak."
        },
        // Add the rest of your feedback here...
    ];

    // Save Scores to Firebase
    function saveScoresToFirebase(username, score) {
        const scoresRef = ref(database, 'quizScores');
        push(scoresRef, { username, score });
    }

    // Update Score Table from Firebase
    function updateScoreTableFromFirebase() {
        const scoresRef = ref(database, 'quizScores');
        onValue(scoresRef, (snapshot) => {
            scoreTableBody.innerHTML = ''; // Clear the table
            const scores = snapshot.val();
            for (let id in scores) {
                const { username, score } = scores[id];
                const row = document.createElement('tr');
                row.innerHTML = `<td>${username}</td><td>${score}</td>`;
                scoreTableBody.appendChild(row);
            }
        });
    }

    // Quiz Submission
    quizForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = usernameInput.value.trim();
        if (!username) {
            alert("Please enter your username!");
            return;
        }

        let score = 0;
        const userAnswers = Array.from({ length: 10 }, (_, i) => quizForm[`q${i + 1}`]?.value);

        userAnswers.forEach((answer, index) => {
            const comment = document.getElementById(`comment-q${index + 1}`);
            if (answer === correctAnswers[index]) {
                comment.textContent = feedback[index].correct;
                comment.style.color = 'green';
                score++;
            } else {
                comment.textContent = feedback[index].incorrect;
                comment.style.color = 'red';
            }
        });

        resultDiv.textContent = `Your score is ${score}/${correctAnswers.length}`;

        // Save to Firebase and update table
        saveScoresToFirebase(username, score);
    });

    // Initialize the scores table on page load
    updateScoreTableFromFirebase();
</script>
