function calculateTotal(att, ca, mid, end) {
    return att + ca + mid + end;
}

function calculateGrade(total) {
    if (total >= 90) return "O";
    if (total >= 80) return "A+";
    if (total >= 70) return "A";
    if (total >= 60) return "B+";
    if (total >= 50) return "B";
    if (total >= 40) return "C";
    return "E";
}

function calculatePoints(grade) {
    switch (grade) {
        case "O": return 10;
        case "A+": return 9;
        case "A": return 8;
        case "B+": return 7;
        case "B": return 6;
        case "C": return 5;
        case "D": return 4;
        default: return 0;
    }
}

function meetsCriteria1(total) {
    return total >= 40;
}

function meetsCriteria2(end) {
    return end >= 0.3 * 50;
}

function meetsCriteria3(mid, end) {
    return (mid + end) >= 0.3 * 70;
}

function meetsPassingCriteria(total, mid, end) {
    return meetsCriteria1(total) && (meetsCriteria2(end) || meetsCriteria3(mid, end));
}

function calculateTGPA() {
    const subjects = [
        { id: "egdf", credits: 4 },
        { id: "dm", credits: 3 },
        { id: "cs1", credits: 3 },
        { id: "ep", credits: 3 },
        { id: "cp", credits: 4 },
        { id: "oc", credits: 2 },
        { id: "se", credits: 3 },
        { id: "dbms", credits: 4 }
    ];

    let totalCredits = 0;
    let totalPoints = 0;
    let hasFail = false;

    subjects.forEach(subject => {
        const att = parseFloat(document.getElementById(`${subject.id}_att`).value) || 0;
        const ca = parseFloat(document.getElementById(`${subject.id}_ca`).value) || 0;
        const mid = parseFloat(document.getElementById(`${subject.id}_mid`).value) || 0;
        const end = parseFloat(document.getElementById(`${subject.id}_end`).value) || 0;

        const total = calculateTotal(att, ca, mid, end);
        const grade = calculateGrade(total);
        const points = calculatePoints(grade);

        document.getElementById(`${subject.id}_total`).innerText = total;
        document.getElementById(`${subject.id}_grade`).innerText = grade;
        document.getElementById(`${subject.id}_points`).innerText = points;
        document.getElementById(`${subject.id}_result`).innerText = points > 0 && meetsPassingCriteria(total, mid, end) ? "Pass" : "Fail";
        document.getElementById(`${subject.id}_result`).className = points > 0 && meetsPassingCriteria(total, mid, end) ? "pass" : "fail";

        totalCredits += subject.credits;
        totalPoints += points * subject.credits;
        if (points === 0 || !meetsPassingCriteria(total, mid, end)) hasFail = true;
    });

    const tgpa = totalPoints / totalCredits;
    document.getElementById("tgpaResult").innerHTML = `TGPA: <span>${tgpa.toFixed(2)}</span><br>${hasFail ? '<span class="fail">Result: Fail</span>' : '<span class="pass">Result: Pass</span>'}`;
}
