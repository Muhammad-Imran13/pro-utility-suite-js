// 1. TEMPERATURE
function convertTemp() {
    let v = parseFloat(document.getElementById('tempInput').value);
    let t = document.getElementById('tempType').value;
    let res = (t === 'cToF') ? (v * 9 / 5 + 32).toFixed(2) + " °F" : ((v - 32) * 5 / 9).toFixed(2) + " °C";
    document.getElementById('tempRes').innerText = isNaN(v) ? "Enter Value" : res;
}

// 2. LENGTH
function convertLen() {
    let v = parseFloat(document.getElementById('lenInput').value);
    let t = document.getElementById('lenType').value;
    let res = "";
    if (t === 'mToKm') res = v / 1000 + " KM";
    else if (t === 'kmToM') res = v * 1000 + " M";
    else if (t === 'mToIn') res = (v * 39.37).toFixed(2) + " Inches";
    else if (t === 'kmToMile') res = (v * 0.621).toFixed(2) + " Miles";
    document.getElementById('lenRes').innerText = isNaN(v) ? "Enter Value" : res;
}

// 3. CURRENCY (Static Top 10)
function convertCurr() {
    let v = parseFloat(document.getElementById('currInput').value);
    let t = document.getElementById('currType').value;
    const rates = { USD: 278, EUR: 302, GBP: 352, SAR: 74, AED: 75, CAD: 205, AUD: 182, CNY: 38, JPY: 1.85, INR: 3.35 };
    let res = (v / rates[t]).toFixed(2) + " " + t;
    document.getElementById('currRes').innerText = isNaN(v) ? "Enter Amount" : res;
}

// 4. TIME, DATA, WEIGHT (Modular Functions)
function convertTime() {
    let v = parseFloat(document.getElementById('timeInput').value);
    let t = document.getElementById('timeType').value;
    let res = (t === 'mToS') ? v * 60 + " Sec" : (t === 'sToM') ? (v / 60).toFixed(2) + " Min" : (t === 'mToH') ? (v / 60).toFixed(2) + " Hr" : v * 60 + " Min";
    document.getElementById('timeRes').innerText = isNaN(v) ? "Error" : res;
}

function convertData() {
    let v = parseFloat(document.getElementById('dataInput').value);
    let t = document.getElementById('dataType').value;
    let res = (t === 'gbToMb') ? v * 1024 + " MB" : (t === 'mbToGb') ? (v / 1024).toFixed(3) + " GB" : v * 1024 + " GB";
    document.getElementById('dataRes').innerText = isNaN(v) ? "Error" : res;
}

function convertWeight() {
    let v = parseFloat(document.getElementById('weightInput').value);
    let t = document.getElementById('weightType').value;
    let res = (t === 'kgToLb') ? (v * 2.204).toFixed(2) + " Lbs" : (t === 'lbToKg') ? (v / 2.204).toFixed(2) + " KG" : v / 1000 + " KG";
    document.getElementById('weightRes').innerText = isNaN(v) ? "Error" : res;
}

// 5. ADVANCED NUMBER ANALYZER
function runAnalysis() {
    let n = parseFloat(document.getElementById('anaInput').value);
    let out = document.getElementById('anaRes');
    if (isNaN(n)) return;

    let parity = n % 2 === 0 ? "Even" : "Odd";
    let isPrime = n > 1;
    for (let i = 2; i <= Math.sqrt(n); i++) if (n % i === 0) { isPrime = false; break; }

    let sqRoot = Math.sqrt(n).toFixed(2);
    let cbRoot = Math.cbrt(n).toFixed(2);
    let isRational = (Number.isInteger(n) || (n.toString().includes('.') && n.toString().split('.')[1].length < 5)) ? "Rational" : "Irrational";

    out.innerHTML = `
        <table class="res-table">
            <tr><td>Properties</td><td><span class="badge">${parity}</span> <span class="badge">${isPrime ? 'Prime' : 'Not Prime'}</span></td></tr>
            <tr><td>Square & Cube Root</td><td>√: ${sqRoot} | ∛: ${cbRoot}</td></tr>
            <tr><td>Classification</td><td>This is a <b>${isRational}</b> number.</td></tr>
        </table>`;
}

