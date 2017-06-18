angular.module('openmrs.services', [])

.service('CallService', function() {
  var prefix = 'http://';

  this.call = function(host, endpoint, opts, handle) {
    var async = true;
    var cache = false;
    if(opts['async']) 
      async = opts['async'];
    if(opts['cache']) 
      cache = opts['cache'];
    $.ajax({
      beforeSend: function(xhr) {
        if(opts['username']) {
          if(opts['password']) {
            xhr.setRequestHeader('Authorization', 'Basic ' + btoa(opts['username'] + ':' + opts['password']));
          } else {
            throw "[CallService:call] Missing argument: 'password'.";
          }
        } 
        else {
          // If opts does not match any argument, call host endpoint with no headers.
        }
      },
      method: 'GET',
      url: host + 'ws/rest/v1/' + endpoint,
      cache: cache,
      async: async,
      success: function(res) { 
        res.passed = true;
        console.log(res);
        handle(res); 
      },
      error: function(res) {
        res.passed = false; 
        handle(res); 
      }
    });
  }

  this.post = function(host, endpoint, opts, data, handle) {
	/*
	
	  alert(host);
	  alert(btoa(opts['username'] + ':' + opts['password']));
	  
	  alert(host+'ws/rest/v1/'+endpoint);
	  
	  */
	  
    console.log("Data : "+data);
    var async = true;
    var cache = false;
    if(opts['async']) 
      async = opts['async'];
    if(opts['cache']) 
      cache = opts['cache'];
    $.ajax({
      beforeSend: function(xhr) {
        if(opts['username']) {
          if(opts['password']) {
            xhr.setRequestHeader('Authorization', 'Basic ' + btoa(opts['username'] + ':' + opts['password']));
          } else {
            throw "[CallService:post] Missing argument: 'password'.";
          }
        } 
        else {
          // If opts does not match any argument, call host endpoint with no headers.
        }
      },
      method: 'POST',
      url: host + 'ws/rest/v1/' + endpoint,
      data: data,
      contentType:'application/json' ,
      cache: cache,
      async: async,
      success: function(res) { 
        res.passed = true;
		//alert ('patient added');       
        console.log(res);
        handle(res); 
      },
      error: function(res) {
        res.passed = false; 
		//alert (res.status);
        handle(res); 
      }
    });
  }

})

.service('ApiService', function(AuthService, CallService) {
  patient = [];

  this.authenticate = function(host, username, password, handle) {
    CallService.call(host, 'session', {'username' : username, 'password' : password}, function(res) {
      handle(res);
    });
  };

  this.isHostValid = function(host, handle) {
    CallService.call(host, 'session', {}, function(res) {
      handle(res.passed);
    });
  }

  this.getPatients = function(query, handle) {
    CallService.call(AuthService.getHost(), 'patient?q=' + query + '&v=default', {'username' : AuthService.getUsername(), 'password' : AuthService.getPassword()}, 
      function(res) {
        handle(res.results);
    });
  }

  this.getLastViewedPatients = function(handle) {
    CallService.call(AuthService.getHost(), 'patient?lastviewed&v=full', {'username' : AuthService.getUsername(), 'password' : AuthService.getPassword(), 'cache' : true}, 
      function(res) {
        handle(res.results);
    });
  }

  this.getPatient = function(uuid, handle) { 
    return CallService.call(AuthService.getHost(), 'patient/' + uuid + '?v=full', {'username' : AuthService.getUsername(), 'password' : AuthService.getPassword()}, function(res) {
      handle(res);
    });
  }

  this.createPerson = function(data, handle) { 
    return CallService.post(AuthService.getHost(), 'person/', {'username' : AuthService.getUsername(), 'password' : AuthService.getPassword()},
    data, function(res) {
      handle(res);
    });
  }

  this.createPatient = function(data, handle) { 
 // alert(data);
    return CallService.post(AuthService.getHost(), 'patient', {'username' : AuthService.getUsername(), 'password' : AuthService.getPassword()},
    data, function(res) {
      handle(res);
    });
  }

  this.createEncounter = function(data, handle) { 
    return CallService.post(AuthService.getHost(), 'encounter/', {'username' : AuthService.getUsername(), 'password' : AuthService.getPassword()},
    data, function(res) {
      handle(res);
    });
  }

  this.collectSputum = function(data, handle) { 
    return CallService.post(AuthService.getHost(), 'encounter/', {'username' : AuthService.getUsername(), 'password' : AuthService.getPassword()},
    data, function(res) {
      handle(res);
    });
  }

  this.sputumResults = function(data, handle) { 
    return CallService.post(AuthService.getHost(), 'encounter/', {'username' : AuthService.getUsername(), 'password' : AuthService.getPassword()},
    data, function(res) {
      handle(res);
    });
  }

})

