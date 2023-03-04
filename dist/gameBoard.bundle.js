"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkbattleship"] = self["webpackChunkbattleship"] || []).push([["gameBoard"],{

/***/ "./src/factories/gameBoard.js":
/*!************************************!*\
  !*** ./src/factories/gameBoard.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"gameBoard\": () => (/* binding */ gameBoard)\n/* harmony export */ });\n/* harmony import */ var _ship_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ship.js */ \"./src/factories/ship.js\");\n\n\n\nconst gameBoard = () => {\n    const gameBoardSize = 9;\n    const shipsArray = [];\n    const missedHitsCoordinates = [];\n    function createShip(length, coordinates) {\n        // if (!areCoordinatesLegit(coordinates)) \n            // return;\n        // isCoordinatesFree();\n        const newShip = new _ship_js__WEBPACK_IMPORTED_MODULE_0__.ship(length);\n        shipsArray.push({ newShip, coordinates });\n    };\n    function areCoordinatesLegit(coordinates) {\n        if ((coordinates.x >= 0) \n            && (coordinates.x < gameBoardSize) \n            && (coordinates.y >= 0) \n            && (coordinates.y < gameBoardSize)) {\n                return true\n            } else return false;\n    };\n    function receiveHit(hitCoordinates) {\n        let shipWasHit = false;\n        shipsArray.forEach(shipsArrayElement => {\n            shipsArrayElement.coordinates.forEach(shipCoordinates => {\n                if (JSON.stringify(hitCoordinates) == JSON.stringify(shipCoordinates)) {\n                    shipsArrayElement.newShip.hit();\n                    shipWasHit = true;\n                }\n            });\n        });\n        if (!shipWasHit) {\n            missedHitsCoordinates.push(hitCoordinates);\n        }\n    };\n    function isGameOver() {\n        let thereIsLiveShip = false;\n        shipsArray.forEach(shipsArrayElement => {\n            if (!shipsArrayElement.newShip.isSunk()) {\n                thereIsLiveShip = true;\n            }\n        });\n        return (thereIsLiveShip) ? false : true;\n    };\n    return {createShip, shipsArray, receiveHit, missedHitsCoordinates, isGameOver};\n};\n\n//# sourceURL=webpack://battleship/./src/factories/gameBoard.js?");

/***/ }),

/***/ "./src/factories/ship.js":
/*!*******************************!*\
  !*** ./src/factories/ship.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"ship\": () => (/* binding */ ship)\n/* harmony export */ });\n\n\nconst ship = (le) => {\n    const length = le;\n    let hits = 0;\n    function hit() {\n        this.hits++;\n    }\n    function isSunk() {\n        return (this.hits == this.length) ? true : false;\n    }\n    return {length, hit, hits, isSunk};\n};\n\n//# sourceURL=webpack://battleship/./src/factories/ship.js?");

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./src/factories/gameBoard.js"));
/******/ }
]);