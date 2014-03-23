/*
 * M-a-d-C Javascript business logic
 * V1.0
 * 03-01-2014
 * Manuel Wallnoefer
 */


/* Data Model M-a-d-C*/


/**
 * Data model of a trial
 * 
 */

/*
 *global variables 
 * 
 */

var trial = null;
var trialConfig = null;
var trialDataSet = null;
var trialData = null;
var trialPictureSet = null;
var geotag = null;
var pictureSource;   // picture source
var destinationType; // sets the format of returned value
var actualEntries = null;
var actualFileCounter = 0;
var trialFolder="Trials";
var tmpTrialPath = "/Trials/tmp/";
var devicePath = "/storage/emulated/0/";
var serverPath ="http://10.0.0.12:8090/FileUpDownload/fileuploadservlet";



function Trial(Tid, Tlocation,TstudyDirector,Tinvestigator,TprotocolId,Ttitle,Tdate,Tconfig,Tdata,Tstatus){
	
	this.Tid = Tid;
	this.Tlocation = Tlocation;
	this.TstudyDirector = TstudyDirector;
	this.Tinvestigator = Tinvestigator;
	this.TprotocolId = TprotocolId;
	this.Ttitle =  Ttitle;
	this.Tdate = Tdate;
	this.Tconfig = Tconfig;
	this.Tdata = Tdata;
	this.Tstatus = Tstatus;
	
	trialPictureSet = new Array();
	
	
	this.setTrialConfig = function(_Tconfig){
		this.Tconfig = _Tconfig;
	}
	
	this.getTrialConfig = function(){
		
		return this.Tconfig;
		
	}
	
	this.getTrialData = function(){
		
		return this.Tdata;
		
	}
	
	this.setTrialData = function(_Tdata){
		this.Tdata = _Tdata;
	}
	
	this.getTrialStatus = function(){
		
		return this.Tstatus;
		
	}
	
	this.setTrialStatus = function(_Tstatus){
		this.Tstatus = _Tstatus;
	}
	

	
}


/**
 * Data model of a trial config
 * 
 */
function TrialConfig(TCrows, TCcolumns,TCstart,TCwalkthrough,TCattributes){
	console.log("### Trial config entered ###");
	this.TCrows = TCrows;
	this.TCcolumns = TCcolumns;
	this.TCstart = TCstart;
	this.TCwalkthrough = TCwalkthrough;
	this.TCattributes = TCattributes;
	
	//console.log("Rows: " + TCrows);
	
	
}


/**
 * Data model of a trial config attribute
 * 
 */
function TrialConfigAttribute(TCAtype, TCAunit,TCAcount){
	
	this.TCAtype = TCAtype;
	this.TCAunit = TCAunit;
	this.TCAcount = TCAcount;
	
}

/**
 * Data model of a trial data
 * 
 */
function TrialData(TDdate, TDdatasets){
	
	this.TDdate = TDdate;
	this.TDdatasets = TDdatasets;
	this.TDlastProcessedDatasetElement = -1;
	
	this.getTDdatasets = function(){
		
		return this.TDdatasets;
		
	}
	
	this.setTDdatasets = function(_TDdatasets){
		this.TDdatasets = _TDdatasets;
	}
	
	this.getTDlastProcessedDatasetElement = function(){
		
		return this.TDlastProcessedDatasetElement;
		
	}
	
	this.setTDlastProcessedDatasetElement = function(_TDlastProcessedDatasetElement){
		this.TDlastProcessedDatasetElement = _TDlastProcessedDatasetElement;
	}
	
}


/**
 * Data model of a trial data set
 * 
 */
function TrialDataSet(TDSplot,TDSattributeType,TDSscale,TDSvalue,TDSpicture,TDSgeotag){
	
	this.TDSplot = TDSplot;
	this.TDSattributeType = TDSattributeType;
	this.TDSvalue = TDSvalue;
	this.TDSpicture = TDSpicture;
	this.TDSgeotag = TDSgeotag;
	this.TDSscale = TDSscale;
}


/*
 * Method for dynamically generate input fields for trial config
 */

function addFields(){
	console.log("### addFields entered ###");
    var number = document.getElementById("attributes").value;
    
    console.log("Numer attributes:"+number);
    var container = document.getElementById("containerFieldset");
    while (container.hasChildNodes()) {
        container.removeChild(container.lastChild);
    }
    for (i=0;i<number;i++){
    	
    	
//    	var diva = document.createElement("div");
//    	diva.className = "ui-block-a";
//    	diva.id = "diva";
//    	var divb = document.createElement("div");
//    	divb.className = "ui-block-b";
//    	divb.id = "divb"
    	
    	
    	// Header - right block empty
    	var diva = document.createElement("div");
    	diva.className = "ui-block-a";
    	diva.id = "diva";
    	var divb = document.createElement("div");
    	divb.className = "ui-block-b";
    	divb.id = "divb"
    	var h1 = document.createElement("h3");
        h1.appendChild(document.createTextNode("Attribut " + (i+1)));
    	diva.appendChild(h1);
    	container.appendChild(diva);
    	//divb.appendChild();
    	container.appendChild(divb);
    	
    	
    	
//        var h1 = document.createElement("h1");
//        h1.appendChild(document.createTextNode("Attribut " + (i+1)));
//        container.appendChild(h1);
        
    	
    	//Typ block
    	var diva = document.createElement("div");
    	diva.className = "ui-block-a";
    	diva.id = "diva";
    	var divb = document.createElement("div");
    	divb.className = "ui-block-b";
    	divb.id = "divb"
    	diva.appendChild(document.createTextNode("Typ "));
    	container.appendChild(diva);
        var input = document.createElement("input");
        input.type = "text";
        input.id = "type"+ (i+1);
        divb.appendChild(input);
        container.appendChild(divb);
        container.appendChild(document.createElement("br"));

        
    	//Einheit block
    	var diva = document.createElement("div");
    	diva.className = "ui-block-a";
    	diva.id = "diva";
    	var divb = document.createElement("div");
    	divb.className = "ui-block-b";
    	divb.id = "divb"
    	diva.appendChild(document.createTextNode("Einheit "));
    	container.appendChild(diva);
        var input = document.createElement("input");
        input.type = "text";
        input.id = "scale"+ (i+1);
        divb.appendChild(input);
        container.appendChild(divb);
        container.appendChild(document.createElement("br"));

    	//Anzahl/Plot block
    	var diva = document.createElement("div");
    	diva.className = "ui-block-a";
    	diva.id = "diva";
    	var divb = document.createElement("div");
    	divb.className = "ui-block-b";
    	divb.id = "divb"
    	diva.appendChild(document.createTextNode("Anzahl/Plot "));
    	container.appendChild(diva);
        var input = document.createElement("input");
        input.type = "number";
        input.id = "count"+ (i+1);
        divb.appendChild(input);
        container.appendChild(divb);
        container.appendChild(document.createElement("br"));

        
//        container.appendChild(document.createTextNode("Einheit "));
//        var input = document.createElement("input");
//        input.type = "text";
//        input.id = "scale"+ (i+1);
//        container.appendChild(input);
//        container.appendChild(document.createElement("br"));
//        
//        container.appendChild(document.createTextNode("Anzahl/Plot "));
//        var input = document.createElement("input");
//        input.type = "text";
//        input.id = "count"+ (i+1);
//        container.appendChild(input);
//        container.appendChild(document.createElement("br"));
//        container.appendChild(document.createElement("br"));                
    }
}



