angular.module('openmrs.controllers', ['openmrs.services', 'ngCordova'])

.controller('AppCtrl', function($scope, $state, $translate, $rootScope, AuthService, TranslationService) {

  $scope.curlang = $translate.use();

  $scope.getUsername = function() {
    return AuthService.getUsername();
  }

  $scope.getHost = function() {
    return AuthService.getHost();
  }

  $scope.goHome = function() {
    $state.go('app.dashboard');
  }

  $scope.switchLanguage = function(lang) {
    TranslationService.setLang(lang);
  }

})

.controller('LoginCtrl', function($scope, $state, $translate, $ionicPopup, ApiService, AuthService, TranslationService) {

  $scope.login = function(host, username, password) {
    
    if(!host) {
      host = 'http://tims.dedicated.co.za:8080/timslocal/'
    }
    var prefix = 'http://';
    if (host.substr(0, prefix.length) !== prefix) {
      host = prefix + host;
    }

    $scope.loading = true;
    if(AuthService.isLoggedIn()) {
      $ionicPopup.alert({
        title: TranslationService.login_error_title + ' ' + host,
        template: TranslationService.login_error_session
      });
      $scope.loading = false;
    }

    ApiService.isHostValid(host, function(passed) {
      if(!passed) {
        $ionicPopup.alert({
          title: TranslationService.login_error_title + ' ' + host,
          template: TranslationService.login_error_host
        });
      }
      $scope.loading = false;
    });

    if(username && password) {
      ApiService.authenticate(host, username, password, function(result) {
        if(result.authenticated) {
          console.log("Login result = " +result.toString());
          AuthService.setUsername(username);
          AuthService.setHost(host);
          AuthService.setSession(result.sessionId);
          AuthService.setPassword(password);
          $state.transitionTo('app.dashboard');
        } else {
          $ionicPopup.alert({
            title:  TranslationService.login_error_title + ' ' + host,
            template: TranslationService.login_error_userpass
          });
        }
        $scope.loading = false;
      });
    } else {
      $scope.loading = false;
    }

  }

  $scope.logout = function() {
    var logout = $ionicPopup.confirm({
     title: TranslationService.logout_confirm_title,
     template: TranslationService.logout_confirm_message,
     cancelText: TranslationService.logout_confirm_cancel
    });
    
    logout.then(function(result) {
      if(result) {
        AuthService.logout();
        $state.transitionTo('login');
      }
    });
  }
})

.controller('ResultsCtrl', function($scope, $state, $translate, ApiService, $cordovaBarcodeScanner) {
  // Should work without initializing.. for some reason it doesn't.
  $scope.searchpatients = [];
  $scope.searchpatients.query = '';

  $scope.scan = function() {
        $cordovaBarcodeScanner.scan().then(function(imageData) {
            
              $scope.searchpatients.query = imageData.text;  
              $scope.$digest();
        }, function(error) {
            console.log("An error happened -> " + error);
        });
    };


  $scope.searchpatients.searching = true;
  ApiService.getLastViewedPatients(function(res) {
    $scope.searchpatients.searching = false;
    $scope.searchpatients.patientList = res;
    $scope.$apply();
  });

  var search = function(res) {
    $scope.searchpatients.patientList = res;
    $scope.searchpatients.searching = false;
    $scope.$apply();
  }

  $scope.$watch('searchpatients.query', function(nVal, oVal) {
    if (nVal !== oVal) {
      $scope.searchpatients.searching = true;
      if(!$scope.searchpatients.query) {
        ApiService.getLastViewedPatients(search);
      } else {
        ApiService.getPatients($scope.searchpatients.query, search);
      }
    }
  });
})

.controller('CollectionCtrl', function($scope, $state, $translate, ApiService, $cordovaBarcodeScanner) {
  // Should work without initializing.. for some reason it doesn't.

  $scope.searchpatients = [];
  $scope.searchpatients.query = '';

  $scope.scan = function() {
        $cordovaBarcodeScanner.scan().then(function(imageData) {
            
              $scope.searchpatients.query = imageData.text;  
              $scope.$digest();
        }, function(error) {
            console.log("An error happened -> " + error);
        });
    };

  $scope.searchpatients.searching = true;
  ApiService.getLastViewedPatients(function(res) {
    $scope.searchpatients.searching = false;
    $scope.searchpatients.patientList = res;
    $scope.$apply();
  });

  var search = function(res) {
    $scope.searchpatients.patientList = res;
    $scope.searchpatients.searching = false;
    $scope.$apply();
  }

  $scope.$watch('searchpatients.query', function(nVal, oVal) {
    if (nVal !== oVal) {
      $scope.searchpatients.searching = true;
      if(!$scope.searchpatients.query) {
        ApiService.getLastViewedPatients(search);
      } else {
        ApiService.getPatients($scope.searchpatients.query, search);
      }
    }
  });
})

