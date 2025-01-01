
document.getElementById('addSubject').addEventListener('click', () => {
    const subjectFields = document.getElementById('subjectFields');
    const newField = document.createElement('div');
    newField.classList.add('subject');
    newField.innerHTML = `
        <input type="text" name="subject[]" placeholder="Subject Name" required>
        <input type="number" name="credits[]" placeholder="Credits" min="1" required>
        <input type="number" name="marks[]" placeholder="Marks (Out of 100)" min="0" max="100" required>
        <button type="button" class="removeSubject">Remove</button>
    `;
    subjectFields.appendChild(newField);

    subjectFields.scrollTop= subjectFields.scrollHeight;
    // Attach event listener for the new "Remove" button
    const removeButton = newField.querySelector('.removeSubject');
    removeButton.addEventListener('click', () => {
        newField.remove();  // Remove the subject field when "Remove" is clicked
    });
});

// Ensure the "Remove" button for the first input is functional as well
document.querySelectorAll('.removeSubject').forEach(removeButton => {
    removeButton.addEventListener('click', () => {
        const subjectField = removeButton.parentElement;
        if (subjectField) {
            subjectField.remove();
        }
    });
});

document.getElementById('cgpaForm').addEventListener('submit', (e) => {
    e.preventDefault();

    const credits = [...document.getElementsByName('credits[]')].map(el => parseInt(el.value));
    const marks = [...document.getElementsByName('marks[]')].map(el => parseInt(el.value));

    let totalCredits = 0;
    let totalWeightedScore = 0;

    const getFirstDigitOfRoundedMarks = (mark) => {
        let roundedMarks;
        if (mark % 10 === 0) {
            roundedMarks = Math.ceil(mark / 10) * 10 + 10;
        } else {
            roundedMarks = Math.ceil(mark / 10) * 10;
        }
        return roundedMarks === 100 ? 10 : parseInt(roundedMarks.toString()[0]);
    };

    for (let i = 0; i < credits.length; i++) {
        let firstDigit = getFirstDigitOfRoundedMarks(marks[i]);
        let weightedScore = firstDigit * credits[i];

        totalCredits += credits[i];
        totalWeightedScore += weightedScore;
    }

    const cgpa = (totalWeightedScore / totalCredits).toFixed(2);
    document.getElementById('result').innerHTML = `<h2>Your CGPA is: ${cgpa}</h2>`;
});
