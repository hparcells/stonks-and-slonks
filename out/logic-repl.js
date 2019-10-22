'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var repl = require('repl');
var crypto = _interopDefault(require('crypto'));

function commonjsRequire () {
	throw new Error('Dynamic requires are not currently supported by rollup-plugin-commonjs');
}

function unwrapExports (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var chance_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
function chance(percent) {
    if (typeof percent !== 'number') {
        throw new TypeError('Provided percent must be a number.');
    }
    return Math.random() * 100 <= percent;
}
exports.chance = chance;

});

unwrapExports(chance_1);
var chance_2 = chance_1.chance;

var randomInt_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
function randomInt(min, max) {
    if (typeof min !== 'number' || typeof max !== 'number') {
        throw new TypeError('Provided range must be numbers.');
    }
    if (min > max) {
        throw new TypeError('Minimum number must be less than or equal to the maximum number.');
    }
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
exports.randomInt = randomInt;

});

unwrapExports(randomInt_1);
var randomInt_2 = randomInt_1.randomInt;

var randomOf_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
function randomOf(list) {
    if (!Array.isArray(list)) {
        throw new TypeError('Passed array must be an array.');
    }
    return list[Math.floor(Math.random() * list.length)];
}
exports.randomOf = randomOf;

});

unwrapExports(randomOf_1);
var randomOf_2 = randomOf_1.randomOf;

var randomList_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
const MissingItem = Symbol('MissingItem');

function randomList(list, items = 1, requiredValues = []) {
    if (!Array.isArray(list)) {
        throw new TypeError('Passed list must be an array.');
    }
    if (typeof items !== 'number') {
        throw new TypeError('Item count must be a number.');
    }
    if (!Array.isArray(requiredValues)) {
        throw new TypeError('Required values must be an array.');
    }
    const requiredValuesPositions = requiredValues.map(() => -1);
    const values = Array(items).fill(MissingItem);
    requiredValues.forEach((item, i) => {
        let position;
        do {
            position = Math.floor(Math.random() * items);
        } while (requiredValuesPositions.includes(position));
        requiredValuesPositions[i] = position;
    });
    requiredValuesPositions.forEach((position, i) => {
        values[position] = requiredValues[i];
    });
    return values.map((item) => {
        if (item === MissingItem) {
            return randomOf_1.randomOf(list);
        }
        return item;
    });
}
exports.randomList = randomList;

});

unwrapExports(randomList_1);
var randomList_2 = randomList_1.randomList;

var random = createCommonjsModule(function (module, exports) {
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(chance_1);
__export(randomInt_1);
__export(randomList_1);
__export(randomOf_1);

});

var index = unwrapExports(random);

var random$1 = /*#__PURE__*/Object.freeze({
	__proto__: null,
	'default': index,
	__moduleExports: random
});

var capitalize_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
function capitalize(string) {
    return string.substring(0, 1).toUpperCase() + string.substring(1);
}
exports.capitalize = capitalize;

});

unwrapExports(capitalize_1);
var capitalize_2 = capitalize_1.capitalize;

var format_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
function format(format, ...variables) {
    return format.replace(/\$[0-9]+/g, (x) => String(variables[parseInt(x.substring(1)) - 1]));
}
exports.format = format;

});

unwrapExports(format_1);
var format_2 = format_1.format;

var isValidEmail_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
function isValidEmail(email) {
    if (typeof email !== 'string') {
        throw new TypeError('Email must be typeof string.');
    }
    return (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(email);
}
exports.isValidEmail = isValidEmail;

});

unwrapExports(isValidEmail_1);
var isValidEmail_2 = isValidEmail_1.isValidEmail;

var plural_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
function plural(number, word) {
    if (typeof number !== 'number') {
        throw new TypeError('Passed number must be typeof number.');
    }
    if (typeof word !== 'string') {
        throw new TypeError('Passed word must be typeof string.');
    }
    return `${word}${number === 1 ? '' : 's'}`;
}
exports.plural = plural;

});

unwrapExports(plural_1);
var plural_2 = plural_1.plural;

var string = createCommonjsModule(function (module, exports) {
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(capitalize_1);
__export(format_1);
__export(isValidEmail_1);
__export(plural_1);

});

var index$1 = unwrapExports(string);

var string$1 = /*#__PURE__*/Object.freeze({
	__proto__: null,
	'default': index$1,
	__moduleExports: string
});

const sample = arr => {
  const len = arr == null ? 0 : arr.length;
  return len ? arr[Math.floor(Math.random() * len)] : undefined
};

