function request(params){
	var req = new XMLHttpRequest();
	
	req.open(params.method || "GET", params.url);
	req.onreadystatechange = function (aEvt) {
  		if (req.readyState == 4 && req.status == 200){
			params.success(JSON.parse(req.responseText));
		}
  	}
	var data = JSON.stringify(params.data); 
	req.send(data || null);
}

function save(p){
	console.log("would save...",p);
	var data = {};
	data[p.path] = p.value;
	
	request({
		method: "POST",
		url: p.src,
		data: data,
		success: function(){
			console.log("Savedddd!	");
		}	
		
	});
}