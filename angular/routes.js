myApp.config(['$routeProvider', function($routeProvider){
	$routeProvider
		.when('/',{
			templateUrl : 'views/task-details-view.html',
			controller : 'TaskDetailsController',
			controllerAs : 'taskDetailsCtrl'
		})

		.when('/:taskId',{
			templateUrl : 'views/single-task-view.html',
			controller : 'SingleTaskController',
			controllerAs : 'singleTaskCtrl'
		})

		.otherwise(
            {
                template   : '<h1>404 page not found</h1>'
            }
        )
}]);