/**
 * mostlyUnique grabs a random item from the source set
 * that has been tried up to 15 times to not exist within the phrase string
 * @param phrase {string} The existing phrase
 * @param source {array} The source to sample
 * @return item {string} The randomly sampled item from source
 */
var unique = function mostlyUnique(phrase, source){
  var item = sample(source);
  // try up to 15 times to choose a unique value that isn't already in our phrase
  for( var i=0; i <= 15; i++ ) {
    // strip punctuation to make regex search for whole word phrase
    // e.g. ", which blah blah" => "which blah blah"
    var stripped = item.replace(', ', '');
    // match whole word/continuation (not parts of words like 'up'->'upchuck|chuckup')
    if(phrase.match(new RegExp('^'+stripped+'| '+stripped+',? | '+stripped+'$'))){
      item = sample(source);
    }else{
      break
    }
  }
  return item
};

var adjectives = [
  "24/7"
  ,"acoustic"
  ,"adaptive"
  ,"adversarial"
  ,"all-purpose"
  ,"antifragile"
  ,"asynchronous"
  ,"B2B"
  ,"behavioral"
  ,"best-of-breed"
  ,"bleeding-edge"
  ,"blockchain"
  ,"cognitive"
  ,"cohesive"
  ,"collaborative"
  ,"compatible"
  ,"compelling"
  ,"configurable"
  ,"consensus"
  ,"cross-platform"
  ,"custom"
  ,"cutting-edge"
  ,"deconvolutional"
  ,"deep convolutional"
  ,"didactic"
  ,"digital"
  ,"disintermediate"
  ,"ergonomic"
  ,"extensible"
  ,"extravehicular"
  ,"evolutionary"
  ,"functional"
  ,"frictionless"
  ,"generative"
  ,"granular"
  ,"heuristic"
  ,"holistic"
  ,"hyperlocal"
  ,"immersive"
  ,"immutable"
  ,"incremental"
  ,"intuitive"
  ,"innovative"
  ,"logistical"
  ,"meatspace"
  ,"mission-critical"
  ,"modular"
  ,"multifaceted"
  ,"multilayered"
  ,"multitiered"
  ,"native"
  ,"non-linear"
  ,"non-volatile"
  ,"on-demand"
  ,"optional"
  ,"organizational"
  ,"parallel"
  ,"plug-and-play"
  ,"policy-driven"
  ,"polymorphic"
  ,"proactive"
  ,"quantum"
  ,"real-time"
  ,"reciprocal"
  ,"regressive"
  ,"residual"
  ,"responsive"
  ,"retroactive"
  ,"retrospective"
  ,"scalable"
  ,"seamless"
  ,"shallow"
  ,"skeuomorphic"
  ,"stochastic"
  ,"sustainable"
  ,"tangible"
  ,"third-generation"
  ,"transitional"
  ,"ubiquitous"
  ,"unique"
  ,"upgradable"
  ,"variable"
  ,"zero-downtime"
];

var continuation = [
  ", allowing"
  ,", anticipating"
  ,", diametrically opposed to"
  ,", enhanced by"
  ," for"
  ,", forging"
  ,", in contrast to"
  ,", in preparation for"
  ,", independent of"
  ,", leveraging"
  ,", liberating"
  ,", protecting against"
  ,", providing"
  ,", pioneering"
  ," on behalf of"
  ,", which foreshadows"
  ,", which will enable"
  ,", which revolutionizes"
];

var final_1 = [
  '.COM'
  ,'2.0'
  ,'as a service'
  ,'as code'
  ,'at large'
  ,'at scale'
  ,'en masse'
  ,'for dummies'
  ,'for people'
  ,'forever'
  ,'hacks'
  ,'in 3-D'
  ,'remembered'
  ,'with cheese'
  ,'with ease'
];

var nouns_plural = [
  "abstractions"
  ,"action-items"
  ,"algorithms"
  ,"alignments"
  ,"analytics"
  ,"applications"
  ,"architectures"
  ,"availabilities"
  ,"bandwidths"
  ,"blockchains"
  ,"capabilities"
  ,"channels"
  ,"cloud"
  ,"clusters"
  ,"communities"
  ,"concepts"
  ,"contingencies"
  ,"convergence"
  ,"deliverables"
  ,"DevOps"
  ,"engagement"
  ,"enhancements"
  ,"experiences"
  ,"hardware"
  ,"hyperconvergence"
  ,"hyperledgers"
  ,"infrastructures"
  ,"initiatives"
  ,"interfaces"
  ,"layers"
  ,"management"
  ,"markets"
  ,"matrices"
  ,"methodologies"
  ,"mobility"
  ,"minimum-viable-product"
  ,"networking"
  ,"networks"
  ,"neural-nets"
  ,"normalization"
  ,"options"
  ,"overfitting"
  ,"paradigm-shifts"
  ,"paradigms"
  ,"partnerships"
  ,"platforms"
  ,"policies"
  ,"pooling"
  ,"programming"
  ,"projections"
  ,"relationships"
  ,"ROI"
  ,"singularity"
  ,"solutions"
  ,"subspace"
  ,"superstructures"
  ,"team-players"
  ,"time-phases"
  ,"touchpoints"
  ,"value-add"
  ,"virtualization"
];