function createTrial(){
	console.log("### createTrial entered ###");
	
	var form = $('#trialForm');
	var trialTitle = $('#trialTitle', form).val();
	var trialID = $('#trialID', form).val();
	var trialDate = $('#trialDate', form).val();
	var trialProtocolID = $('#trialProtocolID', form).val();
	var trialInvestigator = $('#trialInvestigator', form).val();
	var trialStudyDirector = $('#trialStudyDirector', form).val();
	var trialLocation = $('#trialLocation', form).val();
	var trialStatus = "created";
	
	
	/*
	 * log outputs to check values
	 */
	console.log("Title: " + trialTitle);
	console.log("ID: " + trialID);
	console.log("Date: " + trialDate);
	console.log("Protocol ID: " + trialProtocolID);
	console.log("Investigator: " + trialInvestigator);
	console.log("Study director: " + trialStudyDirector);
	console.log("Location: " + trialLocation);
	
	/*
	 * end log outputs
	 */

	//create trial
	trial = new Trial(trialID, trialLocation, trialStudyDirector, trialInvestigator, trialProtocolID, trialTitle, trialDate, null, null,trialStatus);
	console.log("trial object created: " + trial);
	
	$.mobile.changePage("index.html#configManuallyConfigData", {transition: ""});
	
}


function createTrialFromFile(_trialTitle,_trialID,_trialDate,_trialProtocolID,_trialInvestigator,_trialStudyDirector,_trialLocation){
	console.log("### createTrial with parameters entered ###");
	
	
	var trialTitle = _trialTitle;
	var trialID = _trialID;
	var trialDate = _trialDate;
	var trialProtocolID = _trialProtocolID;
	var trialInvestigator = _trialInvestigator;
	var trialStudyDirector = _trialStudyDirector;
	var trialLocation = _trialLocation;
	
	
	/*
	 * log outputs to check values
	 */
	console.log("Title: " + trialTitle);
	console.log("ID: " + trialID);
	console.log("Date: " + trialDate);
	console.log("Protocol ID: " + trialProtocolID);
	console.log("Investigator: " + trialInvestigator);
	console.log("Study director: " + trialStudyDirector);
	console.log("Location: " + trialLocation);
	
	/*
	 * end log outputs
	 */

	//create trial
	trial = new Trial(trialID, trialLocation, trialStudyDirector, trialInvestigator, trialProtocolID, trialTitle, trialDate, null, null);
	console.log("trial object created: " + trial);
	
	//$.mobile.changePage("index.html#configManuallyConfigData", {transition: ""});
	
}








function createTrialConfig(){
	console.log("### createTrialConfig entered ###");
	
	var form = $('#configForm');
	var attributes = $('#attributes', form).val();
	var trialName = $('#trialName', form).val();
	var trialRows = $('#trialRows', form).val();
	var trialColumns = $('#trialColumns', form).val();
	var trialStart = $('#trialStart', form).val();
	var trialWalkthrough = $('#trialWalkthrough', form).val();
	var trialAttributes = new Array();
	
	
	/*
	 * log outputs to check values
	 */
	console.log("Count of attributes: " + attributes);
	console.log("Trial name: " + trialName);
	console.log("Trial rows: " + trialRows);
	console.log("Trial columns: " + trialColumns);
	console.log("Trial start: " + trialStart);
	console.log("Trial walkthrough: " + trialWalkthrough);
	
	/*
	 * end log outputs
	 */
	
	//create array of trial config attributes
	for(j=0;j<attributes;j++){
		var actualType = $('#type'+(j+1), form).val();
		console.log("Actual type: " + actualType);
		var actualScale = $('#scale'+(j+1), form).val();
		console.log("Actual scale: " + actualScale);
		var actualCount = $('#count'+(j+1), form).val();
		console.log("Actual count: " + actualCount);
		var actualTrialConfigAttribute = new TrialConfigAttribute(actualType, actualScale, actualCount)
		trialAttributes.push(actualTrialConfigAttribute);
		console.log("Attribute added: " + actualTrialConfigAttribute.TCAtype);
	}
	console.log("Length of Attribute array: " + trialAttributes.length);

	//create trial config
	trialConfig = new TrialConfig(trialRows, trialColumns, trialStart, trialWalkthrough, trialAttributes);
	console.log("trial config object created: " + trialConfig);
	
	//write trial config to file
	console.log("writing file: ");

	writeFile();
	
	//link trial config to trial
	trial.setTrialConfig(trialConfig);
	
	// test if global trial and trial config objects are correct filled
	//testGlobalTrial();
}


function createTrialConfigFromFile(_attributes,_trialAttributes,_trialName,_trialRows,_trialColumns,_trialStart,_trialWalkthrough){
	console.log("### createTrialConfig with parameters entered ###");
	

	var attributes = _attributes;
	var trialName = _trialName;
	var trialRows = _trialRows;
	var trialColumns = _trialColumns;
	var trialStart = _trialStart;
	var trialWalkthrough = _trialWalkthrough;
	var trialAttributes = _trialAttributes;
	
	
	/*
	 * log outputs to check values
	 */
	console.log("Count of attributes: " + attributes);
	console.log("Trial name: " + trialName);
	console.log("Trial rows: " + trialRows);
	console.log("Trial columns: " + trialColumns);
	console.log("Trial start: " + trialStart);
	console.log("Trial walkthrough: " + trialWalkthrough);
	
	/*
	 * end log outputs
	 */
	
	//create array of trial config attributes
//	for(j=0;j<attributes;j++){
//		var actualType = $('#type'+(j+1), form).val();
//		console.log("Actual type: " + actualType);
//		var actualScale = $('#scale'+(j+1), form).val();
//		console.log("Actual scale: " + actualScale);
//		var actualCount = $('#count'+(j+1), form).val();
//		console.log("Actual count: " + actualCount);
//		var actualTrialConfigAttribute = new TrialConfigAttribute(actualType, actualScale, actualCount)
//		trialAttributes.push(actualTrialConfigAttribute);
//		console.log("Attribute added: " + actualTrialConfigAttribute.TCAtype);
//	}
	console.log("Length of Attribute array: " + trialAttributes.length);

	//create trial config
	trialConfig = new TrialConfig(trialRows, trialColumns, trialStart, trialWalkthrough, trialAttributes);
	console.log("trial config object created: " + trialConfig);
	
	//write trial config to file
	//console.log("writing file: ");
	//writeFile(trialConfig);
	
	//link trial config to trial
	trial.setTrialConfig(trialConfig);
	
	// test if global trial and trial config objects are correct filled
	//testGlobalTrial();
	
	showAlert("Versuch geladen", "Versuch wurde erfolgreich geladen.","startNewConfigOrHome");
}




