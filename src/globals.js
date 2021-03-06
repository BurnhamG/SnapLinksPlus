'use strict';

let docElem = document.documentElement;

const NONE  = 0,
		CTRL	= 1,
		ALT	= 2,
		SHIFT = 4;

//  (MouseEvent.buttons bitfield)
const LMB = 1,	// Left Mouse Button
		RMB = 2,	// Right Mouse Button
		MMB = 4;	// Middle Mouse Button

// Actions
const BACKGROUND_TEST		= 'BackgroundTest';
const RELOAD_EXTENSION		= 'ReloadExtension';
const OPEN_URLS_IN_TABS = 'OpenUrlsInTabs';

let isChrome  = location.protocol === 'chrome-extenson:',
	isFirefox = location.protocol === 'moz-extension:';

const DefaultPrefs = {
	IndexBuckets: 10,
	ScrollRate:   8,

	Activation_MinX: 5,
	Activation_MinY: 5,

	SelectionLabel_CursorMargin: 2,

	HighlightStyles_ActOnElements:       'fill: rgba(0,255,0,.10); stroke: rgba(0,255,0,1); stroke-width: 1px;',
	HighlightStyles_IndexBoundaryMarker: 'fill: rgba(128,128,128,.5);',

	HighlightStyles_ObscuredPoint: 'fill: rgba(255,0,0,.80);',
	HighlightStyles_ObscuredRect:  'fill: rgba(127,127,127,.10); stroke: rgba(127,127,127,.60); stroke-width: 1px;',

	OpenTabsAtEndOfTabBar: false,
	SwitchFocusToNewTab:	false,		// Needed/referenced anywhere?
	ShowNumberOfLinks:		true,
	ActivateModifiers:		NONE,
	ActivateMouseButton:	RMB,

	DisableFontWeightFiltering: false,

	DevMode:                false,
	Dev_Log_ActionMessages: false,
	Dev_Skip_AllActions:    false,


	Debug_Measure_IndexingSpeed:     false,
	Debug_Measure_SearchSpeed:       false,
	Debug_Log_OutOfBoundElements:    false,
	Debug_Show_IndexBoundaryMarkers: false,
	Debug_Show_ObscuredMarks:        false,

	UI_AdvancedOptions_Section: false,
	UI_DevOptions_Section:      false,
};

// Configurations
let Prefs = new Configs(DefaultPrefs);
Prefs.loaded.then((aValues) => {
//	if(Prefs.DevMode)
//		Object.assign(Prefs.HighlightStyles, data.Dev.HighlightStyles);
});

// Pub-Sub Events
///////////////////

// Publisher: EventHandler
const DragRectChanged         = 'DragRectChanged',
		DragCompleted				= 'DragCompleted';
const DocSizeChanged          = 'DocSizeChanged',
		ElementPositionsChanged = 'ElementPositionsChanged';

// Publisher: SelectionRect
const ContainerElementCreated = 'ContainerElementCreated';

// Publisher: ElementIndexer
const ElementsSelected = 'ElementsSelected';

/**
 * @param {string} css
 * @returns {Node[]}
 */
function $(css) {
	return Array.from(document.documentElement.querySelectorAll(css));
}

/**
 * Returns true if we are tracking the given element
 *
 * @param {HTMLElement} el
 */
function Tracking(el) {
	return false && el && el.tagName == 'A' && el.href == 'https://eggcave.com/click/2194270';
}

console.json = (arg) => {return JSON.parse(JSON.stringify(arg));};

Function.prototype.wrap = function wrap(wrapper) {
	let wrapped = this;
	return wrapper.bind(undefined, (...args) => wrapped(...args));
};

function ReturnArg0Wrapper(wrapped, ...args) {
	wrapped(...args);
	return args[0];
}

console.log	= console.log.wrap(ReturnArg0Wrapper);
console.info	= console.info.wrap(ReturnArg0Wrapper);
console.error = console.error.wrap(ReturnArg0Wrapper);
console.warn	= console.warn.wrap(ReturnArg0Wrapper);
