// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

$(document).ready(function(){


    $('a').click(function(){
        chrome.tabs.create({'url': $(this).attr('href')}, function(tab) {
          // Tab opened.
        });
    });

    $(document).keypress(function(e) {
    if(e.which == 13) { //enter, don't think u can do form submit in chrome extension
          var word = $('#search_field').val();
          if (!word) return;

          $("#word").html(word);
          $(".results").html('');
          
  
              //urban dictionary 
             search($("#urban"), 
                    "http://www.urbandictionary.com/define.php", 
                    { 'term' : word},
                    function(data){
                      var page = $(data);
                      var x = page.find(".definition").eq(0).html()

                      if (x) {
                        $("#urban").html(x);  
                        $('a').contents().unwrap(); //until we make it linkable
                      }
                      else {
                        $("#urban").html('No definition found.'); 
                      }  
             }
             ); 

            //wordnik
             search($("#wordnik"), 
                    "http://api.wordnik.com//v4/word.json/" + word + "/definitions", 
                    {
                      'api_key' : "YOUR_API_KEY", //YOUR API KEYZ from wordnik.com
                      'useCanonical' : false,
                      'limit' : 1,
                      'includeTags' : false,
                      'includeRelated' : false
                    },
                    function(data){
                      var page = $(data);
                      var x = page.find(".definition").eq(0).html()
                      if (data[0] ){
                        $("#wordnik").html(data[0].text);  
                      }
                      else {
                        $("#wordnik").html('No definition found.'); 
                      }
             }
             ); 
 
    }
});

 
function search($element, url, data, greatSuccess) {
  
  $.ajax({
    url: url,
    type: "GET",
    timeout: 10000,
    data: data,
    success: function(data) {
      greatSuccess(data);
    },
    error: function() {
      $element.html('No definition found.');
    },
    beforeSend: function() {
      $element.html("<img src='icons/loading.gif' alt='Loading' />");
    },
    complete: function(){
      
    }
  });
}

}); 