<script>
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
    {
      correct: "DOĞRU CEVAP. Tanıyon he beni. Gönüllerdeki cevap farklı biliyorum ama...",
      incorrect: "YANLIŞ CEVAP. Knk zaten ilk sevgilim hani. Belki gönlünden geçeni söylemişsindir diyorum ve geçiyorum."
    },
    {
      correct: "DOĞRU CEVAP. Knk diğerlerine gittiğimi bilmiyo bile olabilirsin. Bu beklendikti...",
      incorrect: "YANLIŞ CEVAP.Keman dediysen oloabilir ama Allah aşkına diğerlerinden sana ne zaman bahsetmişim bi söylesene."
    },
    {
      correct: "DOĞRU CEVAP. İŞTE BU. Ortak bi Rana haterı. Seçmem zor oldu ama...",
      incorrect: "YANLIŞ CEVAP. Hayatım farkındayım hepsi birbirinden kötüydü. Bunu yanlış yap yargılamıcam."
    },
    {
      correct: "DOĞRU CEVAP. AFERİN. Ça... Po... arkadaşım saymam. (bi de arkadaşımla çıkmayan arkadaşım kalmamış aq)",
      incorrect: "YANLIŞ CEVAP. ÇOK KIRILDIM. Ça... Po... arkadaşım saymam. (bi de arkadaşımla çıkmayan arkadaşım kalmamış aq)"
    },
    {
      correct: "DOĞRU CEVAP. Aferin kız. Baya tanıyom beni. Öpüyorum ben de seni çok o zaman.",
      incorrect: "YANLIŞ CEVAP. Arkadaşlar sırasıyla söylüyorum. Toprak, Emirhan, Yağız, Mert, Batuhan. Kesin Emirhan'ı kaçırdın. Keşke ben de kaçırsaydım."
    },
    {
      correct: "DOĞRU CEVAP. Kankaa. İyisin iyi. Çeldirici de koymuştum baya ama yememişsin.",
      incorrect: "YANLIŞ CEVAP. Haklısın diğerleri de olabilirdi ama... Ben bunu hep söylerim."
    },
    {
      correct: "DOĞRU CEVAP. Bunu bilse bilse Nehir bilir gibi. Kanka şahitsin zaten ama devamke.",
      incorrect: "YANLIŞ CEVAP. Eveet. Lisede hayatıma giren tayfa. Normal normal. Zati ben de pişmanım."
    },
    {
      correct: "DOĞRU CEVAP. Hepiniziiin yeri ayrı ama... Passenger prensesim Deniz'dir.",
      incorrect: "YANLIŞ CEVAP. Hepiniziiin yeri ayrı ama... Passenger prensesim Deniz'dir."
    },
    {
      correct: "DOĞRU CEVAP. E knk bi zahmet bunu da bilin. Takıdan bol neyim var.",
      incorrect: "YANLIŞ CEVAP. Bunu bilemediysen hiç beni görmedin knk heralde. Başka açıklaması yok çünkü."
    }
    ];
    let scores = JSON.parse(localStorage.getItem('quizScores')) || [];

// Render the scores table
function updateScoreTable() {
  scoreTableBody.innerHTML = '';
  scores.forEach(({ username, score }) => {
    const row = document.createElement('tr');
    row.innerHTML = `<td>${username}</td><td>${score}</td>`;
    scoreTableBody.appendChild(row);
  });
}

// Save scores to localStorage
function saveScores() {
  localStorage.setItem('quizScores', JSON.stringify(scores));
}

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

  // Add new score to scores list and save
  scores.push({ username, score });
  saveScores();
  updateScoreTable();
});

// Initialize the scores table on page load
updateScoreTable();
</script>