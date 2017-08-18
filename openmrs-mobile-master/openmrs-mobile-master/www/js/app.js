// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js

var timsDb = null;
var offline = true;

angular.module('openmrs', ['ionic', 'openmrs.controllers', 'openmrs.services', 'pascalprecht.translate', 'ngCordova'])

.run(function($ionicPlatform, $rootScope, $cordovaSQLite) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
	timsDb = $cordovaSQLite.openDB("timsstore.db");
	
			$cordovaSQLite.execute(timsDb,"DROP TABLE IF EXISTS tbltimsLocalidentifiers;");
			$cordovaSQLite.execute(timsDb,"DROP TABLE IF EXISTS tbltimsLocalEncounters;");
            $cordovaSQLite.execute(timsDb, "CREATE TABLE IF NOT EXISTS tbltimsLocalidentifiers (identifierType1 text, patientid text, location text,  encountertype text, address1 text, address2 text, longitude text, latitude text,  givenName text, familyName text, age INTEGER, birthdate text, gender text," +
            "phone1number text, phone2number text, phone2_owner text, phone1_owner text, govtid text )");	
			$cordovaSQLite.execute(timsDb, "CREATE TABLE IF NOT EXISTS tbltimsLocalEncounters (fieldnameUUID text, value text, qrCode text,  encountertype text)");
  }); 
  
  $rootScope.previousState;
  $rootScope.currentState;
  $rootScope.$on('$stateChangeSuccess', function(ev, to, toParams, from, fromParams) {
      $rootScope.previousState = from.name;
      $rootScope.currentState = to.name;
  });

  //UUIDs used

  $rootScope.screening_encounter_uuid = 'cfbe3abd-f428-4da1-ae3e-9df7f88ec2f7';
  $rootScope.sputumcollection_encounter_uuid = 'aa7ed6f0-4008-4254-8faf-f3fce3333e06';
  $rootScope.sputumresults_encounter_uuid = 'ee805fb5-1450-479e-971a-fd70321c8986';
  $rootScope.identifierType1 = 'ad20dea9-5fa9-41de-be1e-8df8934f669d';
  $rootScope.identifierType2 = '05a29f94-c0ed-11e2-94be-8c13b969e334';
  $rootScope.location = 'a0c07b3d-7cd8-4c53-813d-2b77b757febd';
  $rootScope.yes = '1065AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';
  $rootScope.no = '1066AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';
  $rootScope.unknown = '1067AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';
  $rootScope.other = '5622AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';

  //Occupation
  $rootScope.miner = '78391f6e-b529-4b66-a7a2-3b07e8319dd7';
  $rootScope.exminer = '7ad762ff-954e-4e34-9d65-4b9ed0b92a07';
  $rootScope.family_miner = 'a45699c0-110d-4276-86f8-b748aab92769';
  $rootScope.family_exminer = 'd51b93b4-83f4-4cef-b8ef-8c630c47df9e';

  $rootScope.open_pit = '6b9d94fa-b4c2-4cee-8481-6c28438fe74b';
  $rootScope.underground = 'b1187d1f-d6fa-4117-a9f1-436ade0c5fe8';
  $rootScope.artisinal = 'fed40c08-9d5e-41d2-a1f3-c357ea6ea26d';
  $rootScope.gold = '85f19a84-8917-4431-8cc1-03e281ff14ac';
  $rootScope.coal = 'b5df1112-a969-4ad6-b450-9219fa7774ac';
  $rootScope.uranium = '20c95caa-ed6f-4565-a4c2-397956fd9fb9';
  $rootScope.sandstone = '463a0c93-e7cc-48c3-8e96-8d806584cf54';
  $rootScope.diamond = 'b43495b4-ca6d-4ee0-84ba-a48b66eee0a1';
  $rootScope.platinum = '078723b3-e534-47fd-8ecc-b045636e1e0f';
  $rootScope.copper = '5ba56336-044d-4778-a77b-8228f5233db1';
  $rootScope.iron_ore = '08c89d04-e909-4c42-90d8-994c23d4496e';
  $rootScope.magnesium = '8ec94325-363b-4b0e-bc7d-c434f06addcc';

  $rootScope.mbe = '111228b8-bfe7-421c-a88b-1d79d71e64b3';
  $rootScope.mining_years = '0009e6c2-bd5b-499f-8d7c-c3918b137356';

  //TB Symptoms
  $rootScope.cough = '143264AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';
  $rootScope.hemoptysis = '3b96e61d-bdd8-4dc5-90ae-9e7e4daa55a7';
  $rootScope.fever = '140238AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';
  $rootScope.fatigue = '7660136e-2765-44df-bf54-a7acfce71023';
  $rootScope.weight_loss = 'c7c836e2-cf19-4d73-961e-2ca7f9a49f59';
  $rootScope.appetite_loss = '2c05536e-5f5d-4fb5-937f-6a1aa72484fe';
  $rootScope.chest_pain = '1e486a03-29c6-4528-bd29-d58c635d6793';
  $rootScope.night_sweats = '5854ce2f-f60c-41a4-b1a8-f478c1854b0d';

  //TB Risk factors
  $rootScope.contact_with_tb = 'a3d5385a-cb06-47f5-a125-a71e5f1995e8';
  $rootScope.tb_treatment_past = '377f7ab8-602e-43f8-ba69-89335fe83b6f';
  $rootScope.tb_treatment_past_duration = '9e4d65b6-a894-4ffe-ac20-7c820e20a30b';
  $rootScope.diabetes = 'd36a381e-bd4a-4669-b107-eec2898d8a74';
  $rootScope.tobacco = '6f2afef6-1bce-48aa-b086-eddf864d48f4';

  //HIV Questions
  $rootScope.hiv_test_before = '7c3db47c-3bd5-4008-9a24-9cb21a6c2aac';
  $rootScope.last_hiv_result = 'a8c37f62-d41a-4673-93ad-eba976caa016';
  $rootScope.arv_status = 'a25b3fd9-3bbf-4fc6-8642-bc186ee42664';
  $rootScope.do_hiv_test = '123b30fd-a1de-4458-b4ab-bf72113e08f1';
  $rootScope.Hiv_status_disclose = '5ef5ea5f-ddaf-4f0e-ab87-d9a2b16c9a15';
  $rootScope.Positive = '75d8ee80-ef47-11e6-bd77-00fffa4d2a30';
  $rootScope.Negative = '75d89171-ef47-11e6-bd77-00fffa4d2a30';

  $rootScope.suspect = 'f2f5a5fe-e3e5-432c-8306-3d9fb71df349';

  $rootScope.phone1 = '14d4f066-15f5-102d-96e4-000c29c2a5d7';
  $rootScope.phone2 = '63a3b846-1de9-4f52-81c0-c531f03b87bd';
  $rootScope.telephone1owner = 'bf2d1019-4d5c-4f7e-a101-11a24dce5cb9';
  $rootScope.telephone2owner = '57ee596a-c517-4b40-ae01-e0f85b310bb7';
  $rootScope.govtid = '21fd3dc5-9a16-4eeb-91c3-f2161bb03cc7';

  //Sputum collection
  $rootScope.days_1 = '28325375-d55d-4d9c-b441-d90dc80977db';
  $rootScope.days_2 = 'c26f81c3-0d71-495f-a243-f34d81609232';
  $rootScope.ThreeOrMoreDays = 'fc306d6e-f62e-4027-9517-4202c2ac9c2c';
  $rootScope.today = 'b66ad8e5-8b25-463b-b1bb-f40bd5d4be51';
  $rootScope.tb_smear = 'c7fda9a2-1bb3-40c0-a5cf-34393cda2860';
  $rootScope.genex = 'c5b82455-abcc-4181-a30a-9ec0ccabd14e';
  $rootScope.rif_sensitive = '8d4ef807-7c79-464b-84b3-f11773c87b88';
  $rootScope.rif_resistant = 'e28e5f2f-042e-49d4-a64a-37e19635337b';
  $rootScope.sputum_time = '676c9262-fea7-4fae-8921-5431d685085b';
  $rootScope.lab_test_id = 'c6ea8340-6747-4d81-b489-b90d4d04cb00';
  $rootScope.dx_test = '1b74c7ac-ffad-4182-aaad-bd147e913448';
  $rootScope.smear_result = '345ca21d-c6c2-482f-9165-e4c953b37ca3';
  $rootScope.gxp_result = '527ce03d-ece3-490b-92c9-df481f3acc00';
  $rootScope.rif_result = '339d80a3-9147-4404-94df-25e5e9b60d2c';
  $rootScope.sample_num = '3394ddbb-0270-4001-852f-843cf728890c';
  $rootScope.result_num = '11eac57c-0e06-4ef4-aaec-ebd39d2c5fa5';
  $rootScope.sp_date = 'd9764ac7-e8b7-417a-ae8b-963f46130215';
  
  $rootScope.no_value = '4bc7f41f-e7f1-488d-bad4-44458a12acd3';
  
  
  

})

