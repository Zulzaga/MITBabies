function searchPage(searchstring) {
	returnCount = 0;
	if (window.location.hash){
		var inp = window.location.hash.substring(1);

}
	else {
		var inp = $('#babysitter-search').val();

	}
	console.log(inp);
	for (var names in directory)
		if (String(names).toLowerCase().includes(inp.toLowerCase())){
			document.getElementById(directory[names]).style.display = 'block';
			console.log(directory[names]);
			returnCount ++;
			console.log(returnCount);
		}
	if (returnCount == 0){
		$('#search-num').text('No');
	}
	else { 
		$('#search-num').text(returnCount);
	}
	$('#searchQuery').text(inp);
}