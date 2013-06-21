
/**
 * Global template function, application config method doesn't take service injections
 * of services that are from a different module.
 *
 * @param templateName  is the template name
 * @return {String} is the path to the template
 */
window.template = function(templateName) {
    return VA.endpoints.base + "js/angular/views/" + templateName;
};

/**
 * Get the fixed base for the breadcrumbs
 *
 * @return {*}
 */
window.getFixedBreadcrumbs = function() {
    if (_.isDefined(JS_SETTINGS.permanentBreadcrumb)) {
        return JS_SETTINGS.permanentBreadcrumb;
    }
    else {
        return {};
    }
};

/**
 * Add common method to underscore interface.
 *
 * @param testVar is the variable to test for being defined
 */
_.isDefined = function(testVar) {
    var result = !_.isUndefined(testVar);
    return result;
};

/**
 * Add utils factory to the common lib
 */
App.common.factory("utils", ['$rootScope', '$compile', function($rootScope, $compile) {

    var
        templates = {};


    /**
     * Extend the raw util functions
     */
    return {

        /**
         * Checks whether the value is a proper integer, but it WON'T
         * cast to integer, it should remain a string
         */
        safeInt : function(value) {
            if (typeof(value) !== "undefined") {

                var parsedVal = parseInt(value, 10);
                if (!isNaN(parsedVal)) {
                    return parsedVal;
                }
            }

            return undefined;
        },


        /**
         * Instantiate a hash into an object, nifty to quickly turn some functions into
         * a full-fledged object, especially when dealing when angular services.
         *
         * @param hash  is the has to turn into a new object instance
         * @param options are the options to pass to _construct if available
         * @return {Object} instance of the functions found in the hash.
         */
        instantiate : function (hash, options) {

            /**
             * Create on the fly constructor
             */
            var ObjectDefinition = function() {

                for (var idx in hash) {
                    this[idx] = hash[idx];
                }

                if (typeof(this._construct) !== "undefined") {
                    this._construct(options);
                }

                return this;
            };

            // instantiate and return
            var instance = new ObjectDefinition();
            return instance;
        },


        /**
         * Get the absolute url of a certain angular template relative to the
         * current context path
         *
         * @param templateName is the template name to retrieve
         * @return {String} is the template name prefixed with the proper context path and application path
         */
        template : function(templateName) {
            return window.template(templateName);
        },



        /**
         * Clear out the attributes found in the parent. Reset value and remove ng-* classes from
         * the class attribute. If `visitList` is empty, input and form will be visited.
         *
         * @param parent is the parent to visit
         * @param visitList (optional) the elements to visit, default: input, form
         */
        clearAttributes : function(parent, visitList) {

            // no parameter specified?
            if (_.isUndefined(visitList)) {
                visitList = ["input", "form", "textarea"];
            }

            jQuery(visitList).each(function(vKey, visit) {

                // visit sub elements
                parent.find(visit).each(function() {

                    var
                        element = jQuery(this),
                        classAttr = element.attr("class");

                    // has a value attribute? clear it will be refilled by angular model binding
                    if (typeof(element.attr("value")) !== "undefined" && !element.is(":checkbox")) {
                        element.val("");
                    }

                    // has a class attribute? rid it of ng-* classes
                    if (typeof(classAttr) !== "undefined") {

                        var
                            cleanClassAttr =
                                _.str.trim(
                                    classAttr.replace(/ng-[\-\w]+/g, '')
                                );

                        element.attr("class", cleanClassAttr);
                    }

                });
            });

        },

        /**
         * Replace the element with an angular template
         *
         * @param element
         * @param templateUrl
         */
        replaceWithTemplate : function(scope, element, templateUrl, hideUntilReady) {

            var html = '';

            if (typeof(templates[templateUrl]) !== "undefined") {
                html = templates[templateUrl];
            }
            else {

                $.ajax({
                    method : "post",
                    async : false,
                    url : templateUrl,
                    dataType : "html",
                    success : function(data) {
                        html = templates[templateUrl] = _.str.trim(data);
                    }
                });
            }

            // delay displaying the contents?
            if (hideUntilReady) {
                element.toggleClass("awaiting-ready", true);
            }

            element.html(html);
            $compile(element.contents())(scope);

        },

        /**
         * Loading is ready
         *
         * @param scope
         */
        loadingReady : function(element) {
            if (element.hasClass("awaiting-ready")) {
                element.toggleClass("awaiting-ready", false);
            }
            else {
                element.closest(".awaiting-ready").toggleClass("awaiting-ready", false);
            }
        },

        /**
         * Wrap a list of options with an additional "please select option" item
         *
         * @param list      is the list to append it to
         * @param keyId     is the key identifier to use for null key (default: 'id')
         * @param valueId   is the value identifier to use for the label (default: 'title')
         * @return {Array}  the list with the other option tacked on
         */
        addOtherOption : function(list, keyId, valueId) {
            keyId = keyId || "id";
            valueId = valueId || "title";


            var result = null;
            if (_.isDefined(list)) {
                var map = {};
                map[keyId] = "OTH";
                map[valueId] = ">> Please select an option <<";

                var result = _.flatten([[map], list]);
                return result;
            }

            return [];
        },

        /**
         * Return 'morning', 'afternoon' or 'evening' depending on client's time.
         */
        getTimeOfDay : function() {
            var time = new Date();
            var h = time.getHours();

            if (h < 12) {
                return "morning";
            }
            else if (h >= 12 && h <= 17 ) {
                return "afternoon";
            }
            else {
                return "evening";
            }
        },


        /**
         * Make a response object a little more intelligent by
         * adding some functions to it.
         *
         * @param object is the json response object to enrich
         */
        response : function(object) {
            var fancyObject = _.extend(object, {

                ok : function() {
                    return true;
                },

                error : function() {
                    return false;
                }

            });

            return fancyObject;
        },


        /**
         * Fix select boxes for msie because it's silly.
         *
         * @param scope
         */
        msieSelectboxFix : function(scope) {

            // make sure it happens after the current digest
            scope.$evalAsync(function() {

                // find the select boxes and "resize" them
                angular.element("#va select").each(function() {
                    var selectBox = angular.element(this);
                    selectBox.width($(this).width() + 1);
                    selectBox.width($(this).width() - 1);
                });
            });

        },

        /**
         * Convert a string to date
         *
         * @param str   is a string to be converted to date
         * @return {*}
         */
        toDate : function(str) {
            if (str === null) {
                return null;
            }
            else if (_.isDate(str)) {
                return str;
            }
            else {

                // -_-': msie hack to get dates parsed properly.
                if ($.browser.msie || $.browser.safari) {
                    var
                        splitDate = str.split('T'),
                        date = splitDate[0],
                        dayElements = date.split("-"),
                        date = new Date();

                    date.setFullYear(
                        parseInt(dayElements[0], 10),
                        parseInt(dayElements[1], 10) - 1,
                        parseInt(dayElements[2], 10) + 1);
                    return date;
                }

                return new Date(str);
            }
        },


        /**
         * This is a terrible MSIE hack. To make sure it displays more than
         * just the first letter in the selectbox, we have to resize it ..
         * to its current size. -_-'. Make sure not to resize when it's currently
         * got focus.
         */
        watchForChangeToResize : function(scope) {
            if (!$.browser.msie) {
                return;
            }

            _.each(_.tail(arguments), function(scopeVarName, key) {
                scope.$watch(scopeVarName, function() {

                    $rootScope.$evalAsync(function() {

                        // find the select boxes and "resize" them
                        angular.element("#va select").each(function() {
                            var selectBox = angular.element(this);
                            selectBox.width($(this).width() + 1);
                            selectBox.width($(this).width() - 1);
                        });

                    });
                })
            });
        }

    };

}]);
