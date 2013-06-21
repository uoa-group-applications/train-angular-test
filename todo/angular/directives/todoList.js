App.app.directive("appTodoList", function(utils, todoService) {

    return {

        scope: {

        },

        /**
         * Bind template
         */
        link : function(scope, element, attrs) {
            utils.replaceWithTemplate(scope, element, "angular/views/_list.html");
        },

        /**
         * Controller behavior
         */
        controller : function($scope) {

            _.extend($scope, {

                /**
                 * Items in list
                 */
                items: null,

                /**
                 * New task name
                 */
                task : "",


                /**
                 * Remove from the list
                 */
                remove : function(id) {
                    todoService.remove(id, function(results) {
                        $scope.items = results;
                    });
                },


                /**
                 * Submit was pressed
                 */
                submitPressed : function() {
                    todoService.add($scope.task, function(results) {
                        // reset label
                        $scope.task = "";

                        // set new items
                        $scope.items = results;
                    })
                }

            });


            todoService.list(function(results) {
                $scope.items = results;
            })
        }
    };

});