function testGlobalTrial(){
	
	console.log("Trial - ID: " + trial.Tid);
	console.log("Trial - Title: " + trial.Ttitle);
	console.log("Trial - Date: " + trial.Tdate);
	console.log("Trial - Protocol ID: " + trial.TprotocolId);
	console.log("Trial - Investigator: " + trial.Tinvestigator);
	console.log("Trial - Study director: " + trial.TstudyDirector);
	console.log("Trial - Location: " + trial.Tlocation);
	console.log("TrialConfig - Row: " + trial.Tconfig.TCrows);
	console.log("TrialConfig - Columns: " + trial.Tconfig.TCcolumns);
	console.log("TrialConfig - Walkthrough: " + trial.Tconfig.TCwalkthrough);
	console.log("TrialConfig - Start: " + trial.Tconfig.TCstart);
	console.log("TrialConfig - Attributes count: " + trial.Tconfig.TCattributes.length);
}




function writeFile() {
	console.log("writeFile() entered");
	 window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);
	 function gotFS(fileSystem) {
//		 console.log("path before: "+fileSystem.root.fullPath);
		 
		 fileSystem.root.fullPath=tmpTrialPath;
		 
//		 console.log("path after: "+fileSystem.root.fullPath);
	        fileSystem.root.getFile("trialConfig.txt", {create: true, exclusive: false}, gotFileEntry, fail);
	    }

	 function gotFileEntry(fileEntry) {
	        fileEntry.createWriter(gotFileWriter, fail);
	    }

	 function gotFileWriter(writer) {
	
	    	/*
	    	 * Write all static config data
	    	 */
	    	var date = new Date();
//	    	writer.write("Date;"+date+"\n"+"Rows;"+trialConfig.TCrows+"\n"+"Columns;"+trialConfig.TCcolumns+"\n"+"Start;"+trialConfig.TCstart+"\n"+"Walkthrough;"+trialConfig.TCwalkthrough+"\n");
	    	writer.write("Tid;"+trial.Tid+"\n"+"Tlocation;"+trial.Tlocation+"\n"+"TstudyDirector;"+trial.TstudyDirector+"\n"+"Tinvestigator;"+trial.Tinvestigator+"\n"+"TprotocolId;"+trial.TprotocolId+"\n"+"Ttitle;"+trial.Ttitle+"\n"+"Tdate;"+trial.Tdate+"\n"+"Tstatus;"+trial.Tstatus+"\n"+"Date;"+date+"\n"+"Rows;"+trialConfig.TCrows+"\n"+"Columns;"+trialConfig.TCcolumns+"\n"+"Start;"+trialConfig.TCstart+"\n"+"Walkthrough;"+trialConfig.TCwalkthrough+"\n"+"AttributeCount;"+trialConfig.TCattributes.length+"\n");	    	
	    	writer.onwriteend = function(evt) {
	    		 /*
	    		  * write header
	    		  */
	    		 writer.write("Attribute type;Attribute unit;Attribute count"+"\n");
		      
		        	writer.onwriteend = function(evt) {
		        		var actualTCattributes = trialConfig.TCattributes;
		        		console.log("static data written....");
		        		var actualData = "";
		        		for(i=0;i<actualTCattributes.length;i++){
		        			/*
		        			 * Write data of actual trial config attribute to file
		        			 */
		        			 actualData = actualData + actualTCattributes[i].TCAtype+";"+actualTCattributes[i].TCAunit+";"+actualTCattributes[i].TCAcount + "\n";
		        		}
		        		writer.write(actualData);
		        		writer.onwriteend = function(evt) {
		        			
		        			showAlert("Versuch angelegt", "Versuch wurde erfolgreich angelegt und Konfiguration geschrieben.","startNewConfigOrHome");
		        		};
		        	};
	    	 };
	    }

	    function fail(error) {
	        console.log(error.code);
	    }
	    
}

//alert without redirect page
function showAlert(title,message) {
	console.log("show alert (title,message)");
    navigator.notification.alert(
        message,  // message
        alertDismissed,         // callback
        title,            // title
        'OK'                  // buttonName
    );
}
//alert with redirect page
function showAlert(title,message,redirect) {
	console.log("show alert (title,message,redirect)");
    navigator.notification.alert(
        message,  // message
        alertDismissed(redirect),         // callback
        title,            // title
        'OK'                  // buttonName
    );
}


// alert dialog dismissed
function alertDismissed() {
	console.log("alert dismissed");
	testGlobalTrial();
	}

//alert dialog dismissed with redirect page
function alertDismissed(redirect) {
	console.log("alert dismissed with redirect");
	testGlobalTrial();
	$.mobile.changePage("index.html#"+redirect, {transition: ""});
}

function clearContainer(_container){
	
	while (_container.hasChildNodes()) {
		_container.removeChild(container.lastChild);
	    }
	return _container;
}

function createTrialData(){
	trial.setTrialStatus("dataCollectionStarted");
	if(trial.Tconfig.TCwalkthrough=="h") {
		createTrialDataHorizontal();
	}else if(trial.Tconfig.TCwalkthrough=="v"){
		createTrialDataVertical();
	}else{
		showAlert("Fehler", "Es wurde keine Durchquerung angegeben !");
	}	
}

function createTrialDataHorizontal(){
	console.log("createTrialData HORIZONTAL entered");
	var container = document.getElementById("content");
	var trialDatasets = new Array();
	var date = new Date();
	trialData = new TrialData(date, trialDatasets);
	
	//rows
	for (r=0;r<trial.Tconfig.TCrows;r++){
		if(r%2==0){
		//columns
		for(c=0;c<trial.Tconfig.TCcolumns;c++){
			//Trial config attributes length
			for(a=0;a<trial.Tconfig.TCattributes.length;a++){
				//Trial config attribute[a] count
				for(b=0;b<trial.Tconfig.TCattributes[a].TCAcount;b++){
					console.log((r+1)+"0"+(c+1)+" -- "+trial.Tconfig.TCattributes[a].TCAtype);
					trialDatasets.push(new TrialDataSet(((r+1)+"0"+(c+1)), trial.Tconfig.TCattributes[a].TCAtype,trial.Tconfig.TCattributes[a].TCAunit, 0, null, null));
					}
				}
			}
		}
		else
		{
			//columns
			for(c=trial.Tconfig.TCcolumns-1;c>=0;c--){				
				//Trial config attributes length
				for(a=0;a<trial.Tconfig.TCattributes.length;a++){					
					//Trial config attribute[a] count
					for(b=0;b<trial.Tconfig.TCattributes[a].TCAcount;b++){						
						console.log((r+1)+"0"+(c+1)+" -- "+trial.Tconfig.TCattributes[a].TCAtype);
						trialDatasets.push(new TrialDataSet(((r+1)+"0"+(c+1)), trial.Tconfig.TCattributes[a].TCAtype,trial.Tconfig.TCattributes[a].TCAunit, 0, null, null));
						}
					}
				}
			}
		}
	trial.setTrialData(trialData);
	console.log("TrialData"+trialData);
	console.log("TrialData dataset length:"+trialData.TDdatasets.length);
	//nextDataset();
}