// 6. PRO AGE ENGINE
function analyzeAge() {
    let dob = new Date(document.getElementById('birthDate').value);
    let today = new Date();
    if (isNaN(dob)) return;

    let age = today.getFullYear() - dob.getFullYear();
    let nextBday = new Date(today.getFullYear(), dob.getMonth(), dob.getDate());
    if (today > nextBday) nextBday.setFullYear(today.getFullYear() + 1);
    let daysTo = Math.ceil((nextBday - today) / (86400000));

    let prevBday = new Date(today.getFullYear(), dob.getMonth(), dob.getDate());
    if (today < prevBday) prevBday.setFullYear(today.getFullYear() - 1);
    let daysSince = Math.floor((today - prevBday) / (86400000));

    document.getElementById('ageRes').innerHTML = `
        <div style="display:grid; grid-template-columns:repeat(3,1fr); gap:10px; margin-top:15px">
            <div class="res-box" style="background:#4834d4; color:white">Age: ${age}</div>
            <div class="res-box" style="background:#2ecc71; color:white">Next: ${daysTo} Days</div>
            <div class="res-box" style="background:#3498db; color:white">Past: ${daysSince} Days</div>
        </div>
    `;
}

function setTheme(m) { document.body.className = m + "-mode"; }

// DIGITAL MARKSHEET GENERATOR

function generateMarksheet() {
    const sName = document.getElementById('studentName').value || "N/A";
    const roll = document.getElementById('rollNo').value || "N/A";
    const inputs = document.querySelectorAll('.subj-marks');
    const area = document.getElementById('marksheetArea');

    let totalObtained = 0;
    let totalMax = 500;
    let subjectsHTML = "";
    let isFailedInAny = false;

    // Loop through subjects to build table rows
    for (let input of inputs) {
        let val = parseFloat(input.value) || 0;
        let subName = input.getAttribute('data-name');

        if (val < 0 || val > 100) {
            alert("Marks 0 se 100 ke darmiyan hone chahiye!");
            return;
        }

        if (val < 40) isFailedInAny = true; // Passing marks 40
        totalObtained += val;

        subjectsHTML += `
            <tr>
                <td>${subName}</td>
                <td>100</td>
                <td>${val}</td>
                <td>${val >= 40 ? '<span class="status-badge pass">Pass</span>' : '<span class="status-badge fail">Fail</span>'}</td>
            </tr>
        `;
    }

    let percentage = (totalObtained / totalMax) * 100;
    let grade = "";
    let color = "";

    // Grade Logic
    if (percentage >= 90) { grade = "A+"; color = "#6c5ce7"; }
    else if (percentage >= 80) { grade = "A"; color = "#0984e3"; }
    else if (percentage >= 70) { grade = "B"; color = "#2ecc71"; }
    else if (percentage >= 60) { grade = "C"; color = "#f1c40f"; }
    else { grade = "Fail"; color = "#e74c3c"; }

    // Final Marksheet HTML
    area.innerHTML = `
        <div class="marksheet-card animate-in">
            <div class="marksheet-header">
                <h2>OFFICIAL MARKSHEET</h2>
                <p>Board of Intermediate & Secondary Education</p>
            </div>
            <div class="student-info">
                <span>Name: ${sName}</span>
                <span>Roll No: ${roll}</span>
                <span>Date: ${new Date().toLocaleDateString()}</span>
            </div>
            <table class="marksheet-table">
                <thead>
                    <tr>
                        <th>Subject</th>
                        <th>Max Marks</th>
                        <th>Obtained</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    ${subjectsHTML}
                    <tr class="summary-row">
                        <td>TOTAL</td>
                        <td>${totalMax}</td>
                        <td>${totalObtained}</td>
                        <td>${percentage.toFixed(1)}%</td>
                    </tr>
                </tbody>
            </table>
            <div style="text-align: center; margin-top: 20px;">
                <h3>Final Grade: <span class="grade-text" style="color:${color}">${grade}</span></h3>
                <p>${isFailedInAny ? "Remarks: Needs Improvement" : "Remarks: Excellent Performance!"}</p>
            </div>
        </div>
    `;
}