var nouns_singular = [
  "abstraction"
  ,"action-item"
  ,"algorithm"
  ,"alignment"
  ,"alliance"
  ,"application"
  ,"architecture"
  ,"artificial intelligence"
  ,"availability"
  ,"bandwidth"
  ,"blockchain"
  ,"capability"
  ,"channel"
  ,"cloud"
  ,"cluster"
  ,"collaboration"
  ,"community"
  ,"concept"
  ,"contingency"
  ,"convergence"
  ,"deliverable"
  ,"empowerment"
  ,"engagement"
  ,"enhancement"
  ,"experience"
  ,"flexibility"
  ,"groupware"
  ,"hardware"
  ,"hyperconvergence"
  ,"hyperledgers"
  ,"infrastructure"
  ,"initiative"
  ,"interface"
  ,"layer"
  ,"ledger"
  ,"management"
  ,"market"
  ,"methodology"
  ,"matrix"
  ,"mobility"
  ,"minimum-viable-product"
  ,"networking"
  ,"network"
  ,"neural-net"
  ,"normalization"
  ,"option"
  ,"overfitting"
  ,"paradigm-shift"
  ,"paradigm"
  ,"parallelism"
  ,"partnership"
  ,"platform"
  ,"policy"
  ,"pooling"
  ,"programming"
  ,"projection"
  ,"relationship"
  ,"ROI"
  ,"singularity"
  ,"solution"
  ,"subspace"
  ,"superstructure"
  ,"team-player"
  ,"time-phase"
  ,"touchpoint"
  ,"value-add"
  ,"virtualization"
];

var verbs_imperative = [
  "accelerate"
  ,"advance"
  ,"agglomerate"
  ,"aggregate"
  ,"architect"
  ,"arrange"
  ,"balance"
  ,"concatenate"
  ,"conceal"
  ,"conceptualize"
  ,"configure"
  ,"containerize"
  ,"converge"
  ,"convert"
  ,"crowd-source"
  ,"cultivate"
  ,"customize"
  ,"decentralize"
  ,"decrement"
  ,"deliver"
  ,"deploy"
  ,"deserialize"
  ,"design"
  ,"digitize"
  ,"disable"
  ,"disintermediate"
  ,"disrupt"
  ,"distribute"
  ,"download"
  ,"drive"
  ,"e-enable"
  ,"embrace"
  ,"emit"
  ,"empower"
  ,"enable"
  ,"enact"
  ,"enforce"
  ,"engage"
  ,"engineer"
  ,"enhance"
  ,"envisioneer"
  ,"equip"
  ,"evolve"
  ,"excellerate"
  ,"expedite"
  ,"exploit"
  ,"export"
  ,"extend"
  ,"facilitate"
  ,"generate"
  ,"grow"
  ,"guarantee"
  ,"hack"
  ,"hack into"
  ,"harness"
  ,"hybridize"
  ,"hyper-converge"
  ,"imagine"
  ,"implement"
  ,"improve"
  ,"incentivize"
  ,"increase"
  ,"increment"
  ,"incubate"
  ,"initialize"
  ,"innovate"
  ,"insert"
  ,"integrate"
  ,"interject"
  ,"intermediate"
  ,"introduce"
  ,"isolate"
  ,"iterate"
  ,"leverage"
  ,"load-balance"
  ,"lobotomize"
  ,"maximize"
  ,"mediate"
  ,"monetize"
  ,"monitor"
  ,"offload"
  ,"optimize"
  ,"orchestrate"
  ,"oversee"
  ,"perform"
  ,"permit"
  ,"prioritize"
  ,"process"
  ,"procure"
  ,"productize"
  ,"protect"
  ,"pursue"
  ,"re-purpose"
  ,"re-route"
  ,"recontextualize"
  ,"redefine"
  ,"refine"
  ,"reintermediate"
  ,"reinvent"
  ,"reinvigorate"
  ,"remediate"
  ,"replace"
  ,"repurpose"
  ,"reveal"
  ,"revolutionize"
  ,"secure"
  ,"seize"
  ,"serialize"
  ,"stream"
  ,"streamline"
  ,"syndicate"
  ,"synergize"
  ,"synthesize"
  ,"systematize"
  ,"transform"
  ,"transition"
  ,"transmit"
  ,"turn off"
  ,"undo"
  ,"ungroup"
  ,"unleash"
  ,"upcycle"
  ,"uphold"
  ,"upload"
  ,"utilize"
  ,"virtualize"
  ,"visualize"
];