function createTrialDataVertical(){
	console.log("createTrialData VERTICAL entered");
	var container = document.getElementById("content");
	var trialDatasets = new Array();
	var date = new Date();
	trialData = new TrialData(date, trialDatasets);
	
	//rows
	for (r=0;r<trial.Tconfig.TCcolumns;r++){
		if(r%2==0){
		//columns
		for(c=0;c<trial.Tconfig.TCrows;c++){
			//Trial config attributes length
			for(a=0;a<trial.Tconfig.TCattributes.length;a++){
				//Trial config attribute[a] count
				for(b=0;b<trial.Tconfig.TCattributes[a].TCAcount;b++){
					console.log((c+1)+"0"+(r+1)+" -- "+trial.Tconfig.TCattributes[a].TCAtype);
					trialDatasets.push(new TrialDataSet(((r+1)+"0"+(c+1)), trial.Tconfig.TCattributes[a].TCAtype,trial.Tconfig.TCattributes[a].TCAunit, 0, null, null));
					}
				}
			}
		}
		else
		{
			//columns
			for(c=trial.Tconfig.TCrows-1;c>=0;c--){				
				//Trial config attributes length
				for(a=0;a<trial.Tconfig.TCattributes.length;a++){					
					//Trial config attribute[a] count
					for(b=0;b<trial.Tconfig.TCattributes[a].TCAcount;b++){						
						console.log((c+1)+"0"+(r+1)+" -- "+trial.Tconfig.TCattributes[a].TCAtype);
						trialDatasets.push(new TrialDataSet(((r+1)+"0"+(c+1)), trial.Tconfig.TCattributes[a].TCAtype,trial.Tconfig.TCattributes[a].TCAunit, 0, null, null));
						}
					}
				}
			}
		}
	trial.setTrialData(trialData);
	console.log("TrialData"+trialData);
	console.log("TrialData dataset length:"+trialData.TDdatasets.length);
	//nextDataset();
}




function nextDataset(){
	
	
	
	console.log("#### Next dataset entered #####");
	console.log("Last processed: "+ trialData.getTDlastProcessedDatasetElement());
	console.log("Trial data length: "+ trialData.getTDdatasets().length);
	trial.setTrialStatus("dataCollectionInProgress");
	var actualDataset = new TrialDataSet(null, null, null, null, null, null);
	if(trialData.getTDlastProcessedDatasetElement() < ((trialData.getTDdatasets().length)-1)){
		console.log("#### last processed < length #####");
		if(trialData.getTDlastProcessedDatasetElement()==-1){
			console.log("#### last processed = -1 #####");		
			trialData.setTDlastProcessedDatasetElement(0);
			console.log("Last processed: "+ trialData.getTDlastProcessedDatasetElement());	
		}else{
			console.log("#### last processed != -1 #####");
			var num = trialData.getTDlastProcessedDatasetElement();
			num = num+1;
			trialData.setTDlastProcessedDatasetElement(num);
			console.log("Last processed: "+ trialData.getTDlastProcessedDatasetElement());
		}
		
		actualDataset = trialData.getTDdatasets()[trialData.getTDlastProcessedDatasetElement()];
		console.log("actual Dataset Plot: "+ actualDataset.TDSplot);
		console.log("actual Dataset Type: "+ actualDataset.TDSattributeType);
		console.log("actual Dataset value: "+ actualDataset.TDSvalue);
		console.log("actual Dataset picture: "+ actualDataset.TDSpicture);
		writeGeotagToTrialDataSet(trialData.getTDlastProcessedDatasetElement());
		var x = "<div class=\"ui-block-a\"><b>TrialID:<\/b><\/div> <div class=\"ui-block-b\"><input class=\"ui-disabled\" type=\"text\" name=\"trialId\" id=\"trialId\" placeholder=\"Trial ID\" value=\"" + trial.Tid +"\" data-mini=\"true\" ><\/div> <br\/>"+
				"<div class=\"ui-block-a\"><b>Plot:<\/b><\/div> <div class=\"ui-block-b\"><input class=\"ui-disabled\" type=\"text\" name=\"plot\" id=\"plot\" placeholder=\"Plot\" value=\"" + actualDataset.TDSplot +"\" data-mini=\"true\" ><\/div> <br\/>" +
					"<div class=\"ui-block-a\"><b>Attribut:<\/b><\/div> <div class=\"ui-block-b\"><input class=\"ui-disabled\" type=\"text\" name=\"attribut\" id=\"attribut\" placeholder=\"Attribut\" value=\"" + actualDataset.TDSattributeType +"\" data-mini=\"true\"><\/div><br\/>" +
						"<div class=\"ui-block-a\"><b>Einheit:<\/b><\/div> <div class=\"ui-block-b\"><input class=\"ui-disabled\" type=\"text\" name=\"scale\" id=\"scale\" placeholder=\"Einheit\" value=\"" + actualDataset.TDSscale +"\" data-mini=\"true\"><\/div><br\/>" +
								"<div class=\"ui-block-a\"><b>Wert:<\/b><\/div> <div class=\"ui-block-b\"><input type=\"number\" name=\"value\" id=\"value\" placeholder=\"Wert\" value=\"" + actualDataset.TDSvalue +"\" data-mini=\"true\" onchange=\"saveValue()\"><\/div><br\/>";		
		$("#actualDatasetGrid").html(x);
		$('#value').focus();
		
		// Get image handle
	      //
	      var smallImage = document.getElementById('smallImage');

	      // Unhide image elements
	      //
	      smallImage.style.display = 'block';

	      // Show the captured photo
	      // The in-line CSS rules are used to resize the image
	      //
	     // smallImage.src = "data:image/jpeg;base64," + imageData;
	      var actualPicture = actualDataset.TDSpicture;
	      console.log("actualImage: " + actualPicture);
	      if(actualPicture == null || actualPicture == undefined){
	    	  actualPicture = "img/logo.png";
	      }
	      
	      console.log("actualImage after if: " + actualPicture);
	      smallImage.src = actualPicture;
		
//		var text = "---- Aktueller Datensatz ---- \n\n" + "Plot: " + actualDataset.TDSplot + "\n" + "Attribut: " + actualDataset.TDSattributeType  + "\n"  + "Einheit: " + actualDataset.TDSscale + "\n\n" +"Wert: ";
//		var value=prompt(text,actualDataset.TDSvalue);
//		if (value!=null)
//		  {
//			actualDataset.TDSvalue = value;
//			console.log("actual Dataset value NEW: "+ actualDataset.TDSvalue);
//		  }
		}else{
		console.log("#### last processed !< length #####");
		showAlert("Ende", "Alle Daten des Versuchs erfolgreich aufgezeichnet");
	}
	writeTrialData();
}


