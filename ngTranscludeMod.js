angular.module('ngTranscludeMod', [])
    .config([
      '$provide', function ($provide) {
        $provide.decorator('ngTranscludeDirective', [
          '$delegate', function ($delegate) {
            // Remove the original directive
            $delegate.shift();
            return $delegate;
          }
        ]);
      }
    ])
    .directive('ngTransclude', function () {
      return {
        restrict: 'EAC',
        replace:  true,
        link:     function ($scope, $element, $attrs, controller, $transclude) {

          var types  = ['child', 'parent', 'sibling'];
          var iScopeType = types[types.indexOf($attrs.ngTransclude)] || undefined;

          if ($attrs.ngTransclude === $attrs.$attr.ngTransclude || iScopeType) {
            // If the attribute is of the form: `ng-transclude="ng-transclude"`
            // then treat it like the default
            $attrs.ngTransclude = '';
          }

          if (!$transclude) {
            throw minErr('ngTransclude')('orphan',
                'Illegal use of ngTransclude directive in the template! ' +
                'No parent directive that requires a transclusion found. ' +
                'Element: {0}',
                startingTag($element));
          }


          //default function for transclude (same as 'sibling')
          var ngTranscludeScope;
          // If there is no slot name defined or the slot name is not optional
          // then transclude the slot
          var ngTranscludeSlotName  = $attrs.ngTransclude || $attrs.ngTranscludeSlot;
          var ngTranscludeCloneAttachFn = function (clone) {
            if (clone.length) {
              $element.empty();
              $element.append(clone);
            }
          };

          switch (iScopeType) {
            case 'parent':
              ngTranscludeScope = $scope;
              break;
            case 'child':
              ngTranscludeScope         = $scope.$new();
              ngTranscludeCloneAttachFn = function (clone) {
                $element.empty();
                $element.append(clone);
                $element.on('$destroy', function () {
                  ngTranscludeScope.$destroy();
                });
              };
              break;
          }
          //Scope cant be null
          if (ngTranscludeScope) {
            $transclude(ngTranscludeScope, ngTranscludeCloneAttachFn, null, ngTranscludeSlotName);
          } else {
            $transclude(ngTranscludeCloneAttachFn, null, ngTranscludeSlotName);
          }
        }
      };
    });
