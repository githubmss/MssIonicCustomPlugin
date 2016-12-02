var db;
 angular
		.module(
				'starter',
				[ 'ionic', 'ngCordova', 'starter.controllers',
						'starter.services' ])
	.run(
				function($ionicPlatform, $cordovaSQLite) {
					$ionicPlatform
							.ready(function() {
								if (window.cordova && window.cordova.plugins
										&& window.cordova.plugins.Keyboard) {
									cordova.plugins.Keyboard
											.hideKeyboardAccessoryBar(true);
									cordova.plugins.Keyboard
											.disableScroll(true);
								}
								if (window.StatusBar) {
									StatusBar.styleDefault();
								}
								if (window.cordova) {
									db = $cordovaSQLite.openDB("myapp.db");
								} else {
									db = window.openDatabase("myapp.db", "1.0",
											"My app", -1);
								}
								$cordovaSQLite
										.execute(db,
												"CREATE TABLE IF NOT EXISTS team (id integer primary key, name text)");

							});
				})
		.config(function($stateProvider, $urlRouterProvider) {
			$stateProvider.state('dash', {
				url : '/dash',
				templateUrl : 'templates/tab-dash.html',
				controller : 'DashCtrl'
			})
			.state('fulVideo', {
				url : '/fullVideo',
				cache : false,
				templateUrl : 'templates/fullScreenVideoPlayer.html',
				controller : 'fullVideoCtrl'
			})
			$urlRouterProvider.otherwise('/dash');
		});
