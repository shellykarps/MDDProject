/*templates.js.js
 *************************************/
(function ($) {
   "use strict";
   $.bb || ($.bb = {}); // namespace
   var T = $.bb.templates = {}; // the compiled templates

      // load all <script type="text/template" name="..."> nodes, key them by name
   $('script[type="text/template"]').each(function() {
      var $this = $(this);
      T[ $this.attr('name') ] = _.template(_.str.trim($this.html()), null, {'variable': 'data'});
   });

   /**
    * Apply a template to the given element using underscore's templating tools.
    *
    * All variables are put into the data scope automagically, for performance,
    * so values `{ 'hello': 'world' }` would be accessed using <%= data.hello %>
    *
    * @param {jQuery} $e
    * @param {string} template
    * @param {Object} [values]
    */
   $.bb.appendTemplate = function($e, template, values) {
      return $(fetchTemplate(template, values)).appendTo( $e );
   };

   /**
    * get the text for a template, applying any values provided
    * @param {string} template
    * @param {Object} [values]
    */
   $.bb.fetchTemplate = fetchTemplate;

   function fetchTemplate(template, values) {
      var t = T[template];
      if( t ) {
         return t(values||{});
      }
      else {
         console.warn('Template not found', template);
         return '';
      }
   }

})(jQuery);