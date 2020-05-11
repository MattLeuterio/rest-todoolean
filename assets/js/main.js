console.log('ok');
console.log('jQuery ->', $);

/**
 * 
 *  TODOOLEAN
 * 
 */


$(document).ready( function() {
    
    /*
    *  SETUP
    */

    //refs
    var input = $('#input');
    var newTodoBtn = $('.new-todo_btn');
    var todoList = $('.todo-list');


    //Api
    var apiTodo = "http://157.230.17.132:3010/todos"

 
    // Init Handlebars
    var source = $('#todo-template').html();
    var template = Handlebars.compile(source);


    /*
    *  ACTIONS 
    */

    // print todo al caricamento della pagina
    printTodos(apiTodo, template, todoList);

    // Aggiungi todo con bottone "Add"
    newTodoBtn.click( function() {

        addTodo(input, apiTodo, template, todoList);
        
    });

    // Aggiungi todo con tasto "INVIO"
    input.keypress(function(event) {

        if(event.which == 13) {

            addTodo(input, apiTodo, template, todoList);

        };

    
});

    // Rimuovi todo
    $(document).on("click", ".delete", function() {

        deleteTodo($(this), apiTodo, template, todoList)

    });



});

//FUNCTIONS

function deleteTodo(thisId, apiTodo, template, todoList) {
    var idTodo = thisId.data('id');
        console.log(idTodo);

        $.ajax({
            url: apiTodo + "/" + idTodo,
            method: 'DELETE',
            success: function() {
                
                printTodos(apiTodo, template, todoList)
                
                },
                error: function() {
                    console.log('Errore chiamata'); 
                }
        }); 
}

function addTodo(input, apiTodo, template, todoList) {
    newTodo = input.val().trim()

        if(newTodo != ''){
            input.attr('placeholder', "Nuovo todo");
            $.ajax({
                url: apiTodo,
                method: 'POST',
                data: {
                    "text": newTodo
                },
                success: function(data) {
                    
                    printTodos(apiTodo, template, todoList)
                    input.val('').focus()
                    },
                    error: function() {
                        console.log('Errore chiamata'); 
                    }
            }); 
        } else {
            input.attr('placeholder', "Inserire un testo");
        }
};

function printTodos(apiTodo, template, todoList) {

    // reset

    todoList.html('')

    // chiamata api con query in input
    $.ajax({
        url: apiTodo,
        method: 'GET',
        success: function(data) {
            var todos = data;

            for(var i = 0; i < todos.length; i++ ) {
                var todo = data[i];
                
                // imposto dati template
                var context = {
                    todo: todo.text,
                    id: todo.id
                }                      
                
                //compilare e aggiungere template
                var html = template(context);
                todoList.append(html);
            
            }
            },
            error: function() {
                console.log('Errore chiamata'); 
            }
    }); 
}




