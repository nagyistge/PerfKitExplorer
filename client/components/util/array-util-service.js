/**
 * @copyright Copyright 2014 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @fileoverview arrayUtilService is an angular service that provide useful
 * functions to work with arrays.
 * @author joemu@google.com (Joe Allan Muharsky)
 */

goog.provide('p3rf.perfkit.explorer.components.util.ArrayUtilService');

goog.scope(function() {
var explorer = p3rf.perfkit.explorer;



/**
 * See module docstring for more information about purpose and usage.
 *
 * @constructor
 * @ngInject
 */
explorer.components.util.ArrayUtilService = function() {};
var ArrayUtilService = explorer.components.util.ArrayUtilService;


/**
 * Swaps the elements at the given indexes.
 *
 * @param {Array} array
 * @param {number} from
 * @param {number} to
 */
ArrayUtilService.prototype.swap = function(array, from, to) {
  var element = array[from];
  array[from] = array[to];
  array[to] = element;
};

});  // goog.scope