.controller('PatientCtrl', function($scope, $stateParams, $translate, ApiService) {
  $scope.patient = [];

  $scope.loading = true;
  ApiService.getPatient($stateParams.uuid, function(res) {
    $scope.patient = res;
    $scope.loading = false;
    $scope.$apply();
  });
})



.controller('NewPatientCtrl', function($scope, $stateParams, $translate, $rootScope, $cordovaGeolocation, $cordovaBarcodeScanner,$cordovaToast, $ionicScrollDelegate, $cordovaDatePicker, AuthService, ApiService) {

  $scope.setSuspect = function(){
    if($scope.newpatient.cough === $scope.yes || $scope.newpatient.hemoptysis === $scope.yes || $scope.newpatient.fever === $scope.yes ||
   $scope.newpatient.night_sweats === $scope.yes || $scope.newpatient.weight_loss === $scope.yes || $scope.newpatient.fatigue === $scope.yes ||
    $scope.newpatient.appetite_loss === $scope.yes || $scope.newpatient.chest_pain  === $scope.yes
    ){
        $scope.newpatient.suspect = true;
    }else{
        $scope.newpatient.suspect = false;
    }
  };

  $scope.scrollResize = function() {
    $ionicScrollDelegate.$getByHandle('mainScroll').resize();
  };

  $scope.newpatient = {
    suspect:false,
    Hiv_status_disclose: $rootScope.no,
    last_hiv_result: $rootScope.Negative,
    arv_status: $rootScope.no,
    tb_treatment_past_duration: 0,
    phone2_owner: 'patient',
    phone1_owner: 'patient',
    miner: $rootScope.no,
    exminer: $rootScope.no,
    family_miner: $rootScope.no,
    family_exminer: $rootScope.no,
    mbe: $rootScope.no,
    patientid: 'ID'+new Date().getTime()
  };

  $scope.patientid = '';
  $scope.address = {
    address1: '',
    address2: '',
    longitude: '',
    latitude: ''
  };
  $scope.contacts = {
    
  };
  $scope.names = {
    givenName:'',
    familyName : '',};


  $scope.person = {
    age: '',
    birthdate:'',
    gender:'',

    addresses:[$scope.address],
    names:[$scope.names], 
    attributes:''
  };

  

  $scope.observations = {};

  $scope.ui = {
    phone1myself:true,
    phone2myself:true,
    patientid:''
  };

  $scope.$watch('person.birthdate', function(nVal, oVal) {
    if (nVal !== oVal) {
      var ageDifMs = Date.now() - $scope.person.birthdate.getTime();
      var ageDate = new Date(ageDifMs); // miliseconds from epoch
      $scope.person.age = Math.abs(ageDate.getUTCFullYear() - 1970);
    }
  });

  $scope.userdobval = function () {


    var options = {
        date: new Date(),
        mode: 'date',
        allowOldDates: true,
        allowFutureDates: false
    };
    $cordovaDatePicker.show(options).then(function(date){
        $scope.person.birthdate = date;
        var ageDifMs = Date.now() - $scope.attributes.birthdate.getTime();
        var ageDate = new Date(ageDifMs); // miliseconds from epoch
        $scope.attributes.age = Math.abs(ageDate.getUTCFullYear() - 1970);

        alert("Calculated Age " + Math.abs(ageDate.getUTCFullYear() - 1970)); 
        $scope.$digest();
    });
};

  $scope.yes = $rootScope.yes;
  $scope.no = $rootScope.no;
  $scope.unknown = $rootScope.unknown;
  $scope.Negative = $rootScope.Negative;
  $scope.Positive = $rootScope.Positive;
  $scope.loading = false;
  $scope.submitloading = false;

  
  var posOptions = {timeout: 10000, enableHighAccuracy: false};
   $cordovaGeolocation
   .getCurrentPosition(posOptions)
  
   .then(function (position) {
      $scope.address.latitude  = position.coords.latitude;
      $scope.address.longitude = position.coords.longitude;
      console.log(position.coords.latitude + '   ' + position.coords.longitude);
      alert(position.coords.latitude + '   ' + position.coords.longitude);
      $scope.$digest();
   }, function(err) {
      console.log(err);
   });

  $scope.submit = function(){
    alert('GPS LOCATION _________ '+$scope.address.latitude + ' : '+$scope.address.longitude);
    $scope.submitloading = true;
    console.log("Phone number 2 : "+$scope.newpatient.phone2number);
    $scope.person.attributes = [{
      attributeType:$rootScope.phone1, value:$scope.newpatient.phone1number
    },{
      attributeType:$rootScope.phone2, value:$scope.newpatient.phone2number
    },{
      attributeType:$rootScope.telephone1owner, value:$scope.newpatient.phone1_owner
    },{
      attributeType:$rootScope.telephone2owner, value:$scope.newpatient.phone2_owner
    },{
      attributeType:$rootScope.govtid, value:$scope.newpatient.govt_id
    }];
    $scope.patient = {
    identifiers:[{identifierType:$rootScope.identifierType1,identifier:$scope.newpatient.patientid,location:$rootScope.zingcuka}],
    person: $scope.person
  };
    console.log("Patient JSON : "+angular.toJson($scope.patient));
    
    ApiService.createPatient(angular.toJson($scope.patient), function(res) {
        //start createpatient
        console.log("Response : "+res);
      $scope.patientResult = res;
      console.log("Response uuid : "+$scope.patientResult.uuid);
      $scope.observations.patient = $scope.patientResult.uuid;

      $scope.loading = false;
                
              var patient = angular.toJson($scope.patient);
              var encounter = angular.toJson($scope.observations);
              console.log("Encounter Object : "+encounter);
              $scope.obs = [
                { concept: $rootScope.miner           , value: $scope.newpatient.miner },
                { concept: $rootScope.exminer         , value: $scope.newpatient.exminer },
                { concept: $rootScope.family_miner    , value: $scope.newpatient.family_miner },
                { concept: $rootScope.family_exminer  , value: $scope.newpatient.family_exminer },
                { concept: $rootScope.open_pit         , value: $scope.newpatient.openpit },
                { concept: $rootScope.underground     , value: $scope.newpatient.underground },
                { concept: $rootScope.artisinal       , value: $scope.newpatient.artisinal },
                { concept: $rootScope.gold           , value: $scope.newpatient.gold },
                { concept: $rootScope.coal           , value: $scope.newpatient.coal },
                { concept: $rootScope.diamond           , value: $scope.newpatient.diamond },
                { concept: $rootScope.sandstone           , value: $scope.newpatient.sandstone },
                { concept: $rootScope.copper           , value: $scope.newpatient.copper },
                { concept: $rootScope.platinum           , value: $scope.newpatient.platinum },
                { concept: $rootScope.magnessium           , value: $scope.newpatient.magnessium },
                { concept: $rootScope.iron_ore           , value: $scope.newpatient.ironore },
                { concept: $rootScope.uranium           , value: $scope.newpatient.uranium },
                { concept: $rootScope.mining_years           , value: $scope.newpatient.mining_years },
                { concept: $rootScope.mbe                     , value: $scope.newpatient.mbe },
                { concept: $rootScope.cough                       , value: $scope.newpatient.cough },
                { concept: $rootScope.hemoptysis               , value: $scope.newpatient.hemoptysis },
                { concept: $rootScope.fever                       , value: $scope.newpatient.fever },
                { concept: $rootScope.night_sweats                , value: $scope.newpatient.night_sweats },
                { concept: $rootScope.weight_loss                 , value: $scope.newpatient.weight_loss },
                { concept: $rootScope.fatigue                     , value: $scope.newpatient.fatigue },
                { concept: $rootScope.appetite_loss               , value: $scope.newpatient.appetite_loss },
                { concept: $rootScope.chest_pain                  , value: $scope.newpatient.chest_pain },
                { concept: $rootScope.contact_with_tb             , value: $scope.newpatient.contact_with_tb },
                { concept: $rootScope.tb_treatment_past           , value: $scope.newpatient.tb_treatment_past },
                { concept: $rootScope.tb_treatment_past_duration  , value: $scope.newpatient.tb_treatment_past_duration },
                { concept: $rootScope.diabetes                    , value: $scope.newpatient.diabetes },
                { concept: $rootScope.tobacco                     , value: $scope.newpatient.tobacco },
                { concept: $rootScope.hiv_test_before             , value: $scope.newpatient.hiv_test_before },
                { concept: $rootScope.Hiv_status_disclose         , value: $scope.newpatient.Hiv_status_disclose },
                { concept: $rootScope.last_hiv_result             , value: $scope.newpatient.last_hiv_result },
                { concept: $rootScope.arv_status                  , value: $scope.newpatient.arv_status },
                { concept: $rootScope.do_hiv_test                 , value: $scope.newpatient.do_hiv_test },
                { concept: $rootScope.suspect                     , value: $scope.newpatient.suspect }
              ];
              
              $scope.observations = {
              patient: $scope.patientResult.uuid,//96cc3fd6-2fea-4e39-bcfb-e48a388f8a8a', // note that you need to post UUIDs here: RESTWS-459
              encounterType: $rootScope.screening_encounter_uuid,
              location: $rootScope.location,
              obs: $scope.obs
            };

            ApiService.createEncounter(angular.toJson($scope.observations), function(res){
                console.log("Response for encounter creation : "+res);
              });
        //end of create patient
        $scope.submitloading = false;
        $scope.$apply();
        
    });

    $scope.patientuuid = '';
    $scope.name = {};
    $scope.attributes = {};
    $scope.patientResult = {};
    $scope.ui = {
    phone1myself:true,
    phone2myself:true
  };

};
  $scope.scan = function() {
        $cordovaBarcodeScanner.scan().then(function(imageData) {
            
              $scope.newpatient.patientid = imageData.text;  
              $scope.$digest();
        }, function(error) {
            console.log("An error happened -> " + error);
        });
    };

})

