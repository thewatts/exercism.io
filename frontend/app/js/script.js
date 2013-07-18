$(function() {
  $('.dropdown-toggle').dropdown();
  exercism.models.selectFilter = new exercism.models.SelectFilter();
  exercism.views.selectFilter = new exercism.views.SelectFilter({ model: exercism.models.selectFilter });
});

//TODO move all variable declaration to the tops of functions.
$(function() {
  $(".pending-submission").each(function(index,element) {
    var elem = $(element);

    elem.on("click",function() {
      var submissionURL = $(this).data('url');
      window.location = submissionURL;
    });

    var language = elem.data('language');
    $(".language",elem).tooltip({ title: language });

    var nitCount = elem.data('nits');
    $(".nits",elem).tooltip({ title: nitCount + " Nits" });

    var argumentCount = elem.data('arguments');
    $(".arguments",elem).tooltip({ title: argumentCount + " Responses" });
  });

  $(".code a[data-action='enlarge']").on("click",function() {
    var codeDiv = $(this).parents(".code");
    codeDiv.removeClass("span6");
    codeDiv.addClass("span12");
    $(this).hide();
    $("a[data-action='shrink']",codeDiv).show();
  });

  $(".code a[data-action='shrink']").on("click",function() {
    var codeDiv = $(this).parents(".code");
    codeDiv.removeClass("span12");
    codeDiv.addClass("span6");
    $(this).hide();
    $("a[data-action='enlarge']",codeDiv).show();
  });

  $("#code-timeline").on("click",function() {
    var revisionId = $(event.target).data("revision");
    $(event.target).toggleClass("selected");
    $('#revision-' + revisionId).toggle();
  });

  $(".bookmark input[data-action='toggle-bookmark']").on("click",function() {
     var checked = $(this).is(':checked');
     var submissionId = $(this).data("submission-id");

     toggleBookmark(submissionId, checked);
  });

  $('form input[type=submit], form button[type=submit]').on('click', function() {
    var $this = $(this);
    window.setTimeout(function() { $this.attr('disabled', true); }, 1);
  });
});

function toggleBookmark(submissionId, checked) {
  var method = checked ? 'POST' : 'DELETE';

  $.ajax({
    url: "/submissions/" + submissionId + "/bookmark",
    type: method
  });
};
