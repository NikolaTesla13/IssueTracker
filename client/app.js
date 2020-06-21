function create(event) {
    event.preventDefault();

    var title = document.getElementById("title").value;
    var text = document.getElementById("text").value;
    var author = document.getElementById("author").value;
    var asignedTo = document.getElementById("asignedTo").value;
    var status = document.getElementById("status").value;
    var newIssue = {
        title: title,
        text: text,
        author: author,
        asignedTo: asignedTo,
        status: status
    }

    fetch('http://localhost:3000/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: title,
            text: text,
            author: author,
            asignedTo: asignedTo,
            status: status
        }),
    })
    console.log(newIssue);
}

function update(event, id) {
    document.querySelector("form").sumbit = false;
    event.preventDefault();
    var title = document.getElementById(`${id}-title`).value;
    var text = document.getElementById(`${id}-text`).value;
    var author = document.getElementById(`${id}-author`).value;
    var asignedTo = document.getElementById(`${id}-asignedTo`).value;
    var status = document.getElementById(`${id}-status`).value;

    fetch(`http://localhost:3000/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: title,
            text: text,
            author: author,
            asignedTo: asignedTo,
            status: status
        }),
    })
}

function deletefun(id) {
    fetch(`http://localhost:3000/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    })
}

var content = document.getElementById('view');
var insert = "";
fetch('http://localhost:3000/').then(res=>res.json()).then(data=>{
    for(i=0;i<data.length;i++) {
        insert += `<div>
            <form> 
                <input type="text" id="${data[i]._id}-title" value="${data[i].title}">
                <br>
                <input type="text" id="${data[i]._id}-text" value="${data[i].text}">
                <br>
                <input type="text" id="${data[i]._id}-author" value="${data[i].author}">
                <br>
                <input type="text" id="${data[i]._id}-asignedTo" value="${data[i].asignedTo}">
                <br>
                <input type="text" id="${data[i]._id}-status" value="${data[i].status}">
                <br>
                <input type="button" onclick="return update(event, '${data[i]._id}');" value="Submit">
            </form>
            <button onclick="deletefun('${data[i]._id}')">Delete</button>
        </div>`
    }
    content.innerHTML = insert;
})