(function () {
    'use strict';
    angular
        .module('va', [])
        .filter('highlight', highlight)
        .factory('query', query)
        .controller('searchlist', searchList);
    
    highlight.$inject = ['$sce'];
    function highlight($sce) {
        return function (text, phrase) {
            if (phrase) {
                text = text.replace(new RegExp('(' +  phrase + ')', 'i'), 
                                    '<span class="highlighted">$1</span>');
            }
            
            return $sce.trustAsHtml(text);
        }
    }
    
    query.$inject = ['$http'];
    
    function query($http) {
        function getCountries () {
            return $http({
                method: 'GET',
                url: '/json/africa.json'
            });
        }
        
        return {
            listAll: getCountries
        }
    }
    
    searchList.$inject = ["query"];
    
    function searchList(query) {
        var vm = this;
        vm.countries = [];
        
        query.listAll()
            .success(hasList)
            .error(noList);
        
        function hasList(payload) {
            vm.countries = payload;
        }
        
        function noList(error) {
            console.log(error);
        }
    }
})();