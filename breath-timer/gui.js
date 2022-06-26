/*
TODO:
* write defaults to cookies?

*/
class Gui {

  constructor(divId, elements) {

    var html="<div class='gui_container'>";
    this.elements = elements;
    for (var e=0; e < elements.length;e++) {
      var id = "gui_" + elements[e].name.replaceAll(" ","_");
      this.elements[e]['id'] = "gui_" + elements[e].name.replaceAll(" ","_");
      switch(elements[e].type) {
        case 'string':
          html+=`<div class="gui_label">${elements[e].name}</div><div class="gui_element"><input type=text name=${elements[e].name} id=${id} class=gui_textbox value=${elements[e].default}></div>`;
          break;
        case 'boolean':
          var checked_option = "";
          if (elements[e].default) { checked_option = "checked" } // default to checked if set
          html+=`<div class="gui_label">${elements[e].name}</div><div class="gui_element"><input type=checkbox name=${elements[e].name} id=${id} class=gui_textbox value=${elements[e].default} ${checked_option}></div>`;
          break;
        case 'boolean':
      }
    }

    html += "</div>";
    $("#" + divId).html(html);
  }

  get(varName) {

    var retValue=false;
    this.elements.forEach( e=> {
      if (varName == e.name) {
          switch(e.type) {
            case 'string':
              retValue =  $("#" + e.id).val();
              break;
            case 'boolean':
              retValue =  $("#" + e.id).prop("checked");
          }
      }
    });

    return retValue; 
  }
}
