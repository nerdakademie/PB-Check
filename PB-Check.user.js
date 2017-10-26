// ==UserScript==
// @name        pb-check
// @namespace   nak
// @description checks for your PB to be accepted
// @include     https://cis.nordakademie.de/studium/bachelor/transferleistungen-praxisberichte/
// @version     0.1.1
// @grant       none
// @downloadURL https://github.com/nerdakademie/PB-Check/raw/master/PB-Check.user.js
// @updateURL   https://github.com/nerdakademie/PB-Check/raw/master/PB-Check.meta.js
// ==/UserScript==

function reloadPage(){
    location.reload();
}

var thatOldTableContent = localStorage.getItem("thatOldTableContent");
var thatOldTableArray = JSON.parse(localStorage.getItem("thatOldTableArray"));
var comparisonTable = document.getElementsByClassName("table");
var comparisonTableContent = comparisonTable[0].textContent;
var rowCounter = comparisonTable[0].rows.length;


function comparing() {
    if (comparisonTableContent != thatOldTableContent) {
      var paper = "", array = new Array();
      if(thatOldTableArray === null){
        thatOldTableArray = new Array();
      }
      for (var i = 1, row; row = comparisonTable[0].rows[i]; i++) {
        if(i < comparisonTable[0].rows.length){
          if(thatOldTableArray.length > i ){
              if(thatOldTableArray[i][1] !== row.cells[5].title.trim() && row.cells[5].title.trim() === "akzeptiert"){
              // PB paper status has changed
              array.push([row.cells[0].textContent.trim() , row.cells[5].title.trim()]);
            }
          }
          thatOldTableArray[i] = [row.cells[0].textContent.trim() , row.cells[5].title.trim()];
        }
      }
      for(var j = 0, len = array.length; j < len; j++){
        paper = paper + array[j][0];
        if(j != len -1){
          paper = paper + ", ";
        }
      }
      if(array.length > 1){
        alert('Transferleistungen ' + paper + ' wurden akzeptiert!');
      }else if (array.length === 1){
        alert('Deine Transferleistung ' + paper + ' wurde akzeptiert!');
      }
      var oldTable = document.getElementsByClassName("table");
      thatOldTableContent = oldTable[0].textContent;
      localStorage.setItem("thatOldTableContent", thatOldTableContent);
      localStorage.setItem("thatOldTableArray", JSON.stringify(thatOldTableArray));
    }
    comparisonTable[0].rows[rowCounter-1].cells[4].textContent = average(thatOldTableArray);
    setTimeout(reloadPage,60000);
}

comparing();