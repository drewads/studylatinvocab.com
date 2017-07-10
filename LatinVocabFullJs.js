//v0.8.0a Stuff to add: restudy the last list, search by contents
createHead();
createBody();

/**
* This function creates the HTML in the <head>
**/
function createHead(){
	FAVICON_LINK = "/icons/torchAndWreath.png";

	createTitle("Nosce Lingua Latina ē wadsworth.tech");
	createLinks(FAVICON_LINK);
	createViewport();

	/**
	* This function creates and appends the page title as a child of <head>
	**/
	function createTitle(titleText){
		let title = document.createElement("title");
		title.appendChild(document.createTextNode(titleText));
		document.head.appendChild(title);
	}

	/**
	* This function creates the google fonts link and the favicon link
	**/
	function createLinks(faviconLink){
		//Google Fonts link for Lato
		let font = document.createElement("link");
		font.rel = "stylesheet";
		font.href = "https://fonts.googleapis.com/css?family=Lato:100,300,400,700,900";
		document.head.appendChild(font);

		//Favicon link
		let favicon = document.createElement("link");
		favicon.rel = "icon";
		favicon.type = "image/png";
		favicon.href = faviconLink;
		favicon.sizes = "32x32";
		document.head.appendChild(favicon);
	}

	function createViewport(){
		let viewport = document.createElement("meta");
		viewport.name = "viewport";
		viewport.content = "width=device-width, initial-scale=1.0";
		document.head.appendChild(viewport);
	}
}