var verbs_past = [
  "accelerated"
  ,"admitted"
  ,"agglomerated"
  ,"aggregated"
  ,"architected"
  ,"arranged"
  ,"backed"
  ,"backed-up"
  ,"balanced"
  ,"beginning"
  ,"benchmarked"
  ,"blocked"
  ,"booted"
  ,"branded"
  ,"changed"
  ,"clicked"
  ,"clicked-on"
  ,"closed"
  ,"clustered"
  ,"coded"
  ,"compared"
  ,"concatenated"
  ,"concealed"
  ,"conceptualized"
  ,"configured"
  ,"connected"
  ,"containerized"
  ,"controlled"
  ,"converged"
  ,"converted"
  ,"conveyed"
  ,"copied"
  ,"crowd-sourced"
  ,"cultivated"
  ,"customized"
  ,"decentralized"
  ,"decremented"
  ,"defined"
  ,"deleted"
  ,"delivered"
  ,"deserialized"
  ,"designed"
  ,"differentiated"
  ,"digitized"
  ,"disabled"
  ,"disbursed"
  ,"disintermediated"
  ,"disrupted"
  ,"distributed"
  ,"downloaded"
  ,"dragged"
  ,"driven"
  ,"e-enabled"
  ,"echoed"
  ,"edited"
  ,"embraced"
  ,"emitted"
  ,"empowered"
  ,"enabled"
  ,"engaged"
  ,"engineered"
  ,"enhanced"
  ,"envisioneered"
  ,"equipped"
  ,"even-keeled"
  ,"evolved"
  ,"excelled"
  ,"exited"
  ,"expedited"
  ,"exploited"
  ,"exported"
  ,"extended"
  ,"extruded"
  ,"facilitated"
  ,"filed"
  ,"filled"
  ,"filtered"
  ,"filtered-out"
  ,"found"
  ,"fitted"
  ,"flipped"
  ,"formatted"
  ,"forwarded"
  ,"frozen"
  ,"generated"
  ,"unpowered"
  ,"grouped"
  ,"grown"
  ,"hacked"
  ,"hacked-into"
  ,"harnessed"
  ,"hidden"
  ,"held-down"
  ,"hooked-up"
  ,"hybridized"
  ,"hyper-converged"
  ,"implemented"
  ,"incentivized"
  ,"incremented"
  ,"incubated"
  ,"initialized"
  ,"innovated"
  ,"input"
  ,"inserted"
  ,"integrated"
  ,"intermediated"
  ,"isolated"
  ,"iterated"
  ,"keyed-in"
  ,"killed"
  ,"leveraged"
  ,"listened-to"
  ,"loaded"
  ,"load-balanced"
  ,"lobotomized"
  ,"logged"
  ,"logged-in"
  ,"managed"
  ,"marshalled"
  ,"matricized"
  ,"maximized"
  ,"megathreaded"
  ,"merged"
  ,"meshed"
  ,"mindshared"
  ,"monetized"
  ,"monitored"
  ,"morphed"
  ,"moved"
  ,"offloaded"
  ,"omitted"
  ,"opted-out"
  ,"opted-in"
  ,"optimized"
  ,"orchestrated"
  ,"overseen"
  ,"performed"
  ,"permitted"
  ,"plugged-in"
  ,"polled"
  ,"popped-up"
  ,"powered"
  ,"powered-down"
  ,"powered-up"
  ,"pressed"
  ,"printed"
  ,"printed-out"
  ,"prioritized"
  ,"processed"
  ,"productized"
  ,"protected"
  ,"ranged"
  ,"re-purposed"
  ,"re-routed"
  ,"read"
  ,'realigned'
  ,"received"
  ,"recontextualized"
  ,"recorded"
  ,"redefined"
  ,"redone"
  ,"referred"
  ,"refined"
  ,"reintermediated"
  ,"reinvented"
  ,"reinvigorated"
  ,"released"
  ,"reloaded"
  ,"repeated"
  ,"replaced"
  ,"repurposed"
  ,"resolved"
  ,"resubmitted"
  ,"resupplied"
  ,"retrieved"
  ,"revealed"
  ,"revolutionized"
  ,"right-sized"
  ,"routed"
  ,"ran"
  ,"saved"
  ,"scaled"
  ,"scanned"
  ,"scrolled"
  ,"scroll-down"
  ,"secured"
  ,"seized"
  ,"selected"
  ,"sent"
  ,"serialized"
  ,"shared"
  ,"shown"
  ,"shut-down"
  ,"signed-in"
  ,"signed-up"
  ,"solved"
  ,"sorted"
  ,"split"
  ,"started"
  ,"startup"
  ,"start-up"
  ,"stored"
  ,"strategized"
  ,"streamed"
  ,"streamlined"
  ,"submitted"
  ,"supervised"
  ,"supplied"
  ,"synchronized"
  ,"syndicated"
  ,"synergized"
  ,"synthesized"
  ,"systematized"
  ,"offlined"
  ,"on-lined"
  ,"targeted"
  ,"transferred"
  ,"transformed"
  ,"transitioned"
  ,"transmitted"
  ,"turned-off"
  ,"undone"
  ,"ungrouped"
  ,"unleashed"
  ,"unmarshalled"
  ,"unresolved"
  ,"unsupervised"
  ,"upcycled"
  ,"unmeshed"
  ,"upheld"
  ,"uploaded"
  ,"utilized"
  ,"virtualized"
  ,"visualized"
  ,"well-modulated"
  ,"whiteboarded"
  ,"wiped-out"
  ,"written"
];

