document.addEventListener('DOMContentLoaded', () => {
    const nInput = document.getElementById('n_input');
    const tInput = document.getElementById('t_input');
    const subjectFields = document.getElementById('subject_fields');
    const saveButton = document.getElementById('save_s');
    const resultsTable = document.getElementById('table_complete');
    const gpaOutput = document.getElementById('your_GPA');

    function generateFields() {
        subjectFields.innerHTML = '';

        for (let i = 1; i <= nInput.value; i++) {
            const rowDiv = document.createElement('div');
            rowDiv.classList.add('subject-row');

            // Subject input field
            const inputField = document.createElement('input');
            inputField.type = 'text';
            inputField.id = `input_${i}`;
            inputField.placeholder = `Subject ${i}`;
            inputField.classList.add('form-control');
            rowDiv.appendChild(inputField);

            // Grade select field
            const gradeField = document.createElement('select');
            gradeField.id = `grade_${i}`;
            const grades = tInput.value === '4' ? ["A", "B+", "B", "C+", "C", "D+", "D", "F"] : ["A", "B", "C", "D", "E", "F"];
            grades.forEach(grade => {
                const option = document.createElement('option');
                option.value = grade;
                option.textContent = grade;
                gradeField.appendChild(option);
            });
            gradeField.classList.add('form-control');
            rowDiv.appendChild(gradeField);

            // Credit value input field
            const creditValField = document.createElement('input');
            creditValField.type = 'number';
            creditValField.id = `credit_val_${i}`;
            creditValField.placeholder = `Credit Value ${i}`;
            creditValField.min = 0;
            creditValField.value = 0;
            creditValField.classList.add('form-control');
            rowDiv.appendChild(creditValField);

            subjectFields.appendChild(rowDiv);
        }
    }

    function calculateGPA() {
        const numSubjects = nInput.value;
        const gpaScale = tInput.value;
        const grades = [];
        const creditValues = [];
        const gradePoints = [];
        const gradePointCreditValues = [];
        let totalCredits = 0;
        let totalPoints = 0;

        for (let i = 1; i <= numSubjects; i++) {
            const grade = document.getElementById(`grade_${i}`).value;
            const credit = parseFloat(document.getElementById(`credit_val_${i}`).value);
            let gradePoint = 0;

            if (gpaScale === '4') {
                switch (grade) {
                    case 'A': gradePoint = 4; break;
                    case 'B+': gradePoint = 3.5; break;
                    case 'B': gradePoint = 3; break;
                    case 'C+': gradePoint = 2.5; break;
                    case 'C': gradePoint = 2; break;
                    case 'D+': gradePoint = 1.5; break;
                    case 'D': gradePoint = 1; break;
                    case 'F': gradePoint = 0; break;
                }
            } else {
                switch (grade) {
                    case 'A': gradePoint = 5; break;
                    case 'B': gradePoint = 4; break;
                    case 'C': gradePoint = 3; break;
                    case 'D': gradePoint = 2.5; break;
                    case 'E': gradePoint = 1; break;
                    case 'F': gradePoint = 0; break;
                }
            }

            grades.push(grade);
            creditValues.push(credit);
            gradePoints.push(gradePoint);
            const gradePointCreditValue = gradePoint * credit;
            gradePointCreditValues.push(gradePointCreditValue);
            totalCredits += credit;
            totalPoints += gradePointCreditValue;
        }

        const gpa = (totalPoints / totalCredits).toFixed(3);
        gpaOutput.textContent = `${gpa} / ${gpaScale}.000`;

        // Display results in table
        resultsTable.innerHTML = `
            <tr>
                <th>Subject</th>
                <th>Grade</th>
                <th>Credit Value</th>
                <th>Grade Point</th>
                <th>Grade Point Credit Value</th>
            </tr>
        `;
        for (let i = 1; i <= numSubjects; i++) {
            const row = resultsTable.insertRow();
            row.insertCell(0).textContent = document.getElementById(`input_${i}`).value;
            row.insertCell(1).textContent = grades[i - 1];
            row.insertCell(2).textContent = creditValues[i - 1];
            row.insertCell(3).textContent = gradePoints[i - 1];
            row.insertCell(4).textContent = gradePointCreditValues[i - 1];
        }
    }

    nInput.addEventListener('input', generateFields);
    tInput.addEventListener('change', generateFields);
    saveButton.addEventListener('click', calculateGPA);

    // Initialize the fields on page load
    generateFields();
});

