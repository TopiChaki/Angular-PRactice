var app =angular.module('some',['ngRoute', 'ngMaterial', 'ngMessages', 'material.svgAssetsCache']);
app.config(function($routeProvider) {
		$routeProvider

			
			.when('/', {
				templateUrl : 'pages/home.html',
				controller  : 'mainController'
			})

			
			.when('/admission', {
				templateUrl : 'pages/admission.html',
				controller  : 'admissionController'
			})

			
			.when('/feedback', {
				templateUrl : 'pages/feedback.html',
				controller  : 'feedbackController'
			})
			
			.when('/show',{
				templateUrl : 'pages/show.html',
				controller : 'showController'
			});
			
	});
app.controller('mainController',function($scope,$rootScope,Page){
		$scope.message = 'Hello there';
			   $rootScope.show_show=0;
		
		Page.setTitle('Home page');
		$scope.Page = Page;
		$scope.list=[
		{
			name: 'khushali',
			roll_no: '13bce124'
		},
		{
			name:'Radhika',
			roll_no: '13bce088'
		},
		{
			name: 'Katha',
			roll_no: '13bce077'
		},
		{
			name: 'Shivangi',
			roll_no: '13bce112'
		},
		];
		$scope.list1=['a',['b',['c',['d','e']]]];
		//_.pull($scope.list1,'a');
		$scope.list2=_.filter($scope.list,function(o) { return !o.roll_no; });
		$scope.list3=_.flattenDepth($scope.list1,2);
		for(var i=0;i<$scope.list3.length;i++){
			console.log('HELLO',$scope.list3[i]);
		}
});
app.controller('admissionController',['$scope','$location','pass_values','$rootScope','Page','valids',
    function ($scope,$location,pass_values,$rootScope,Page,valids) {         
        $rootScope.detail = {};   			
        $scope.send = function(isValid){
          $scope.detail = {name:$scope.name, 
							father_name:$scope.father_name, 
							mother_name:$scope.mother_name, 
							dob:$scope.dob, 
							gender:$scope.gender, 
							per_addr:$scope.per_addr, 
							category:$scope.category,
							s_i_n:$scope.s_institute_name,
							s_board:$scope.s_board,
							s_pass_year:$scope.s_passing_year,
							s_percentage:$scope.s_percentage,
							h_i_n:$scope.h_institute_name,
							h_board:$scope.h_board,
							h_pass_year:$scope.h_passing_year,
							h_percentage:$scope.h_percentage,
							degree_prgm:$scope.programme
							};
			pass_values.setProperty($scope.detail);
			if(isValid){
			$location.path('/show');
			}
         };
		 
		this.myDate = new Date();
  this.isOpen = false;
		$scope.message = 'New Admission';
		Page.setTitle('Admission page');
		//$rootScope.valid = 1;
		//$rootScope.name = $scope.name;
    }
	
]);
app.controller('feedbackController',function($scope,$rootScope,Page){
		$scope.message = 'Your feedback is valuable for us!';
		Page.setTitle('Feedback page');
});

app.controller('showController',['$scope','pass_values', '$rootScope','Page','valids',function($scope, pass_values, $rootScope, Page,valids) {
       Page.setTitle('Show page');
	   $rootScope.show_show=0;
	   $scope.detail = pass_values.getProperty();
	  console.log("value=" + valids.get_val()+$rootScope.detail.name);
		
}
]);

app.factory('Page', function(){
  var title = 'Home page';
  return {
    title: function() { return title; },
    setTitle: function(newTitle) { title = newTitle; }
  };
});
app.factory('valids', function(){
  var val = '0';
  return {
    get_val: function() { return val; },
    set_val: function(data) { val = data; }
  };
});
app.factory('pass_values', function ($rootScope) {
       
		var service = {};
		service.data = {};
		service.setProperty = function(data) {
                 this.data = data;
				$rootScope.$broadcast('pass_values');
        };
		service.getProperty = function () {
                return this.data;
        };
        return service;            
});
//app.value('$rootScope', { value: 'true' });
app.directive('vname',['pass_values','valids', function(pass_values,valids){
	return{
		restrict: 'E',
		replace: true,
		//template: '<div></div>',	

		link: function ($scope,$rootScope) {
			/* $scope.detail = pass_values.getProperty();
				  			console.log("value=" + $rootScope.valid+$scope.name);
			pass_values.setProperty($rootScope.detail);
					 var nameRegex = /^([a-zA-Z])+$/;
					 $scope.chk=0;
					 //nameRegex.test($scope.name) && 
			if ($scope.detail.name.length < 5) {
								$scope.chk=1;
				 	  			console.log("value=" + $rootScope.valid);
										 valids.set_val('2');
										 $scope.myForm.name.$invalid = 'true';
			} else {
				$scope.myForm.name.$invalid = 'false';
				valids.set_val('1');
			}
	  			console.log("value=" + valids.get_val());
			*/
		  // $scope.detail = pass_values.getProperty();
		   $scope.changecnt = 0;
			$scope.$watch('detail.name', function(newValue,oldValue,scope){
				var nameRegex = /^[a-zA-Z]+$/;
					// $scope.chk=0;
					//nameRegex.test($scope.detail.name) && 
				console.log('changed'+$scope.changecnt);
				$scope.changecnt++;
				valids.set_val('0');
							$scope.vall = valids.get_val();

				if (!nameRegex.test(newValue)){valids.set_val('1');}
				if(newValue.length > 20) {
							
										 valids.set_val('2');
							 			
				}
				
			
			$scope.vall = valids.get_val();
			},true);
    }
		
	}
	
}]);


      


