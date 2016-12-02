var db;
angular
		.module('starter.controllers', [ 'starter.services' ])
		.controller(
				'DashCtrl',
				function($rootScope, $state, $scope, StaticDataService,
						$cordovaCamera, $cordovaFile, $cordovaCapture,
						$cordovaSQLite, Team) {
					$scope.itemDetails = {};
					$scope.categoryDetails = {};
					$scope.images = [];
					$scope.data = {};
					$scope.team = [];
					$scope.team = null;
					$scope.updateTeam = function() {
						Team.all().then(function(team) {
							$scope.team = team;
						});
					}
					$scope.updateTeam();
					$scope.createNewTeamMember = function(member) {
						Team.add(member);
						$scope.updateTeam();
					};
					$scope.removeMember = function(member) {
						Team.remove(member);
						$scope.updateTeam();
					};
					$scope.editMember = function(origMember, editMember) {
						Team.update(origMember, editMember);
						$scope.updateTeam();
					};
					$scope.playVideo = function(data) {
						var videoUrl ="/storage/sdcard0/DCIM/demo.mp4"
							  var options = {
							    successCallback: function(response) {
							    	alert("Image Successfully Saved Into Video_images Folder");
							      console.log("Video was closed without error.");
							    },
							    errorCallback: function(errMsg) {
							      console.log("Error! " + errMsg);
							    }
							  };
							  window.plugins.streamingMedia.playVideo(data, options);
					}
					$scope.load1 = function() {
						$cordovaSQLite
								.execute(db,
										'SELECT * FROM Messages ORDER BY id DESC')
								.then(
										function(res) {
											if (res.rows.length > 0) {
												var len = res.rows.length;
												for ( var i = 0; i < len; i++) {
													try {
														$scope.images
																.push(res.rows
																		.item(i));

													} catch (err) {
														alert(err.message);
													}

												}

											}

										},
										function(error) {
											$scope.statusMessage = "Error on loading: "
													+ error.message;
										});

					}
					$scope.StartVideo = function() {
						var options = {
							limit : 1,
						};
						$cordovaCapture
								.captureVideo(options)
								.then(
										function(mediaFiles) {
											$scope.videoURL = mediaFiles[0].fullPath;

											$scope
													.createNewTeamMember(mediaFiles[0].fullPath);

										}, function(err) {
											// error
										});
					}
					$scope.save = function(newMessage) {
						$cordovaSQLite
								.execute(
										db,
										'INSERT INTO Messages (message) VALUES (?)',
										[ newMessage ])
								.then(
										function(result) {
											$scope.statusMessage = "Message saved successful, cheers!";
										},
										function(error) {
											$scope.statusMessage = "Error on saving: "
													+ error.message;
										})

					}
					$scope.load = function() {
						$cordovaSQLite
								.execute(db,
										'SELECT * FROM Messages ORDER BY id DESC')
								.then(
										function(res) {
											if (res.rows.length > 0) {
												var len = res.rows.length;

												for ( var i = 0; i < len; i++) {
													try {


													} catch (err) {
														alert(err.message);
													}
												}
												$scope.newMessage = res.rows
														.item(0).message;
												$scope.statusMessage = "Message loaded successful, cheers!";
											}
										},
										function(error) {
											$scope.statusMessage = "Error on loading: "
													+ error.message;
										});
					}

					$scope.StartVideoGallery = function() {
					var options = {
							quality : 50,
							destinationType : Camera.DestinationType.FILE_URI,
							sourceType : type = Camera.PictureSourceType.PHOTOLIBRARY,
							mediaType : Camera.MediaType.VIDEO
						};
						navigator.camera.getPicture(getVideoSuccess,
								videoCaptureError, options);
					}
					function getVideoSuccess(fileURI) {
						window.resolveLocalFileSystemURL(fileURI, function(
								entry) {
							var nativePath = entry.toURL();
							$scope.createNewTeamMember(nativePath);
						});
					}

					function videoCaptureError(error) {
						alert('videoCaptureError, error: ' + error);
					}

					$scope.getVideo = function() {
						var options = {
							quality : 50,
							destinationType : Camera.DestinationType.FILE_URI,
							sourceType : Camera.PictureSourceType.PHOTOLIBRARY,
							mediaType : Camera.MediaType.VIDEO
						};
					}
				})

		.controller(
				'fullVideoCtrl',
				function($scope, StaticDataService) {
					$scope.snap = function() {
						var videoUrl ="/storage/sdcard0/DCIM/demo.mp4"
							  var options = {
							    successCallback: function() {
							      console.log("Video was closed without error.");
							    },
							    errorCallback: function(errMsg) {
							      console.log("Error! " + errMsg);
							    }
							  };
							  window.plugins.streamingMedia.playVideo(videoUrl, options);

					}

				});
