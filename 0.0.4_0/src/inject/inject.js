chrome.extension.sendMessage({}, function(response) {
  var readyStateCheckInterval = setInterval(function() {
    if (document.readyState === "complete") {
      clearInterval(readyStateCheckInterval);


      function checkForEditBar() {
        var cS = document.querySelector('.clone_story'),
        btn = document.createElement('button'),
        ed = document.querySelector('.edit .controls'),
        generateStory;

        if (!ed) { return; }
        if ($(ed).find('.story_template').length) { return; }

        ed.style.width = '311px';
        btn.className = 'left_endcap hoverable story_template';
        btn.innerHTML = '<img src="//i.imgur.com/qvQ83UA.png">';
        cS.className = cS.className + ' capped';
        cS.insertAdjacentElement('beforebegin', btn);

        btn.querySelector('img').style.marginLeft = '-2px';
        btn.querySelector('img').style.marginTop = '1px';
        btn.addEventListener('click', generateStory, true);

        function generateStory(e) {
          var nextSection = $(btn).parents('.model_details').eq(0).next(),
              textArea = nextSection.find('.editor.tracker_markup.description'),
              existingData = textArea.val(),
              ev = new jQuery.Event('keyup');
          ev.which = 13;
          ev.keyCode = 13;
          nextSection.find('.rendered_description').trigger('click');
          textArea.val('As a user \nI want to \nBecause \n\nGiven \nWhen \nThen \n\n**_INFO:_**\r' + existingData);

          nextSection.find('button[id^="story_description_done_"]').trigger('click');

          e.preventDefault();
        }

      }

      $('body').on('DOMSubtreeModified', function(e) {
        checkForEditBar();
      });

    }
  }, 10);
});