var verbs_present = [
  "accelerating"
  ,"admitting"
  ,"agglomerating"
  ,"aggregating"
  ,"architecting"
  ,"arranging"
  ,"backing"
  ,"backing-up"
  ,"balancing"
  ,"beginning"
  ,"benchmarking"
  ,"blocking"
  ,"booting"
  ,"branding"
  ,"changing"
  ,"clicking"
  ,"clicking-on"
  ,"closing"
  ,"clustering"
  ,"coding"
  ,"comparing"
  ,"concatenating"
  ,"concealing"
  ,"conceptualizing"
  ,"configuring"
  ,"connecting"
  ,"containerizing"
  ,"controlling"
  ,"converging"
  ,"converting"
  ,"conveying"
  ,"copying"
  ,"crowd-sourcing"
  ,"cultivating"
  ,"customizing"
  ,"decentralizing"
  ,"decrementing"
  ,"defining"
  ,"deleting"
  ,"delivering"
  ,"deserializing"
  ,"designing"
  ,"differentiating"
  ,"digitizing"
  ,"disabling"
  ,"disbursing"
  ,"disintermediating"
  ,"disrupting"
  ,"distributing"
  ,"downloading"
  ,"dragging"
  ,"drive"
  ,"e-enabling"
  ,"echoing"
  ,"editing"
  ,"embracing"
  ,"emitting"
  ,"empowering"
  ,"enabling"
  ,"engaging"
  ,"engineering"
  ,"enhancing"
  ,"envisioneering"
  ,"equipping"
  ,"evolving"
  ,"excelling"
  ,"exiting"
  ,"expediting"
  ,"exploiting"
  ,"exporting"
  ,"extending"
  ,"extruding"
  ,"exuding"
  ,"facilitating"
  ,"filing"
  ,"filling"
  ,"filtering"
  ,"filtering-out"
  ,"finding"
  ,"fitting"
  ,"flipping"
  ,"formatting"
  ,"forwarding"
  ,"freezing"
  ,"generating"
  ,"unpowering"
  ,"grouping"
  ,"growing"
  ,"hacking"
  ,"hacking-into"
  ,"harnessing"
  ,"hiding"
  ,"holding-down"
  ,"hooking-up"
  ,"hybridizing"
  ,"hyper-converging"
  ,"implementing"
  ,"incentivizing"
  ,"incrementing"
  ,"incubating"
  ,"initializing"
  ,"innovating"
  ,"inputing"
  ,"inserting"
  ,"integrating"
  ,"intermediating"
  ,"isolating"
  ,"iterating"
  ,"keying-in"
  ,"killing"
  ,"leveraging"
  ,"listening-to"
  ,"loading"
  ,"load-balancing"
  ,"lobotomizing"
  ,"logging"
  ,"logging-in"
  ,"managing"
  ,"marshalling"
  ,"matricizing"
  ,"maximizing"
  ,"megathreading"
  ,"merging"
  ,"meshing"
  ,"mindsharing"
  ,"monetizing"
  ,"monitoring"
  ,"morphing"
  ,"moving"
  ,"offloading"
  ,"omitting"
  ,"opting-out"
  ,"opting-in"
  ,"optimizing"
  ,"orchestrating"
  ,"overseeing"
  ,"performing"
  ,"permitting"
  ,"plugging-in"
  ,"polling"
  ,"popping-up"
  ,"powering"
  ,"powering-down"
  ,"powering-up"
  ,"pressing"
  ,"printing"
  ,"printing-out"
  ,"prioritizing"
  ,"processing"
  ,"productizing"
  ,"protecting"
  ,"ranging"
  ,"re-purposing"
  ,"re-routing"
  ,"reading"
  ,'realigning'
  ,"receiving"
  ,"recontextualizing"
  ,"recording"
  ,"redefining"
  ,"redoing"
  ,"referring"
  ,"refining"
  ,"reintermediating"
  ,"reinventing"
  ,"reinvigorating"
  ,"releasing"
  ,"reloading"
  ,"repeating"
  ,"replacing"
  ,"repurposing"
  ,"resolving"
  ,"resubmitting"
  ,"resupplying"
  ,"retrieving"
  ,"revealing"
  ,"revolutionizing"
  ,"right-sizing"
  ,"routing"
  ,"running"
  ,"saving"
  ,"scaling"
  ,"scanning"
  ,"scrolling"
  ,"scrolling-down"
  ,"securing"
  ,"seizing"
  ,"selecting"
  ,"sending"
  ,"serializing"
  ,"sharing"
  ,"showing"
  ,"shutting-down"
  ,"signing-in"
  ,"signing-up"
  ,"solving"
  ,"sorting"
  ,"splitting"
  ,"starting"
  ,"starting-up"
  ,"storing"
  ,"strategizing"
  ,"streaming"
  ,"streamlining"
  ,"submitting"
  ,"supervising"
  ,"suppliing"
  ,"synchronizing"
  ,"syndicating"
  ,"synergizing"
  ,"synthesizing"
  ,"systematizing"
  ,"offlining"
  ,"on-lining"
  ,"targeting"
  ,"transferring"
  ,"transforming"
  ,"transitioning"
  ,"transmitting"
  ,"turning-off"
  ,"undoing"
  ,"ungrouping"
  ,"unleashing"
  ,"unmarshalling"
  ,"unresolving"
  ,"unsupervising"
  ,"upcycling"
  ,"unmeshing"
  ,"upholding"
  ,"uploading"
  ,"utilizing"
  ,"virtualizing"
  ,"visualizing"
  ,"well-modulating"
  ,"whiteboarding"
  ,"wiping-out"
  ,"writting"
];

