"use strict";
var TextBufferController = (function () {
    function TextBufferController(DocBuffer, $scope) {
        this.buffer = '';
        this.write = function () {
            this.setBuffer(this.buffer);
        };
        var self = this;
        self.buffer = DocBuffer.getBuffer();
        self.getName = function () { return DocBuffer.getName(); };
        self.getBuffer = function () { return DocBuffer.getBuffer(); };
        self.setName = function (name) { DocBuffer.setName(name); };
        self.setBuffer = function (buff) { DocBuffer.setBuffer(buff); };
        self.clear = function () { return DocBuffer.clear(); };
        $scope.$watch(this.getBuffer, function () {
            self.buffer = self.getBuffer();
        });
    }
    return TextBufferController;
}());
angular.module('notepadApp')
    .controller('TextBufferCtrl', ['DocBuffer', '$scope', TextBufferController]);
