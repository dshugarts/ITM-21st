const app = angular.module("Candidate.App", []);


app.component("itmRoot", {
    controller: class {
        constructor() {
            this.candidates = [{ name: "Puppies", votes: 10 }, { name: "Kittens", votes: 12 }, { name: "Gerbils", votes: 7 }];
        }
        onVote(candidate) {
            console.log(`Vote for ${candidate.name}`);
            console.log(candidate.votes);
            let newVote = candidate.votes + 1
            console.log(newVote);
            candidate.votes = newVote;
            console.log(this.candidates);
        }

        onAddCandidate(candidate) {
            console.log(`Added candidate ${candidate.name}`);
         
        }

        onRemoveCandidate(candidate) {
            console.log(`Removed candidate ${candidate.name}`);
            this.newCandidates = function(object) {
                console.log('array = ', object);
                console.log('old', this.candidates);
                this.candidates.splice(object, 1);
                console.log('new', this.candidates);
            }
            console.log('remove', candidate);
            var words = this.candidates;
            console.log('words', words);
            const result = words.findIndex(word => word.name === candidate.name);
            console.log('result', result);
            this.newCandidates(result);

        }
    },
    template: `
        <h1>Which candidate brings the most joy?</h1>
             
        <itm-results 
            candidates="$ctrl.candidates">
        </itm-results>

        <itm-vote 
            candidates="$ctrl.candidates"
            on-vote="$ctrl.onVote($candidate)">
        </itm-vote>

        <itm-management 
            candidates="$ctrl.candidates"
            on-add="$ctrl.onAddCandidate($candidate)"
            on-remove="$ctrl.onRemoveCandidate($candidate)">
        </itm-management>
    `
});

app.component("itmManagement", {
    bindings: {
        candidates: "<",
        onAdd: "&",
        onRemove: "&"
    },
    controller: class {
        constructor($http, $scope) {
            this.$http = $http;
            this.$scope = $scope;
            this.newCandidate = {
                name: ""
            };

            console.log('in Management');
    }

        submitCandidate(candidate) {
            let self = this;
            self.cleartext = function() {
                this.newCandidate.name = "";
            }
            console.log('name = ', candidate);
            candidate = {
                name: candidate.name,
                votes: 0
            }
            console.log('name 2= ', candidate);
           
            self.validation = function() {
                console.log('in valid');
                if (candidate.name === '') {
                    alert("Please Enter a Candidate Name");
                    self.cleartext();
                } else {
                    console.log('double');
                    this.onAdd({ $candidate: candidate })
                    this.candidates.push(candidate);
                    self.cleartext();
              }
            }
           
            this.candidates.forEach(function(existingCandidate) {
                let duplicate = false;
                console.log('forEach = ', existingCandidate);
                if (candidate.name === existingCandidate.name) {
                    duplicate = true;
                    alert("Duplicate");
                    location.reload();
                } else {
                    duplicate = false;
                }
                console.log('duplicate', duplicate);
                });
                self.validation();
        }
        
        
        
        
        
        removeCandidate(candidate) {
            this.onRemove({ $candidate: candidate });
         
            }
    },
    template: `
        <h2>Manage Candidates</h2>

        <h3>Add New Candidate</h3>
        <form ng-submit="$ctrl.submitCandidate($ctrl.newCandidate)" novalidate>

            <label>Candidate Name</label>
            <input type="text" ng-model="$ctrl.newCandidate.name" required>

            <button type="submit">Add</button>
        </form>

        <h3>Remove Candidate</h3>
        <ul>
            <li ng-repeat="candidate in $ctrl.candidates">
                <span ng-bind="candidate.name"></span>
                <button type="button" ng-click="$ctrl.removeCandidate(candidate)">X</button>
            </li>
        </ul>

    `
});

app.component("itmVote", {
    bindings: {
        candidates: "<",
        onVote: "&"
    },
    controller: class {},
    template: `
        <h2>Cast your vote!</h2>

        <button type="button"
            ng-repeat="candidate in $ctrl.candidates"
            ng-click="$ctrl.onVote({ $candidate: candidate })">
            <span ng-bind="candidate.name"></span>
        </button>
    `
});

app.component("itmResults", {
    bindings: {
        candidates: "<"
    },
    controller: class {},
    template: `
        <h2>Live Results</h2>
        <ul>
            <li ng-repeat="candidate in $ctrl.candidates | orderBy: '-votes'">
                <span ng-bind="candidate.name"></span>
                <strong ng-bind="candidate.votes"></strong>
            </li>
        </ul>
    `

});

// }]);