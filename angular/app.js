var myApp = angular.module('LexStart', ['ngRoute']);
var filePath = 'json/task.json';
var taskData = [];

//Declaration of TaskDetailsController
myApp.controller('TaskDetailsController', ['$http', function($http,$routeParams){
	var main = this;
	main.tasks = [];

	main.loadTaskDetails = function(){
		$http({
			method : 'GET',
			url : filePath
		}).then(function successCallback(response){
				taskData = response.data.tasks;
				main.tasks = response.data.tasks;
			}, function errorCallback(response){
				alert("Error occurred");
				console.log(response);
			});
	};

}]); // end TaskDetailsController

//Declaration of SingleTaskController
myApp.controller('SingleTaskController', ['$http', '$routeParams', function($http,$routeParams){
	var main = this;
	main.taskId = $routeParams.taskId;
	main.singleTask = {};

	main.loadSingleTask = function(){
		$http({
			method : 'GET',
			url : filePath
		}).then(function successCallback(response){
			taskData.map(function(item) {
				if(item.id==main.taskId){
					main.singleTask = item;
				}
			})
		}, function errorCallback(response){
			alert("Error occurred");
			console.log(response);
		})
	};

}]);// end SingleTaskController

//Declaration of CreateTaskController
myApp.controller('CreateTaskController', ['$http', function($http){
	var main = this;
	var actions = [];
	var objTemp = {};
	var docs = [];
	var objTempDocs = {}

	main.txtCallChanged = function(){
		if(main.callAction == "Call"){
			objTemp  = {
				id: 1,
            	operation: main.callAction,
            	url: main.contact,
            	created_at: new Date(),
            	updated_at: new Date(),
            	legalActionTypeId: 1
			}

			actions.push(objTemp);
			objTemp = {};
		}
	}

	main.txtCommentChanged = function(){
		if(main.commentAction == "Comment"){
			objTemp  = {
				id: 2,
            	operation: main.commentAction,
            	url: main.comments,
            	created_at: new Date(),
            	updated_at: new Date(),
            	legalActionTypeId: 1
			}

			actions.push(objTemp);
			objTemp = {};
		}
	}

	main.txtEmailChanged = function(){
		if(main.emailAction == "Email"){
			objTemp  = {
				id: 3,
            	operation: main.emailAction,
            	url: main.email,
            	created_at: new Date(),
            	updated_at: new Date(),
            	legalActionTypeId: 1
			}

			actions.push(objTemp);
			objTemp = {};
		}
	}

	main.docsSelected = function(){
		if(main.uploadAction == "Upload"){
			var fi = document.getElementById('fileSelected');
			if (fi.files.length > 0) {
				for (var i = 0; i <= fi.files.length - 1; i++) {
	                var fname = fi.files.item(i).name;
	                var fpath = fi.value;
	                var ftype = fi.files.item(i).type;
	                objTempDocs = {
	                	id: 1,
						name: fname,
						type: ftype,
						url: fpath,
						flag: null,
						tag: null,
						doc_executed_date: new Date(),
						doc_expiry_date: null,
						comments: null,
						created_at: new Date(),
						updated_at: new Date(),
						doc__class_id: 6,
						organization_id: 1
	                }
	                docs.push(objTempDocs);
	                objTempDocs = {};
	            }
			}
		}
	}
	
	main.createTask = function(){
		main.docsSelected();

		var taskData = {
		id : 1,
		org_id: 1,
      	status: 1,
      	action_date: null,
      	created_at: 1,
      	updated_at: 1,
      	legal__action__type_id: 1,
      	previous_id: null,
      	Legal_Action_Type : {
      							id: 1,
      							legal_action: main.taskText,
        						template: main.taskDesc,
        						historical : false,
        						createdAt : main.taskDate,
        						updatedAt : main.taskDate,
        						Action_Type_Operation : actions
      	},
      	Documents : docs,
      	Action_Attribute : {
      		id: 1,
	        value: main.empName,
	        created_at: new Date(),
	        updated_at: new Date(),
	        attribute_id: 4,
	        legal__action_id: 1
      	}
		}

		console.log(taskData);
		$http({
	        method: 'POST',
	        data  : taskData,
	        url: filePath
	    }).then(function successCallback(response) {
	        	alert("Task created successfully");
	        }, function errorCallback(response) {
		        	alert("Error occurred");
		        	console.log(response);
	        });
	}
}]);// end CreateTaskController