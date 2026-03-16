const nameInput = document.getElementById("name");
const markInput = document.getElementById("mark");
const addBtn = document.getElementById("add");
const tableBody = document.getElementById("tableBody");
const stats = document.getElementById("stats");

let students = [];

function classify(mark){

    if(mark >= 8.5) return "Giỏi";
    if(mark >= 7) return "Khá";
    if(mark >= 5) return "Trung bình";

    return "Yếu";
}

function addStudent(){

    let name = nameInput.value.trim();
    let mark = parseFloat(markInput.value);

    if(name === ""){
        alert("Họ tên không được bỏ trống");
        return;
    }

    if(isNaN(mark) || mark < 0 || mark > 10){
        alert("Điểm phải từ 0 đến 10");
        return;
    }

    students.push({
        name: name,
        mark: mark
    });

    renderTable();

    nameInput.value = "";
    markInput.value = "";
    nameInput.focus();
}

function renderTable(){

    let html = "";

    students.forEach((sv,index)=>{

        let rank = classify(sv.mark);

        html += `
        <tr class="${sv.mark < 5 ? "warning" : ""}">
            <td>${index + 1}</td>
            <td>${sv.name}</td>
            <td>${sv.mark}</td>
            <td>${rank}</td>
            <td>
                <button data-index="${index}">Xóa</button>
            </td>
        </tr>
        `;

    });

    tableBody.innerHTML = html;

    updateStats();
}

function updateStats(){

    let total = students.length;

    let avg = 0;

    if(total > 0){

        let sum = students.reduce((s,sv)=> s + sv.mark ,0);

        avg = (sum / total).toFixed(2);
    }

    stats.innerText =
    `Tổng sinh viên: ${total} | Điểm trung bình: ${avg}`;
}

addBtn.addEventListener("click", addStudent);

markInput.addEventListener("keypress", function(e){

    if(e.key === "Enter"){
        addStudent();
    }

});

tableBody.addEventListener("click", function(e){

    if(e.target.tagName === "BUTTON"){

        let index = parseInt(e.target.dataset.index);

        students.splice(index,1);

        renderTable();
    }

});