function addItems(event) {
    event.preventDefault();
    let text = document.getElementById('todo-input');
    console.log(text.value);   
    db.collection("todo-items").add({
        text: text.value,
        status: "active"
    });

    text.value= "";
}

function getItems() {
    db.collection("todo-items").onSnapshot(snapshot => {
        console.log(snapshot);
        let items = [];
        snapshot.docs.forEach(doc => {
           items.push({
               id: doc.id,
               ...doc.data()
           })
        });
        generateItems(items);
    }) 
}

function generateItems(items) {
    itemsHtml= "";
    items.forEach((item) => {
        // console.log(item);
        itemsHtml += `
        <div class="todo-item">
        <div class="check-todo">
          <div data-id="${item.id}" class="check-marker ${item.status == "completed" ?
           "checked": ""}">
            <img src="images/icon-check.svg" alt="">
          </div>
        </div>
        <div class="todo-text ${item.status == "completed" ?
        "checked": ""}">
          ${item.text}
        </div>
      </div>
        `
    });
    document.querySelector(".todo-items").innerHTML = itemsHtml;
    createEventListener();
}

function createEventListener() {
    let todoCheckMarks = document.querySelectorAll(".todo-items .check-marker");
    todoCheckMarks.forEach(checkmark => {
        checkmark.addEventListener("click", function() {
            markCompleted(checkmark.dataset.id);
        }) 
    })
}

function markCompleted(id) {
    let item = db.collection("todo-items").doc(id);
    item.get().then(function(doc) {
        if(doc.exists) {
           let status = doc.data().status;
           if(status == "active") {
               item.update({
                   status: "completed"
               });
           } else if(status == "completed") {
               item.update({
                   status: "active"
               });
           }
        };
    })
}

getItems();