.service('TranslationService', function($translate, AuthService) {
  this.curlang = $translate.use();

  this.setLang = function(lang) {
	 
    $translate.use(lang);
    this.curlang = lang;
    AuthService.setLang(this.curlang);


    this.updateCtrlTranslations();
  }

  this.getLang = function() {
	  //  alert(this.curlang);
    return this.curlang;
  }

  this.setLangToStored = function() {
    var lang = AuthService.getLang();
	//alert(lang);
	
    if(lang) {
      this.setLang(lang);
    }
  }

  this.updateCtrlTranslations = function() {
    this.login_error_title = $translate.instant('LOGIN_ERROR_TITLE');
    this.login_error_userpass = $translate.instant('LOGIN_ERROR_WRONGUSERPASSWORD')
    this.login_error_host = $translate.instant('LOGIN_ERROR_WRONGHOST');
    this.login_error_session = $translate.instant('LOGIN_ERROR_SESSION');
    this.logout_confirm_title = $translate.instant('LOGOUT_CONFIRM_TITLE');
    this.logout_confirm_message = $translate.instant('LOGOUT_CONFIRM_MESSAGE');
    this.logout_confirm_cancel = $translate.instant('CANCEL');
  }
})

.factory('AuthService', function () {
  if (window.localStorage['openmrs-session']) {
    var _session = JSON.parse(window.localStorage['openmrs-session']);
  }

  if (window.localStorage['openmrs-host']) {
    var _host = JSON.parse(window.localStorage['openmrs-host']);
  }

  if (window.localStorage['openmrs-username']) {
    var _username = JSON.parse(window.localStorage['openmrs-username']);
  }

  /** TODO: Use and storage of session id in local storage
      This is bad. Authentication should be made through session ID.
      Chrome does not allow sending cookies. To implement this we would 
      probably have to drop browser compatibility. **/
  if (window.localStorage['opassopenmrs']) {
    var _password = JSON.parse(window.localStorage['opassopenmrs']);
  }

  if (window.localStorage['openmrs-lang']) {
    var _lang = JSON.parse(window.localStorage['openmrs-lang']);
  }

  var setHost = function(host) {
    _host = host;
    window.localStorage['openmrs-host'] = JSON.stringify(_host);
  }

  var setUsername = function(username) {
    _username = username;
    window.localStorage['openmrs-username'] = JSON.stringify(_username);
  }

  var setPassword = function(password) {
    _password = password;
    window.localStorage['opassopenmrs'] = JSON.stringify(_password);
  }

  var setSession = function(session) {
    _session = session;
    window.localStorage['openmrs-session'] = JSON.stringify(_session);
  }

  var setLang = function(lang) {
    _lang = lang;		
    window.localStorage['openmrs-lang'] = JSON.stringify(_lang);	
	//alert( window.localStorage['openmrs-lang']);  
  }


  return {
    setHost: setHost,
    setUsername: setUsername,
    setPassword: setPassword,
    setSession: setSession,
    setLang: setLang,
    isLoggedIn: function() {
      return _session ? true : false;
    },
    getSession: function() {
      return _session;
    },
    getUsername: function() {
      return _username;
    },
    getPassword: function() {
      return _password;
    },
    getHost: function() {
      return _host;
    },
    getLang: function() {
     // return 'en';
	return _lang;
    },
    logout: function() {
      window.localStorage.removeItem('openmrs-host');
      window.localStorage.removeItem('openmrs-username');
      window.localStorage.removeItem('opassopenmrs');
      window.localStorage.removeItem('openmrs-session');
      window.localStorage.removeItem('list_dependents');
      _host = null;
      _username = null;
      _password = null;
      _session = null;
    }
  }
})