/*
* This function creates the html in the <body> and contains all of the actual
* scripting for this program.
*/
function createBody(){
	let windowWidth = window.innerWidth || document.body.clientWidth;

	setBodyStyle();

	if (windowWidth < 500){
		setBodyStyleMobile();
		createTopMobile();
	}
	else {
		createTopDesktop();
	}

	let listOfLists = getStudyList(null);
	let currentStudyList = shuffle(listOfLists[listOfLists.length - 1][1]);	//Initial list to be studied
	let getModal = createStudyListSearchPage();
	createModalButton();

	let changeStudyList = displayCurrentStudyList();
	createStudyButton();
	let changePrompt = displayPrompt();

	let answerField = createAnswerField();
	createAnswerFieldDiv(answerField, createInfoPopup());

	createReaction();
	displayWordsToStudy();
	createWordsToStudyButton();
	displayWordsStudying();

	runProgram(currentStudyList);

	/**
	* This function sets the common style for the entire body
	**/
	function setBodyStyle(){
		document.body.style.backgroundColor = "#F2F2F2";
		document.body.style.fontFamily = "'Lato', sans-serif";
	}

	function setBodyStyleMobile(){
		document.body.style.textAlign = "center";
	}

	/**
	* This function creates the HTML for the "top" div - the intro text at the top of the page
	**/
	function createTopDesktop(){
		//Div element for this group of elements
		let topDiv = document.createElement("DIV");
		topDiv.class = "top";
		document.body.appendChild(topDiv);
		
		//Very top text
		let topHeader = document.createElement("h1");
	    topHeader.appendChild(document.createTextNode("Nosce Verba Latina!"));
	    topDiv.appendChild(topHeader);

	    //Complement element to subHeader - links to wadsworth.tech/main
	    let linkToMySite = document.createElement("a");
	    linkToMySite.href = "https://wadsworth.tech";
	    linkToMySite.appendChild(document.createTextNode("For more information, check out my personal website."));
	    topDiv.appendChild(linkToMySite);

	    //Display Roman date
	    let latinDate = document.createElement("p");
	    latinDate.appendChild(document.createTextNode(getRomanDate()));
	    latinDate.style.fontSize = "30px";
	    latinDate.style.marginBottom = "0px";
	    topDiv.appendChild(latinDate);

	    //Attribute Roman date to Akshay
	    let akshay = document.createElement("p");
	    akshay.appendChild(document.createTextNode("Thanks to Akshay for the Roman date"));
	    akshay.style.fontSize = "10px";
	    akshay.style.marginTop = "0px";
	    topDiv.appendChild(akshay);

	    //Style
	    topDiv.style.textAlign = "center";
	}

	function createTopMobile(){
		//Div element for this group of elements
		let topDiv = document.createElement("DIV");
		topDiv.class = "top";
		document.body.appendChild(topDiv);
		
		//Very top text
		let topHeader = document.createElement("h1");
	    topHeader.appendChild(document.createTextNode("Nosce Verba Latina!"));
	    topHeader.style.fontSize = "250%";
	    topDiv.appendChild(topHeader);

	    //Complement element to subHeader - links to wadsworth.tech/main
	    let linkToMySite = document.createElement("a");
	    linkToMySite.href = "https://wadsworth.tech";
	    linkToMySite.appendChild(document.createTextNode("For more information, check out my personal website."));
	    linkToMySite.style.fontSize = "80%";
	    topDiv.appendChild(linkToMySite);

	    //Display Roman date
	    let latinDate = document.createElement("p");
	    latinDate.appendChild(document.createTextNode(getRomanDate()));
	    latinDate.style.fontSize = "25px";
	    latinDate.style.marginBottom = "0px";
	    topDiv.appendChild(latinDate);

	    //Attribute Roman date to Akshay
	    let akshay = document.createElement("p");
	    akshay.appendChild(document.createTextNode("Thanks to Akshay for the Roman date"));
	    akshay.style.fontSize = "10px";
	    akshay.style.marginTop = "0px";
	    topDiv.appendChild(akshay);

	    //Style
	    topDiv.style.textAlign = "center";
	}

	/*
	* This function creates the html for the modal box of study list buttons
	* and its children. It also contains the scripting for searching the lists
	* and the button onclick events.
	*/
	function createStudyListSearchPage(){
		
		return createModal();

		/*
		* This function creates the html for the modal box of study list
		* buttons and its children, and it adds the display attributes/
		* function to close the modals.
		*/
		function createModal(){
			let modal = document.createElement("modal");	//The actual modal box
			let opacityBehindModal = document.createElement("modal");	//The shaded area behind the modal box
			styleModal(modal, opacityBehindModal);
			let searchBox = createSearchField(modal);	//The search field
			let listArea = document.createElement("DIV");	//Div parent to study list buttons

			listArea.id = "listArea";
			modal.appendChild(listArea);
			makeStudyListButtons(getStudyList(null), listArea);

			//The modal system is initially unseen
			opacityBehindModal.style.display = "none";
			modal.style.display = "none";

			//Closes the modal system when user clicks on partially opaque modal
			opacityBehindModal.onclick = function(){
				modal.style.display = "none";
				opacityBehindModal.style.display = "none";
			}

			//Allows other methods to access the modal system
			function getModal(isBackground){
				if (isBackground)
					return opacityBehindModal;
				else return modal;
			}
			
			document.body.appendChild(modal);
			document.body.appendChild(opacityBehindModal);

			return getModal;
		}
		
		/*
		* This function adds styling to the modal box of study list buttons
		* and the opaque gray modal behind it.
		*/
		function styleModal(modal, opacityBehindModal){
			opacityBehindModal.style.zIndex = "2";
			opacityBehindModal.style.position = "fixed";
			opacityBehindModal.style.left = "0";
			opacityBehindModal.style.top = "0";
			opacityBehindModal.style.width = "100%";
			opacityBehindModal.style.height = "100%";
			opacityBehindModal.style.overflow = "auto";
			opacityBehindModal.style.backgroundColor = "gray";
			opacityBehindModal.style.opacity = "0.5";

			modal.style.zIndex = "3";
			modal.style.position = "fixed";
			modal.style.left = "10%";
			modal.style.top = "10%";
			modal.style.width = "80%";
			modal.style.height = "80%";
			modal.style.overflow = "auto";
			modal.style.backgroundColor = "white";
			modal.style.borderRadius = "16px";
			modal.style.padding = "5px";
			modal.style.textAlign = "center";
		}

		/*
		* This function creates the html for the field to search study lists.
		*/
		function createSearchField(studyListModal){
			let search = document.createElement("INPUT");
			styleSearchField(search);

			//Adds the search field to the study list modal
			studyListModal.appendChild(search);

			//Actually runs the search command
			searchLists(search);

			return search;
		}

		/*
		* This function creates the styling for the search field used to
		* search for study lists.
		*/
		function styleSearchField(search){
			search.placeholder = "Search";
			search.autocomplete = "off";
			search.autocorrect = "off";
			search.autocaptalize = "off";
			search.spellcheck = false;

			search.style.width = "60%";
			search.style.height = "30px";
			search.style.padding = "12px 20px";
			search.style.margin = "auto";
			search.style.marginTop = "4px";
			search.style.marginBottom = "4px";
			search.style.border = "1px solid #ccc";
			search.style.borderRadius = "20px";
			search.style.boxSizing = "border-box";
			search.style.fontSize = "16px";
			search.style.backgroundColor = "white";
			search.style.display = "block";

			search.onfocus = function(){
				search.style.outline = "0";
			}
		}

		/*
		* This function takes input from the text field search on each keyup
		* and runs a search for the study lists that are the best match to
		* the value of the search field. It then displays the applicable
		* button elements in the correct order.
		*/
		function searchLists(search){
			let keyWords;	//Array of individual words from the search field

			search.onkeyup = function(e){
				displayFoundStudyLists(augmentListOfStudyLists(findNumKeywordHits(keyWords, search)));
			};
		}

		/*
		* This function returns an array that contains the id of each study list
		* and its corresponding number of keyword hits in arrays of length two.
		*/
		function findNumKeywordHits(keyWords, searchField){
			let orderedLists = new Array();	//list of applicable study lists
			keyWords = getIndividualWords(searchField.value.toLowerCase());

			//Finds the number of times each keyword shows up in the title of each study list
			for (let i = 0; i < listOfLists.length; i++){
				let numFound = 0;	//Number of keyword hits found
				
				for (let j = 0; j < keyWords.length; j++){
					let currentString = listOfLists[i][1].toLowerCase();	//The title of the current study list
					
					//find each instance of each keyword
					while(currentString.indexOf(keyWords[j]) != -1){
						numFound++;
						currentString = currentString.substring(currentString.indexOf(keyWords[j]) + keyWords[j].length);
					}	
				}
				orderedLists.push([listOfLists[i][1], numFound]);	//Associates each list with its number of hits
			}

			return orderedLists;
		}

		/*
		* This function both removes study lists with no keyword hits at all from
		* the array orderedLists and sorts orderedLists by the number of keyword
		* hits.
		*/
		function augmentListOfStudyLists(orderedLists){
			//Removes study lists with no keyword hits at all
			for (let i = 0; i < orderedLists.length;){
				if (orderedLists[i][1] == 0)
				{
					orderedLists.splice(i, 1);
				}
				else i++;
			}

			//Sorts the study lists by number of hits - largest to smallest
			orderedLists.sort(function(a, b) {
   				return b[1] - a[1];
 			});

 			return orderedLists;
		}

		/*
		* This function displays the study lists that match the search keywords in the
		* correct order, and if no lists match, it displays all of the lists in their
		* original order.
		*/
		function displayFoundStudyLists(orderedLists){
			let listArea = document.getElementById("listArea");

			//Clear the study list button parent div
			while (listArea.hasChildNodes()){
				listArea.removeChild(listArea.firstChild);
			}

			let currentButtonList = new Array();	//The list of study lists post search

			//Fills the list of study lists with the actual study lists
			for (let i = 0; i < orderedLists.length; i++){
				for (let j = 0; j < getStudyList(null).length; j++){
					if (orderedLists[i][0] === getStudyList(null)[j][1]){
						currentButtonList.push(getStudyList(null)[j]);
					}
				}
			}

			//Display results
			if (currentButtonList.length == 0)
			{
				makeStudyListButtons(getStudyList(null), listArea)
			}
			else
			{
				makeStudyListButtons(currentButtonList, listArea);
			}
		}

		/*
		* This function creates and returns an array that contains
		* the individual words found in the parameter string.
		*/
		function getIndividualWords(string){
			let words = new Array();

			let nextSpace = string.indexOf(" ");
			
			//Takes words off of string that are split by a space
			while (nextSpace != -1){
				words.push(string.substring(0, nextSpace));
				if (string.length > 0){
					string = string.substring(nextSpace + 1);
				}
				nextSpace = string.indexOf(" ");
			}
			
			if (string.length > 0){
				words.push(string);
			}

			return words;
		}

		/**
		* Creates the button HTML elements that toggle which word list
		* is to be studied.
		**/
		function makeStudyListButtons(chapters, buttonParent){

			//Adds the study list buttons
			for (let chaptersIndex = 0; chaptersIndex < chapters.length; chaptersIndex++){
			    let currentButton = createButton(chapters[chaptersIndex][1], "#555", "2px solid white");
			    buttonParent.appendChild(currentButton);
			    
			    currentButton.onclick = function(){
			        for (let i = 0; i < chapters.length; i++){
			            //Changes studied word list to that associated with this button
			            if (currentButton.id == chapters[i][1]){
			                currentStudyList = shuffle(chapters[i][0]);
			                changeStudyList(chapters[i][1]);
			                changePrompt(0, true);
			                document.getElementById("reaction").innerText = "";
			                document.getElementById("shouldStudy").innerText = "";
			                document.getElementById("study").innerText = "";
			                document.getElementById("Study these words").style.display = "none";
			            }
			        }
			        runProgram(currentStudyList);
			        getModal(false).style.display = "none";
			        getModal(true).style.display = "none";
			    };
			}
		}
	}

	/*
	* This function creates the button that opens the modal box containing the study
	* list buttons.
	*/
	function createModalButton()
	{
		let modalButton = createButton("Change Chapter", "#555", "2px solid #F2F2F2");

		modalButton.onclick = function(){
			getModal(true).style.display = "initial";
			getModal(false).style.display = "initial";
		}

		document.body.appendChild(modalButton);
	}

	/**
	* This function displays the id of the study list being
	* studied. It returns a function that allows the study
	* list to be changed.
	**/
	function displayCurrentStudyList(){
		let currentListName = document.createElement("p");
		changeList(currentStudyList);

		//Style
		currentListName.style.color = "#555";

		document.body.appendChild(currentListName);

		function changeList(newName){
			currentListName.innerText = newName;
			currentStudyList = shuffle(getStudyList(newName)[0]);
		}

		return changeList;
	}

	/**
	* This function creates the button that prints the current study list on click.
	**/
	function createStudyButton(){
		let studyButton = createButton("Study This Chapter", "DarkViolet", "2px solid #F2F2F2");

		//style
		studyButton.style.marginTop = "0px";
		
		studyButton.onclick = function(){
			let chapterWords = currentStudyList;
			let chapterAsString = "";

	        for (let i = 0; i < chapterWords.length; i++)
	        {
	            chapterAsString += chapterWords[i][0] + ": " + chapterWords[i][1] + "\n";
	        }

	        if (document.getElementById("study").innerText == chapterAsString)
	        {
	            document.getElementById("study").innerText = "";
	        }
	        else
	        {
	            document.getElementById("study").innerText = chapterAsString;
	        }
		}

		document.body.appendChild(studyButton);
	}

	/**
	* This function displays the prompt for the current word being studied.
	**/
	function displayPrompt(){
		let prompt = document.createElement("p");

		prompt.style.fontSize = "32px";
		prompt.style.marginTop = "24px";
		prompt.style.marginBottom = "16px";

		changePrompt(0, true);

		document.body.appendChild(prompt);

		function changePrompt(listIndex, isIndex){
			if (isIndex){
				prompt.innerText = currentStudyList[listIndex][0];
			}
			else{
				prompt.innerText = listIndex;
			}
		}

		return changePrompt;

	}

	/**
	* This function creates the input field for the user to
	* enter their answer. It returns the answer field DOM object.
	**/
	function createAnswerField(){
		let inputBox = document.createElement("INPUT");
		inputBox.placeholder = "Answer";
		inputBox.autocomplete = "off";
		inputBox.autocorrect = "off";
		inputBox.autocaptalize = "off";
		inputBox.spellcheck = false;

		//Style for Input Box
		inputBox.style.width = "400px";
		inputBox.style.padding = "12px 20px";
		inputBox.style.margin = "0px 0";
		inputBox.style.marginBottom = "4px";
		inputBox.style.border = "1px solid #ccc";
		inputBox.style.borderRadius = "4px";
		inputBox.style.boxSizing = "border-box";
		inputBox.style.fontSize = "18px";
		inputBox.style.backgroundColor = "#F2F2F2";

		inputBox.onfocus = function(){
			inputBox.style.border = "3px solid #555";
			inputBox.style.marginBottom = "2px";
			inputBox.style.outline = "0";
			inputBox.style.paddingTop = "10px";
			inputBox.style.paddingLeft = "18px";
		}

		inputBox.onblur = function(){
			inputBox.style.border = "1px solid #ccc";
			inputBox.style.marginBottom = "4px";
			inputBox.style.outline = "0";
			inputBox.style.paddingTop = "12px";
			inputBox.style.paddingLeft = "20px";
		}

		return inputBox;
	}

	/*
	* This function creates the information popup and info icon
	* that opens the popup on click.
	*/
	function createInfoPopup(){
		let span = document.createElement("span");
		let infoIcon = document.createElement("IMG");
		let popup = document.createElement("span");

		stylePopup(span, infoIcon, popup);

		popup.innerText = "To get the answer correct, you must input at least one correct English meaning.\nExemplī grātiā: \nPrompt: \"emō\" Enter: \"emere, ēmī, emptum: to buy\"\nPrompt: \"finēs\" Enter: \"finium, n pl: territory\"";

		let toggled = false;
		
		infoIcon.onclick = function(){
			if (!toggled){
				popup.style.visibility = "visible";
				toggled = true;
			}
			else {
				popup.style.visibility = "hidden";
				toggled = false;
			}
		}

		popup.onclick = function(){
			popup.style.visibility = "hidden";
			toggled = false;
		}

		span.appendChild(infoIcon);
		span.appendChild(popup);

		return span;
	}

	/*
	* This function creates the style for the span element
	* containing the info popup and info icon, for the info
	* icon, and for the info popup.
	*/
	function stylePopup(span, infoIcon, popup){
		span.style.position = "relative";
		span.style.cursor = "pointer";
		span.style.userSelect = "none";
		span.id = "popupSpan";

		popup.style.visibility = "hidden";
		popup.style.backgroundColor = "#555";
		popup.style.color = "#fff";
		popup.style.textAlign = "center";
		popup.style.borderRadius = "6px";
		popup.style.padding = "8px 0";
		popup.style.position = "absolute";
		popup.style.zIndex = "1";
		popup.style.bottom = "125%";
		popup.style.left = "50%";
		popup.style.marginBottom = "8px";
		popup.style.marginLeft = "12px";
		popup.style.width = "400px";
		popup.style.opacity = "0.5";

		infoIcon.src = "/icons/info.ico";
		infoIcon.width = "16";
		infoIcon.height = "16";
		infoIcon.style.marginBottom = "16px";
		infoIcon.style.paddingLeft = "4px";
	}

	/**
	* This function creates the parent div element to the
	* answer input field, the info icon, and the info
	* popup.
	**/
	function createAnswerFieldDiv(answerField, popupSpan){
		let inputBoxDiv = document.createElement("DIV");
		inputBoxDiv.appendChild(answerField);
		inputBoxDiv.appendChild(popupSpan);
		inputBoxDiv.id = "inputBox";
		document.body.appendChild(inputBoxDiv);
	}

	/*
	* This function creates the p html element that
	* will contain the text saying whether the last
	* answer was right or not. 
	*/
	function createReaction(){
		let reaction = document.createElement("p");
		reaction.id = "reaction";

		//style
		reaction.style.marginTop = "32px";

		document.body.appendChild(reaction);
	}

	/*
	* Creates the html p element that contains the text of incorrect
	* words after a study list is completed.
	*/
	function displayWordsToStudy(){
		let wordsToStudy = document.createElement("p");
		wordsToStudy.id = "shouldStudy";

		//style
		wordsToStudy.style.marginTop = "32px";

		document.body.appendChild(wordsToStudy);
	}

	/*
	* Creates the button that allows the user to study just the words they got wrong.
	*/
	function createWordsToStudyButton(){
		let studyWordsButton = createButton("Study these words", "#DE0000", "2px solid #555");
	    document.body.appendChild(studyWordsButton);

	    //style
	    studyWordsButton.style.display = "none";
	}

	/*
	* Creates the html p element that contains the text of the current
	* study list if the user wants to study the list.
	*/
	function displayWordsStudying(){
		let wordsStudying = document.createElement("p");
		wordsStudying.id = "study";

		document.body.appendChild(wordsStudying);
	}

	/**
	* Creates a button HTML element with fixed style and animation attributes.
	* Parameters:
	*   value: the text to be displayed in the button and the button id.
	*   backgroundColor: the color of the button
	* Returns:
	*   The button HTML element
	**/
	function createButton(value, backgroundColor, borderOnHover){
		//Create button with text
		var button = document.createElement("BUTTON");
		var text = document.createTextNode(value);
	    button.appendChild(text);
	    button.id = value;

	    //Dynamic button style
	    button.style.backgroundColor = backgroundColor;

	    //Fixed button style
	    button.style.border = "none";
	    button.style.marginRight = "8px";
	    button.style.color = "white";
	    button.style.height = "32px";
	    button.style.marginTop = "16px";
	    button.style.borderRadius = "20px";

	    //Fixed button animation
	    button.onmouseover = function(){
	        button.style.border = borderOnHover;
	        button.style.padding = "2px 4px 3px";
	    };
	    button.onmouseout = function(){
	        button.style.border = "none";
	        button.style.padding = "2px 6px 3px";
	    };
	    button.onfocus = function(){
	    	button.style.outline = "0";
	    };

	    return button;
	}

	/**
	* This function actually processes the input and coordinates a response
	**/
	function runProgram(words)
	{
	    let indexOfCurrentWord = 0;	//Index of the current word in the study list

	    let termsWrong = new Array();	//Array of the words the user got wrong

	    removeIWasRightButton();

	    let entered = false;	//Whether the function useInput has been entered

	    getInput(indexOfCurrentWord);

	    /*
	    * This function takes the user input from the answer field and evaluates it.
	    */
	    function getInput(indexOfCurrentWord)
	    {
	        changePrompt(indexOfCurrentWord, true);
	        answerField.value = "";
	        answerField.onkeydown = function(e){
	        	let key = e.keyCode || e.which;
	        	if (key == 13){
	        		useInput();
	        	}
	        };

	        /*
	        * This function evaluates the user input from the answer field.
	        */
	        function useInput()
	        {
	            if (!entered)
	            {
	                let response = answerField.value;
	                
	                entered = true;

	                let definitionWords = getDefinitionWords(indexOfCurrentWord);

	                let correctDefinition = false;

	                removeIWasRightButton();

	                for (let ind = 0; ind < definitionWords.length; ind++)
	                {
	                    if ((response.substring(response.indexOf(":") + 1)).indexOf(definitionWords[ind]) != -1)
	                    {
	                        correctDefinition = true;
	                    }
	                }
	                
	                if (response.substring(0, response.indexOf(":")) ==
	                	words[indexOfCurrentWord][1].substring(0, words[indexOfCurrentWord][1].indexOf(":"))
	                	&& correctDefinition){

	                    document.getElementById("reaction").innerText = "Good job! \n You said: "
	                    + words[indexOfCurrentWord][0] + ": " + response;

	                    document.getElementById("reaction").style.color = "green";
	                }
	                else{
	                    document.getElementById("reaction").innerText = "Incorrect. \n You said: "
	                    + words[indexOfCurrentWord][0] + ": "
	                    + response + "\nCorrect: " + words[indexOfCurrentWord][0] + ": "
	                    + words[indexOfCurrentWord][1];

	                    document.getElementById("reaction").style.color = "#DE0000";
	                    
	                    termsWrong.push(words[indexOfCurrentWord][0] + ": "
	                    	+ words[indexOfCurrentWord][1]);

	                    let thisButton = createButton("I was actually right", "green", "2px solid #555");

	                    document.getElementById("inputBox").appendChild(thisButton);
	                    
	                    thisButton.style.marginLeft = "8px";
	                    thisButton.style.marginTop = "0px";

	                    thisButton.onclick = function(){
	                        termsWrong.pop();
	                        document.getElementById("reaction").innerText = "Good job! \n You said: "
	                        + words[indexOfCurrentWord][0] + ": " + response;

	                        document.getElementById("reaction").style.color = "green";
	                        inputBox.removeChild(thisButton);
	                        if (document.getElementById("shouldStudy").innerText.length > 0)
	                      	{
	                            termsWrongToString();
	                        }
	                        else
	                        {
	                        	document.getElementById("Study these words").style.display = "none";
	                        }
	                    };
	                }
	                
	                entered = false;
	                
	                if (indexOfCurrentWord < words.length - 1)
	                {
	                    getInput(indexOfCurrentWord + 1);
	                }
	                else
	                {
	                    changePrompt("You are done.", false);
	                    answerField.value = "";
	                    entered = true;

	                    termsWrongToString();
	                }

	                /*
	                * This function creates a single string with all of the study terms the user
	                * got incorrect, and then displays the string in the field with id
	                * "shouldStudy".
	                */
	                function termsWrongToString()
	                {
	                    let termsWrongString = "";
	                    for (let wrongI = 0; wrongI < termsWrong.length; wrongI++)
	                    {
	                        termsWrongString += termsWrong[wrongI] + "\n";
	                    }
	                    if (termsWrongString.length > 0)
	                    {
	                        document.getElementById("shouldStudy").innerText = "You got the following words wrong: \n \n" + termsWrongString;
	                    
	                        let studyWordsButton = document.getElementById("Study these words");

	                        studyWordsButton.style.display = "initial";

	                        studyWordsButton.onclick = function(){
						        let termsWrongCorrectFormat = new Array();

						        for (let ind = 0; ind < termsWrong.length; ind++){
						            let thisWord = new Array();
						            thisWord[0] = termsWrong[ind].substring(0, termsWrong[ind].indexOf(": "));
						            thisWord[1] = termsWrong[ind].substring(termsWrong[ind].indexOf(": ") + ": ".length);
						            termsWrongCorrectFormat.push(thisWord);
						        }
						        
						        currentStudyList = shuffle(termsWrongCorrectFormat);
						        runProgram(currentStudyList);

						        studyWordsButton.style.display = "none";
						        document.getElementById("reaction").innerText = "";
						        document.getElementById("shouldStudy").innerText = "";
						        document.getElementById("study").innerText = "";
						    };
	                    }
	                    else
	                    {
	                        document.getElementById("shouldStudy").innerText = "Well done. You got no words wrong!"
	                        document.getElementById("Study these words").style.display = "none";
	                    }
	                }    
	            }
	        };
	    }

	    /*
	    * This function removes the "I was actually right" button from the DOM
	    */
	    function removeIWasRightButton()
	    {
	        if (document.getElementById("I was actually right") != null)
	        {
	            document.getElementById("inputBox").removeChild(document.getElementById("I was actually right"));
	        }
	    }

	    /**
	    *   Parses the English definition of the Latin and inserts each parsed word
	    *   of the English into an array.  Returns the array.
	    *
	    *   parameter i: the index of the current vocab in the 2D array called words
	    **/
	    function getDefinitionWords(indexOfCurrentWord)
	    {
	        let correctWords = new Array(); //The array to contain the English words
	        
	        let correctDef = words[indexOfCurrentWord][1].substring((words[indexOfCurrentWord][1].indexOf(":") + 1)); //The full correct English definition

	        //Cuts out words from right to left until the definition has length 0
	        while (correctDef.length > 0)
	        {
	        	let currentWord;
	            //Handles the case where a comma comes after the word or where the current word is the last
	            if (correctDef.indexOf(",") != -1)
	            {
	                currentWord = correctDef.substring(0, correctDef.indexOf(",")); //The current English word
	                
	                //Removes "to" from before verbs
	                if (currentWord.indexOf(" to") != -1)
	                {
	                    currentWord = currentWord.substring(currentWord.indexOf(" to") + 3);
	                }

	                //Removes spaces from before words
	                while (currentWord.indexOf(" ") == 0)
	                {
	                    currentWord = currentWord.substring(1);
	                }
	                correctDef = correctDef.substring(correctDef.indexOf(",") + 1); //Cuts the current word from the definition
	            }
	            else
	            {
	                currentWord = correctDef;   //This is the last word so no splicing is necessary
	                correctDef = "";            //Makes definition of length 0
	                if (currentWord.indexOf(" to") != -1)
	                {
	                    currentWord = currentWord.substring(currentWord.indexOf(" to") + 3);
	                }

	                while (currentWord.indexOf(" ") == 0)
	                {
	                    currentWord = currentWord.substring(1);
	                }
	            } 
	                correctWords.push(currentWord);
	        }
	        return correctWords;
	    }
	}
}