// words








/**
 * format a string
 * @param format {string} The string format
 * @example: format('{a} {v} {n}')
 * @return {string} 'adjective verb singularNoun' phrase
 */
var format = function format(format){
  // until each item is replaced
  // we don't want to do a /g global in one swoop because we need to run
  // unique test on the string as it builds
  while( /\{[a-zA-Z]\}/.test(format) ){
    format = format.replace(/{a}/, function(){ return unique(format, adjectives) })
    .replace(/{c}/, function(){ return unique(format, continuation) })
    .replace(/{i}/, function(){ return unique(format, verbs_imperative) })
    .replace(/{V}/, function(){ return unique(format, verbs_present) })
    .replace(/{v}/, function(){ return unique(format, verbs_past) })
    .replace(/{N}/, function(){ return unique(format, nouns_plural) })
    .replace(/{n}/, function(){ return unique(format, nouns_singular) })
    .replace(/{f}/, function(){ return unique(format, final_1) });
  }
  return format
};

const defaultConfig = {
  // see format method docs for format string options
  format: '{v} {a} {N}',
  // iterations is just a shortcut for concatenating "{c}"+format
  // n times on your format string
  iterations: 1
};

const buzzphrase = {
  buzz: function(iterations) {
    console.log(buzzphrase.getPhrase(iterations));
  },
  // newer, official API
  get: function(config){
    var conf = Object.assign({}, defaultConfig, config);
    var formatString = conf.format;
    if(conf.iterations > 1){
      for(var i=1; i<conf.iterations; i++){
        formatString += '{c} ' + conf.format;
      }
    }
    return format(formatString)
  },
  getImperative: function(iterations){
    return buzzphrase.get({
      format: '{i} {v} {a} {N}'
    })
  },
  getPhrase: function(iterations) {
    return buzzphrase.get({
      iterations: iterations||1
    })
  },
  log: function(config) {
    console.log(buzzphrase.get(config));
  },
};
var buzzphrase_1 = buzzphrase;