function saveValue() {
	
	var form = $('#actualDatasetForm');
	var value = $('#value', form).val();

	var actualDataset = trialData.getTDdatasets()[trialData.getTDlastProcessedDatasetElement()];

	actualDataset.TDSvalue = value;
	
	console.log("actual Dataset value NEW: "+ actualDataset.TDSvalue);
	
}



function prevDataset(){
	console.log("#### Prevdataset entered #####");
	console.log("Last processed: "+ trialData.getTDlastProcessedDatasetElement());
	console.log("Trial data length: "+ trialData.getTDdatasets().length);
	trial.setTrialStatus("dataCollectionInProgress");
	var actualDataset = new TrialDataSet(null, null, null,null, null, null);
	if(trialData.getTDlastProcessedDatasetElement() > 0){
		
			console.log("#### last processed > 0 #####");
			var num = trialData.getTDlastProcessedDatasetElement();
			num = num-1;
			trialData.setTDlastProcessedDatasetElement(num);
			console.log("Last processed: "+ trialData.getTDlastProcessedDatasetElement());
		
		
		actualDataset = trialData.getTDdatasets()[trialData.getTDlastProcessedDatasetElement()];
		console.log("actual Dataset Plot: "+ actualDataset.TDSplot);
		console.log("actual Dataset Type: "+ actualDataset.TDSattributeType);
		console.log("actual Dataset value: "+ actualDataset.TDSvalue);
		writeGeotagToTrialDataSet(trialData.getTDlastProcessedDatasetElement());	
		var x = "<div class=\"ui-block-a\"><b>Trial ID:<\/b><\/div> <div class=\"ui-block-b\"><input class=\"ui-disabled\" type=\"text\" name=\"trialId\" id=\"trialId\" placeholder=\"Trial ID\" value=\"" + trial.Tid +"\" data-mini=\"true\" ><\/div> <br\/>"+
			"<div class=\"ui-block-a\"><b>Plot:<\/b><\/div> <div class=\"ui-block-b\"><input class=\"ui-disabled\" type=\"text\" name=\"plot\" id=\"plot\" placeholder=\"Plot\" value=\"" + actualDataset.TDSplot +"\" data-mini=\"true\"><\/div> <br\/>" +
		"<div class=\"ui-block-a\"><b>Attribut:<\/b><\/div> <div class=\"ui-block-b\"><input class=\"ui-disabled\" type=\"text\" name=\"attribut\" id=\"attribut\" placeholder=\"Attribut\" value=\"" + actualDataset.TDSattributeType +"\" data-mini=\"true\"><\/div><br\/>" +
			"<div class=\"ui-block-a\"><b>Einheit:<\/b><\/div> <div class=\"ui-block-b\"><input class=\"ui-disabled\" type=\"text\" name=\"scale\" id=\"scale\" placeholder=\"Einheit\" value=\"" + actualDataset.TDSscale +"\" data-mini=\"true\"><\/div><br\/>" +
					"<div class=\"ui-block-a\"><b>Wert:<\/b><\/div> <div class=\"ui-block-b\"><input type=\"number\" name=\"value\" id=\"value\" placeholder=\"Wert\" value=\"" + actualDataset.TDSvalue +"\" data-mini=\"true\" onchange=\"saveValue()\"><\/div><br\/>";		
		$("#actualDatasetGrid").html(x);
		$('#value').focus();
		// Get image handle
	      //
	      var smallImage = document.getElementById('smallImage');

	      // Unhide image elements
	      //
	      smallImage.style.display = 'block';

	      // Show the captured photo
	      // The in-line CSS rules are used to resize the image
	      //
	     // smallImage.src = "data:image/jpeg;base64," + imageData;
	      var actualPicture = actualDataset.TDSpicture;
	      console.log("actualImage: " + actualPicture);
	      if(actualPicture == null || actualPicture == undefined){
	    	  actualPicture = "img/logo.png";
	      }
	      
	      console.log("actualImage after if: " + actualPicture);
	      smallImage.src = actualPicture;
		
//		var text = "Plot: " + actualDataset.TDSplot + "\n" + "Attribut: " + actualDataset.TDSattributeType  + "\n"  + "Einheit: " + actualDataset.TDSscale + "\n\n" +"Wert: ";
//		var value=prompt(text,actualDataset.TDSvalue);
//
//		if (value!=null)
//		  {
//			actualDataset.TDSvalue = value;
//			console.log("actual Dataset value NEW: "+ actualDataset.TDSvalue);
//
//		  }

	}else{
		console.log("#### last processed < 0 #####");
		showAlert("Ende", "Erster Datensatz erreicht oder noch keine Datens&auml;tze eingegeben");
	}
	writeTrialData();
}



function pauseDatacollection(){
	trial.setTrialStatus("dataCollectionPaused");
	writeTrialData();
	
}

function endDatacollection(){
	if(trial!=null){
	trial.setTrialStatus("dataCollectionEnded");
	writeTrialData();
	}
	
	$.mobile.changePage("index.html#collectionEnded", {transition: "none"} );
	
}

function closeDataCollection(){
	trial=null;
	trialConfig=null;
	trialData=null;
	trialDataSet=null;
	
	history.go(-(history.length - 1));
	window.location.replace("index.html");
}

