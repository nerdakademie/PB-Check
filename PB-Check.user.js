// ==UserScript==
// @name        pb-check
// @namespace   nak
// @description checks for your PB to be accepted
// @include     https://cis.nordakademie.de/studium/bachelor/transferleistungen-praxisberichte/
// @version     0.1
// @grant       none
// @downloadURL https://github.com/nerdakademie/PB-Check/raw/master/PB-Check.user.js
// @updateURL   https://github.com/nerdakademie/PB-Check/raw/master/PB-Check.meta.js
// ==/UserScript==

function reloadPage(){
    location.reload();
}

var oldTableContent = localStorage.getItem("oldTable");
var oldTableArray = JSON.parse(localStorage.getItem("oldTableArray"));
var compareTable = document.getElementsByClassName("table");
var compareTableContent = compareTable[0].textContent;
var rowCount = compareTable[0].rows.length;


function comparing() {
    if (compareTableContent != oldTableContent) {
      var paper = "", array = new Array();
      if(oldTableArray === null){
        oldTableArray = new Array();
      }
      for (var i = 1, row; row = compareTable[0].rows[i]; i++) {
        if(i < compareTable[0].rows.length){
          if(oldTableArray.length > i ){
              if(oldTableArray[i][1] !== row.cells[5].title.trim() && row.cells[5].title.trim() === "akzeptiert"){
              // PB paper status has changed
              array.push([row.cells[0].textContent.trim() , row.cells[5].title.trim()]);
            }
          }
          oldTableArray[i] = [row.cells[0].textContent.trim() , row.cells[5].title.trim()];
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
      oldTableContent = oldTable[0].textContent;
      localStorage.setItem("oldTable", oldTableContent);
      localStorage.setItem("oldTableArray", JSON.stringify(oldTableArray));
    }
    compareTable[0].rows[rowCount-1].cells[4].textContent = average(oldTableArray);
    setTimeout(reloadPage,60000);
}

comparing();