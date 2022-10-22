/*eslint-env browser*/

var btnDel = [], i;

for (i = 0; i < 5; i += 1) {
    btnDel[i] = "<button class='btnDel" + String(i) + "'>delete</button>";
}

var employeeList = [["Jon Snow", "Data Scientist", 1001, btnDel[0]],
                    ["Robb Stark", "Data Analyst", 2702, btnDel[1]],
                    ["Arya Stark", "Data Scientist", 2003, btnDel[2]],
                    ["Ned Stark", "Software Engineer", 2204, btnDel[3]],
                    ["Tyrion Lannister", "Software Engineer", 2505, btnDel[4]]];

var $ = function(id){
    'use strict';
    return document.getElementById(id);
}
function displayEmployees() {
    "use strict";
    var row, col, table, tbody, tableStr = "";
    
    table = document.getElementsByTagName("table")[0];
    tbody = document.createElement('tbody');
    
    $("employees").innerHTML = "Showing " + employeeList.length + " employees";
        
    for (row = 0; row < employeeList.length; row += 1) {
        tableStr += "<tr>";
        for (col = 0; col < 4; col += 1) {
            tableStr += "<td>" + employeeList[row][col] + "</td>";
        }
        tableStr += "</tr>";
    }
    tableStr += "</tbody>";
    table.appendChild(tbody);
    $("tblBody").innerHTML = tableStr;
}

var insertEmployee = function () {
    "use strict";
    var name, title, extension, employee = [];
       
    name = $("name").value;
    title = $("title").value;
    extension = $("extension").value;
       
    if (name === "") {
        $("requireName").innerHTML = "This field is required.";
        return;
    } else {
        $("requireName").innerHTML = "";
        employee.push(name);
    }
    
    if (title === "") {
        $("requireTitle").innerHTML = "This field is required.";
        return;
    } else {
        $("requireTitle").innerHTML = "";
        employee.push(title);
    }
    
    if (extension === "") {
        $("requireExt").innerHTML = "This field is required.";
        return;
    }
    
    if (isNaN(extension) || extension.length !== 4) {
        $("requireExt").innerHTML = "The extension must be a 4-digit number";
        return;
    } else {
        $("requireExt").innerHTML = "";
        employee.push(extension);
        btnDel[employeeList.length + 1] = "<button class='btnDel" + String(employeeList.length + 1) + "'>delete</button>";
        employee.push(btnDel[employeeList.length + 1]);
    }
    
    if (employee.length > 0) {
        employeeList.push(employee);
    }
    displayEmployees();
   
    //CLEAR FIELDS
    $("regForm").reset();
    $("name").innerHTML = "";
    $("title").innerHTML = "";
    $("extension").innerHTML = "";
};

var removeEmployee = function (index) {
    "use strict";
    employeeList.splice(index, 1);
    displayEmployees();
};

window.addEventListener("load", function () {
    "use strict";
    displayEmployees();
    $("add").addEventListener("click", insertEmployee);
    $("tblBody").addEventListener("click", function (e) {
        if (e.target.textContent.match(/delete/)) {
            var i, index, tblBody, btnElements;

            tblBody = $("tblBody");
            btnElements = tblBody.getElementsByTagName("button");
            for (i = 0; i < btnElements.length; i += 1) {
                if (event.target.className === btnElements[i].className) {
                    index = i;
                }
            }
            removeEmployee(index);
        }
    });
});