.config(function($stateProvider, $urlRouterProvider, $translateProvider) {

  $translateProvider.translations('pt', {
    // Lenguajes
    LANG_sw: 'Kiswahili',
    LANG_pt: 'Portuguese',
    LANG_en: 'English',

    // Menú
    MENU_TITLE: 'Menú',
    MENU_DASHBOARD: 'Inicio',
	MENU_SCREENING_TOOL : 'Ferramenta de triagem',
    MENU_SPUTUM_COLLECTION : 'Coleção de escarro',
    MENU_SPUTUM_RESULTS : 'Resultados do escarro',
    MENU_SEARCHPATIENTS : 'Búsqueda de pacientes',
    MENU_REGISTERPATIENT : 'Registrar un paciente',
	MENU_TREATMENT_INITIATION: 'Iniciação ao tratamento', 
	MENU_CONTRACT_TRACING: 'Rastreamento de contatos', 
    MENU_LOGOUT: 'Cerrar sesión',
	
	

    // Inicio de sesión
    LOGIN_TITLE : 'Sesión de OpenMRS',
    LOGIN_HOST_LABEL: 'Servidor',
    LOGIN_USERNAME_LABEL: 'Usuario',
    //LOGIN_PASSWORD_LABEL: 'Cortaseña',
	LOGIN_PASSWORD_LABEL: 'Senha',


    // Inicio de sesión: errores
    LOGIN_ERROR_TITLE:'Error al iniciar sesión en el servidor',
    LOGIN_ERROR_WRONGUSERPASSWORD: 'Usuario o cortaseña inválida.',
    LOGIN_ERROR_WRONGHOST: 'Servidor inválido. ¿Haz incluido el directorio /openmrs/ del servidor?',
    LOGIN_ERROR_SESSION: '¡Usted ya está en una sesión! Si esto es incorrecto, intente reiniciar su navegador.',

    // Finalización de la sesión
    LOGOUT_CONFIRM_TITLE:'Cerrando sesión',
    LOGOUT_CONFIRM_MESSAGE: '¿Seguro que desea cerrar sesión?.',
    LOGOUT_CONFIRM_CANCEL: 'Cancelar',

    // Inicio
    DASH_TITLE: 'Inicio',
    DASH_WELCOME: 'Bienvenido',
    DASH_CONNECTED: 'Usted está actualmente conectado a',

    // Búsqueda de pacientes
    SEARCHPATIENTS_TITLE: 'Pacientes',
    SEARCHPATIENTS_AGE: 'Edad:',

    // Detalles de pacientes
    PATIENT_EXPIRED: 'O paciente expirou',

    // Traducción de palabras
    BASIC: 'Basico',
	NAME:'Nome',
	 SURNAME:'SOBRENOME',
	 GOVTID:'Governo ID',
	 BIRTHDATE: 'Fecha de nacimiento',
    ESTIMATED: 'Aproximada',
    AGE: 'Edad',
    GENDER: 'Sexo',
    MALE: 'Masculino',
    FEMALE: 'Femenino',
    LOCATION: 'Localización',
    COUNTRY: 'País',
    STATE: 'Estado',
    PROVINCE: 'Provincia',
    CITY: 'Ciudad',
    ADDRESS: 'Dirección',
    POSTAL: 'Código postal',
    CANCEL: 'Cancelar',
    ACTION_SEARCH: 'Buscar',

	//Occupation
    OCCUPATION:'Ocupação',
    MINER: 'Você é mineiro?',
    EXMINER: 'Você é ex-mineiro?',
    FAMILYMINER: 'Você é um membro da família mineiro?',
    FAMILYEXMINER: 'Você é um membro da família de ex-mineiro?',

    //Mine Type
    MINETYPE: 'Tipo de Mina',
    TYPE_OF_MINE: 'Que tipo de mina?',
    ARTISINAL: 'Artesanal',
    OPENPIT:'Open Pit',
    UNDERGROUND: 'Subterrâneo',
    TYPE_OF_MINERALS: 'Que tipos de minerais?',
    COPPER: 'Cobre',
    MAGNESIUM: 'Magnésio',
    IRONORE: 'Minério de ferro',
    GOLD: 'Ouro',
    COAL: 'Carvão',
    URANIUM: 'Urânio',
    SANDSTONE: 'Sandstone Quarry',
    DIAMOND: 'Diamante',
    PLATINUM: 'Platina',
    TANZANITE: 'Tanzanite',
    OTHER: 'De outros',
    MINEYEARS: 'Quantos anos?',
    MEDBENEFITEXAM: 'Você já fez exame de benefício médico?',
    CALLCOMPENSATION: 'Instrua o mineiro para chamar este número gratuito para obter informações sobre compensação: 0801000240',
    REFERMINER: 'Referir mineiro ao centro de serviços de saúde ocupacional',

    //TB SYMPTOMS
    TBSYMPTOMS:'Sintomas de tuberculose',
    COUGH: 'Tosse',
    COUGHINGBLOOD:'Sangue de tosse',
    FEVER:'Febre',
    NIGHTSWEATS:'Drenching suores noturnos',
    WEIGHTLOSS:'Perda de peso inexplicada',
    FATIGUE:'Fraqueza ou fadiga',
    APPETITELOSS:'Perda de apetite',
    CHESTPAIN:'Dor no peito',

    //TB RISK
    TBRISK:'FATORES DE RISCOS DE TB',
    TBCONTACT:'Você esteve em contato direto com uma pessoa com TB??',
    TREATEDTB: 'Você foi tratado por TB?',
    HOWLONG: 'Por quantos meses você foi tratado por TB?',
    DIABETESE: 'Você tem diabetes?',
    TOBACCO: 'Você fuma tabaco?',

    //HIV
    HIV: 'Perguntas sobre o HIV',
    HIVTEST: 'Você já teve um teste de HIV nos últimos 3 meses?',
    DISCLOSE: 'Você está disposto a divulgar seu status?',
    RESULTS: 'Qual foi o resultado do seu teste de HIV mais recente?',
    ARV: 'Você está atualmente em ART / ARVs?',
    HIVRETEST: 'Gostaria de ter um teste de HIV?',

    //Contact Information
    PHONE1: 'Número de telefone 1',
    PHONE2: 'Número de telefone 2',
    PHONE1OWNER: 'A quem pertence o número de telefone 1?',
    PHONE2OWNER: 'A quem pertence o número de telefone 2?',
    MYSELF : 'Eu mesmo',
    OTHER_OWNER: 'Alguém',
    OTHER_NAME: 'Se alguém, digite o nome do proprietário',
    ADDRESS: 'Endereço residencial',
    LANDMARK: 'Ponto de referência perto da casa',

    PATIENTID: 'Identificação do paciente',

    //Sputum collection
    SPUTUM_COLLECTION_FORM : 'Sputum Formulário de Envio',
    SPECIMEN_AGE: 'Quando o espécime tossiu?',
    SAMPLE1: 'Amostra 1',
    SAMPLE2: 'Amostra 2',
    SAMPLE3: 'Amostra 3',
    SPUTUM_DETAILS: 'Sputum Details',
    DATE_OF_COLLECTION: 'Data da Coleção de Espúcio',
    TODAY: 'Spot (hoje)',
    DAY1: '1 dia atrás',
    DAY2: '2 dia atrás',
    DAY3: '3 dia atrás',
    LAB_TEST_ID: 'Identificação do teste de laboratório',

    //Sputum Results
    RESULTS_NUM: 'Registre o resultado para qual amostra?',
    SMEAR:'Esfolião',
    DX_TEST:'Teste de diagnostico',
    GENEX:'GeneXpert',
    SMEAR_RESULTS:'Resultado do esfregaço de escarro',
    POSITIVE:'Positivo',
    NEGATIVE:'Negativo',
    RIF_RESULTS:'Rif Resultados',
    RIF_SENSITIVE:'Rif Sensível',
    RIF_RESISTANT:'Rif Resistente'


  }).translations('sw', {
    // Languages
    LANG_sw: 'Kiswahili',
    LANG_pt: 'Portuguese',
    LANG_en: 'English',

    // Menu
    MENU_TITLE: 'Menu',
    MENU_DASHBOARD : 'Mjumuiko wa viashilia',
    MENU_SCREENING_TOOL : 'Fomu ya uchunguzi',
    MENU_SPUTUM_COLLECTION : 'Ukusanyaji wa Makohozi',
    MENU_SPUTUM_RESULTS : 'Majibu ya Makohozi',
    MENU_SEARCHPATIENTS : 'Search wagonjwa',
    MENU_REGISTERPATIENT : 'Register mgonjwa',
	MENU_TREATMENT_INITIATION: 'Uanzishaji wa Matibabu', 
	MENU_CONTRACT_TRACING: 'Wasiliana na Ufuatiliaji', 
    MENU_LOGOUT: 'Kutoka',

    // Logging in
    LOGIN_TITLE: 'OpenMRS Ingia',
    LOGIN_HOST_LABEL: 'Host',
    LOGIN_USERNAME_LABEL: 'Jina la mtumiaji',
    LOGIN_PASSWORD_LABEL: 'Nywila',
    LOGIN: 'Ingia',

    // Logging in: errors
    LOGIN_ERROR_TITLE:'Kosa magogo kwenye.',
    LOGIN_ERROR_WRONGUSERPASSWORD: 'Jina batili la mtumiaji au nenosiri.',
    LOGIN_ERROR_WRONGHOST: 'Jeshi batili.',
    LOGIN_ERROR_SESSION: 'Tayari umeingia.',

    // Logging out
    LOGOUT_CONFIRM_TITLE:'Magogo nje',
    LOGOUT_CONFIRM_MESSAGE: 'Una uhakika unataka kuingia nje?',

    // Dashboard
    DASH_WELCOME: 'Karibu',
    DASH_CONNECTED: 'Kwa sasa kushikamana na',

    // Search patients
    SEARCHPATIENTS_TITLE: 'Wagonjwa',
    SEARCHPATIENTS_AGE: 'Wenye umri wa miaka',

    // Patient details
    PATIENT_EXPIRED: 'Mgonjwa muda wake',

    YES:'Ndio',
    NO:'Hapana',
    UNKNOWN:'Sijui',

    // Word translations
    BASIC: 'Utambulisho Binafsi wa Mteja',
    NAME:'Jina',
    SURNAME:'Jina la ukoo',
    GOVTID:'ID serikali',
    ESTIMATED: 'Inakadiriwa',
    BIRTHDATE: 'Tarehe ya kuzaliwa',
    AGE: 'Umri',
    GENDER: 'Jinsia',
    MALE: 'Kiume',
    FEMALE: 'Kike',
    LOCATION: 'Location',
    COUNTRY: 'Nchi',
    STATE: 'State',
    PROVINCE: 'Province',
    CITY: 'City',
    ADDRESS: 'Address',
    POSTAL: 'Postal',
    CANCEL: 'kufuta',
    ACTION_SEARCH: 'Search',

    //Occupation
    OCCUPATION:'Kazi',
    MINER: 'Mchimbaji Mgodini?',
    EXMINER: 'Mchimbaji Mgodini wa Zamani?',
    FAMILYMINER: 'Mwanafamilia wa Mchimbaji Mgodini?',
    FAMILYEXMINER: 'Mwanajamii katika eneo la Mgodini?',

    //Mine Type
    MINETYPE: 'Mine Aina',
    TYPE_OF_MINE: 'Aina ya Mgodi?',
    ARTISINAL: 'Wadogo',
    OPENPIT:'Open Pit',
    UNDERGROUND: 'chini ya ardhi',
    TYPE_OF_MINERALS: 'Ni aina ya madini?',
    COPPER: 'Shaba nyekundu',
    MAGNESIUM: 'Magnesium',
    IRONORE: 'Chuma',
    GOLD: 'Dhahabu',
    COAL: 'Makaa ya mawe',
    URANIUM: 'Uranium',
    SANDSTONE: 'Sandstone Quarry',
    DIAMOND: 'Almasi',
    PLATINUM: 'Platini',
    TANZANITE: 'Tanzanite',
    OTHER: 'Nyingine',
    MINEYEARS: 'Jinsi miaka mingi?',
    MEDBENEFIT: 'Je, umewahi kufanya matibabu ya mtihani faida?',
    CALLCOMPENSATION: 'Agiza mchimbaji kuwaita hii toll bure ya simu kwa habari kuhusu fidia: 0801000240',
    REFERMINER: 'Rejea mchimbaji kwa karibu Afya Service Center',

    //TB SYMPTOMS
    TBSYMPTOMS:'Dalili za Kifua Kikuu',
    COUGH: 'Kikohozi cha zaidi ya wiki mbili ',
    COUGHINGBLOOD:'Kikohozi kilichochanganyika na damu',
    FEVER:'Homa',
    NIGHTSWEATS:'Kutoka jasho kwa wingi nyakati za usiku',
    WEIGHTLOSS:'Kupungua Uzito',
    FATIGUE:'Kubanwa na kifua',
    APPETITELOSS:'Kukosa hamu ya kula',
    CHESTPAIN:'Maumivu ya Kifua',

    //TB RISK
    TBRISK:'MAZINGIRA HATARI YA TB',
    TBCONTACT:'Je, umekuwa karibu sana na mtu aliye na TB?',
    TREATEDTB: 'Umeshawahi kutibiwa TB ?',
    HOWLONG: 'Kwa jinsi miezi mingi Ulikuwa kutibiwa kwa TB?',
    DIABETESE: 'Una ugonjwa wa kisukari?',
    TOBACCO: 'Unavuta Sigara?',

    //HIV
    HIV: 'Maswali ya HIV',
    HIVTEST: 'Umeshawahi  kupima kipimo cha HIV kwa muda wa miezi 3 iliyopita ?',
    DISCLOSE: 'Je, uko tayari kuweka wazi hali yako?',
    RESULTS: 'Ilikuwa ni matokeo ya mtihani yako ya hivi karibuni VVU?',
    ARV: 'Je, wewe ni sasa kwenye ART / ARVs?',
    HIVRETEST: 'Je, ungependa kupima  HIV  ?',

    //Contact Information
    PHONE1: 'Nambari ya simu 1',
    PHONE2: 'Nambari ya simu 2',
    PHONE1OWNER: 'Kwa nani anafanya simu namba 1 ni mali ya?',
    PHONE2OWNER: 'Kwa nani anafanya simu namba 2 ni mali ya?',
    MYSELF : 'Mimi mwenyewe',
    OTHER_OWNER: 'Mtu mwingine',
    OTHER_NAME: 'Kama mtu mwingine, kuingia wamiliki jina',
    ADDRESS: 'Makazi ya mahali',
    LANDMARK: 'Kihistoria karibu na nyumbani',

    PATIENTID: 'Mgonjwa ID'

  }).translations('en', {
    // Languages
    LANG_sw: 'Kiswahili',
    LANG_pt: 'Portuguese',
    LANG_en: 'English',

    // Menu
    MENU_TITLE: 'Menu',
    MENU_DASHBOARD : 'Dashboard',
    MENU_SCREENING_TOOL : 'Screening Tool',
    MENU_SPUTUM_COLLECTION : 'Sputum Collection',
    MENU_SPUTUM_RESULTS : 'Sputum Results',
    MENU_SEARCHPATIENTS : 'Search patients',
    MENU_REGISTERPATIENT : 'Register a patient',
	MENU_TREATMENT_INITIATION: 'Treatment Initiation', 
	MENU_CONTRACT_TRACING: 'Contract Tracing', 
    MENU_LOGOUT: 'Logout',

    // Logging in
    LOGIN_TITLE: 'OpenMRS Login',
    LOGIN_HOST_LABEL: 'Host',
    LOGIN_USERNAME_LABEL: 'Username',
    LOGIN_PASSWORD_LABEL: 'Password',

    // Logging in: errors
    LOGIN_ERROR_TITLE:'Error logging in to',
    LOGIN_ERROR_WRONGUSERPASSWORD: 'Invalid username or password.',
    LOGIN_ERROR_WRONGHOST: 'Invalid host. Have you include?',
    LOGIN_ERROR_SESSION: 'You are already logged in! If this is incorrect, try restarting your browser.',

    // Logging out
    LOGOUT_CONFIRM_TITLE:'Logging out',
    LOGOUT_CONFIRM_MESSAGE: 'Are you sure you want to log out?.',

    // Dashboard
    DASH_WELCOME: 'Welcome',
    DASH_CONNECTED: 'You are currently connected to',

    // Search patients
    SEARCHPATIENTS_TITLE: 'Patients',
    SEARCHPATIENTS_AGE: 'Aged',

    // Patient details
    PATIENT_EXPIRED: 'Patient expired',

    YES:'Yes',
    NO:'No',
    UNKNOWN:'Unknown',

    // Word translations
    BASIC: 'Basic',
    NAME:'Name',
    SURNAME:'Surname',
    GOVTID:'Government ID',
    ESTIMATED: 'Estimated',
    BIRTHDATE: 'Birthdate',
    AGE: 'Age',
    GENDER: 'Gender',
    MALE: 'Male',
    FEMALE: 'Female',
    LOCATION: 'Location',
    COUNTRY: 'Country',
    STATE: 'State',
    PROVINCE: 'Province',
    CITY: 'City',
    ADDRESS: 'Address',
    POSTAL: 'Postal',
    CANCEL: 'Cancel',
    ACTION_SEARCH: 'Search',

    //Occupation
    OCCUPATION:'Occupation',
    MINER: 'Are you miner?',
    EXMINER: 'Are you an ex-miner?',
    FAMILYMINER: 'Are you a family member of miner?',
    FAMILYEXMINER: 'Are you a family member of ex-miner?',

    //Mine Type
    MINETYPE: 'Mine Type',
    TYPE_OF_MINE: 'Which type of mine?',
    ARTISINAL: 'Artisinal',
    OPENPIT:'Open Pit',
    UNDERGROUND: 'Underground',
    TYPE_OF_MINERALS: 'Which type of minerals?',
    COPPER: 'Copper',
    MAGNESIUM: 'Magnessium',
    IRONORE: 'Iron Ore',
    GOLD: 'Gold',
    COAL: 'Coal',
    URANIUM: 'Uranium',
    SANDSTONE: 'Sandstone Quarry',
    DIAMOND: 'Diamond',
    PLATINUM: 'Platinum',
    TANZANITE: 'Tanzanite',
    OTHER: 'Other',
    MINEYEARS: 'How many years?',
    MEDBENEFITEXAM: 'Have you ever done medical benefit exam?',
    CALLCOMPENSATION: 'Instruct miner to call this toll free number for information about compensation: 0801000240',
    REFERMINER: 'Refer miner to the close Occupational Health Service Center',

    //TB SYMPTOMS
    TBSYMPTOMS:'TB SYMPTOMS',
    COUGH: 'Cough',
    COUGHINGBLOOD:'Coughing blood',
    FEVER:'Fever',
    NIGHTSWEATS:'Drenching night sweats',
    WEIGHTLOSS:'Unexplained weight loss',
    FATIGUE:'Weakness or fatigue',
    APPETITELOSS:'Loss of appetite',
    CHESTPAIN:'Chest pains',

    //TB RISK
    TBRISK:'TB RISK FACTORS',
    TBCONTACT:'Have you been in close contact with a person with TB?',
    TREATEDTB: 'Have you been treated for TB?',
    HOWLONG: 'For how many months were you treated for TB?',
    DIABETESE: 'Do you have Diabetes?',
    TOBACCO: 'Do you smoke tobacco',

    //HIV
    HIV: 'HIV Questions',
    HIVTEST: 'Have you had an HIV Test in the past 3 months?',
    DISCLOSE: 'Are you willing to disclose your status?',
    RESULTS: 'What was the result of your most recent HIV test?',
    ARV: 'Are you currently on ART/ARVs?',
    HIVRETEST: 'Would you like to have an HIV test?',

    //Contact Information
    PHONE1: 'Phone Number 1',
    PHONE2: 'Phone number 2',
    PHONE1OWNER: 'To whom does phone number 1 belong to?',
    PHONE2OWNER: 'To whom does phone number 2 belong to?',
    MYSELF : 'Myself',
    OTHER_OWNER: 'Someone else',
    OTHER_NAME: 'If someone else, enter owners name',
    ADDRESS: 'Residential address',
    LANDMARK: 'Landmark near home',

    PATIENTID: 'Patient ID',

    //Sputum collection
    SPUTUM_COLLECTION_FORM : 'Sputum Submission Form',
    SPECIMEN_AGE: 'When was the specimen coughed up?',
    SAMPLE1: 'Sample 1',
    SAMPLE2: 'Sample 2',
    SAMPLE3: 'Sample 3',
    SPUTUM_DETAILS: 'Sputum Details',
    DATE_OF_COLLECTION: 'Date of Sputum Collection',
    TODAY: 'Spot(today)',
    DAY1: '1 day ago',
    DAY2: '2 days ago',
    DAY3: '3 days ago',
    LAB_TEST_ID: 'Lab Test ID',

    //Sputum Results
    RESULTS_NUM: 'Record the result for which sample?',
    SMEAR:'Sputum Smear',
    DX_TEST:'Diagnostic Test',
    GENEX:'GeneXpert',
    SMEAR_RESULTS:'Sputum Smear Result',
    POSITIVE:'Positive',
    NEGATIVE:'Negative',
    RIF_RESULTS:'Rif Results',
    RIF_SENSITIVE:'Rif Sensitive',
    RIF_RESISTANT:'Rif Resistant'

  })
  $translateProvider.preferredLanguage('en');

  $stateProvider

  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'LoginCtrl',
    onEnter: function($state, AuthService, TranslationService) {
      TranslationService.setLangToStored();

      var loggedIn = AuthService.isLoggedIn();
      if(loggedIn) {
        $state.go('app.dashboard');
      }
    }
  })

  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl',
    onEnter: function($state, $translate, AuthService, TranslationService) {
      TranslationService.setLangToStored();

      var loggedIn = AuthService.isLoggedIn();
      if(!loggedIn) {
        $state.go('login');
      }
    }
  })

  .state('app.searchpatients', {
    url: '/searchpatients',
    views: {
      'menuContent': {
        templateUrl: 'templates/searchpatients.html',
        controller: 'PatientsCtrl'
      }
    }
  })

    .state('app.dashboard', {
      url: '/dashboard',
      views: {
        'menuContent': {
          templateUrl: 'templates/dashboard.html',
          controller: 'DashboardCtrl'
        }
      }
    })

    .state('app.newpatient', {
    url: '/newpatient',
    views: {
      'menuContent': {
        templateUrl: 'templates/newPatient.html',
        controller: 'NewPatientCtrl'
      }
    }
  })

  .state('app.collection', {
    url: '/collection',
    views: {
      'menuContent': {
        templateUrl: 'templates/collection.html',
        controller: 'CollectionCtrl'
      }
    }
  })

  .state('app.sputumcollection', {
    url: '/sputumcollection/:uuid',
    views: {
      'menuContent': {
        templateUrl: 'templates/sputumcollection.html',
        controller: 'SputumCollectionCtrl'
      }
    }
  })

  .state('app.results', {
    url: '/results',
    views: {
      'menuContent': {
        templateUrl: 'templates/results.html',
        controller: 'ResultsCtrl'
      }
    }
  })

  .state('app.sputumresults', {
    url: '/sputumresults/:uuid',
    views: {
      'menuContent': {
        templateUrl: 'templates/sputumresults.html',
        controller: 'SputumResultsCtrl'
      }
    }
  })

  .state('app.patient', {
    url: '/patient/:uuid',
    views: {
      'menuContent': {
        templateUrl: 'templates/patient.html',
        controller: 'PatientCtrl'
      }
    }
  })
  
    .state('app.treatmentInitiation', {
    url: '/treatmentInitiation',
    views: {
      'menuContent': {
        templateUrl: 'templates/treatmentInitiation.html',
        controller: 'TreatmentInitiationCtrl'
      }
    }
  })

  
  
  
  ;
  
  
  

  $urlRouterProvider.otherwise('/app/dashboard');
});
