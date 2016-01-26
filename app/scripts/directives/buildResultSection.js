angular.module('angularApp').directive('buildResultSection', function() {
  'use strict';

   //define the directive object
   var directive = {};

   //restrict = E, signifies that directive is Element directive
   directive.restrict = 'E';

   //template replaces the complete element with its text.
   directive.template = "";

   //scope is used to distinguish each student element based on criteria.
   directive.scope = {
      data : "@"
   };

   //compile is called during application initialization. AngularJS calls it once when html page is loaded.

   directive.compile = function(element, attributes) {
      //linkFunction is linked with each element with scope to get the element specific data.
      var linkFunction = function($scope, element, attributes) {
        var data            = JSON.parse($scope.data),
            resultStatus    = data.result && data.result.status,
            resultCTAType   = data.result && data.result.cta_type,
            reqStatusId     = data.state_id,
            reqType         = data.req_type,
            resultTitle     = data.stateName,
            stateType       = data.stateInfo.type,
            resultStatusHtml = "", resultCTAHtml = ""
          ;

          switch(reqStatusId){
            case 2:
            case 3:
            case 5:
              resultTitle = "Change " + resultTitle;
              break;
            default:
              break;
          }

          switch(resultStatus){
            case "auto_merged":
              resultStatusHtml = "Auto Merged";
              break;
            case "metrics_reduction":
              resultStatusHtml = "Metrics Reduction";
              break;
            default:
              resultStatusHtml = "";
              break;
          }

          switch(resultCTAType){
            case 1:
              resultCTAHtml = "<div class=\"result-cta ctatype-" + resultCTAType + "\"><button>Merged Build</button></div>";
              break;
            case 2:
              resultCTAHtml = "<div class=\"result-cta ctatype-" + resultCTAType + "\"><button>Find Issues</button></div>";
              break;
            case 3:
              resultCTAHtml = "<div class=\"result-cta ctatype-" + resultCTAType + "\"><button>Deply</button><span class='padding-lr-10'>to:</span><select><option>Production</option><option>Staging</option><option>Pre staging</option></select></div>";
              break;
            default:
              resultCTAHtml = "";
              break;
          }
          var mainEl = angular.element("<div class=\"build-result " + stateType + "\"></div>");
          mainEl.append("<div class=\"result-label\">Result : </div>");
          mainEl.append("<div class=\"result-title\">" + resultTitle + "</div>");
          mainEl.append("<div class=\"result-status\">" + resultStatusHtml + "</div>");
          mainEl.append(resultCTAHtml);

          element.append(mainEl);
         // element.css("background-color", "#ff00ff");
      };
      return linkFunction;
   };
   return directive;
});
