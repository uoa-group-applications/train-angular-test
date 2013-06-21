App.app.factory("todoService", function(utils) {

    var todoId = 0;

    var todoList = [
        { id: ++todoId, title: "This is my first todo" },
        { id: ++todoId, title: "This is the second todo"},
        { id: ++todoId, title: "This is the third todo"},
        { id: ++todoId, title: "This is the fourth todo"}
    ];

    return utils.instantiate({

        set : function(list) {
            todoList = list;
        },

        /**
         * Return a list of todos
         *
         * @param callback
         */
        list : function(callback) {
            callback(todoList);
        },



        /**
         * Add a todo to the task list
         *
         * @param task is the task item to add
         * @param callback is the callback to call
         */
        add : function(task, callback) {
            todoList.push({id: ++todoId, title: task});

            callback(todoList);
        },


        /**
         * Remove an item
         *
         * @param id is the id to remove
         * @param callback is the callback to call
         */
        remove : function(id, callback) {

            var list = [];
            _.each(todoList, function(task) {
                if (task.id !== id) {
                    list.push(task);
                }
            });

            todoList = list;

            callback(todoList);
        }

    });

});