function writeTrialData(){
	console.log("#### writeTrial Data entered ####");
	 window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS1, fail);
	 
	 function gotFS1(fileSystem) {
		 console.log("#### gotFS1 ####");
		 var date = new Date();
		 var trialId = trial.Tid;
		 var trialTitle = trial.Ttitle; 
		 var year = date.getFullYear();
		 var month = date.getMonth()+1;
		 var day = date.getDate();
		 var filename = trialId+"_"+trialTitle+".txt";
		 fileSystem.root.fullPath="/"+ trialFolder +"/";
	        fileSystem.root.getFile(filename, {create: true, exclusive: false}, gotFileEntry1, fail);
	    }

	 function gotFileEntry1(fileEntry1) {
		 console.log("#### gotFileEntry1 ####");
	        fileEntry1.createWriter(gotFileWriter1, fail);
	    }

	 function gotFileWriter1(writer1) {
		 console.log("#### gotFileWriter1 ####");
	
	    	/*
	    	 * Write all static config data
	    	 */
	    	var date = new Date();
	    	writer1.write("Tid;"+trial.Tid+"\n"+"Tlocation;"+trial.Tlocation+"\n"+"TstudyDirector;"+trial.TstudyDirector+"\n"+"Tinvestigator;"+trial.Tinvestigator+"\n"+"TprotocolId;"+trial.TprotocolId+"\n"+"Ttitle;"+trial.Ttitle+"\n"+"Tdate;"+trial.Tdate+"\n"+"Tstatus;"+trial.Tstatus+"\n"+"Date;"+date+"\n"+"Rows;"+trialConfig.TCrows+"\n"+"Columns;"+trialConfig.TCcolumns+"\n"+"Start;"+trialConfig.TCstart+"\n"+"Walkthrough;"+trialConfig.TCwalkthrough+"\n"+"AttributeCount;"+trialConfig.TCattributes.length+"\n");
	    	 writer1.onwriteend = function(evt) {
	    		 /*
	    		  * write header
	    		  */
	    		 writer1.write("Attribute type;Attribute unit;Attribute count"+"\n");
		      
		        	writer1.onwriteend = function(evt) {
		        		var actualTCattributes = trialConfig.TCattributes;
		        		console.log("static data written 1 ....");
		        		var actualData = "";
		        		for(i=0;i<actualTCattributes.length;i++){
		        			/*
		        			 * Write data of actual trial config attribute to file
		        			 */
		        			 actualData = actualData + actualTCattributes[i].TCAtype+";"+actualTCattributes[i].TCAunit+";"+actualTCattributes[i].TCAcount + "\n";
		        		}
		        		writer1.write(actualData);
		        		
		        		writer1.onwriteend = function(evt) {
		        			//console.log("attribute data written 1 ....");
		        	//		showAlert("Versuch angelegt", "Versuch wurde erfolgreich angelegt und Konfiguration geschrieben.","startNewConfigOrHome");
		        			
		        		//	writer.onwriteend = function(evt) {
			        			console.log("write trial Data 1 ....");
			        			
			        			var actualTrialData = trial.getTrialData();
			        			console.log("actual trial Data 1: " + actualTrialData);
			        			var actualTrialDataString = "";
		        			for(i = 0;i<actualTrialData.getTDdatasets().length;i++){
			        				actualTrialDataString = actualTrialDataString + actualTrialData.TDdatasets[i].TDSplot + ";" + actualTrialData.TDdatasets[i].TDSattributeType + ";" + actualTrialData.TDdatasets[i].TDSscale + ";" + actualTrialData.TDdatasets[i].TDSvalue + ";" + actualTrialData.TDdatasets[i].TDSpicture + ";" + actualTrialData.TDdatasets[i].TDSgeotag + "\n";
			        			}
			        			writer1.write(actualTrialDataString);
			        			//showAlert("Versuchsdaten geschrieben", "Versuchsdaten erfolgreich geschrieben");
			        			writer1.onwriteend = function(evt) {
				        			console.log("ALL data written to trialData.txt");
//				        			showAlert("Daten geschrieben", "Versuch wurde erfolgreich angelegt, Konfiguration und aufgezeichnete Daten geschrieben.");
				        		};
			        	
		        		};
		        	};
	    	 };
	    	 console.log("DATA WRITTEN");
	    }

	    function fail(error) {
	        console.log(error.code);
	    }
	    

	
}

function getLocation() {
 var actualPosition = null;
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
    // onSuccess Geolocation
    function onSuccess(position) {
    	
//    	$.mobile.pageContainer.pagecontainer ("change", "index.html#accPage", {transition: "flip"});
//        var element = document.getElementById('geo');
//        element.innerHTML = 'Latitude: '           + position.coords.latitude              + '<br />' +
//                            'Longitude: '          + position.coords.longitude             + '<br />' +
//                            'Altitude: '           + position.coords.altitude              + '<br />' +
//                            'Accuracy: '           + position.coords.accuracy              + '<br />' +
//                            'Altitude Accuracy: '  + position.coords.altitudeAccuracy      + '<br />' +
//                            'Heading: '            + position.coords.heading               + '<br />' +
//                            'Speed: '              + position.coords.speed                 + '<br />' +
//                            'Timestamp: '          + position.timestamp                    + '<br />';
    	console.log("Position in getLocation:" + position.coords.latitude + "/" + position.coords.longitude + "/" + position.coords.altitude);
    	
    	geotag = position;
    	
    	//console.log("Position in getLocation2:" + actualPosition.coords.latitude + "/" + actualPosition.coords.longitude + "/" + actualPosition.coords.altitude);
    	
    	}
    	
    // onError Callback receives a PositionError object
    //
    function onError(error) {
        alert('code: '    + error.code    + '\n' +
              'message: ' + error.message + '\n');
    }
}

function writeGeotagToTrialDataSet(number){
	var actualDataset = trial.getTrialData().TDdatasets[number];
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
    // onSuccess Geolocation
    function onSuccess(position) {
    	console.log("Position in writeGeotagToTrialDataSet:" + position.coords.latitude + "/" + position.coords.longitude + "/" + position.coords.altitude);
    	actualDataset.TDSgeotag = position.coords.latitude + "/" + position.coords.longitude + "/" + position.coords.altitude;
    	}
    	
    // onError Callback receives a PositionError object
    //
    function onError(error) {
        alert('code: '    + error.code    + '\n' +
              'message: ' + error.message + '\n');
    }
	
	
	
}

