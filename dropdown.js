(function($) {
  $.fn.extend({
    mydropdown: function(params, selected, isOptionDefault = true) {
      var optionsDefault = [{ id: 1, label: "Selecione" }],
        opc = $.extend(optionsDefault, params);

      function start() {
        function createDropdown(element) {
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

        createDropdown(this);
      }

      return $(this).each(start);
    }
  });
})(jQuery);

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
