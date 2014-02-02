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
var geotag = null;
var pictureSource;   // picture source
var destinationType; // sets the format of returned value



function Trial(Tid, Tlocation,TstudyDirector,Tinvestigator,TprotocolId,Ttitle,Tdate,Tconfig,Tdata){
	
	this.Tid = Tid;
	this.Tlocation = Tlocation;
	this.TstudyDirector = TstudyDirector;
	this.Tinvestigator = Tinvestigator;
	this.TprotocolId = TprotocolId;
	this.Ttitle =  Ttitle;
	this.Tdate = Tdate;
	this.Tconfig = Tconfig;
	this.Tdata = Tdata;
	
	
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
	var trialProtoclID = $('#trialProtocolID', form).val();
	var trialInvestigator = $('#trialInvestigator', form).val();
	var trialStudyDirector = $('#trialStudyDirector', form).val();
	var trialLocation = $('#trialLocation', form).val();
	
	
	/*
	 * log outputs to check values
	 */
	console.log("Title: " + trialTitle);
	console.log("ID: " + trialID);
	console.log("Date: " + trialDate);
	console.log("Protocol ID: " + trialProtoclID);
	console.log("Investigator: " + trialInvestigator);
	console.log("Study director: " + trialStudyDirector);
	console.log("Location: " + trialLocation);
	
	/*
	 * end log outputs
	 */

	//create trial
	trial = new Trial(trialID, trialLocation, trialStudyDirector, trialInvestigator, trialProtoclID, trialTitle, trialDate, null, null);
	console.log("trial object created: " + trial);
	
	$.mobile.changePage("index.html#configManuallyConfigData", {transition: ""});
	
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
	writeFile(trialConfig);
	
	//link trial config to trial
	trial.setTrialConfig(trialConfig);
	
	// test if global trial and trial config objects are correct filled
	//testGlobalTrial();
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
	console.log("TrialConfig - Columns: " + trial.Tconfig.TColumns);
	console.log("TrialConfig - Walkthrough: " + trial.Tconfig.TCwalkthrough);
	console.log("TrialConfig - Start: " + trial.Tconfig.TCstart);
	console.log("TrialConfig - Attributes count: " + trial.Tconfig.TCattributes.length);
}




function writeFile() {
	 window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);
	 function gotFS(fileSystem) {
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
	    	writer.write("Date;"+date+"\n"+"Rows;"+trialConfig.TCrows+"\n"+"Columns;"+trialConfig.TCcolumns+"\n"+"Start;"+trialConfig.TCstart+"\n"+"Walkthrough;"+trialConfig.TCwalkthrough+"\n");
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
		        			console.log("attribute data written....");
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
		var x = "<div class=\"ui-block-a\"><b>Plot:<\/b><\/div> <div class=\"ui-block-b\"><input class=\"ui-disabled\" type=\"text\" name=\"plot\" id=\"plot\" placeholder=\"Plot\" value=\"" + actualDataset.TDSplot +"\" data-mini=\"true\" ><\/div> <br\/>" +
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
		var x = "<div class=\"ui-block-a\"><b>Plot:<\/b><\/div> <div class=\"ui-block-b\"><input class=\"ui-disabled\" type=\"text\" name=\"plot\" id=\"plot\" placeholder=\"Plot\" value=\"" + actualDataset.TDSplot +"\" data-mini=\"true\"><\/div> <br\/>" +
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
	
}



function pauseDatacollection(){
	writeTrialData();
	
}

function endDatacollection(){
	writeTrialData();
	trial=null;
	trialConfig=null;
	trialData=null;
	trialDataSet=null;
	
	history.go(-(history.length - 1));
	window.location.replace("index.html");
	
	//$.mobile.changePage("index.html#start", {transition: "none",reloadPage:true} );
	
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
		 var filename = trialId+"_"+trialTitle+"_"+year+month+day+".txt";
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
	    	writer1.write("Date;"+date+"\n"+"Rows;"+trialConfig.TCrows+"\n"+"Columns;"+trialConfig.TCcolumns+"\n"+"Start;"+trialConfig.TCstart+"\n"+"Walkthrough;"+trialConfig.TCwalkthrough+"\n");
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
				        			showAlert("Daten geschrieben", "Versuch wurde erfolgreich angelegt, Konfiguration und aufgezeichnete Daten geschrieben.");
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
       console.log(imageData);

    // store photo to actual dataset
       var lastProcessed = trial.getTrialData().getTDlastProcessedDatasetElement();
       console.log("last element: " + lastProcessed);
   	var actualDataset = trial.getTrialData().TDdatasets[lastProcessed];
   	console.log("actualDataset value: "+actualDataset.TDSvalue)
   	actualDataset.TDSpicture = imageData;
    	
    	
    	
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
    	
    	
//    	getTranslator();
//        // register the event listener
//    	document.addEventListener("backbutton", onBackKeyDown, false);
//    	kofferModel = new KofferModel(null, null, null, null);
//    	kofferModel.load();
//    	if(kofferModel.hasCredentials()) {
//    		// if credentials were loaded from local storage put the to form
//    		var form = $('#paramedicLogin');
//            $('#username', form).val(kofferModel.getUserName());
//            $('#password', form).val(kofferModel.getPassword());
//            if(kofferModel.getCourse() != null) {
//            	// if a course is saved in local storage just move to the correct login page
//            	form = $('#courseForm');
//            	$('#coursetype, form').val(kofferModel.getCourse().getId());
//            	moveToCourse();
//            }
//    	}else{
//    		var form = $('#paramedicLogin');
//    		$('#username', form).val('');
//    		$('#password', form).val('');
//    	}
//    	navigator.splashscreen.hide();
//    }
	
	
}
    
    /**
     * On backButton click Exit App
     */
    function onBackKeyDown() {
    	if($.mobile.activePage.is("#loginPage")) {
    		navigator.app.exitApp(); // Exit app if current page is loginPage
    	} else {
    		navigator.app.backHistory(); // Go back in history in any other case
    	}
    }
    
    function readFile(actualFile){
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
                loadConfig();
            };
            reader.readAsText(file);
        }

        function fail(error) {
            console.log(error.code);
        }
    
    }
    
    function loadConfig(){
    	
    	var trialTitle = "";
    	var trialID = "";
    	var trialDate = "";
    	var trialProtoclID = "";
    	var trialInvestigator = "";
    	var trialStudyDirector = "";
    	var trialLocation = "";
    	
   
    	//create trial
    	trial = new Trial(trialID, trialLocation, trialStudyDirector, trialInvestigator, trialProtoclID, trialTitle, trialDate, null, null);
    	console.log("trial object created: " + trial);
    	
    }
    
 