.controller('ActiveVisitsCtrl', function($scope) {
  $scope.visits = [];
})

.controller('DashboardCtrl', function($scope, $rootScope, $translate) {

  $scope.districts = [
  {"name":"Xia-Xia", "value":"mhlontlo"},
  {"name":"Guija", "value":"nyandeni"}
  ];

  $scope.facilities = [];

  $scope.mystuff = {district : '',location:''};



  $scope.nyandeni = [
  {"name":"Libode", "value": "baf7098f-5a6a-462e-aeaf-33c546614622"},
  {"name":"Majola", "value": "2c7ee756-4fe9-4d9e-a4e3-a3eceb76c5e5"},
  {"name":"Ndanya", "value": "33ec75af-6ae9-4567-b474-1daa6f9e24cd"},
  {"name":"Ngqeleni", "value": "c746a300-9beb-4edb-a59b-8d225e563ad3"},
  {"name":"Nkumandeni", "value": "c31f7a71-be9a-43b0-9c80-f0a78ce72ba6"},
  {"name":"Ntaphane", "value": "4f0c25c0-d94a-4ce6-94c6-6289b44fa234"},
  {"name":"Ntibane", "value": "4f2f6cda-a5de-4235-bce5-7f9b70ec63ab"},
  {"name":"St Barnabas", "value": "b6a4b49e-9d43-47e2-a814-9da776021869"},
  {"name":"Buntingville", "value": "39d74ca4-5ee4-476d-a3e0-228aa63ee44d"},
  {"name":"Nontsikelelo Biko", "value": "f8c1f344-295f-4519-a581-551660b64b94"}
  ];

  $scope.mhlontlo = [
  {"name":"Gungululu", "value": "13691f70-19cd-452a-88ba-d10b87567f40"},
  {"name":"Mhlakulo Community Health  Centre", "value": "f12b0f20-6310-4db3-ac09-603bb1ca5dcc"},
  {"name":"Tsolo", "value": "b5a0e7b7-eb5f-431b-ba72-421bbe4608c3"},
  {"name":"Qolombane", "value": "dba0a670-22dc-4859-bf5a-f2c5c6a3676d"},
  {"name":"Zingcuka Clinic", "value": "a0c07b3d-7cd8-4c53-813d-2b77b757febd"},
  {"name":"Malepe-lepe", "value": "8d750af6-3b46-4fcf-8efc-3b9a221b03b1"}
  ];


  $scope.xia = [
  {"name":"Mariamo Muguabine", "value": "5c0f60f7-5a00-48f6-8f7c-0ef31392fb9e"},
  {"name":"Patrice Lomumba", "value": "e1c93b49-e231-4b6f-bd22-57a999bea0eb"},
  {"name":"Xai-Xai Cidade", "value": "49f985e2-f0a6-413e-a0bb-b77b7c79b2b5"}
  ];

  $scope.guija = [
  {"name":"Canissado", "value": "0fe4de65-4a08-4517-a6ab-efecc6da4210"}
  ];


  $scope.update = function(){
    if($scope.mystuff.district === "mhlontlo"){
        $scope.facilities = $scope.xia;
    }else{
      $scope.facilities = $scope.guija;
    }
    console.log("DISTRICT value = "+$scope.district);
  };

  $scope.checklocation = function(){
    console.log("facility value = "+$scope.mystuff.location);
    $rootScope.location = $scope.mystuff.location;
    console.log("LOCATION value = "+$rootScope.location);
  };

})

