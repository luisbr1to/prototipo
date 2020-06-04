
//Comment types (0 - Single line Comment, 1 - Section line Comment)

var testJSON = {"type":"javascript","comments":[{"active":true,"type":0,"line":5,"versions":[{"date":"December 17, 2005 03:24:00","text":"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean consectetur blandit tortor vitae vulputate. Cras maximus odio at quam scelerisque tempus. Ut placerat leo sed fermentum consequat. Vestibulum sed ornare risus, in facilisis lorem. Nunc vulputate rutrum mauris, condimentum iaculis magna aliquet quis. Aenean vitae urna vel tellus placerat auctor elementum vel massa. Nulla semper dictum sem vel efficitur. ","audio":"../files/sound.mp3"}]},{"active":true,"type":1,"line":20,"end":25,"versions":[{"date":"December 17, 2007 03:24:00","text":"Praesent venenatis volutpat metus et vestibulum. Praesent tempor elit sit amet vehicula commodo. Nam vitae urna ac sapien ullamcorper accumsan. Maecenas sapien sapien, ultricies id sapien in, auctor commodo tortor. Morbi ullamcorper nulla turpis, quis auctor urna efficitur et. Morbi vel nisl et tellus semper congue. Integer ullamcorper dictum placerat. Morbi pellentesque sollicitudin massa, sodales hendrerit lacus tristique ac. In convallis turpis sit amet dolor vestibulum, at sodales eros faucibus. Mauris dictum et ligula gravida faucibus. Etiam cursus tempor accumsan. ","audio":"../files/sound.mp3"}]}],"code":"console.log(\"test\")\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n"}





let codeEditor;


function Init(EditorId,fileJson) {
	codeEditor  = CodeMirror(document.getElementById(EditorId), {
		value: fileJson.code,
		mode: fileJson.type,
		lineNumbers: true,
		keyMap: "sublime",
		autoCloseBrackets: true,
		matchBrackets: true,
		showCursorWhenSelecting: true,
		theme: "monokai",
		tabSize: 2
	});

	var miniMapControl = new MiniMap(codeEditor);
	codeEditor.on("change",function(){miniMapControl.mirrorContent(codeEditor)});
	for (var i = 0; i < fileJson.comments.length; i++) {
		if(fileJson.comments[i].active){
			//Comment Insertion
			let latestComment = fileJson.comments[i].versions[fileJson.comments[i].versions.length-1]

			let table = document.createElement("table");
			table.style.backgroundColor = "rgba(255,255,255,0.25)"
			table.style.borderRadius = "10px"
			let tr = document.createElement("tr");
			let td = document.createElement("td");
			if(fileJson.comments[i].type==1){
				td.innerHTML = "<h2 style=\"margin:0\"> <" + (i+1) + "</h2>" + latestComment.date;
			}else{
				td.innerHTML = "<h2 style=\"margin:0\">" + (i+1) + "</h2>" + latestComment.date;
			}
			
			//let date = document.createTextNode((i+1) + " date: " + latestComment.date);
			//td.appendChild(date);
			tr.appendChild(td)

			td = document.createElement("td");
			let audio = document.createElement("audio");
			audio.controls = 'controls';
			audio.src      = latestComment.audio;
			td.appendChild(audio);
			tr.appendChild(td);

			td = document.createElement("td");
			let textComment = document.createTextNode(" Comment: " + latestComment.text)
			td.appendChild(textComment);
			tr.appendChild(td);
			table.appendChild(tr);
			codeEditor.addLineWidget(fileJson.comments[i].line,table);

			if(fileJson.comments[i].type==1){

				let ending = document.createElement("h2");
				ending.style.backgroundColor = "rgba(255,255,255,0.25)"
				ending.style.borderRadius = "10px"
				ending.style.margin = "0px"
				ending.style.padding = "5px"
				ending.style.color = "black"
				ending.innerHTML =  (i+1) + ">"
				codeEditor.addLineWidget(fileJson.comments[i].end,ending);
			}

		}
	}
}
