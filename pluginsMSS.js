(function($) {
  $.fn.extend({
    insertRows: function(idTable, model, data) {
      function start() {
        model.forEach(function(e, i) {
          var body = Object.values(e);
          $(idTable)
            .find("tbody")
            .append("<tr></tr>");
          $(idTable + " tbody tr:last-child").append(
            "<td><input class='form-check-input' type='radio' name='radios' onclick='getRow(this)'></input></td>"
          );
          body.forEach(function(e) {
            $(idTable + " tbody tr:last-child").append("<td>" + e + "</td>");
          });
          if (
            jQuery.isEmptyObject(
              $(idTable)
                .find("tbody tr:last-child")
                .data()
            )
          ) {
            $(idTable)
              .find("tbody tr:last-child")
              .data("data-tr", data);
          }
        });
      }
      return $(this).each(start);
    },

    removeRows: function(idTable) {
      function start() {
        $(idTable)
          .find("input:checked")
          .each(function(i, e) {
            e.parentNode.parentNode.remove();
          });
      }
      return $(this).each(start);
    },

    createDropdown: function(params, selected, isOptionDefault = true) {
      var optionsDefault = [{ id: 1, label: "Selecione" }],
        opc = $.extend(optionsDefault, params);

      function start() {
        function create(element) {
          this.div = $("<div/>", {
            class: "dropdown"
          });

          this.btn = $("<button/>", {
            class: "btn btn-primary dropdown-toggle",
            type: "button",
            "data-toggle": "dropdown",
            html: isOptionDefault ? "Selecione" : ""
          });

          this.span = $("<span/>", { class: "caret" });
          this.ul = $("<ul/>", { class: "dropdown-menu" });
          this.btn.appendTo(this.div);
          this.span.appendTo(this.div);
          this.ul.appendTo(this.div);

          opc.forEach(function(e) {
            this.a = $("<a/>", {
              id: e.id,
              href: "javascript:void(0)",
              html: e.label,
              onclick: "updateLabel(this)"
            });

            this.li = $("<li/>");
            this.a.appendTo(this.li);
            this.li.appendTo(this.ul);
          });

          var newLabel = div.find("a").filter(function(i, e) {
            return e.id == selected;
          });
          this.div.find("button").html(newLabel.html());
          newLabel.parent().remove();
          element.append(this.div[0]);
        }
        create(this);
      }

      return $(this).each(start);
    },

    createInput: function(params) {
      var optionsDefault = { type: "text", placeholder: "", id: "", value: "" },
        opc = $.extend(optionsDefault, params );
      function start() {
        function create(element) {
          this.div = $("<div/>", {
            class: ""
          });

          this.input = $("<input/>", {
            class: "form-control",
            type: opc.type,
            placeholder: opc.placeholder,
            id: opc.id,
            name: opc.id,
            html: opc.value
          });

          this.input.appendTo(this.div);
          element.append(this.div[0]);
        }

        create(this);
      }
      return $(this).each(start);
    }
  });
})(jQuery);

function getRow(e) {
  var tdValues = e.parentNode.parentNode.cells;
  for (var i = 0; i < tdValues.length; i++) {
    console.log(tdValues[i].innerText);
  }
}

function updateLabel(e, selected) {
  this.newLabel = e.innerText;
  this.oldLabel = e.parentNode.parentNode.parentNode.getElementsByTagName(
    "button"
  )[0].innerText;
  // this.oldLabel = $("div[id*='component-dropdown']").find('button').html();
  e.innerText = this.oldLabel;
  e.parentNode.parentNode.parentNode.getElementsByTagName(
    "button"
  )[0].innerText = this.newLabel;
  var listLi = e.parentNode.parentNode.getElementsByTagName("li");
  for (var i = 0; i < listLi.length; i++) {
    if (listLi[i].innerText === "Selecione") {
      listLi[i].remove();
    }
  }
}

function ajaxCenter(url, parameter, asynchronous, typeRequest){

    return $.ajax({
        url: url,
        contentType: 'application/json',
        data: typeRequest === "POST" ? JSON.stringify(parameter) : parameter,
        dataType: 'json',
        async: asynchronous,
        cache: false,
        type: typeRequest
        
    });
}