if((commonjsRequire.main || {}).filename === __filename){
  // running as a global command
  // via `npm install -g buzzphrase; buzzphrase`
  // just call it and let it all hang out:
  var lastArg = process.argv[process.argv.length - 1];
  var formatSpecified = lastArg.indexOf('{')!==-1;
  var numberArg = formatSpecified ? process.argv[process.argv.length - 2] : lastArg;
  var iterations = isNaN(Number(numberArg)) ? defaultConfig.iterations : numberArg;
  buzzphrase.log({
    format: formatSpecified ? lastArg : defaultConfig.format,
    iterations: iterations
  });
}

let state = {};
function setState(newState) {
    state = newState;
}
var state$1 = state;

// Unique ID creation requires a high quality random # generator.  In node.js
// this is pretty straight-forward - we use the crypto API.



var rng = function nodeRNG() {
  return crypto.randomBytes(16);
};

/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */
var byteToHex = [];
for (var i = 0; i < 256; ++i) {
  byteToHex[i] = (i + 0x100).toString(16).substr(1);
}

function bytesToUuid(buf, offset) {
  var i = offset || 0;
  var bth = byteToHex;
  // join used to fix memory issue caused by concatenation: https://bugs.chromium.org/p/v8/issues/detail?id=3175#c4
  return ([bth[buf[i++]], bth[buf[i++]], 
	bth[buf[i++]], bth[buf[i++]], '-',
	bth[buf[i++]], bth[buf[i++]], '-',
	bth[buf[i++]], bth[buf[i++]], '-',
	bth[buf[i++]], bth[buf[i++]], '-',
	bth[buf[i++]], bth[buf[i++]],
	bth[buf[i++]], bth[buf[i++]],
	bth[buf[i++]], bth[buf[i++]]]).join('');
}

var bytesToUuid_1 = bytesToUuid;

function v4(options, buf, offset) {
  var i = buf && offset || 0;

  if (typeof(options) == 'string') {
    buf = options === 'binary' ? new Array(16) : null;
    options = null;
  }
  options = options || {};

  var rnds = options.random || (options.rng || rng)();

  // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`
  rnds[6] = (rnds[6] & 0x0f) | 0x40;
  rnds[8] = (rnds[8] & 0x3f) | 0x80;

  // Copy bytes to buffer, if provided
  if (buf) {
    for (var ii = 0; ii < 16; ++ii) {
      buf[i + ii] = rnds[ii];
    }
  }

  return buf || bytesToUuid_1(rnds);
}

var v4_1 = v4;

// Stonks and Slonks Stock Engine
class Stock {
    constructor(settings) {
        /** Unique Identifier */
        this.id = v4_1();
        /** The "trend" part of the stocks. */
        this.bias = 0;
        /** The history of all the stock simulations. */
        this.stockHistory = [];
        this.settings = settings;
        this.name = settings.name;
        this.margin = settings.margin;
        this.availableStocks = settings.availableStocks;
        this.stockPrice = settings.stockPrice;
        this.instability = settings.instability;
    }
    /** Simulates one day of a stock. Returns the stock price after the simulation. */
    simulate() {
        /** How much the stock will be changing. */
        let change = Math.floor(Math.random() * this.margin);
        /** How much the bias will be changing. */
        let changeBias = Math.floor(Math.random() * this.settings.instability) + 1;
        /** The deciding factor in whether the stock goes up or down in price. */
        let random = Math.floor(Math.random() * 100);
        /** Whether the "trend" will go up or down. */
        let randomBias = Math.floor(Math.random() * 2);
        // Decides whether the stock will go up or down based on bias.
        if (random >= 0 && random <= this.bias) {
            // The stock is rising.
            this.stockPrice += change;
        }
        else {
            // The stock is falling.
            this.stockPrice -= change;
        }
        // Decides whether the "trend" goes up or down.
        if (randomBias === 1) {
            // The "trend" is going up.
            this.bias += changeBias;
        }
        else {
            // The "trend" is going down.
            this.bias -= changeBias;
        }
        // We wouldn't want a negative stock price now would we?
        if (this.stockPrice < 0)
            this.stockPrice = 0;
        // Makes sure the trends do not break the game.
        if (this.bias < 0)
            this.bias = 0;
        if (this.bias > 99)
            this.bias = 99;
        // Make sure the stock history does not get too long.
        if (this.stockHistory.length >= 50) {
            this.stockHistory.splice(this.stockHistory.length - 1, 1);
        }
        // Push the new stock to the history.
        this.stockHistory.push(this.stockPrice);
        // Returns the current price of the stock.
        return this.stockPrice;
    }
    /** Return the difference of the latest stocks */
    difference() {
        if (this.stockHistory.length > 1) {
            let diff0 = this.stockHistory[this.stockHistory.length - 1];
            let diff1 = this.stockHistory[this.stockHistory.length - 2];
            return diff0 - diff1;
        }
        else {
            // The history is not long enough.
            return 0;
        }
    }
    triggerCrash(biasChange, percent) {
        this.bias -= biasChange;
        this.stockPrice -= Math.floor(this.stockPrice * (percent / 100));
        if (this.bias < 0)
            this.bias = 0;
    }
    triggerLuck(biasChange, percent) {
        this.bias += biasChange;
        this.stockPrice += Math.floor(this.stockPrice * (percent / 100));
        if (this.bias > 99)
            this.bias = 99;
    }
}