.controller('SputumCollectionCtrl', function($scope, $stateParams, $translate, $rootScope, $cordovaBarcodeScanner, $ionicScrollDelegate, $cordovaDatePicker, ApiService) {

  $scope.collection = {
    sp_date: new Date(),
    lab_id:'',
  };

  $scope.patient = [];

  $scope.loading = true;
  ApiService.getPatient($stateParams.uuid, function(res) {
    $scope.patient = res;
    $scope.loading = false;
    $scope.$apply();
  });

  $scope.unknown = $rootScope.unknown;
  $scope.DAYs1 = $rootScope.days_1;
  $scope.DAYs2 = $rootScope.days_2;
  $scope.DAYs3 = $rootScope.ThreeOrMoreDays;
  $scope.TODAY = $rootScope.today;

  $scope.submit = function(){
    $scope.obs = [
      { concept: $rootScope.sample_num                  , value: $scope.collection.sample_num },
      { concept: $rootScope.sputum_time                 , value: $scope.collection.specimen_time },
      { concept: $rootScope.lab_test_id                 , value: $scope.collection.lab_id },
      { concept: $rootScope.sp_date                     , value: $scope.collection.sp_date}
    ];

    $scope.observations = {
                patient: $stateParams.uuid,
                encounterType: $rootScope.sputumcollection_encounter_uuid,
                location: $rootScope.zingcuka,
                obs: $scope.obs
              };
    console.log("Response for encounter creation : "+angular.toJson($scope.observations));
    ApiService.createEncounter(angular.toJson($scope.observations), function(res){
                  console.log("Response for encounter creation : "+res);
                });  
    };   

  
})