function addImage(){
	
	$.mobile.changePage("index.html#fotoPage", {transition: ""});
	
}
	
	
	
    
    
    
 // Called when a photo is successfully retrieved
    //
    function onPhotoDataSuccess(imageData) {
      // Uncomment to view the base64-encoded image data
       console.log("IMAGE DATA: "+  imageData);

    // store photo to actual dataset
       var lastProcessed = trial.getTrialData().getTDlastProcessedDatasetElement();
       console.log("last element: " + lastProcessed);
   	var actualDataset = trial.getTrialData().TDdatasets[lastProcessed];
   	console.log("actualDataset value: "+actualDataset.TDSvalue)
   	actualDataset.TDSpicture = imageData;
  
   	trialPictureSet.push(imageData);
   	console.log("picture set lenght:  "+trialPictureSet.length);
   	for(d=0;d<trialPictureSet.length;d++){
   		console.log("picture:  "+trialPictureSet[d]);
   	}
    	
    	
    	
      // Get image handle
      //
      var smallImage = document.getElementById('smallImage');

      // Unhide image elements
      //
      smallImage.style.display = 'block';

      // Show the captured photo
      // The in-line CSS rules are used to resize the image
      //
     // smallImage.src = "data:image/jpeg;base64," + imageData;
      smallImage.src = imageData;
    }

    // Called when a photo is successfully retrieved
    //
    function onPhotoURISuccess(imageURI) {
      // Uncomment to view the image file URI
      // console.log(imageURI);

      // Get image handle
      //
      var largeImage = document.getElementById('largeImage');

      // Unhide image elements
      //
      largeImage.style.display = 'block';

      // Show the captured photo
      // The in-line CSS rules are used to resize the image
      //
      largeImage.src = imageURI;
    }

    // A button will call this function
    //
    function capturePhoto() {
      // Take picture using device camera and retrieve image as base64-encoded string
      navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 70,
        destinationType: destinationType.DATA_URI });
    }

    // A button will call this function
    //
    function capturePhotoEdit() {
      // Take picture using device camera, allow edit, and retrieve image as base64-encoded string
      navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 20, allowEdit: true,
        destinationType: destinationType.DATA_URL });
    }

    // A button will call this function
    //
    function getPhoto(source) {
      // Retrieve image file location from specified source
      navigator.camera.getPicture(onPhotoURISuccess, onFail, { quality: 70,
        destinationType: destinationType.FILE_URI,
        sourceType: source });
    }

    // Called if something bad happens.
    //
    function onFail(message) {
      alert('Failed because: ' + message);
    }
    
    
    
    function init() {
        document.addEventListener("deviceready", onDeviceReady, false);
    }
    
    
    function onDeviceReady() {
    	console.log("Cordova is ready! Cordova is ready!");
    	document.addEventListener("backbutton", onBackKeyDown, false);
    	
    	
    	pictureSource=navigator.camera.PictureSourceType;
        destinationType=navigator.camera.DestinationType;
        navigator.splashscreen.hide();
      
}
    
    /**
     * On backButton click Exit App
     */
    function onBackKeyDown() {
    	if($.mobile.activePage.is("#start")) {
    		navigator.app.exitApp(); // Exit app if current page is start Page
    	} else {
    		navigator.app.backHistory(); // Go back in history in any other case
    	}
    }
    
    function readFile(actualFile){
    	console.log("readFile entered ....");
    	var fileText ="";
 
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);

        function gotFS(fileSystem) {
            fileSystem.root.getFile(actualFile, null, gotFileEntry, fail);
        }

        function gotFileEntry(fileEntry) {
            fileEntry.file(gotFile, fail);
        }

        function gotFile(file){
          //  readDataUrl(file);
            readAsText(file);
        }

        function readDataUrl(file) {
            var reader = new FileReader();
            reader.onloadend = function(evt) {
                console.log("Read as data URL");
                console.log(evt.target.result);
                
            };
            reader.readAsDataURL(file);
        }

        function readAsText(file) {
        	
            var reader = new FileReader();
            reader.onloadend = function(evt) {
                console.log("Read as text");
                console.log(evt.target.result);
                fileText = evt.target.result;
                console.log("fileText:  "+fileText);
                loadConfig(fileText);
            };
            reader.readAsText(file);
        }

        function fail(error) {
            console.log(error.code);
        }
    
    }
    
    function loadConfig(_fileText){
    	
    	var fileText = _fileText;
    	
    	var trialTitle = "";
    	var trialID = "";
    	var trialDate = "";
    	var trialProtocolID = "";
    	var trialInvestigator = "";
    	var trialStudyDirector = "";
    	var trialLocation = "";
    	var attributes = "";
    	var trialName = "";
    	var trialRows = "";
    	var trialColumns = "";
    	var trialStart = "";
    	var trialWalkthrough = "";
    	var trialAttributes = new Array();
    	
    	
    	var lines = fileText.split("\n");
    	var numLines = lines.length;
    	
    	
    	
    	console.log("LINES:   "+numLines);
    	
    	
    	for(i=0;i<lines.length;i++){
    		console.log("Line "+i+": "+lines[i]);
    	}
    	
    	var rows = lines[9].split(";");
    	trialRows = rows[1];
    	var cols = lines[10].split(";");
    	trialColumns = cols[1];
    	var start = lines[11].split(";");
    	trialStart = start[1];
    	var wt = lines[12].split(";");
    	trialWalkthrough = wt[1];
    	var tt = lines[5].split(";");
    	trialTitle = tt[1];
    	var tid = lines[0].split(";");
    	trialID = tid[1];
    	var td = lines[6].split(";");
    	trialDate = td[1];
    	var tpid = lines[4].split(";");
    	trialProtocolID = tpid[1];
    	var tin = lines[3].split(";");
    	trialInvestigator = tin[1];
    	var tsd = lines[2].split(";");
    	trialStudyDirector = tsd[1];
    	var tl = lines[1].split(";");
    	trialLocation = tl[1];
    	var attri = lines[13].split(";");
    	attributes = attri[1];
    	var end = parseInt(attributes) +15;
    	console.log("END in loop: "+end);
    	
    	for(a=15;a<end;a++){
    		console.log("Line in loop:  "+a+": "+lines[a]);
    		var actualAttribLine=lines[a].split(";");
    		var actualType = actualAttribLine[0];
    		console.log("Actual type: " + actualType);
    		var actualScale = actualAttribLine[1];
    		console.log("Actual scale: " + actualScale);
    		var actualCount = actualAttribLine[2];
    		console.log("Actual count: " + actualCount);
    		var actualTrialConfigAttribute = new TrialConfigAttribute(actualType, actualScale, actualCount)
    		trialAttributes.push(actualTrialConfigAttribute);
    		console.log("Attribute added: " + actualTrialConfigAttribute.TCAtype);
    	}
    
   
    	//create trial
    	createTrialFromFile(trialTitle, trialID, trialDate, trialProtocolID, trialInvestigator, trialStudyDirector, trialLocation);
    	
    	// create trialConfig
    	createTrialConfigFromFile(attributes,trialAttributes, trialName, trialRows, trialColumns, trialStart, trialWalkthrough);
    	
    }
    
    
    function dirListing(){
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, onFileSystemSuccess,onFileSystemFail); 
    
    function onFileSystemSuccess(fileSystem) {
        console.log(fileSystem.name);
       
       var directoryEntry = fileSystem.root;
       console.log("Root = " + fileSystem.root.fullPath);
      directoryEntry.getDirectory("Trials",{create:false,exclusive:false},onDirectorySuccess,onDirectoryFail);
      
      // var directoryEntry = "file:///storage/emulated/0";
//        var directoryReader = directoryEntry.createReader();
//        directoryReader.readEntries(successDirectoryReader,failDirectoryReader);
         
       // directoryEntry.getDirectory("Trials", {create: true, exclusive: false}, onDirectorySuccess, onDirectoryFail)
    }
    
//        console.log("Root = " + fs.root.fullPath);
//        var directoryEntry = fs.root;
//        directoryEntry.getDirectory("Trials",{create:false,exclusive:false},onDirectorySuccess,onDirectoryFail);
//        var directoryReader = fs.root.createReader();
//        var x = "<div class=\"ui-block-a\"><b><u>Dateiname:<\/b></u><\/div>  <br\/>";
//        directoryReader.readEntries(function(entries) {
//            var i;
//            for (i=0; i<entries.length; i++) {
//                console.log(entries[i].name);
//                if(entries[i].isDirectory){
//                	console.log("DIRECTORY: "+entries[i].name);
//                }else{
//                	console.log("File: "+entries[i].name);
//                	x = x + "<div class=\"ui-block-a\"><b>" + entries[i].name+ "<\/b><\/div>  <br\/> ";
//                	
//                	
//                	$("#actualDirectoryListeningGrid").html(x);
//                	
//                	
//                }
//
//            }
//        }, function (error) {
//            alert(error.code);
//        })
//   }, function (error) {
//           alert(error.code);
//   });
    
    
    
    
    function onDirectorySuccess(parent) {
           console.log(parent.name);
           var directoryReader = parent.createReader();
           directoryReader.readEntries(successDirectoryReader,failDirectoryReader);
        }
        
        
        function onDirectoryFail(error) {
            alert("Unable to create new directory: " + error.code);
       }
        
        function onFileSystemFail(evt) {
            console.log(evt.target.error.code);
        }
        
    }
    
    
    
        
    
    
    
    /**
     * File explorer logic
     */
    var currentPath = "";
