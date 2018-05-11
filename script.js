(function(angular){
		angular.module('myApp',['ngComponentRouter'])
		  .value('$routerRootComponent','app')
			.component('app',{
				template:'<ng-outlet></ng-outlet>',
				$routeConfig:[
						{ path:'/registration', name:'Registration', component:'registration' },
						{ path:'/account', name:'Account', component:'account', useAsDefault:true}
					]
			})
			.component('registration',{
				template:' {{$ctrl.firstMsg}} <br /> <a href="" ng-click="$ctrl.goToAccount()"> Go To Account </a>',
				controller:function(){
				  this.firstMsg = "This is registration component"; 
				  this.goToAccount = function(){
				      this.$router.navigate(['/Account'])
				  }
				},
				bindings:{
				  '$router':'='
				}
			})
			.component('account',{
				template:`This is account component
							<br />
							<a href="" ng-click="$ctrl.goToRegistration()">
								Go to registration
							</a>
							<br />
							<br />
							<label>Start Date</label>
							<input type="text" datepicker ng-model="$ctrl.inputs.start"/>
							<br />
							<label>End Date</label>
							<input type="text" datepicker ng-model="$ctrl.inputs.end"/>
							<br />
							<button name="Submit" ng-click="$ctrl.submit()">Submit</button>
							<br />
							<br />
							<p ng-if="$ctrl.dateMsg">{{$ctrl.dateMsg}}</p>
							`,
				controller:function(){
					this.inputs = {}
					this.goToRegistration = function(){
					 	this.$router.navigate(['/Registration']);
					}
					this.dateMsg = '';
					this.submit = function(){
						console.log(`Input fields values ${JSON.stringify(this.inputs)}`)
						this.dateMsg = 'Start from '+this.inputs.start+' to end '+this.inputs.end;
					}
				},
				bindings:{
					'$router':'<'
				}
			}).directive('datepicker', function(){
				return function($scope, elem, attr){
					elem.ready(function(){
						elem.datepicker();
					})
				}
			})
		
	}(angular));