/**
* Returns the "chapters" Array if parameter is null or the
* array of words and definitions that matches the parameter.
* Returns null if the parameter does not match any word list
* and is not null.
**/
function getStudyList(chapterID)
{
	let bk4ch25 = [
	  ["cūnctor","1: to delay"],
	  ["dēdecus","dēdecoris, n: dishonor, disgrace"],
	  ["funda","fundae, f: sling"],
	  ["obtestor","1: to call to witness, beseech, entreat"],
	  ["pedem referō","referre, rettulī, relātum: to retreat"],
	  ["prōdō","prōdere, prōdidī, prōditum: to betray, reveal"]
	];

	let bk4ch25SansMacrons = [
	  ["cunctor","1: to delay"],
	  ["dedecus","dedecoris, n: dishonor, disgrace"],
	  ["funda","fundae, f: sling"],
	  ["obtestor","1: to call to witness, beseech, entreat"],
	  ["pedem refero","referre, rettuli, relatum: to retreat"],
	  ["prodo","prodere, prodidi, proditum: to betray, reveal"]
	];

	let bk4ch27 = [
	  ["arcessō", "arcessere, arcessīvī, arcessītum: to summon, send for, invite"],
	  ["obses", "obsidis, c: hostage, pledge, security"],
	  ["polliceor", "pollicērī, pollicitus sum: to promise, offer"],
	  ["queror", "querī, questus sum: to complain, bewail, lament"],
	  ["ultrō", "voluntarily, besides, moreover"],
	  ["vinculum","vinculī, n: chain"]
	];

	let bk4ch27SansMacrons = [
	  ["arcesso", "arcessere, arcessivi, arcessitum: to summon, send for, invite"],
	  ["obses", "obsidis, c: hostage, pledge, security"],
	  ["polliceor", "polliceri, pollicitus sum: to promise, offer"],
	  ["queror", "queri, questus sum: to complain, bewail, lament"],
	  ["ultro", "voluntarily, besides, moreover"],
	  ["vinculum","vinculi, n: chain"]
	];

	let bk4ch32 = [
	    ["cōnfertus","cōnferta, cōnfertum: dense, thick, compact, stuffed"],
	    ["cōnfestim","hastily, at once, immediately"],
	    ["dēlitēscō","dēlitēscere, dēlituī: to hide oneself, lurk, (note: no 4th part)"],
	    ["essedum","essedī, n: two wheeled British war chariot"],
	    ["in statiōne esse","to be on guard"],
	    ["interpōnō","interpōnere, interposuī, interpositum: to interpose, allege, cause"]
	];

	let bk4ch32SansMacrons = [
	    ["confertus","conferta, confertum: dense, thick, compact, stuffed"],
	    ["confestim","hastily, at once, immediately"],
	    ["delitesco","delitescere, delitui: to hide oneself, lurk, (note: no 4th part)"],
	    ["essedum","essedi, n: two wheeled British war chariot"],
	    ["in statione esse","to be on guard"],
	    ["interpono","interponere, interposui, interpositum: to interpose, allege, cause"]
	];

	let bk4ch35 = [
		["aciēs","aciēī, f: battle line"],
		["impetus","impetūs, m: attack"],
		["nancīscor","nancīscī, nactus sum: to get, obtain possession of, meet with, find"],
		["pellō","pellere, pepulī, pulsum: to defeat, rout"],
		["terga vertō","vertere, vertī, versum: to flee"]
	];

	let bk4ch35SansMacrons = [
		["acies","aciei, f: battle line"],
		["impetus","impetus, m: attack"],
		["nanciscor","nancisci, nactus sum: to get, obtain possession of, meet with, find"],
		["pello","pellere, pepuli, pulsum: to defeat, rout"],
		["terga verto","vertere, verti, versum: to flee"]
	];

	let bk5ch25 = [
	    ["maiōrēs","maiōrum, m: ancestors"],
	    ["nāscor","nāscī, nātus sum: to be born, be produced, rise, spring up, be raised, be found"],
	    ["operam dō","dare, dedī, datum: to give attention, take pains"],
	    ["palam","openly, publicly"],
	    ["vereor","verērī, veritus sum: to revere, fear, dread, be afraid of"]
	];

	let bk5ch25SansMacrons = [
	    ["maiores","maiorum, m: ancestors"],
	    ["nascor","nasci, natus sum: to be born, be produced, rise, spring up, be raised, be found"],
	    ["operam do","dare, dedi, datum: to give attention, take pains"],
	    ["palam","openly, publicly"],
	    ["vereor","vereri, veritus sum: to revere, fear, dread, be afraid of"]
	];

	let bk5ch26 = [
	    ["lignātor","lignātoris, m: wood-forager"],
	    ["minuō","minuere, minuī, minūtum: to lessen, impair, diminish, settle"],
	    ["opprimō","opprimere, oppressī, oppressum: to press down, destroy, surprise"],
	    ["repentīnus","repentīna, repentīnum: sudden, unexpected, hasty"],
	    ["vāllum","vāllī, n: wall, rampart, entrenchments, earthworks"]
	];

	let bk5ch26SansMacrons = [
	    ["lignator","lignatoris, m: wood-forager"],
	    ["minuo","minuere, minui, minutum: to lessen, impair, diminish, settle"],
	    ["opprimo","opprimere, oppressi, oppressum: to press down, destroy, surprise"],
	    ["repentinus","repentina, repentinum: sudden, unexpected, hasty"],
	    ["vallum","valli, n: wall, rampart, entrenchments, earthworks"]
	];

	let bk5ch28 = [
		["ignōbilis","ignōbile: unknown, undistinguished"],
		["iniussū","without command, without order"],
		["rēs frūmentāria","reī frūmentāriae, f: grain supply, provisions"],
		["spontis or sponte","of one's own accord, willingly"],
		["turpis","turpe: ugly, unseemly, shameful, disgraceful, dishonorable"]
	];

	let bk5ch28SansMacrons = [
		["ignobilis","ignobile: unknown, undistinguished"],
		["iniussu","without command, without order"],
		["res frumentaria","rei frumentariae, f: grain supply, provisions"],
		["spontis or sponte","of one's own accord, willingly"],
		["turpis","turpe: ugly, unseemly, shameful, disgraceful, dishonorable"]
	];

	let chapters = [
	    [bk4ch25, "De Bello Gallico Book 4 Chapter 25"],
	    [bk4ch25SansMacrons, "De Bello Gallico Book 4 Chapter 25: No Macrons"],
	    [bk4ch27, "De Bello Gallico Book 4 Chapter 27"],
	    [bk4ch27SansMacrons, "De Bello Gallico Book 4 Chapter 27: No Macrons"],
	    [bk4ch32, "De Bello Gallico Book 4 Chapter 32"],
	    [bk4ch32SansMacrons, "De Bello Gallico Book 4 Chapter 32: No Macrons"],
	    [bk4ch35, "De Bello Gallico Book 4 Chapter 35"],
	    [bk4ch35SansMacrons, "De Bello Gallico Book 4 Chapter 35: No Macrons"],
	    [bk5ch25, "De Bello Gallico Book 5 Chapter 25"],
	    [bk5ch25SansMacrons, "De Bello Gallico Book 5 Chapter 25: No Macrons"],
	    [bk5ch26, "De Bello Gallico Book 5 Chapter 26"],
	    [bk5ch26SansMacrons, "De Bello Gallico Book 5 Chapter 26: No Macrons"],
	    [bk5ch28, "De Bello Gallico Book 5 Chapter 28"],
	    [bk5ch28SansMacrons, "De Bello Gallico Book 5 Chapter 28: No Macrons"]
	];

	if (chapterID == null)
	{
		return chapters;
	}
	else
	{
		for (let i = 0; i < chapters.length; i++)
		{
			if (chapters[i][1] == chapterID)
			{
				return chapters[i];
			}
		}
		return null;	//If chapter with given ID does not exist
	}
}