//    $('#loadConfig').live('pagebeforeshow', function(event) {
//        populate(currentPath);
//    });
    function populate(){
    	var path = "file:///";
    	console.log("populate PATH eneterd ");
        try {
        	window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS1, fail);
        
        function gotFS1(fs){
        	console.log("Root = " + fs.root.fullPath);
            var directoryReader = fs.root.createReader();
        	
        	fs.root.getFile(actualFile, null, gotFileEntry, fail);
            var dirEntry = new DirectoryEntry({fullPath: path});
            var directoryReader = dirEntry.createReader();
           directoryReader.readEntries(successDirectoryReader,failDirectoryReader);
        }
        } catch (e) {
            alert(dump(e));
        }
    }
    
    
    function successDirectoryReader(entries) {
    	actualEntries = entries;
    	console.log("success directory eneterd ");
    	console.log("PATH entries:"+entries.fullPath);
        var i;
        $("#Explorer").html('');
        for (i=0; i<entries.length; i++) {
        	actualFileCounter = 1;
            if (entries[i].isDirectory) {
                $("#Explorer").append("<div style='float:left;text-align:center;'><div><img src='img/folder.png' width='25px' height='25px' style='border:2px;' onclick=''/></div><div style='width:100px;word-wrap:break-word;'>" + entries[i].name + "</div></div>");
            } else {
                //var fileType = blackberry.io.file.getFileProperties(entries[i].fullPath).mimeType;
               // if (Left(fileType,5) == 'image') {
                    // if file is of type image, then show in small size
                 //   $("#Explorer").append("<div style='width:104px;float:left;text-align:center;'><div><img src='" + entries[i].fullPath + "' height='80px' width='80px' style='border:2px;' /></div><div  style='width:100px;word-wrap:break-word;'>" + entries[i].name + "</div></div>");
               // } else {
                    $("#Explorer").append("<div style='float:left;text-align:center;'><div><img src='img/file.png' width='25px' height='25px' style='border:2px;' onclick='openFile("+i+")' /></div><div>" + entries[i].name + "</div></div>");
                //}
            }
        }
        // add an option to go to parent directory
        if (currentPath != "file:///store") {
            $("#Explorer").append("<div style='float:left;text-align:center;'><div><img src='img/folder.png' width='25px' height='25px' style='border:2px;' onclick=''/></div><div style='width:100px;word-wrap:break-word;'>..</div></div>");
        }
    }
    
    function openFile(x){
    	console.log("File to read: " + actualEntries[x].name);
    	readFile(trialFolder+"/"+actualEntries[x].name);
    	
    }
    
    
    function failDirectoryReader(error) {
    	console.log("vail directory reader eneterd ");
        alert("Failed to list directory contents: " + error.code);
    }
    function backPath() {
    	console.log("back PATH eneterd ");
        currentPath = Left(currentPath, currentPath.lastIndexOf('/'));
        populate(currentPath);
    }
    function changePath(ele){
    	console.log("change PATH eneterd ");
    	//console.log("PaTH:  "+ele.fullPath);
        currentPath = currentPath + "/" + $(ele).parent().next().html();
        console.log("PATH: "+currentPath);
        dirListing1(currentPath);
       // populate(currentPath);
    }
     
    //Error dump function
    function dump(arr,level) {
    	console.log("dump eneterd ");
        var dumped_text = "";
        if(!level) level = 0;
     
        var level_padding = "";
        for(var j=0;j<level+1;j++) level_padding += "    ";
     
        if(typeof(arr) == 'object') { 
            for(var item in arr) {
                var value = arr[item];
     
                if(typeof(value) == 'object') {
                    dumped_text += level_padding + "'" + item + "' ...\n";
                    dumped_text += dump(value,level+1);
                } else {
                    dumped_text += level_padding + "'" + item + "' => \"" + value + "\"\n";
                }
            }
        } else {
            dumped_text = "===>"+arr+"<===("+typeof(arr)+")";
        }
        return dumped_text;
    }
     
    //String left function
    function Left(str, n){
    	console.log("left eneterd ");
        if (n <= 0)
            return "";
        else if (n > String(str).length)
            return str;
        else
            return String(str).substring(0,n);
    }
    
    
    function exitFromApp()
    {
       navigator.app.exitApp();
    }
    
    
    
    
    function fetchConfigFromServer(){
    	var fileTransfer = new FileTransfer();
    	var uri = encodeURI("http://10.0.0.12:8090/FileUpDownload/filedownloadservlet");
    	var filePath = devicePath + "/"+trialFolder+"/testDownload.txt";

    	fileTransfer.download(uri,filePath,
    			function(entry) {
    	        console.log("download complete: " + entry.fullPath + "  Name: " +entry.name);
    	    
    	    
    	    
    	    },
    	    function(error) {
    	        console.log("download error source " + error.source);
    	        console.log("download error target " + error.target);
    	        console.log("upload error code" + error.code);
    	    },
    	    false,
    	    {
    	        headers: {
    	            "Authorization": "Basic dGVzdHVzZXJuYW1lOnRlc3RwYXNzd29yZA=="
    	        }
    	    }
    	);

    }
    
    function pushDataToServer(){
    	console.log("push data to server entered ");
    	var allOK = true;
    	var trialId = trial.Tid;
		 var trialTitle = trial.Ttitle; 
    	 var trialpath = devicePath+trialFolder+"/" +trialId+"_"+trialTitle+".txt";;
    	 
    	 console.log("trialpath: " + trialpath);
    	 var options = new FileUploadOptions();
         options.fileKey="file";
         options.fileName=trialpath.substr(trialpath.lastIndexOf('/')+1);
        // options.mimeType="image/jpeg";

         var params = {};
         

         options.params = params;

         var ft = new FileTransfer();
         ft.upload(trialpath, encodeURI(serverPath), win, fail, options);
         
         
         
         for(i=0;i<trialPictureSet.length;i++){
        	 params.corrsepondigTrial = trialId+"_"+trialTitle;
        	 options.mimeType="image/jpeg";
        	 options.fileName =  trialPictureSet[i].substr(trialPictureSet[i].lastIndexOf('/')+1);
        	  ft.upload(trialPictureSet[i], encodeURI(serverPath), win, fail, options); 
         }
         
         if(allOK){
        	 showAlert("Upload erfolreich" ,"Versuch erfolgreich uebertragen ")
         }
     }

     function win(r) {
         console.log("Code = " + r.responseCode);
         console.log("Response = " + r.response);
         console.log("Sent = " + r.bytesSent);
         
     }

     function fail(error) {
         alert("An error has occurred: Code = " + error.code);
         console.log("upload error source " + error.source);
         console.log("upload error target " + error.target);
         allOK = false;
     }
     

    	
    
    
    
 