.controller('SputumResultsCtrl', function($scope, $stateParams, $translate, $rootScope, $cordovaBarcodeScanner, $ionicScrollDelegate, $cordovaDatePicker, ApiService) {
  $scope.other = $rootScope.other;
  $scope.unknown = $rootScope.unknown;
  $scope.Negative = $rootScope.Negative;
  $scope.Positive = $rootScope.Positive;
  $scope.rif_sensitive = $rootScope.rif_sensitive;
  $scope.rif_resistant = $rootScope.rif_resistant;
  $scope.smear = $rootScope.tb_smear;
  $scope.genex = $rootScope.genex;


  $scope.collection = {
    dx_test:'',
    smear_result: $scope.other,
    gxp_result: $scope.other,
    rif_result: $scope.unknown
  };

  $scope.patient = [];

  $scope.loading = true;
  ApiService.getPatient($stateParams.uuid, function(res) {
    $scope.patient = res;
    $scope.loading = false;
    $scope.$apply();
  });

  

  $scope.scrollResize = function() {
    $ionicScrollDelegate.resize();
  };

  $scope.submit = function(){
    $scope.obs = [
      { concept: $rootScope.result_num              , value: $scope.collection.result_num },
      { concept: $rootScope.dx_test                 , value: $scope.collection.dx_test },
      { concept: $rootScope.smear_result            , value: $scope.collection.smear_result },
      { concept: $rootScope.gxp_result              , value: $scope.collection.gxp_result},
      { concept: $rootScope.rif_result              , value: $scope.collection.rif_result}
    ];

    $scope.observations = {
                patient: $stateParams.uuid,
                encounterType: $rootScope.sputumresults_encounter_uuid,
                location: $rootScope.zingcuka,
                obs: $scope.obs
              };
    console.log("Response for encounter creation : "+angular.toJson($scope.observations));
    ApiService.createEncounter(angular.toJson($scope.observations), function(res){
                  console.log("Response for encounter creation : "+res);
                });  
    }; 

})