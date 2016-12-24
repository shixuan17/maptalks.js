import { createEl } from 'core/util/dom';
import Control from './Control';
import Map from 'map';

/**
 * @classdesc
 * A control to allows to display attribution content in a small text box on the map.
 * @class
 * @category control
 * @extends Control
 * @memberOf control
 * @name Attribution
 * @param {Object} [options=null] - options defined in [Attribution]{@link Attribution#options}
 * @example
 * var attribution = new Attribution({
 *     position : 'bottom-left',
 *     content : 'hello maptalks'
 * }).addTo(map);
 */
export const Attribution = Control.extend(/** @lends Attribution.prototype */ {

    /**
     * @property {Object} options - options
     * @property {Object} [options.position='bottom-left'] - position of the control
     * @property {String} [options.content='Powered By <a href="http://www.org" target="_blank">MapTalks</a>']  - content of the attribution control, HTML format
     */
    options: {
        'position': 'bottom-left',
        'content': 'Powered By <a href="http://www.org" target="_blank">MapTalks</a>'
    },

    buildOn: function () {
        this._attributionContainer = createEl('div', 'maptalks-attribution');
        this._update();
        return this._attributionContainer;
    },

    /**
     * Set content of the attribution
     * @param {String} content - attribution content
     * @return {Attribution} this
     */
    setContent: function (content) {
        this.options['content'] = content;
        this._update();
        return this;
    },

    _update: function () {
        if (!this.getMap()) {
            return;
        }
        this._attributionContainer.innerHTML = this.options['content'];
    }
});

Map.mergeOptions({
    'attributionControl': false
});

Map.addOnLoadHook(function () {
    if (this.options['attributionControl']) {
        this.attributionControl = new Attribution(this.options['attributionControl']);
        this.addControl(this.attributionControl);
    }
});
