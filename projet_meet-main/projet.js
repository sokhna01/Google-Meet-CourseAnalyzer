class Question {
    constructor(text, choices) {
        this.text = text;
        this.choices = choices;
    }
}

class Anonymous {
    constructor(questions) {
        this.score = 0;
        this.questions = questions;
        this.currentQuestionIndex = 0;
    }

    getCurrentQuestionIndex() {
        return this.questions[this.currentQuestionIndex];
    }

    guess(answer) {
        this.score += answer;
        this.currentQuestionIndex++;
    }

    end() {
        return this.currentQuestionIndex >= this.questions.length;
    }
}

let questions = [
    new Question("1.  Comment qualifieriez-vous la charge de travail demandée par le cours ?", ['Trop importante', 'Assez Importante', 'normale', 'insuffisante'] /* , [3, 2, 1, 0] */ ),
    new Question("2.  Le cours a t-il répondu à vos attentes ?", ['Très bien répondu', 'Assez bien répondu', 'Peu répondu', 'Pas du tout répondu'] /* , [3, 2, 1, 0] */ ),
    new Question("3.  Le cours a t-il contribué à votre connaissance en la matière ?", ['Beaucoup contribué', 'Plutôt contribué', 'Peu contribué', 'Pas du tout contribué'] /* , [3, 2, 1, 0] */ ),
    new Question("4.  Comment qualifieriez-vous le cours ?", ['Très facile', 'Assez facile', 'Moyen', 'difficil'] /* , [3, 2, 1, 0] */ ),
    new Question("5.  Que pensez-vous du rythme du cours ?", ['Trop rapide', 'Rapide', 'moyen', 'lent'] /* , [3, 2, 1, 0] */ ),
    new Question("6.  Pensez-vous que les supports utilisés (support papier, présentation) durant le cours ont été utiles ?", ['Très utiles', 'Assez utiles', 'peu utiles', 'inutiles'] /* , [3, 2, 1, 0] */ ),
    new Question("7.  Quelle est la probabilité que vous recommandiez le cours à d\'autres étudiants ?<br><br>", ['Très probable', 'Assez probable', 'Peu probable', 'Pas du tout probable'] /* , [3, 2, 1, 0] */ ),
    new Question("8.  Dans l\'ensemble, êtes-vous satisfait(e) du contenu du cours ?", ['Très satisfait(e)', 'Assez satisfait(e)', 'Moyennement satisfait(e)', 'insatisfait(e)'] /* , [3, 2, 1, 0] */ ),
    new Question("9.  Dans l\'ensemble, quel est votre degré de satisfaction concernant le cours ?", ['Très satisfait(e)', 'Assez satisfait(e)', 'Moyennement satisfait(e)', 'insatisfait(e)'] /* , [3, 2, 1, 0] */ ),
    new Question("10. Quel était le niveau de qualité global de l’instructeur pour ce cours ?", ['Excellent', 'Bon', 'Moyen', 'Faible'] /* , [3, 2, 1, 0] */ ),
    new Question("11. Le cours était-il bien organisé ?", ['Très bien organisé', 'Assez bien organisé', 'Pas très bien organisé', 'Pas du tout organisé'] /* , [3, 2, 1, 0] */ ),
    new Question("12. Quel était le niveau de connaissances du sujet de cours de l’instructeur ?", ['Très bon niveau de connaissance', 'Assez bon niveau de connaissance', 'Niveau de connaissance médiocre', 'Aucune connaissance'] /* , [3, 2, 1, 0] */ ),
    new Question("13. Les explications de l’instructeur étaient-elles claires ?", ['Très claires', 'Assez claires', 'Peu claires', 'Pas du tout claires'] /* , [3, 2, 1, 0] */ ),
    new Question("14. De quelle manière l’instructeur était-il concerné par l’apprentissage des élèves dans ce cours ?", ['Très concerné', 'Assez concerné', 'Peu concerné', 'Pas du tout concerné'] /* , [3, 2, 1, 0] */ ),
    new Question("15. L’instructeur avait-il une attitude encourageante envers les élèves ?", ['Très encourageante', 'Assez encourageante', 'Peu encourageante', 'Pas du tout encourageante'] /* , [3, 2, 1, 0] */ ),
    new Question("16. L’instructeur était-il disponible en dehors du cours ?", ['Très disponible', 'Assez disponible', 'Pas très disponible', 'Pas du tout disponible'] /* , [3, 2, 1, 0] */ ),
];

var choices = document.getElementsByClassName('choices');

const display = {
    elementShower: function(id, text) {
        let element = document.getElementById(id);
        element.innerHTML = text;
    },

    endForm: function() {
        let ending = `
        <form methode = "POST" action = "insert.php">
            <fieldset>
                17. Si vous avez d\'autres suggestions ou commentaires concernant le cours, merci de nous en faire part.<br>
                <textarea name="Q17">...</textarea>
                <input type="hidden" name="hidden" id="hidden" value="${anonymous.score}">
            </fieldset><br>
            <input type="submit" value="TERMINER" id="fb">
        </form>`;
        this.elementShower('questions', ending);
        let choices = document.getElementsByClassName('choices');
        document.body.childNodes[1].childNodes[1].childNodes[5].innerHTML = '<br>';
    },

    question: function() {
        this.elementShower("questions", anonymous.getCurrentQuestionIndex().text);
    },

    choix: function() {
        let choices = anonymous.getCurrentQuestionIndex().choices;

        guessHandler = (id, guess) => {
            document.getElementById(id).onclick = function() {
                anonymous.guess(guess);
                quizApp();
            }
        }

        for (var i = 0; i < choices.length; i++) {
            this.elementShower(`choice${i}`, choices[i]);
            guessHandler(`guess${i}`, 3 - i);
        }
    },

    progress: function() {
        let foot = `<p>${anonymous.currentQuestionIndex + 1} / ${questions.length}`;
        this.elementShower('footer', foot);
    }
}

quizApp = () => {
    if (anonymous.end())
        display.endForm();
    else {
        display.question();
        display.choix();
        display.progress();
    }
}

let anonymous = new Anonymous(questions);
quizApp();