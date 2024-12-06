<script type="module">
    import { initializeApp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";
    import { getDatabase, ref, set, push, onValue } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-database.js";

    const firebaseConfig = {
        apiKey: "YOUR_API_KEY",
        authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
        databaseURL: "https://YOUR_PROJECT_ID.firebaseio.com",
        projectId: "YOUR_PROJECT_ID",
        storageBucket: "YOUR_PROJECT_ID.appspot.com",
        messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
        appId: "YOUR_APP_ID",
        measurementId: "YOUR_MEASUREMENT_ID"
    };

    const app = initializeApp(firebaseConfig);
    const database = getDatabase(app);

    // Save a new score to Firebase
    function saveScoreToFirebase(username, score) {
        const scoresRef = ref(database, 'quizScores');
        push(scoresRef, { username, score });
    }

    // Retrieve scores and update the table
    function updateScoreTableFromFirebase() {
        const scoresRef = ref(database, 'quizScores');
        onValue(scoresRef, (snapshot) => {
            const scores = snapshot.val();
            const tableBody = document.querySelector('#scores-table tbody');
            tableBody.innerHTML = ''; // Clear the table

            for (let id in scores) {
                const { username, score } = scores[id];
                const row = document.createElement('tr');
                row.innerHTML = `<td>${username}</td><td>${score}</td>`;
                tableBody.appendChild(row);
            }
        });
    }

    // Call the function to update scores on page load
    updateScoreTableFromFirebase();
</script>