/**
* Returns the current Romanized date in Latin.  Written by Akshay Srivatsan and used with permission.
**/
function getRomanDate(){
    var months_accusative = ['', 'Ianuarias', 'Februarias', 'Martias', 'Apriles', 'Maias', 'Iunias', 'Iulias', 'Augustas', 'Septembres', 'Octobres', 'Novembres', 'Decembres', 'Ianuarias']
    var months_ablative = ['', 'Ianuariis', 'Februariis', 'Martiis', 'Aprilibus', 'Maiis', 'Iuniis', 'Iuliis', 'Augustis', 'Septembribus', 'Octobribus', 'Novembribus', 'Decembribus', 'Ianuariis']

    var numbers_accusative = ['nihil', 'primum', 'secundum', 'tertium', 'quartum', 'quintum', 'sextum', 'septimum', 'octavum', 'nonum', 'decimum', 'undecimum', 'duodecimum', 'tertium decimum', 'quartum decimum', 'quintum decimum', 'sextum decimum', 'septimum decimum', 'duodevicesimum', 'undevicesimum', 'vicesimum']

    function romanDate(date) {
        var day = date.getDate();
        var month = date.getMonth() + 1;
        var year = date.getYear();

        var lastDayOfMonth = new Date(year, month, 0).getDate()

        var kalends = 1;
        var nones = 5;
        var ides = 13;
        if ([3, 5, 7, 10].indexOf(month) != -1) {
            nones = 7;
            ides = 15;
        }

        if (day == kalends) {
            return 'Kalendis ' + months_ablative[month];
        }

        if (day > kalends && day < (nones - 1)) {
            return 'ante diem ' + numbers_accusative[nones - day + 1] + ' Nonas ' + months_accusative[month];
        }

        if (day == nones - 1) {
            return 'pridie Nonas ' + months_accusative[month];
        }

        if (day == nones) {
            return 'Nonis ' + months_ablative[month];
        }

        if (day > nones && day < (ides - 1)) {
            return 'ante diem ' + numbers_accusative[ides - day + 1] + ' Idus ' + months_accusative[month];
        }

        if (day == ides - 1) {
            return 'pridie Idus ' + months_accusative[month];
        }

        if (day == ides) {
            return 'Idibus ' + months_ablative[month];
        }

        if (day > ides && day < lastDayOfMonth) {
            return 'ante diem ' + numbers_accusative[(lastDayOfMonth + 1) - day + 1] + ' Kalendas ' + months_accusative[month + 1];
        }

        if (day == lastDayOfMonth) {
            return 'pridie Kalendas ' + months_accusative[month + 1];
        }
    }

    function romanize(string) {
        return string.replace(new RegExp('U', 'g'), 'V').replace(new RegExp('v', 'g'), 'u');
    }

    var date = new Date();
    return (romanize(romanDate(date)));
}

/*
* Parameter: an array
* Returns: the array with elements shuffled
* Taken from: https://github.com/Daplie/knuth-shuffle
*/
function shuffle(array){
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}