// Stonks and Slonks Logic: Game Handler
/** Starts the game. */
function startGame() {
    setState({
        player: {
            money: 100,
            ownedStonks: []
        },
        stonkMarket: [],
        day: 0,
        startTime: Date.now()
    });
    // Generate four stock markets.
    for (let i = 0; i < 4; i++) {
        state$1.stonkMarket.push(new Stock({
            name: buzzphrase_1.get().split(' ').map((word) => {
                return undefined(word);
            }).join(' '),
            margin: undefined(10, 100),
            availableStocks: undefined(100, 250),
            stockPrice: Number((Math.random() * (10 - 5) + 5).toFixed(2)),
            instability: undefined(5, 35)
        }));
    }
}
/** Gets the main info. */
function getGameInfo() {
    return state$1;
}
/** Simulates one day unit of time. Should be called every 10 seconds. */
function simulateDay() {
    state$1.day++;
    for (let i = 0; i < state$1.stonkMarket.length; i++) {
        state$1.stonkMarket[i].simulate();
    }
    // TODO: Random event check.
}

var gameHandler = /*#__PURE__*/Object.freeze({
	__proto__: null,
	startGame: startGame,
	getGameInfo: getGameInfo,
	simulateDay: simulateDay
});

// Stonks and Slonks Logic: Money Handler
/**
 * Adds to the amount of money the player has.
 * @param amount The amount of money to add.
 */
function addMoney(amount) {
    state$1.player.money = state$1.player.money + amount;
}
/**
 * Removed money from the player.
 * @param amount The amount of money to remove.
 */
function removeMoney(amount) {
    state$1.player.money = state$1.player.money - amount;
}
/**
 * Sets the player's money to a given amount.
 * @param amount The amount of money.
 */
function setMoney(amount) {
    state$1.player.money = amount;
}

var moneyHandler = /*#__PURE__*/Object.freeze({
	__proto__: null,
	addMoney: addMoney,
	removeMoney: removeMoney,
	setMoney: setMoney
});

// Stonks and Slonks Logic: Stonk Handler
/** Buys a Stonk. */
function buyStonk(stonk) {
    // Add the Stonk to the player's owned stonks.
    state$1.player.ownedStonks.push({
        stonk: stonk,
        boughtPrice: stonk.stockPrice
    });
    // Removes the money from the player's money.
    removeMoney(stonk.stockPrice);
    // TODO: Remove from Stonk Market.
}
/** Sells a Stonk. */
function sellStonk(stonk) {
    // TODO:
    throw new Error('Not implemented.');
}

var stonkHandler = /*#__PURE__*/Object.freeze({
	__proto__: null,
	buyStonk: buyStonk,
	sellStonk: sellStonk
});

// Stonks and Slonks Logic: Main File

var rawLogic = /*#__PURE__*/Object.freeze({
	__proto__: null,
	game: gameHandler,
	money: moneyHandler,
	stonk: stonkHandler
});

/** Removes [Object: null prototype] from the console.log */
function clean(obj) {
  if (typeof obj !== 'object') {
    return obj;
  } else {
    return Array.isArray(obj)
      ? [ ...obj ].map(x => clean(x))
      : Object.keys(obj).reduce((newObj, key) => ({ ...newObj, [key]: clean(obj[key]) }), {});
  }
}

// process the logic object.
const logic = clean(rawLogic);

// Message
console.clear();
console.log(
`Inside of this program, you can mess around with the game logic stored in
./logic. All of the exports from ./logic/index.ts are available as globals
in this Node.JS REPL. You can also open chrome://inspect and use it's console.
`);
console.log('The logic object is as follows\n', logic, '\n');

// Create a REPL instance.
const instance = repl.start('> ');

// Copy every key from the logic export to the REPL's global object.
Object.keys(logic).forEach((key) => {
  instance.context[key] = {};
});

instance.context.logic = logic;
